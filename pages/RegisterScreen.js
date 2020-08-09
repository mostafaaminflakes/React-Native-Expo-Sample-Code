import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Linking,
    TouchableOpacity,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

import { connect } from "react-redux";
import { registerUser } from "../store/actions/AuthActions";

class RegisterScreen extends Component {
    //const dynamicValue = props.navigation.getParam("ownerName");

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            mobile: "",
            password: "",
        };
    }

    handleName = (text) => {
        this.setState({ name: text });
    };

    handleEmail = (text) => {
        this.setState({ email: text });
    };

    handleMobile = (text) => {
        this.setState({ mobile: text });
    };

    handlePassword = (text) => {
        this.setState({ password: text });
    };

    handleRegisterUser = async () => {
        let x = await this.props.registerUser(this.state);
        this.props.navigation.navigate("Homepage");
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={require("../assets/icon.png")}
                            style={{
                                // marginTop: 20,
                                marginBottom: 20,
                            }}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="الاسم"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        onChangeText={this.handleName.bind(this)}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="البريد الإلكتروني (اختياري) للتقييم والفواتير"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        onChangeText={this.handleEmail.bind(this)}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="رقم الجوال"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        keyboardType="numeric"
                        onChangeText={this.handleMobile.bind(this)}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="كلمة المرور"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={this.handlePassword.bind(this)}
                    />
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={this.handleRegisterUser}
                    >
                        <Text style={styles.submitButtonText}>
                            {" "}
                            تسجيل جديد{" "}
                        </Text>

                        {/* <Button
                    title=" تسجيل دخول "
                    onPress={() => {
                        props.navigation.navigate({
                            routeName: "AboutCompany"
                        });
                    }}
                />*/}
                    </TouchableOpacity>

                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                        }}
                    >
                        <Text style={styles.text}>
                            هل قمت بالتسجيل مسبقا؟{" "}
                            {/*<Text
                    style={styles.text}
                    onPress={() => {
                        Linking.openURL("http://www.google.com/");
                    }}
                >*/}
                            <Text
                                style={styles.text}
                                onPress={() => {
                                    this.props.navigation.navigate({
                                        routeName: "Login",
                                    });
                                }}
                            >
                                سجل دخول
                            </Text>
                        </Text>
                        {/*<Text>{dynamicValue}</Text>*/}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

RegisterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: " تسجيل جديد ",
        // headerLeft: () => (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item
        //             title="Menu"
        //             iconName="ios-menu"
        //             onPress={() => {
        //                 navData.navigation.toggleDrawer();
        //             }}
        //         />
        //     </HeaderButtons>
        // ),
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

const styles = StyleSheet.create({
    MainContainer: {
        // flex: 1,
        // paddingTop: 20,
        // alignItems: "center",
        // //marginTop: 50,
        // justifyContent: "center",
        // backgroundColor: Colors.appBackgroundColor
        // flex: 1,
        // padding: 20,
        // //marginTop: 20,
        // //alignItems: "center",
        // textAlign: "justify",
        // //marginTop: 50,
        // justifyContent: "flex-start",
        // backgroundColor: Colors.appBackgroundColor
        // //justifyContent: "center"
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        textAlign: "center",
        justifyContent: "flex-start",
        //alignItems: "center",
        backgroundColor: Colors.appBackgroundColor,
    },
    text: {
        color: "#fff",
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        margin: 15,
        height: 50,
        borderColor: "white",
        backgroundColor: "white",
        padding: 10,
        borderWidth: 1,
        borderRadius: 30,
        textAlign: "right",
    },
    submitButton: {
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
});

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (credentials) => dispatch(registerUser(credentials)),
    };
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
//export default RegisterScreen;
