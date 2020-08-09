import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Image,
    Dimensions,
    StyleSheet,
    Alert
} from "react-native";
import { connect } from "react-redux";

const { width } = Dimensions.get("window");

class SwipeViewer extends React.Component {
    state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        xTabThree: 0,
        xTabFour: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateXTabThree: new Animated.Value(width),
        translateXTabFour: new Animated.Value(width),
        translateY: -1000
    };

    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            xTabThree,
            xTabFour,
            translateX,
            translateXTabOne,
            translateXTabTwo,
            translateXTabThree,
            translateXTabFour
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabThree, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabFour, {
                    toValue: -width,
                    duration: 100
                }).start()
            ]);
        } else if (active === 1) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabThree, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabFour, {
                    toValue: -width,
                    duration: 100
                }).start()
            ]);
        } else if (active === 2) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabThree, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabFour, {
                    toValue: -width,
                    duration: 100
                }).start()
            ]);
        } else if (active === 3) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabThree, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabFour, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
        //  else {
        //     Animated.parallel([
        //         Animated.spring(translateXTabOne, {
        //             toValue: -width,
        //             duration: 100
        //         }).start(),
        //         Animated.spring(translateXTabTwo, {
        //             toValue: 0,
        //             duration: 100
        //         }).start(),
        //         Animated.spring(translateXTabThree, {
        //             toValue: 0,
        //             duration: 100
        //         }).start(),
        //         Animated.spring(translateXTabFour, {
        //             toValue: 0,
        //             duration: 100
        //         }).start()
        //     ]);
        // }
    };

    render() {
        let {
            active,
            xTabOne,
            xTabTwo,
            xTabThree,
            xTabFour,
            translateX,
            translateXTabOne,
            translateXTabTwo,
            translateXTabThree,
            translateXTabFour,
            translateY
        } = this.state;

        return (
            <View style={styles.filterbarsContainer}>
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                        // backgroundColor: "red",
                        height: 300
                    }}
                >
                    <View
                        style={{
                            //backgroundColor: "green",
                            width: "100%"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                //marginTop: 5,
                                //marginBottom: 20,
                                height: 95, // height of tab
                                //backgroundColor: "#000",
                                position: "relative"
                            }}
                        >
                            <Animated.View
                                style={{
                                    position: "absolute",
                                    width: "25%",
                                    height: "100%",
                                    top: 0,
                                    left: 0,
                                    backgroundColor: "#007aff",
                                    borderRadius: 4,
                                    transform: [
                                        {
                                            translateX
                                        }
                                    ]
                                }}
                            />
                            {/* <!-- 1 --> */}
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                    // borderWidth: 3,
                                    // borderColor: "red", //"#007aff",
                                    // borderRadius: 4,
                                    // borderRightWidth: 0,
                                    // borderTopRightRadius: 0,
                                    // borderBottomRightRadius: 0
                                }}
                                onLayout={event =>
                                    this.setState({
                                        xTabOne: event.nativeEvent.layout.x
                                    })
                                }
                                onPress={() =>
                                    this.setState({ active: 0 }, () =>
                                        this.handleSlide(xTabOne)
                                    )
                                }
                            >
                                <Image
                                    source={require("../assets/icon1.png")}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 15
                                    }}
                                />
                                <Text
                                    style={{
                                        color: active === 0 ? "#fff" : "#666" //"#007aff"
                                    }}
                                >
                                    بنشر كفر
                                </Text>
                            </TouchableOpacity>
                            {/* <!-- 2 --> */}
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                    // borderWidth: 3,
                                    // borderColor: "black", //"#007aff",
                                    // borderRadius: 4,
                                    // borderLeftWidth: 0,
                                    // borderTopLeftRadius: 0,
                                    // borderBottomLeftRadius: 0
                                }}
                                onLayout={event =>
                                    this.setState({
                                        xTabTwo: event.nativeEvent.layout.x
                                    })
                                }
                                onPress={() =>
                                    this.setState({ active: 1 }, () =>
                                        this.handleSlide(xTabTwo)
                                    )
                                }
                            >
                                <Image
                                    source={require("../assets/icon2.png")}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 15
                                    }}
                                />
                                <Text
                                    style={{
                                        color: active === 1 ? "#fff" : "#666" //"#007aff"
                                    }}
                                >
                                    فحص السيارة
                                </Text>
                            </TouchableOpacity>
                            {/* <!-- 3 --> */}
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                    // borderWidth: 1,
                                    // borderColor: "#007aff",
                                    // borderRadius: 4,
                                    // borderLeftWidth: 0,
                                    // borderTopLeftRadius: 0,
                                    // borderBottomLeftRadius: 0
                                }}
                                onLayout={event =>
                                    this.setState({
                                        xTabThree: event.nativeEvent.layout.x
                                    })
                                }
                                onPress={() =>
                                    this.setState({ active: 2 }, () =>
                                        this.handleSlide(xTabThree)
                                    )
                                }
                            >
                                <Image
                                    source={require("../assets/icon3.png")}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 15
                                    }}
                                />
                                <Text
                                    style={{
                                        color: active === 2 ? "#fff" : "#666" //"#007aff"
                                    }}
                                >
                                    سطحة
                                </Text>
                            </TouchableOpacity>
                            {/* <!-- 4 --> */}
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                    //borderWidth: 1,
                                    //borderColor: "#007aff",
                                    //borderRadius: 4,
                                    //borderLeftWidth: 0,
                                    //borderTopLeftRadius: 0,
                                    //borderBottomLeftRadius: 0
                                }}
                                onLayout={event =>
                                    this.setState({
                                        xTabFour: event.nativeEvent.layout.x
                                    })
                                }
                                onPress={() =>
                                    this.setState({ active: 3 }, () =>
                                        this.handleSlide(xTabFour)
                                    )
                                }
                            >
                                <Image
                                    source={require("../assets/icon4.png")}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 15
                                    }}
                                />
                                <Text
                                    style={{
                                        color: active === 3 ? "#fff" : "#666" //"#007aff"
                                    }}
                                >
                                    تعبئة وقود
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            {/* <!-- 1 --> */}
                            <Animated.View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    transform: [
                                        {
                                            translateX: translateXTabOne
                                        }
                                    ]
                                }}
                                onLayout={event => {
                                    this.setState({
                                        translateY:
                                            event.nativeEvent.layout.height
                                    });
                                    // console.log("----------");
                                    // console.log(event.nativeEvent.layout.height);
                                    // console.log(this.state.translateY);
                                    // console.log(translateY);
                                }}
                            >
                                <View style={styles.filterbars}>
                                    <View style={styles.barcontent}>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: "row"
                                            }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text
                                                    style={{
                                                        textAlign: "left"
                                                    }}
                                                    onPress={() =>
                                                        Alert.alert(
                                                            "Order Now!"
                                                        )
                                                    }
                                                >
                                                    اطلب الآن
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text
                                                    style={{
                                                        textAlign: "right"
                                                    }}
                                                >
                                                    تغيير الكفر عند البنشر 90
                                                    ريال
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>تغيير الاحتياطي 40 ريال</Text>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>إصلاح الكفر 45 ريال</Text>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>نفخ الكفر 30 ريال</Text>
                                    </View>
                                </View>
                            </Animated.View>

                            {/* <!-- 2 --> */}
                            <Animated.View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    //backgroundColor: "red",
                                    transform: [
                                        {
                                            translateX: translateXTabTwo
                                        },
                                        {
                                            translateY: -translateY
                                        }
                                    ]
                                }}
                            >
                                <View style={styles.filterbars}>
                                    <View style={styles.barcontent}>
                                        <Text>فحص ميكانيكا 100 ريال</Text>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>فحص كمبيوتر 150 ريال</Text>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>فحص كهرباء 100 ريال</Text>
                                    </View>
                                </View>
                            </Animated.View>

                            {/* <!-- 3 --> */}
                            <Animated.View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    //backgroundColor: "red",
                                    transform: [
                                        {
                                            translateX: translateXTabThree
                                        },
                                        {
                                            translateY: -translateY * 2 + 45
                                        }
                                    ]
                                }}
                            >
                                <View style={styles.filterbars}>
                                    <View style={styles.barcontent}>
                                        <Text>هيدروليك تبدأ من 160 ريال</Text>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>عادية تبدأ من 80 ريال</Text>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>ونش يبدأ من 170 ريال</Text>
                                    </View>
                                </View>
                            </Animated.View>

                            {/* <!-- 4 --> */}
                            <Animated.View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    //backgroundColor: "red",
                                    transform: [
                                        {
                                            translateX: translateXTabFour
                                        },
                                        {
                                            translateY: -translateY * 3 + 90
                                        }
                                    ]
                                }}
                            >
                                <View style={styles.filterbars}>
                                    <View style={styles.barcontent}>
                                        <Text>
                                            تغيير الكفر عند البنشر 60 ريال
                                        </Text>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>تغيير الاحتياطي 40 ريال</Text>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>إصلاح الكفر 45 ريال</Text>
                                    </View>
                                    <View style={styles.barcontent}>
                                        <Text>نفخ الكفر 30 ريال</Text>
                                    </View>
                                </View>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // filterbars1: {
    //     position: "absolute",
    //     bottom: 10,
    //     height: 200,
    //     width: "90%",
    //     margin: 10,
    //     alignItems: "center",
    //     justifyContent: "flex-end",
    //     flexDirection: "column",
    //     backgroundColor: "green"
    // },
    filterbarsContainer: {
        position: "absolute",
        bottom: 10,
        height: 280,
        width: "90%",
        margin: 10,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "column"
    },
    filterbars: {
        position: "relative",
        width: "100%"
    },
    barcontent: {
        backgroundColor: "white",
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: "#999",
        marginTop: 5,
        justifyContent: "center"
    }
});

const mapStateToProps = state => {
    return {
        loggedIn: state.loginReducer.loggedIn,
        token: state.loginReducer.token,
        userData: state.loginReducer.userData
    };
};

export default connect(mapStateToProps)(SwipeViewer);
