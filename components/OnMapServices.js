import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    Modal,
} from "react-native";
import { OnMapModals1 } from "../components/OnMapModals1";
import { OnMapModals2 } from "../components/OnMapModals2";
import { OnMapModals3 } from "../components/OnMapModals3";
import { OnMapModals4 } from "../components/OnMapModals4";
import { OnMapModals5 } from "../components/OnMapModals5";
import { connect } from "react-redux";

class OnMapServices extends Component {
    render() {
        return (
            <View style={styles.filterbarsContainer}>
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                        backgroundColor: "rgba(52, 52, 52, 0.4)",
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor: "#333",
                        height: 300,
                        //opacity: 0.2
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            //marginTop: 5,
                            //marginBottom: 20,
                            height: 95, // height of tab
                            //backgroundColor: "#000",
                            position: "relative",
                        }}
                    >
                        {/* <!-- 1 --> */}
                        <OnMapModals1
                            navigation={this.props.navigation}
                            //state={this.state}
                            //handleModalToggle={this.toggleModal}
                        />
                        {/* <!-- 2 --> */}
                        <OnMapModals2 navigation={this.props.navigation} />
                        {/* <!-- 3 --> */}
                        <OnMapModals3 navigation={this.props.navigation} />
                        {/* <!-- 4 --> */}
                        <OnMapModals4 navigation={this.props.navigation} />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            //alignItems: "flex-end",
                            //marginTop: 5,
                            //marginBottom: 20,
                            height: 95, // height of tab
                            //backgroundColor: "#000",
                            position: "relative",
                        }}
                    >
                        {/* <!-- 5 --> */}
                        <OnMapModals5 navigation={this.props.navigation} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filterbarsContainer: {
        position: "absolute",
        bottom: 10,
        height: 200,
        width: "90%",
        margin: 10,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "column",
    },
});

const mapStateToProps = (state) => {
    return {
        // loggedIn: state.loginReducer.loggedIn,
        // token: state.loginReducer.token,
        // userData: state.loginReducer.userData
    };
};

export default connect(mapStateToProps)(OnMapServices);
