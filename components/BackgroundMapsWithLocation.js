import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { saveLocation } from "../store/actions/AppActions";
import { connect } from "react-redux";

class BackgroundMapsWithLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            errorMessage: null,
            mapType: "standard",
            userLocationPriority: "high",
        };
    }

    componentDidMount() {
        //const { navigation } = this.props;
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== "granted") {
            Alert.alert("Permission to access location was denied");
            this.setState({
                errorMessage: "Permission to access location was denied",
            });
        }

        try {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ location });
        } catch (err) {
            console.log("err is: ", err);
            Alert.alert("Could not fetch location");
        }
    };

    // _mapReady = () => {
    //     console.log("map ready");
    // };

    render() {
        const { height, width } = Dimensions.get("window");
        //const LONGITUDE_DELTA = 0.0922 * (width / height);
        let mpv = <Text>جار التحميل</Text>;

        if (Object.keys(this.state.location).length != 0) {
            //console.log(this.state);
            const lat = this.state.location.coords.latitude;
            const lng = this.state.location.coords.longitude;
            //console.log(lat, lng);

            //save location to redux ---------------------------
            this.props.saveLocation(lat, lng);

            //console.log(lat);
            //console.log(lng);
            // Calculate dummy vertical point below real point with distance 1.5 KM
            const dy = -1000;
            //const dx = 1000;
            lat1 = lat + (180 / Math.PI) * (dy / 6378137);
            //lng1 = lng + ((180 / Math.PI) * (dx / 6378137)) / Math.cos(lat);
            //console.log(lat1);
            //console.log(lng1);

            const initial = {
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0022, //0.0922,
                longitudeDelta: 0.0321, //0.0421
            };

            mpv = (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={initial}
                        zoomControlEnabled={true}
                        style={styles.mapStyle}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        showsCompass={true}
                        mapType={this.state.mapType}
                        userLocationPriority={this.state.userLocationPriority}
                        //onMapReady={() => this._mapReady()}
                        ref={(ref) => {
                            this.mapRef = ref;
                        }}
                        onLayout={() =>
                            this.mapRef.animateCamera({
                                center: {
                                    latitude: lat1, //24.7652731, //65
                                    longitude: lng, //46.6144085 //14
                                },
                                //heading: 180,
                                //zoom: 15,
                                altitude: 200,
                                pitch: 2,
                            })
                        }
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: lat,
                                longitude: lng,
                            }}
                            title={"Marker Title"}
                            description={"Marker Description Text"}
                            identifier="abc"
                        ></MapView.Marker>
                    </MapView>
                </View>
            );
        }

        return <View style={styles.container}>{mpv}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 80,
    },
});

const mapStateToProps = (state) => {
    return {
        lat: state.app.lat,
        lng: state.app.lng,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveLocation: (lat, lng) => dispatch(saveLocation(lat, lng)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BackgroundMapsWithLocation);
