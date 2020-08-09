import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Platform,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import RightButton from "../components/RightButton";
import { Card } from "react-native-shadow-cards";

import { connect } from "react-redux";
import { updatePassword } from "../store/actions/AuthActions";

class EditMyPasswordScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: null,
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: " تعديل كلمة السر ",
            // headerLeft: () => (
            //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
            //         <Item
            //             title="Menu"
            //             iconName="ios-menu"
            //             onPress={() => {
            //                 navigation.toggleDrawer();
            //             }}
            //         />
            //     </HeaderButtons>
            // ),
            headerRight: () => <RightButton navigation={navigation} />,
            //headerLeft: () => (
            //  <NavigationDrawerStructure navigationProps={navigation} />
            //),
            headerStyle: {
                backgroundColor:
                    Platform.OS === "android" ? Colors.appBackgroundColor : "",
            },
            headerTintColor:
                Platform.OS === "android"
                    ? Colors.appHeaderTextColor
                    : Colors.appBackgroundColor,
        };
    };

    handlePassword = (text) => {
        this.setState({ password: text });
    };

    handleUpdatePassword = async () => {
        let x = await this.props.updatePassword(this.state);
        // console.log(this.props.creds);
        this.props.navigation.navigate("MyData");
    };

    render() {
        //const { baseUrl, profile, loggedIn } = this.props;
        //console.log(profile);
        //console.log(this.props);
        return (
            <KeyboardAvoidingView
                behavior={Platform.Os == "ios" ? "padding" : "height"}
                style={styles.container}
                //keyboardVerticalOffset={300}
            >
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView>
                            <View style={styles.MainContainer}>
                                <Card style={styles.Card}>
                                    <View style={styles.FloatContainer}>
                                        <View style={styles.FloatViewOne}>
                                            <Text
                                                style={{ fontWeight: "bold" }}
                                            >
                                                كلمة السر الجديدة:{" "}
                                            </Text>
                                        </View>
                                        <View style={styles.FloatViewTwo}>
                                            <TextInput
                                                style={styles.input}
                                                underlineColorAndroid="transparent"
                                                placeholder="كلمة السر الجديدة"
                                                placeholderTextColor="black"
                                                autoCapitalize="none"
                                                secureTextEntry={true}
                                                value={this.state.name}
                                                onChangeText={this.handlePassword.bind(
                                                    this
                                                )}
                                            />
                                        </View>
                                    </View>
                                </Card>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={this.handleUpdatePassword}
                                >
                                    <Text style={styles.submitButtonText}>
                                        {" "}
                                        حفظ{" "}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.submitButton,
                                        { backgroundColor: "#bb1d1d" },
                                    ]}
                                    onPress={() =>
                                        this.props.navigation.goBack()
                                    }
                                >
                                    <Text style={styles.submitButtonText}>
                                        إلغاء
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ height: 60 }} /> */}
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    // CSS {float: left] model
    FloatContainer: { flex: 1, flexDirection: "row-reverse" },
    FloatViewOne: {
        //backgroundColor: "powderblue",
        justifyContent: "center",
        width: "40%",
    },
    FloatViewTwo: {
        //backgroundColor: "skyblue",
        justifyContent: "center",
        width: "60%",
    },
    // End CSS {float: left] model
    MainContainer: {
        // flex: 1,
        // paddingTop: 20,
        // alignItems: "center",
        // marginTop: 50,
        // justifyContent: "center"
        flex: 1,
        padding: 20,
        //marginTop: 20,
        alignItems: "center",
        textAlign: "justify",
        //flexDirection: "column-reverse",
        //marginTop: 50,
        justifyContent: "flex-end", //center
        //justifyContent: "center"
    },
    rowContainer: {
        flexDirection: "row",
    },
    text: {
        paddingBottom: 20,
        fontSize: 20,
    },
    input: {
        width: "100%",
        margin: 15,
        height: 40,
        borderColor: "grey",
        backgroundColor: "white",
        padding: 10,
        borderWidth: 1,
        borderRadius: 30,
        //textAlign: "right"
    },
    submitButton: {
        width: "90%",
        backgroundColor: "#4054b2",
        padding: 15,
        margin: 15,
        alignItems: "center",
        height: 50,
        borderRadius: 30,
    },
    submitButtonText: {
        color: "white",
    },
    Card: { padding: 10, margin: 10 },
    userImage: {
        height: 95,
        width: 95,
        borderRadius: 75,
        //marginTop: 50
        marginBottom: 20,
        borderColor: "#999",
        borderWidth: 3,
    },
});

const mapStateToProps = (state) => ({
    //baseUrl: state.loginReducer.baseUrl,
    profile: state.firebase.profile,
    loggedIn: state.auth.loggedIn,
    //creds: state.auth.credentials,
});

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (credentials) => dispatch(updatePassword(credentials)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditMyPasswordScreen);
