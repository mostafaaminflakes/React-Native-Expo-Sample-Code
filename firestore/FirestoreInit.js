import FirebaseConfig from "./FirestoreConfig";
import firebase from "firebase";
import "firebase/firestore";

// Just a fix for [can't find variable: crypto and atob]
import { decode, encode } from "base-64";

global.crypto = require("firebase/firestore");
global.crypto.getRandomValues = (byteArray) => {
    for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = Math.floor(256 * Math.random());
    }
};
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}
// End fix

let Firebase;
if (!firebase.apps.length) {
    //Firebase = firebase.initializeApp(FirebaseConfig);
    firebase.initializeApp(FirebaseConfig);
} else {
    console.log("Firebase apps already running...");
}

export const db = firebase.firestore();
//firebase.initializeApp(FirebaseConfig);
//firebase.firestore();

export default firebase;
