import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { Container, Content } from "native-base";
import UserData from "../components/UserData";

const CustomDrawerContentComponent = props => {
    //const { loggedIn, token, userData } = props;
    //console.log(props);
    return (
        <Container>
            <UserData navigation={props.navigation} />
            <Content contentContainerStyle={styles.container}>
                <DrawerItems
                    {...props}
                    activeTintColor="#00adff"
                    activeBackgroundColor="#3c3f50"
                    //inactiveTintColor="rgba(0, 0, 0, .87)"
                    //inactiveBackgroundColor="transparent"
                    //style={{ backgroundColor: "#fff" }}
                    labelStyle={{
                        color: "#ffffff"
                        //width: "100%",
                        //borderColor: "red"
                    }}
                    //width="100%"
                />
                <View style={styles.bottom}>
                    <Ionicons
                        name="logo-facebook"
                        size={25}
                        color="white"
                        style={styles.bottomsocial}
                        onPress={() => {
                            Linking.openURL("http://www.facebook.com/");
                        }}
                    />
                    <Ionicons
                        name="logo-instagram"
                        size={25}
                        color="white"
                        style={styles.bottomsocial}
                        onPress={() => {
                            Linking.openURL("http://www.instagram.com/");
                        }}
                    />
                    <Ionicons
                        name="logo-twitter"
                        size={25}
                        color="white"
                        onPress={() => {
                            Linking.openURL("http://www.twitter.com/");
                        }}
                    />
                </View>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#020826"
        //marginTop: 20
        //paddingLeft: 20
        //height: "100%"
        //width: "100%"
    },
    bottom: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 0,
        //position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    bottomsocial: {
        paddingRight: 15
    }
});

// const mapStateToProps = state => ({
//     loggedIn: state.loginReducer.loggedIn,
//     token: state.loginReducer.token,
//     userData: state.loginReducer.userData
// });

// export default connect(mapStateToProps)(CustomDrawerContentComponent);
export default CustomDrawerContentComponent;
