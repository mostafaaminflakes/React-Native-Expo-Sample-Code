import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";

import RightButton from "../components/RightButton";
import { connect } from "react-redux";

class AboutCompanyScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.navigation.setParams({
        //     loggedIn: this.props.loggedIn
        // });
        const { navigation } = this.props;
        //console.log(this.props.lat, this.props.lng);
    }

    static navigationOptions = ({ navigation }) => {
        //const l = navData.navigation.getParam("loggedIn");

        return {
            headerTitle: " عن الشركة ",
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
        const dynamicValue = this.props.navigation.getParam("ownerName");
        //this.props.navigation.setParams({ loggedIn: this.props.loggedIn });
        //const scrtitle = Storage.getItem("AboutCompany");
        //console.log(props.navigation);
        //console.log(this.props);
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.text}>{Strings.aboutCompany.text1}</Text>
                <Text style={styles.text}>{Strings.aboutCompany.text2}</Text>
                <Text style={styles.text}>{Strings.aboutCompany.text3}</Text>
                {/* <Button
                    title="Login"
                    onPress={() => {
                        this.props.navigation.navigate({
                            routeName: "Login"
                        });
                    }}
                /> */}
                {/*<Text>{dynamicValue}</Text>*/}
            </View>
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
        // userData: state.loginReducer.userData,
        //lat: state.app.lat,
        //lng: state.app.lng,
    };
};

export default connect(mapStateToProps)(AboutCompanyScreen);
