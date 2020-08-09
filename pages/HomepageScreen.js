import React, { Component } from "react";
import { StyleSheet, View, Platform, YellowBox } from "react-native";
import _ from "lodash";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

import RightButton from "../components/RightButton";
import BackgroundMapsWithLocation from "../components/BackgroundMapsWithLocation";
//import SwipeViewer from "../components/SwipeViewer";
import OnMapServices from "../components/OnMapServices";
import { connect } from "react-redux";

class HomepageScreen extends Component {
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

    componentDidMount() {
        const { navigation } = this.props;
    }

    static navigationOptions = ({ navigation }) => {
        //const l = navData.navigation.getParam("loggedIn");

        return {
            headerTitle: " الرئيسية ",
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
            <View style={styles.container}>
                <BackgroundMapsWithLocation />
                <OnMapServices navigation={this.props.navigation} />
                {/* <SwipeViewer /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

const mapStateToProps = (state) => {
    return {
        lat: state.app.lat,
        lng: state.app.lng,
    };
};

export default connect(mapStateToProps)(HomepageScreen);
