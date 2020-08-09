import React from "react";
import { Text, StyleSheet, Alert, Image } from "react-native";
import { Header, Body } from "native-base";
import { connect } from "react-redux";

function User(props) {
    let msg = "تسجيل دخول";
    //console.log(props.navigation);
    //console.log(props.auth.uid);
    //console.log(props.profile);

    return (
        <Header style={styles.drawerHeader}>
            <Body
                style={[
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                    },
                ]}
            >
                {props.loggedIn ? (
                    <>
                        <Image
                            style={styles.drawerImage}
                            source={
                                props.profile.avatar === ""
                                    ? require("../assets/me.png")
                                    : //: { uri: `${baseUrl}${userData.avatar}` }
                                      { uri: props.profile.avatar }
                            }
                        />
                        <Text
                            style={styles.headerText}
                            onPress={() => {
                                props.navigation.navigate({
                                    routeName: "MyData",
                                });
                            }}
                        >
                            {/* {props.username} */}
                            {props.profile.name}
                        </Text>
                        <Text
                            style={styles.headerText}
                            onPress={() =>
                                props.navigation.navigate({
                                    routeName: "MyData",
                                })
                            }
                        >
                            {/* {props.usermobile} */}
                            {props.profile.mobile}
                        </Text>
                    </>
                ) : (
                    <>
                        <Image
                            style={styles.drawerImage}
                            source={require("../assets/me.png")}
                        />
                        <Text
                            style={styles.headerText}
                            onPress={() =>
                                props.navigation.navigate({
                                    routeName: "Login",
                                })
                            }
                        >
                            {msg}
                        </Text>
                    </>
                )}
            </Body>
        </Header>
    );
}

const mapStateToProps = (state) => {
    return {
        //baseUrl: state.loginReducer.baseUrl,
        //user: state.MembershipReducer,
        //user: { uid: "fdjghdfjkghsfj" },
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        loggedIn: state.auth.loggedIn,
        // loggedIn: state.loginReducer.loggedIn,
        // username: state.loginReducer.userData.name,
        // usermobile: state.loginReducer.userData.mobile,
        // useravatar: state.loginReducer.userData.avatar
    };
};

const UserData = connect(mapStateToProps)(User);

const styles = StyleSheet.create({
    headerText: {
        color: "#fff",
        textAlign: "center",
        //marginLeft: 80,
        fontSize: 15,
    },
    drawerHeader: {
        height: 120,
        backgroundColor: "#4054b2",
    },
    drawerImage: {
        position: "absolute",
        borderColor: "#fff",
        borderWidth: 1,
        left: 0,
        //top: 0,
        height: 65,
        width: 65,
        borderRadius: 75,
        //marginTop: 50
        //marginBottom: 10
    },
    headerText: {
        color: "#fff",
        textAlign: "center",
        //marginLeft: 80,
        fontSize: 15,
    },
});

export default UserData;
