import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Image,
    Alert,
    ScrollView,
    YellowBox,
} from "react-native";
import _ from "lodash";
//import firebase from "./config/firebase";
import Colors from "../constants/Colors";
import { Card } from "react-native-shadow-cards";
import StarRating from "react-native-star-rating";
import RightButton from "../components/RightButton";
import firebase, { db } from "../firestore/FirestoreInit";
import { GeoFirestore } from "geofirestore";
import { connect } from "react-redux";

// Introducir varios puntos
// const lat = 37.462936;
// const lng = -5.964594;

// const lat1 = 24.79027; //1.71 KM - 1.06 Miles
// const lat2 = 24.783463; //2.29 KM - 1.43 Miles
// const lat3 = 24.748949; //3.07 KM - 1.91 Miles
// const lat4 = 24.83323; //6.33 KM - 3.94 Miles
// const lat5 = 24.790557; //10.5 KM - 6.53 Miles
// const lat6 = 24.6713; //14.1 KM - 8.76 Miles
// const lat7 = 24.666732; //21.1 KM - 13.11 Miles
// const lat8 = 24.542555; //30.34 KM - 18.85 Miles
// const lat9 = 24.967546; //22.68 KM - 14.09 Miles

// const lng1 = 46.621708;
// const lng2 = 46.635842;
// const lng3 = 46.617911;
// const lng4 = 46.610913;
// const lng5 = 46.717369;
// const lng6 = 46.692675;
// const lng7 = 46.784969;
// const lng8 = 46.769252;
// const lng9 = 46.692756;

// const uid1 = "1JWwwXebGoMWkfPjq1L5NBoaUOO2";
// const uid2 = "Cr63uLl8kEgQNhp3glQ7G7xxoXn2";
// const uid3 = "LNzV1Zxh4vdZ6m33IyaqarBEFRs1";
// const uid4 = "LO1qBUDvouhHkivs21hwDx1FkHk1";
// const uid5 = "xK1nIWaGTyMqByh97wva6XX8a172";
// const uid6 = "Jooi6SLylQeU4liwEsx67R80rpf2";
// const uid7 = "tTQWgresUva3MGY6LrV9d9ZwUKC3";
// const uid8 = "WBvYXz0G1uc2PPHf9andiN4u71w1";
// const uid9 = "3XctQxdOo4OIFlfj8vhqy6BxJcr2";

// Center
// const centerLat = 24.7763642;
// const centerLng = 46.6145054;

const radius = 25;

// [lat-lng] distance calculator
//https://www.geodatasource.com/distance-calculator

class FindServicePointsScreen extends Component {
    state = {
        points: [],
        isLoading: true,
    };

