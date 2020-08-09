import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Platform,
    Linking,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";

import RightButton from "../components/RightButton";
import { connect } from "react-redux";

class JoinusScreen extends Component {
    constructor(props) {
        super(props);
        const dynamicValue = props.navigation.getParam("ownerName");
        const mail = Strings.joinus.text3;
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: " انضم إلينا ",
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Menu"
                        iconName="ios-menu"
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            ),
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
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.text}>{Strings.joinus.text1}</Text>
                <Text style={styles.text}>{Strings.joinus.text2}</Text>
                <Text
                    style={[styles.text, styles.moreSpace]}
                    onPress={() => Linking.openURL("mailto:job@tss.com.sa")}
                >
                    {Strings.joinus.text3}
                </Text>
                {/*<Button
                title="My Data"
                onPress={() => {
                    props.navigation.navigate({
                        routeName: "MyData"
                    });
                }}
            />
            <Text>{this.dynamicValue}</Text>*/}
            </View>
        );
    }
}

// JoinusScreen.navigationOptions = navData => {
//     return {
//         headerTitle: " انضم إلينا ",
//         headerLeft: () => (
//             <HeaderButtons HeaderButtonComponent={HeaderButton}>
//                 <Item
//                     title="Menu"
//                     iconName="ios-menu"
//                     onPress={() => {
//                         navData.navigation.toggleDrawer();
//                     }}
//                 />
//             </HeaderButtons>
//         ),
//         //headerLeft: () => (
//         //  <NavigationDrawerStructure navigationProps={navigation} />
//         //),
//         headerStyle: {
//             backgroundColor:
//                 Platform.OS === "android" ? Colors.appBackgroundColor : ""
//         },
//         headerTintColor:
//             Platform.OS === "android"
//                 ? Colors.appHeaderTextColor
//                 : Colors.appBackgroundColor
//     };
// };

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        alignItems: "center",
        textAlign: "justify",
        //marginTop: 50,
        justifyContent: "flex-start",
        //justifyContent: "center"
    },
    text: {
        paddingBottom: 20,
        fontSize: 20,
    },
    moreSpace: {
        paddingTop: 100,
    },
});

const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        //counter: state.counterReducer.counter,
        // loggedIn: state.loginReducer.loggedIn,
        // token: state.loginReducer.token,
        // userData: state.loginReducer.userData
    };
};

export default connect(mapStateToProps)(JoinusScreen);
