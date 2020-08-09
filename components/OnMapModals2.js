import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Platform,
    Modal,
    TouchableOpacity,
    Image,
    Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class OnMapModals2 extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            isModalVisible: false
        };
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        //console.log(this.props);
        //console.log(this.props.state);
        return (
            <>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    //onPress={() => Alert.alert("Open Modal")}
                    //onPress={this.props.handleModalToggle}
                    onPress={this.toggleModal}
                >
                    <Image
                        source={require("../assets/icon2.png")}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 15
                        }}
                    />
                    <Text>فحص السيارة</Text>
                </TouchableOpacity>
                <Modal
                    //visible={this.props.state.isModalVisible}
                    visible={this.state.isModalVisible}
                    transparent={false}
                    animationType={"slide"}
                    style={{ margin: 20 }}
                >
                    <View style={styles.filterbars}>
                        <Ionicons
                            name="ios-close-circle-outline"
                            size={35}
                            color="black"
                            onPress={this.toggleModal}
                        />
                        <Text
                            style={{
                                fontSize: 30,
                                textAlign: "center",
                                marginBottom: 20
                            }}
                        >
                            فحص السيارة
                        </Text>
                        <View style={styles.barcontent}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row"
                                }}
                            >
                                <View
                                    style={{
                                        //flex: 1,
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "left"
                                        }}
                                        onPress={
                                            () => {
                                                this.toggleModal();
                                                this.props.navigation.navigate(
                                                    "Login"
                                                );
                                            }
                                            //Alert.alert("Order Now!")
                                        }
                                    >
                                        اطلب الآن
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        فحص ميكانيكا 100 ريال
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.barcontent}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row"
                                }}
                            >
                                <View
                                    style={{
                                        //flex: 1,
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "left"
                                        }}
                                        onPress={
                                            () => {
                                                this.toggleModal();
                                                this.props.navigation.navigate(
                                                    "Login"
                                                );
                                            }
                                            //Alert.alert("Order Now!")
                                        }
                                    >
                                        اطلب الآن
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        فحص كمبيوتر 150 ريال
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.barcontent}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row"
                                }}
                            >
                                <View
                                    style={{
                                        //flex: 1,
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "left"
                                        }}
                                        onPress={
                                            () => {
                                                this.toggleModal();
                                                this.props.navigation.navigate(
                                                    "Login"
                                                );
                                            }
                                            //Alert.alert("Order Now!")
                                        }
                                    >
                                        اطلب الآن
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        فحص كهرباء 100 ريال
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
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
        flexDirection: "column"
    },
    filterbars: {
        position: "relative",
        width: "100%",
        padding: 20
        //backgroundColor: "#fff",
        //marginTop: 70
    },
    barcontent: {
        backgroundColor: "white",
        height: 50,
        //width: "90%",
        //alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#999",
        marginBottom: 5,
        justifyContent: "center"
    }
});

export { OnMapModals2 };
