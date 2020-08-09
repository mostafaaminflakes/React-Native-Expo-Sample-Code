import { createFirestoreInstance } from "redux-firestore";
import firebase from "./FirestoreInit";
import store from "../store/CreateStore";

//const rrfConfig = {};
//const rrfConfig = { attachAuthIsReady: true };
// react-redux-firebase config
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore
};

export default rrfProps;
