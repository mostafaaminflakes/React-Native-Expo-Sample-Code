import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    Button,
    Text,
    View,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
} from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
//import * as firebase from "firebase";
import { connect } from "react-redux";
import firebase, { db } from "../firestore/FirestoreInit";
import { updateAvatar } from "../store/actions/AuthActions";

class ImageUploadScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: " صورة الملف الشخصي ",
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

    state = {
        avatar: null,
        uploading: false,
    };

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <ActivityIndicator
                    color="#C00"
                    size="large"
                    style={{ height: 50 }}
                />
            );
        }
    };

    _takePhoto = async () => {
        const { status: cameraPerm } = await Permissions.askAsync(
            Permissions.CAMERA
        );

        const { status: cameraRollPerm } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === "granted" && cameraRollPerm === "granted") {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            this._handleImagePicked(pickerResult);
        }
    };

    _pickImage = async () => {
        const { status: cameraRollPerm } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        // only if user allows permission to camera roll
        if (cameraRollPerm === "granted") {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                aspect: [4, 3],
            });

            this._handleImagePicked(pickerResult);
        }
    };

    _handleImagePicked = async (pickerResult) => {
        //let result = await ImagePicker.launchCameraAsync();
        //let result = await ImagePicker.launchImageLibraryAsync();

        try {
            this.setState({
                uploading: true,
            });
            if (!pickerResult.cancelled) {
                // START CORRECT 1 *****************************************
                // const response = await fetch(pickerResult.uri);
                // const blob = await response.blob();
                // const ref = firebase
                //     .storage()
                //     .ref()
                //     .child("avatars/" + this.props.profile.uid);
                // ref.put(blob)
                //     .then(async (snapshot) => {
                //         await snapshot.ref
                //             .getDownloadURL()
                //             .then((downloadURL) => {
                //                 //console.log(downloadURL);
                //                 this.setState({
                //                     avatar: downloadURL,
                //                 });
                //             });
                //     })
                //     .then(() => {
                //         //console.log(this.state);
                //         this.props.updateAvatar(this.state);
                //     })
                //     .catch((error) => {
                //         Alert.alert(error);
                //     });
                // END CORRECT 1 *****************************************

                // START CORRECT 2 *****************************************
                await this.uploadImage(pickerResult.uri, this.props.profile.uid)
                    .then(() => {
                        //Alert.alert("Success");
                        this.props.updateAvatar(this.state);
                    })
                    .catch((error) => {
                        Alert.alert(error);
                    });
                // END CORRECT 2 *****************************************
            }
        } catch (e) {
            //console.log({ uploadResponse });
            //console.log({ uploadResult });
            //console.log({ e });
            alert("Upload failed, sorry :(");
        } finally {
            this.setState({
                uploading: false,
            });
        }
    };

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase
            .storage()
            .ref()
            .child("avatars/" + imageName);

        let uploadTask = await ref.put(blob).then(async (snapshot) => {
            await snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.setState({
                    avatar: downloadURL,
                });
            });
        });

        return uploadTask;
    };

    render() {
        //console.log(this.props.profile);
        return (
            <View style={styles.container}>
                <Image
                    style={styles.userImage}
                    source={
                        this.props.profile.avatar === ""
                            ? require("../assets/me.png")
                            : { uri: this.props.profile.avatar }
                    }
                />
                {/* <Button onPress={this._takePhoto} title="من الكاميرا" />
                <Button onPress={this._pickImage} title="من الاستديو" /> */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        style={[styles.submitButton, { width: "30%" }]}
                        onPress={this._takePhoto}
                    >
                        <Text style={styles.submitButtonText}>
                            {" "}
                            من الكاميرا{" "}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.submitButton, { width: "30%" }]}
                        onPress={this._pickImage}
                    >
                        <Text style={styles.submitButtonText}>
                            {" "}
                            من الاستديو{" "}
                        </Text>
                    </TouchableOpacity>
                </View>
                {this._maybeRenderUploadingOverlay()}
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text style={styles.submitButtonText}> تم </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        { backgroundColor: "#bb1d1d" },
                    ]}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text style={styles.submitButtonText}>إلغاء</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50, alignItems: "center" },
    maybeRenderUploading: {
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
    },
    userImage: {
        height: 95,
        width: 95,
        borderRadius: 75,
        //marginTop: 50
        marginBottom: 20,
        borderColor: "#999",
        borderWidth: 3,
    },
    submitButton: {
        width: "90%",
        backgroundColor: "#4054b2",
        padding: 15,
        margin: 15,
        alignItems: "center",
        height: 50,
        borderRadius: 30,
    },
    submitButtonText: {
        color: "white",
    },
});

