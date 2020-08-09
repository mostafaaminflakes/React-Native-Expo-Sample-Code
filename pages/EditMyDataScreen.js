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
import { updateProfile } from "../store/actions/AuthActions";

class EditMyDataScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mobile: this.props.profile.mobile,
            name: this.props.profile.name,
            email: this.props.profile.email,
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: " تعديل بياناتي ",
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

    handleName = (text) => {
        this.setState({ name: text });
    };

    handleMobile = (text) => {
        this.setState({ mobile: text });
    };

    handleEmail = (text) => {
        this.setState({ email: text });
    };

    EditProfileFunction = () => {
        const { name } = this.state;
        const { mobile } = this.state;
        const { email } = this.state;
        const { token } = this.state;
        const { loggedIn } = this.state;

        fetch("http://192.168.1.3/t/edit_profile.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                mobile: mobile,
                email: email,
                //token: token,
                //loggedIn: loggedIn,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    alert("فضلا تأكد من البيانات المدخلة");
                } else {
                    //console.log(responseJson.userData);
                    this.props.reduxEditProfile(
                        responseJson.userData.name,
                        responseJson.userData.email,
                        responseJson.userData.mobile
                    );

                    this.props.navigation.navigate("MyData", {
                        loggedIn: responseJson.loggedIn,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    handleUpdateProfile = async () => {
        let x = await this.props.updateProfile(this.state);
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
                                                الاسم:{" "}
                                            </Text>
                                        </View>
                                        <View style={styles.FloatViewTwo}>
                                            <TextInput
                                                style={styles.input}
                                                underlineColorAndroid="transparent"
                                                placeholder="الاسم"
                                                placeholderTextColor="black"
                                                autoCapitalize="none"
                                                value={this.state.name}
                                                onChangeText={this.handleName.bind(
                                                    this
                                                )}
                                            />
                                        </View>
                                    </View>
                                </Card>
                                <Card style={styles.Card}>
                                    <View style={styles.FloatContainer}>
                                        <View style={styles.FloatViewOne}>
                                            <Text
                                                style={{ fontWeight: "bold" }}
                                            >
                                                الجوال:{" "}
                                            </Text>
                                        </View>
                                        <View style={styles.FloatViewTwo}>
                                            <TextInput
                                                style={styles.input}
                                                underlineColorAndroid="transparent"
                                                placeholder="رقم الجوال"
                                                placeholderTextColor="black"
                                                autoCapitalize="none"
                                                onChangeText={this.handleMobile.bind(
                                                    this
                                                )}
                                                value={this.state.mobile}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                    </View>
                                </Card>
                                <Card style={styles.Card}>
                                    <View style={styles.FloatContainer}>
                                        <View
                                            style={[
                                                styles.FloatViewOne,
                                                { width: "35%" },
                                            ]}
                                        >
                                            <Text
                                                style={{ fontWeight: "bold" }}
                                            >
                                                البريد الإلكتروني:{" "}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.FloatViewTwo,
                                                { width: "65%" },
                                            ]}
                                        >
                                            <TextInput
                                                style={styles.input}
                                                underlineColorAndroid="transparent"
                                                placeholder="البريد الإلكتروني"
                                                placeholderTextColor="black"
                                                autoCapitalize="none"
                                                onChangeText={this.handleEmail.bind(
                                                    this
                                                )}
                                                value={this.state.email}
                                            />
                                        </View>
                                    </View>
                                </Card>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    //onPress={() => this.EditProfileFunction()}
                                    onPress={this.handleUpdateProfile}
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
        width: "15%",
    },
    FloatViewTwo: {
        //backgroundColor: "skyblue",
        justifyContent: "center",
        width: "85%",
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
        width: "90%",
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
    // loggedIn: state.loginReducer.loggedIn,
    // token: state.loginReducer.token,
    // userData: state.loginReducer.userData,
    //user: state.MembershipReducer,
    profile: state.firebase.profile,
    loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (credentials) => dispatch(updateProfile(credentials)),
    };
};

// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect([{ collection: "users" }])
// )(EditMyDataScreen);
export default connect(mapStateToProps, mapDispatchToProps)(EditMyDataScreen);
