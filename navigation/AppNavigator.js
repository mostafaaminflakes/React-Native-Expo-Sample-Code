import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Button,
    Platform,
    Linking,
} from "react-native";

//For React Navigation 3+
//import {
//  createStackNavigator,
//  createDrawerNavigator,
//  createAppContainer,
//} from 'react-navigation';

//For React Navigation 4+
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import { Ionicons } from "@expo/vector-icons";

import CustomDrawerContentComponent from "../components/CustomDrawerContentComponent";

import HomepageScreen from "../pages/HomepageScreen";
import MyDataScreen from "../pages/MyDataScreen";
import AboutCompanyScreen from "../pages/AboutCompanyScreen";
import JoinusScreen from "../pages/JoinusScreen";
import PrivacyScreen from "../pages/PrivacyScreen";
import TermsScreen from "../pages/TermsScreen";
import NearestWorkshopScreen from "../pages/NearestWorkshopScreen";
import ContactusScreen from "../pages/ContactusScreen";
import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen";
import ActivateRegisterScreen from "../pages/ActivateRegisterScreen";
import EditMyDataScreen from "../pages/EditMyDataScreen";
import EditMyPasswordScreen from "../pages/EditMyPasswordScreen";
import FindServicePointsScreen from "../pages/FindServicePointsScreen";
import ImageUploadScreen from "../pages/ImageUploadScreen";
import ChatScreen from "../pages/ChatScreen";
//import DrawerContentComponents from "./DrawerContentComponents";
import { Container, Content, Icon, Header, Body } from "native-base";
//import Storage from "../components/Storage";

// class NavigationDrawerStructure extends Component {
//     //Structure for the navigatin Drawer
//     toggleDrawer = () => {
//         //Props to open/close the drawer
//         this.props.navigationProps.toggleDrawer();
//     };
//     render() {
//         return (
//             <View style={{ flexDirection: "row" }}>
//                 <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//                     {/*Donute Button Image */}
//                     <Image
//                         source={require("../assets/drawer.png")}
//                         style={{ width: 25, height: 25, marginLeft: 5 }}
//                     />
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

const Homepage_StackNavigator = createStackNavigator({
    Homepage: HomepageScreen,
});

// const MyData_StackNavigator = createStackNavigator({
//     MyData: MyDataScreen
// });

const AboutCompany_StackNavigator = createStackNavigator({
    AboutCompany: AboutCompanyScreen,
});

const Joinus_StackNavigator = createStackNavigator({
    Joinus: JoinusScreen,
});

const Privacy_StackNavigator = createStackNavigator({
    Privacy: PrivacyScreen,
});

const Terms_StackNavigator = createStackNavigator({
    Terms: TermsScreen,
});

const NearestWorkshop_StackNavigator = createStackNavigator({
    NearestWorkshop: NearestWorkshopScreen,
});

const Contactus_StackNavigator = createStackNavigator({
    Contactus: ContactusScreen,
});

// const DrawerNavigatorConfig = {
//     //intialRouteName: "Home",
//     navigationOptions: {
//         headerStyle: {
//             backgroundColor: "#fff"
//         },
//         headerTintColor: "#fff",
//         headerTitleStyle: {
//             color: "white"
//         }
//     },
//     contentOptions: {
//         // add your styling here
//         activeTintColor: "#fff",
//         inactiveTintColor: "#fff",
//         activeBackgroundColor: "#4054b2",
//         itemsContainerStyle: {
//             marginVertical: 0
//         },
//         iconContainerStyle: {
//             opacity: 1
//         }
//     },
//     drawerBackgroundColor: "#020826" // sets background color of drawer
// };

// const userdata = Storage.getItem("Userdata").then(obj => {
//     //this.setState({ Userdata: obj });
//     //console.log(obj);
//     return obj;
// });
// console.log(userdata);

