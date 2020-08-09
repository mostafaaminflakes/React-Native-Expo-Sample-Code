import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { white } from "ansi-colors";

export default class DrawerContentComponents extends Component {
    navigateToScreen = route => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <ImageBackground
                        source={require("../assets/drawerbg.jpg")}
                        style={{
                            flex: 1,
                            width: 280,
                            justifyContent: "center"
                        }}
                    >
                        <Text style={styles.headerText}>اسم المستخدم</Text>
                        <Text style={styles.headerText}>0565695451</Text>
                    </ImageBackground>
                </View>
                <View style={styles.screenContainer}>
                    <View
                        style={[
                            styles.screenStyle,
                            this.props.activeItemKey == "MyData"
                                ? styles.activeBackgroundColor
                                : null
                        ]}
                    >
                        <Text
                            style={[
                                styles.screenTextStyle,
                                this.props.activeItemKey == "MyData"
                                    ? styles.selectedTextStyle
                                    : null
                            ]}
                            onPress={this.navigateToScreen("MyData")}
                        >
                            بياناتي
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.screenStyle,
                            this.props.activeItemKey == "AboutCompany"
                                ? styles.activeBackgroundColor
                                : null
                        ]}
                    >
                        <Text
                            style={[
                                styles.screenTextStyle,
                                this.props.activeItemKey == "AboutCompany"
                                    ? styles.selectedTextStyle
                                    : null
                            ]}
                            onPress={this.navigateToScreen("AboutCompany")}
                        >
                            عن الشركة
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.screenStyle,
                            this.props.activeItemKey == "Joinus"
                                ? styles.activeBackgroundColor
                                : null
                        ]}
                    >
                        <Text
                            style={[
                                styles.screenTextStyle,
                                this.props.activeItemKey == "Joinus"
                                    ? styles.selectedTextStyle
                                    : null
                            ]}
                            onPress={this.navigateToScreen("Joinus")}
                        >
                            انضم إلينا
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // drawer container styles
    container: {
        alignItems: "center",
        backgroundColor: "#020826",
        height: "100%"
    },
    // header height
    headerContainer: {
        height: 150
    },
    // text on header
    headerText: {
        color: "#fff",
        textAlign: "center",
        marginLeft: 30,
        fontSize: 20
    },
    // container of links
    screenContainer: {
        paddingTop: 20,
        width: "100%"
    },
    // item link container
    screenStyle: {
        //height: 30,
        //marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    // text on link
    screenTextStyle: {
        color: "#fff",
        fontSize: 18,
        marginLeft: 60,
        textAlign: "center"
    },
    // active link text style
    selectedTextStyle: {
        fontWeight: "bold",
        color: "#00adff"
    },
    // active link bg color
    activeBackgroundColor: {
        backgroundColor: "#4054b2"
    }
});