const mapStateToProps = (state) => ({
    //baseUrl: state.loginReducer.baseUrl,
    profile: state.firebase.profile,
    loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
    return {
        updateAvatar: (credentials) => dispatch(updateAvatar(credentials)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploadScreen);
//****************************************************************** */
//****************************************************************** */
//****************************************************************** */
// import React from "react";
// import { Image, StyleSheet, Button, Text, View, Alert } from "react-native";
// //import { ImagePicker } from "expo";
// import * as ImagePicker from "expo-image-picker";
// import * as firebase from "firebase";

// export default class HomeScreen extends React.Component {
//     static navigationOptions = {
//         header: null,
//     };

//     onChooseImagePress = async () => {
//         let result = await ImagePicker.launchCameraAsync();
//         //let result = await ImagePicker.launchImageLibraryAsync();

//         if (!result.cancelled) {
//             this.uploadImage(result.uri, "test-image")
//                 .then(() => {
//                     Alert.alert("Success");
//                 })
//                 .catch((error) => {
//                     Alert.alert(error);
//                 });
//         }
//     };

//     uploadImage = async (uri, imageName) => {
//         const response = await fetch(uri);
//         const blob = await response.blob();

//         var ref = firebase
//             .storage()
//             .ref()
//             .child("images/" + imageName);
//         return ref.put(blob);
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Button
//                     title="Choose image..."
//                     onPress={this.onChooseImagePress}
//                 />
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, paddingTop: 50, alignItems: "center" },
// });
//****************************************************************** */
//****************************************************************** */
//****************************************************************** */
// import React, { Component } from "react";
// import {
//     ActivityIndicator,
//     Button,
//     Clipboard,
//     Image,
//     Share,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { Constants } from "expo";
// import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";

// export default class ImageUploadScreen extends Component {
//     state = {
//         image: null,
//         uploading: false,
//     };

//     render() {
//         let { image } = this.state;

//         return (
//             <View style={styles.container}>
//                 <StatusBar barStyle="default" />

//                 <Text style={styles.exampleText}>
//                     Example: Upload ImagePicker result
//                 </Text>

//                 <Button
//                     onPress={this._pickImage}
//                     title="Pick an image from camera roll"
//                 />

//                 <Button onPress={this._takePhoto} title="Take a photo" />

//                 {this._maybeRenderImage()}
//                 {this._maybeRenderUploadingOverlay()}
//             </View>
//         );
//     }

//     _maybeRenderUploadingOverlay = () => {
//         if (this.state.uploading) {
//             return (
//                 <View
//                     style={[
//                         StyleSheet.absoluteFill,
//                         styles.maybeRenderUploading,
//                     ]}
//                 >
//                     <ActivityIndicator color="#fff" size="large" />
//                 </View>
//             );
//         }
//     };

//     _maybeRenderImage = () => {
//         let { image } = this.state;

//         if (!image) {
//             return;
//         }

//         return (
//             <View style={styles.maybeRenderContainer}>
//                 <View style={styles.maybeRenderImageContainer}>
//                     <Image
//                         source={{ uri: image }}
//                         style={styles.maybeRenderImage}
//                     />
//                 </View>

//                 <Text
//                     //onPress={this._copyToClipboard}
//                     //onLongPress={this._share}
//                     style={styles.maybeRenderImageText}
//                 >
//                     {image}
//                 </Text>
//             </View>
//         );
//     };

//     // _share = () => {
//     //     Share.share({
//     //         message: this.state.image,
//     //         title: "Check out this photo",
//     //         url: this.state.image
//     //     });
//     // };

//     // _copyToClipboard = () => {
//     //     Clipboard.setString(this.state.image);
//     //     alert("Copied image URL to clipboard");
//     // };

//     _takePhoto = async () => {
//         const { status: cameraPerm } = await Permissions.askAsync(
//             Permissions.CAMERA
//         );

//         const { status: cameraRollPerm } = await Permissions.askAsync(
//             Permissions.CAMERA_ROLL
//         );

//         // only if user allows permission to camera AND camera roll
//         if (cameraPerm === "granted" && cameraRollPerm === "granted") {
//             let pickerResult = await ImagePicker.launchCameraAsync({
//                 allowsEditing: true,
//                 aspect: [4, 3],
//             });

//             this._handleImagePicked(pickerResult);
//         }
//     };

//     _pickImage = async () => {
//         const { status: cameraRollPerm } = await Permissions.askAsync(
//             Permissions.CAMERA_ROLL
//         );

//         // only if user allows permission to camera roll
//         if (cameraRollPerm === "granted") {
//             let pickerResult = await ImagePicker.launchImageLibraryAsync({
//                 allowsEditing: false,
//                 aspect: [4, 3],
//             });

//             this._handleImagePicked(pickerResult);
//         }
//     };

//     _handleImagePicked = async (pickerResult) => {
//         let uploadResponse, uploadResult;

//         try {
//             this.setState({
//                 uploading: true,
//             });

//             if (!pickerResult.cancelled) {
//                 uploadResponse = await uploadImageAsync(pickerResult.uri);
//                 uploadResult = await uploadResponse.json();

//                 console.log(uploadResult.ipath);

//                 this.setState({
//                     //image: uploadResult.location
//                     image: uploadResult.ipath,
//                 });

//                 <View>
//                     <Image
//                         //  style={styles.tinyLogo}
//                         source={{
//                             uri: this.state.image,
//                         }}
//                     />
//                 </View>;
//             }
//         } catch (e) {
//             console.log({ uploadResponse });
//             console.log({ uploadResult });
//             console.log({ e });
//             alert("Upload failed, sorry :(");
//         } finally {
//             this.setState({
//                 uploading: false,
//             });
//         }
//     };
// }

// async function uploadImageAsync(uri) {
//     //let apiUrl = "https://file-upload-example-backend-dkhqoilqqn.now.sh/upload";
//     let apiUrl = "http://192.168.1.3/t/upload.php";

//     // Note:
//     // Uncomment this if you want to experiment with local server
//     //
//     // if (Constants.isDevice) {
//     //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
//     // } else {
//     //   apiUrl = `http://localhost:3000/upload`
//     // }

//     let uriParts = uri.split(".");
//     let fileType = uriParts[uriParts.length - 1];

//     let formData = new FormData();
//     formData.append("photo", {
//         uri,
//         name: `photo.${fileType}`,
//         type: `image/${fileType}`,
//     });
//     console.log(formData);

//     let options = {
//         method: "POST",
//         body: formData,
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "multipart/form-data",
//         },
//     };

//     return fetch(apiUrl, options);
// }

// const styles = StyleSheet.create({
//     container: {
//         alignItems: "center",
//         flex: 1,
//         justifyContent: "center",
//     },
//     exampleText: {
//         fontSize: 20,
//         marginBottom: 20,
//         marginHorizontal: 15,
//         textAlign: "center",
//     },
//     maybeRenderUploading: {
//         alignItems: "center",
//         backgroundColor: "rgba(0,0,0,0.4)",
//         justifyContent: "center",
//     },
//     maybeRenderContainer: {
//         borderRadius: 3,
//         elevation: 2,
//         marginTop: 30,
//         shadowColor: "rgba(0,0,0,1)",
//         shadowOpacity: 0.2,
//         shadowOffset: {
//             height: 4,
//             width: 4,
//         },
//         shadowRadius: 5,
//         width: 250,
//     },
//     maybeRenderImageContainer: {
//         borderTopLeftRadius: 3,
//         borderTopRightRadius: 3,
//         overflow: "hidden",
//     },
//     maybeRenderImage: {
//         height: 250,
//         width: 250,
//     },
//     maybeRenderImageText: {
//         paddingHorizontal: 10,
//         paddingVertical: 10,
//     },
// });
