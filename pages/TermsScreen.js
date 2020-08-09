import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

import RightButton from "../components/RightButton";
import { connect } from "react-redux";

class TermsScreen extends Component {
    constructor(props) {
        super(props);
        const dynamicValue = props.navigation.getParam("ownerName");
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: " شروط الاستخدام ",
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
                    Platform.OS === "android" ? Colors.appBackgroundColor : ""
            },
            headerTintColor:
                Platform.OS === "android"
                    ? Colors.appHeaderTextColor
                    : Colors.appBackgroundColor
        };
    };

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 23 }}> شروط الاستخدام </Text>
                <Button
                    title="My Data"
                    onPress={() => {
                        props.navigation.navigate({
                            routeName: "MyData"
                        });
                    }}
                />
                <Text>{this.dynamicValue}</Text>
            </View>
        );
    }
}

// TermsScreen.navigationOptions = navData => {
//     return {
//         headerTitle: " شروط الاستخدام ",
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
        paddingTop: 20,
        alignItems: "center",
        marginTop: 50,
        justifyContent: "center"
    }
});

export default TermsScreen;
