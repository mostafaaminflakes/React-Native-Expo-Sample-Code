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
    YellowBox,
    //AsyncStorage
} from "react-native";
import _ from "lodash";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
//import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase, { db } from "../firestore/FirestoreInit";
import { signIn } from "../store/actions/AuthActions";

class LoginScreen extends Component {
    //const dynamicValue = props.navigation.getParam("ownerName");
    state = { email: "", password: "" };

    constructor(props) {
        super(props);
        //console.log(props);
        // Fix yellow box message: [Setting a timer for a long period of time]
        YellowBox.ignoreWarnings(["Setting a timer"]);
        const _console = _.clone(console);
        console.warn = (message) => {
            if (message.indexOf("Setting a timer") <= -1) {
                _console.warn(message);
            }
        };
        // End fix
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: " تسجيل الدخول ",
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

    handleEmail = (email) => {
        this.setState({ email: email });
    };

    handlePassword = (password) => {
        this.setState({ password: password });
    };

    componentDidMount = () => {
        //console.log(this.props.authError);
        const { navigation } = this.props;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //navigation.navigate("Homepage");
            } else {
                //navigation.navigate("Login");
            }
        });
    };

    handleSignIn = async () => {
        let x = await this.props.signIn(this.state);
        this.props.navigation.navigate("Homepage");
    };

    render() {
        //console.log(this.props);
        return (
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
                    // value={this.props.user.email}
                    underlineColorAndroid="transparent"
                    placeholder="البريد الإلكتروني"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    //onChangeText={(UserEmail) => this.setState({ UserEmail })}
                    onChangeText={this.handleEmail}
                />
                <TextInput
                    style={styles.input}
                    // value={this.props.user.password}
                    underlineColorAndroid="transparent"
                    placeholder="كلمة المرور"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={this.handlePassword}
                    // onChangeText={(UserPassword) =>
                    //     this.setState({ UserPassword })
                    // }
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.handleSignIn}
                >
                    <Text style={styles.submitButtonText}> تسجيل دخول </Text>

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
                        هل أنت غير مسجل؟{" "}
                        <Text
                            style={styles.text}
                            onPress={() => {
                                this.props.navigation.navigate({
                                    routeName: "Register",
                                });
                            }}
                        >
                            تسجيل جديد
                        </Text>
                    </Text>
                    {/*<Text>{dynamicValue}</Text>*/}
                </View>
            </View>
        );
    }
}

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

const mapStateToProps = (state) => {
    return { authError: state.auth.authError };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
