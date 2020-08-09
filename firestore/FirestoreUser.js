import firebase from "firebase"; // 4.8.1
import "firebase/firestore";
import FirebaseConfig from "../firestore/FirestoreConfig";

class FirestoreUser {
    #DB;

    constructor() {
        this.connect();
        //this.observeAuth();
    }

    connect = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(FirebaseConfig);
            this.#DB = firebase.firestore;
        } else {
            console.log("Firebase apps already running...");
        }
    };

    login = async (user, success_callback, failed_callback) => {
        //console.log("logging in");
        const output = await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    };

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = (user) => {
        if (!user) {
            try {
                this.login(user);
                //console.log((firebase.auth().currentUser || {}).uid);
                //firebase.auth().signInAnonymously();
                //firebase.auth().signInWithEmailAndPassword(email, password);
            } catch ({ message }) {
                alert(message);
            }
        }
    };
}

FirestoreUser = new FirestoreUser();
export default FirestoreUser;