const DrawerNavigator = createDrawerNavigator(
    {
        //Login: Login_StackNavigator,
        Homepage: {
            screen: Homepage_StackNavigator,
            navigationOptions: {
                drawerLabel: " الرئيسية ",
                drawerIcon: () => (
                    <Ionicons name="ios-navigate" size={25} color="white" />
                ),
            },
        },
        // MyData: {
        //     screen: MyData_StackNavigator,
        //     navigationOptions: {
        //         drawerLabel: " بياناتي ",
        //         drawerIcon: () => (
        //             <Ionicons name="ios-person" size={25} color="white" />
        //         )
        //     }
        // },
        AboutCompany: {
            screen: AboutCompany_StackNavigator,
            navigationOptions: {
                drawerLabel: " عن الشركة ",
                drawerIcon: () => (
                    <Ionicons name="md-bookmark" size={25} color="white" />
                    // <Image
                    //     source={require("../assets/home.png")}
                    //     resizeMode="contain"
                    //     style={{ width: 30, height: 30, tintColor: "#2699fb" }}
                    // />
                ),
                // labelStyle: {
                //     color: "#ffffff",
                //     width: "100%",
                //     borderColor: "red"
                // }
            },
        },
        Joinus: {
            screen: Joinus_StackNavigator,
            navigationOptions: {
                drawerLabel: " انضم إلينا ",
                drawerIcon: () => (
                    <Ionicons name="ios-heart" size={25} color="white" />
                ),
            },
        },
        Privacy: {
            screen: Privacy_StackNavigator,
            navigationOptions: {
                drawerLabel: " الخصوصية ",
                drawerIcon: () => (
                    <Ionicons name="ios-lock" size={25} color="white" />
                ),
            },
        },
        Terms: {
            screen: Terms_StackNavigator,
            navigationOptions: {
                drawerLabel: " شروط الاستخدام ",
                drawerIcon: () => (
                    <Ionicons name="md-folder" size={25} color="white" />
                ),
            },
        },
        NearestWorkshop: {
            screen: NearestWorkshop_StackNavigator,
            navigationOptions: {
                drawerLabel: " أقرب ورشة ",
                drawerIcon: () => (
                    <Ionicons name="ios-pin" size={25} color="white" />
                ),
            },
        },
        Contactus: {
            screen: Contactus_StackNavigator,
            navigationOptions: {
                drawerLabel: " اتصل بنا ",
                drawerIcon: () => (
                    <Ionicons name="md-mail" size={25} color="white" />
                ),
            },
        },
    },
    {
        initialRouteName: "Homepage",
        //headerMode: "none",
        contentComponent: CustomDrawerContentComponent,
        //contentComponent: porps => <CustomDrawerContentComponent {...props} />
        //contentComponent: () => <CustomDrawerContentComponent />
        //drawerWidth: 400
        //drawerWidth: "80%"
        //DrawerNavigatorConfig
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#020826",
        //marginTop: 20
        //paddingLeft: 20
        //height: "100%"
        //width: "100%"
    },
    drawerHeader: {
        height: 120,
        backgroundColor: "#4054b2",
    },
    drawerImage: {
        position: "absolute",
        left: 0,
        //top: 0,
        height: 65,
        width: 65,
        borderRadius: 75,
        //marginTop: 50
        //marginBottom: 10
    },
    // text on header
    headerText: {
        color: "#fff",
        textAlign: "center",
        //marginLeft: 80,
        fontSize: 15,
    },
    // text on link
    //screenTextStyle: {
    // drawerItems: {
    //     color: "#fff",
    //     fontSize: 18,
    //     //marginLeft: 60,
    //     //width: "100%",
    //     textAlign: "center"
    // },
    // active link text style
    // selectedTextStyle: {
    //     fontWeight: "bold",
    //     color: "#00adff"
    // },
    // // active link bg color
    // activeBackgroundColor: {
    //     backgroundColor: "#4054b2"
    // },
    bottom: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20,
        //position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    bottomsocial: {
        paddingRight: 15,
    },
});

const MainNavigator = createStackNavigator({
    DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            headerShown: false,
        },
    },
    Login: {
        screen: LoginScreen,
    },
    MyData: {
        screen: MyDataScreen,
    },
    EditMyPassword: {
        screen: EditMyPasswordScreen,
    },
    EditMyData: {
        screen: EditMyDataScreen,
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            //headerShown: false
        },
    },
    ActivateRegister: {
        screen: ActivateRegisterScreen,
        navigationOptions: {
            //headerShown: false
        },
    },
    FindServicePoints: {
        screen: FindServicePointsScreen,
        navigationOptions: {
            //headerShown: false
        },
    },
    ImageUpload: {
        screen: ImageUploadScreen,
        navigationOptions: {
            //headerShown: false
        },
    },
    Chat: { screen: ChatScreen },
});

export default createAppContainer(MainNavigator);
