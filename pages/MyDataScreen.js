import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Platform,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

import RightButton from "../components/RightButton";
import { connect } from "react-redux";
//import Firebase, { db } from "../firestore/FirestoreInit";
//import { logout } from "../store/actions/LoginAction";
import { Card } from "react-native-shadow-cards";

class MyDataScreen extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     Userdata: "",
        // };
    }

    componentDidMount() {}

    // handleSignout = () => {
    //     Firebase.auth().signOut();
    //     this.props.navigation.navigate("Homepage");
    // };

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: " بياناتي ",
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

    render() {
        //console.log("loggedIn= ", this.props);
        //const { baseUrl, loggedIn, token, userData } = this.props;
        //const userx = this.props.user;
        //return this.props.profile.uid ? (
        //console.log(this.props.creds);
        return this.props.loggedIn ? (
            <ScrollView>
                <View style={styles.MainContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            //Alert.alert("hi");
                            this.props.navigation.navigate({
                                routeName: "ImageUpload",
                            });
                        }}
                    >
                        <Image
                            style={styles.userImage}
                            source={
                                this.props.profile.avatar === ""
                                    ? require("../assets/me.png")
                                    : //: { uri: `${baseUrl}${userData.avatar}` }
                                      { uri: this.props.profile.avatar }
                            }
                        />
                        <View
                            style={{
                                position: "absolute",
                                top: -10,
                                right: -10,
                                //right: 0,
                                //bottom: 27,
                                backgroundColor: "skyblue",
                                width: 60,
                                height: 35,
                                padding: 10,
                                alignItems: "center",
                                //opacity: 0.8,
                                borderRadius: 20,
                            }}
                        >
                            <Text>تعديل</Text>
                        </View>
                    </TouchableOpacity>
                    <Card style={{ padding: 20, margin: 10 }}>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>الاسم:</Text>{" "}
                            {this.props.profile.name}
                            {/* {userData.name} */}
                            {/* {this.props.uid} */}
                        </Text>
                    </Card>
                    <Card style={{ padding: 20, margin: 10 }}>
                        <Text style={styles.card}>
                            <Text style={{ fontWeight: "bold" }}>الجوال:</Text>{" "}
                            {/* {userData.mobile} */}
                            {this.props.profile.mobile}
                        </Text>
                    </Card>
                    <Card style={{ padding: 20, margin: 10 }}>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>
                                البريد الإلكتروني:
                            </Text>{" "}
                            {this.props.profile.email}
                            {/* {userData.email} */}
                            {/* <Text>{this.props.user.email}</Text> */}
                        </Text>
                    </Card>
                    <Card style={{ padding: 20, margin: 10 }}>
                        <View
                            style={{
                                flexDirection: "row-reverse",
                                alignItems: "center",
                                height: 30,
                            }}
                        >
                            <Text style={styles.card}>
                                <Text style={{ fontWeight: "bold" }}>
                                    كلمة السر:
                                </Text>{" "}
                            </Text>
                            <TouchableOpacity
                                style={styles.smallButton}
                                onPress={() => {
                                    this.props.navigation.navigate({
                                        routeName: "EditMyPassword",
                                    });
                                }}
                            >
                                <Text style={styles.submitButtonText}>
                                    {" "}
                                    تغيير{" "}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                    <Text> </Text>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => {
                            this.props.navigation.navigate({
                                routeName: "EditMyData",
                            });
                        }}
                    >
                        <Text style={styles.submitButtonText}> تعديل </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        ) : (
            <Text>فضلا تسجيل الدخول</Text>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        // flex: 1,
        // paddingTop: 20,
        // alignItems: "center",
        // marginTop: 50,
        // justifyContent: "center"
        flex: 1,
        padding: 20,
        marginTop: 20,
        alignItems: "center",
        textAlign: "justify",
        //marginTop: 50,
        justifyContent: "flex-start", //center
        //justifyContent: "center"
    },
    text: {
        paddingBottom: 20,
        fontSize: 20,
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
    smallButton: {
        width: "50%",
        backgroundColor: "#4054b2",
        padding: 15,
        margin: 15,
        alignItems: "center",
        height: 50,
        borderRadius: 30,
    },
    card: {},
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
    //creds: state.auth.credentials,
});

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
// const mapDispatchToProps = dispatch => {
//     // Action
//     return {
//         // Login
//         reduxLogout: () => dispatch(logout())
//     };
// };

export default connect(mapStateToProps)(MyDataScreen);