    constructor(props) {
        super(props);
        //console.log(this.props.lat);
        //onsole.log(this.props.lng);
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

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: " أقرب سيارة خدمة ",
            headerRight: () => <RightButton navigation={navigation} />,
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

    async createDocument() {
        const doc = {
            //name: "Mostafa2",
            //age: "39",
            rating: 4,
            type: 2,
            uid: uid9,
            coordinates: new firebase.firestore.GeoPoint(lat9, lng9),
        };
        const geofirestore = new GeoFirestore(firebase.firestore());
        const geocollection = geofirestore.collection("drivers");

        //await geocollection.add(doc).then(async (docRef) => {
        await geocollection
            .doc(uid9)
            .set(doc)
            .then(async (docRef) => {
                //console.log(docRef);
            });
    }

    readDocument() {
        const firestore = firebase.firestore();
        const geofirestore = new GeoFirestore(firestore);
        const geocollection = geofirestore.collection("drivers");

        geocollection
            .limit(50)
            .near({
                center: new firebase.firestore.GeoPoint(centerLat, centerLng),
                radius: radius,
            })
            .get()
            .then((querySnapshot) => {
                let users = [];

                for (let i = 0; i < querySnapshot.docs.length; i++) {
                    let { doc } = querySnapshot.docChanges()[i];
                    //console.log(doc.distance)
                    let user = {
                        ...querySnapshot.docs[i].data(),
                        distance: doc.distance,
                        id: querySnapshot.docs[i].id,
                    };
                    users.push(user);
                    //Alert.alert(JSON.stringify(users))
                }
                console.log(users);

                this.setState({ users: users });
            });
    }

    milesToKilometers = (distance) => {
        // self.searchDistance is a Double value
        return distance * 1.60934;
    };

    getDriverType = (type) => {
        return type == 1 ? "معتمد" : "متعاون";
    };

    // If there is any change in any document in the user collection, it breaks
    GetNearestServicePoints = () => {
        const firestore = firebase.firestore();
        const geofirestore = new GeoFirestore(firestore);
        const geocollection = geofirestore.collection("drivers");

        let query = geocollection.limit(5).near({
            center: new firebase.firestore.GeoPoint(
                this.props.lat,
                this.props.lng
            ),
            // Kilometers
            radius: radius,
        });

        //let p = this.state.points.slice();
        let prevState = this.state.points;
        //let p2 = [];
        let joined = null;

        // Get query (as Promise)
        query.get().then(async (snapshot) => {
            // All GeoDocument returned by GeoQuery, like the GeoDocument added above
            //console.log(snapshot.docs);
            if (snapshot.docs.length === 0) {
                //console.log("لا يتوفر سائقين في الوقت الحالي.");
                this.setState({ isLoading: false });
                return;
            } else {
                const sorted = snapshot.docs.sort(
                    (a, b) => a.distance - b.distance
                );

                //sorted.forEach(async (doc) => {
                await Promise.all(
                    sorted.map(async (doc) => {
                        //console.log(doc.data());
                        //console.log(doc.distance);
                        let name_avatar = await db
                            .collection("users")
                            .doc(doc.id)
                            .get()
                            .then((userDoc) => {
                                return {
                                    name: userDoc.data().name,
                                    avatar: userDoc.data().avatar,
                                };
                            });

                        let point = {
                            name: name_avatar.name,
                            avatar: name_avatar.avatar,
                            docID: doc.id,
                            rating: doc.data().rating,
                            type: this.getDriverType(doc.data().type),
                            distance: Math.round(doc.distance),
                        };

                        joined = prevState.push(point);
                        //console.log("joined1=", p2);
                    })
                );

                //console.log("joined2=", prevState);
                this.setState({ points: prevState, isLoading: false });
                //console.log(this.state);
            }
        });
        // .finally(() => {
        //     //this.setState({ isLoading: false });
        // });
    };

    componentDidMount() {
        this.GetNearestServicePoints();
    }

    render() {
        //console.log(this.state);
        const { navigation } = this.props;
        const orderType = navigation.getParam("orderType", "NO-ID");
        const ot = this.props.navigation.state.params.orderType;
        const { points, isLoading } = this.state;
        //console.log(orderType);
        //console.log(ot);
        //console.log(points);

        return (
            <ScrollView>
                {/* <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => this.createDocument()}>
                            <Text>Add Driver Point</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.GetNearestServicePoints()}
                        >
                            <Text> </Text>
                            <Text>query</Text>
                        </TouchableOpacity>
                        {this.state
                            ? this.state.points.map((point) => {
                                  return (
                                      <View key={point.id}>
                                          <Text>id: {point.id}</Text>
                                          <Text>
                                              distance: {point.distance}
                                          </Text>
                                      </View>
                                  );
                              })
                            : null}
                    </View>
                </ScrollView> */}
                <View style={styles.MainContainer}>
                    {isLoading ? (
                        <>
                            <Text style={{ fontSize: 23 }}> جار البحث </Text>
                            <ActivityIndicator
                                style={{ height: 300 }}
                                color="#C00"
                                size="large"
                            />
                        </>
                    ) : (
                        <>
                            {points.length <= 0 ? (
                                <Text style={{ fontSize: 23 }}>
                                    لا يتوفر سائقين في الوقت الحالي.
                                </Text>
                            ) : (
                                <>
                                    <Text style={{ fontSize: 23 }}>
                                        اختر سيارة خدمة
                                    </Text>
                                    {points.length > 0 &&
                                        points.map((driver) => (
                                            <TouchableOpacity
                                                key={driver.docID}
                                                onPress={() =>
                                                    navigation.navigate(
                                                        "Chat",
                                                        {
                                                            orderType: orderType,
                                                            receiver:
                                                                driver.docID,
                                                            receiverName:
                                                                driver.name,
                                                        }
                                                    )
                                                }
                                            >
                                                <Card
                                                    style={{
                                                        padding: 20,
                                                        margin: 10,
                                                    }}
                                                    //key={driver.docID}
                                                >
                                                    <Image
                                                        style={
                                                            styles.drawerImage
                                                        }
                                                        source={
                                                            driver.avatar === ""
                                                                ? require("../assets/me.png")
                                                                : {
                                                                      uri:
                                                                          driver.avatar,
                                                                  }
                                                        }
                                                    />
                                                    <View
                                                        style={{
                                                            marginRight: 85,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 20,
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {driver.name}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 20,
                                                            }}
                                                        >
                                                            {driver.type}
                                                        </Text>
                                                        <View
                                                            style={{
                                                                height: 30,
                                                            }}
                                                        >
                                                            <StarRating
                                                                disabled={true}
                                                                maxStars={5}
                                                                rating={parseInt(
                                                                    driver.rating
                                                                )}
                                                                fullStarColor={
                                                                    "#ffb300"
                                                                }
                                                                emptyStarColor={
                                                                    "#999"
                                                                }
                                                                reversed={true}
                                                                starSize={25}
                                                                containerStyle={{
                                                                    width:
                                                                        "50%",
                                                                    right: 0,
                                                                    position:
                                                                        "absolute",
                                                                    //backgroundColor: "#000"
                                                                }}
                                                                //rating={this.state.starCount}
                                                                // selectedStar={rating =>
                                                                //     this.onStarRatingPress(rating)
                                                                // }
                                                            />
                                                        </View>
                                                        <Text>
                                                            المسافة{" "}
                                                            {driver.distance} كم
                                                        </Text>
                                                    </View>
                                                </Card>
                                            </TouchableOpacity>
                                        ))}
                                    <TouchableOpacity
                                        style={styles.submitButton}
                                        onPress={() =>
                                            this.props.navigation.goBack()
                                        }
                                    >
                                        <Text style={styles.submitButtonText}>
                                            إلغاء الطلب
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
    },
    MainContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        justifyContent: "flex-start",
    },
    drawerImage: {
        position: "absolute",
        right: 20,
        top: "30%",
        height: 65,
        width: 65,
        //justifyContent: "center",
        borderRadius: 75,
        //marginTop: 50
        //marginBottom: 10
    },
    submitButton: {
        backgroundColor: "#bb1d1d",
        padding: 15,
        margin: 15,
        alignItems: "center",
        height: 50,
        width: "80%",
        borderRadius: 30,
    },
    submitButtonText: {
        color: "white",
    },
});

const mapStateToProps = (state) => {
    return {
        lat: state.app.lat,
        lng: state.app.lng,
    };
};

export default connect(mapStateToProps)(FindServicePointsScreen);
