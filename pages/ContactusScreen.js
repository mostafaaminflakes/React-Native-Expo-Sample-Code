import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

import RightButton from "../components/RightButton";
import { connect } from "react-redux";
import { Card } from "react-native-shadow-cards";
import { Ionicons } from "@expo/vector-icons";

class ContactusScreen extends Component {
    constructor(props) {
        super(props);
        //const dynamicValue = props.navigation.getParam("ownerName");
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: " اتصل بنا ",
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
                <Card style={{ padding: 30, margin: 10 }}>
                    <View
                        style={{
                            flexDirection: "row-reverse",
                            flexWrap: "wrap"
                        }}
                    >
                        <Ionicons
                            name="ios-call"
                            size={40}
                            color="#4054b2"
                            style={{ paddingLeft: 20 }}
                        />
                        <View>
                            <Text>+966 565 695 451</Text>
                            <Text> </Text>
                            <Text>الجوال</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ padding: 30, margin: 10 }}>
                    <View
                        style={{
                            flexDirection: "row-reverse",
                            flexWrap: "wrap"
                        }}
                    >
                        <Ionicons
                            name="md-at"
                            size={40}
                            color="#4054b2"
                            style={{ paddingLeft: 20 }}
                        />
                        <View>
                            <Text>john.doe@mail.com</Text>
                            <Text> </Text>
                            <Text>الإيميل</Text>
                        </View>
                    </View>
                </Card>
                {/* <Text style={{ fontSize: 23 }}> اتصل بنا </Text>
                <Button
                    title="My Data"
                    onPress={() => {
                        props.navigation.navigate({
                            routeName: "MyData"
                        });
                    }}
                />
                <Text>{this.dynamicValue}</Text> */}
            </View>
        );
    }
}
const containerStyle = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: "#ffffff"
    },
    rowContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
});
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "flex-start"
    }
});

export default ContactusScreen;
