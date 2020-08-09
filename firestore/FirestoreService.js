//import firebase from "firebase"; // 4.8.1
//import "firebase/firestore";
//import FirebaseConfig from "../FirebaseFirestore/FirestoreConfig";
import firebase from "../firestore/FirestoreInit";

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

class FirestoreService {
    #ParentCollection = "ChatRooms";
    #Reference;

    constructor() {
        //this.connect();
        //this.observeAuth();
    }

    connect = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(FirebaseConfig);
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

    createAccount = async (user) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(
                function () {
                    console.log(
                        "created user successfully. User email:" +
                            user.email +
                            " name:" +
                            user.name
                    );
                    var userf = firebase.auth().currentUser;
                    userf.updateProfile({ displayName: user.name }).then(
                        function () {
                            console.log(
                                "Updated displayName successfully. name:" +
                                    user.name
                            );
                            alert(
                                "User " +
                                    user.name +
                                    " was created successfully. Please login."
                            );
                        },
                        function (error) {
                            console.warn("Error update displayName.");
                        }
                    );
                },
                function (error) {
                    console.error(
                        "got error:" + typeof error + " string:" + error.message
                    );
                    alert("Create account failed. Error: " + error.message);
                }
            );
    };

    uploadImage = async (uri) => {
        console.log("got image to upload. uri:" + uri);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const ref = firebase.storage().ref("avatar").child(uuid.v4());
            const task = ref.put(blob);

            return new Promise((resolve, reject) => {
                task.on(
                    "state_changed",
                    () => {
                        /* noop but you can track the progress here */
                    },
                    reject /* this is where you would put an error callback! */,
                    () => resolve(task.snapshot.downloadURL)
                );
            });
        } catch (err) {
            console.log("uploadImage try/catch error: " + err.message); //Cannot load an empty url
        }
    };

    updateAvatar = (url) => {
        //await this.setState({ avatar: url });
        var userf = firebase.auth().currentUser;
        if (userf != null) {
            userf.updateProfile({ avatar: url }).then(
                function () {
                    console.log("Updated avatar successfully. url:" + url);
                    alert("Avatar image is saved successfully.");
                },
                function (error) {
                    console.warn("Error update avatar.");
                    alert("Error update avatar. Error:" + error.message);
                }
            );
        } else {
            console.log("can't update avatar, user is not login.");
            alert("Unable to update avatar. You must login first.");
        }
    };

    onLogout = (user) => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                console.log("Sign-out successful.");
            })
            .catch(function (error) {
                console.log("An error happened when signing out");
            });
    };

    get uid() {
        //console.log(firebase.auth());
        //console.log((firebase.auth().currentUser || {}).uid);
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.firestore().collection("messages");
    }

    parse = (message) => {
        const { createdAt, text, user } = message.data();
        const { id: _id } = message;
        //console.log(createdAt.toDate());
        //return { _id, createdAt: Date(createdAt), text, user };
        return { _id, createdAt: createdAt.toDate(), text, user };
        //const { timestamp: numberStamp, text, user } = snapshot;
        //const { key: _id } = snapshot;
        //const timestamp = new Date(numberStamp);
        // const message = {
        //     _id,
        //     timestamp,
        //     text,
        //     user
        // };
        // //console.log(message);
        // return message;
    };

    //on = () => {};
    on = (callback) => {
        //this.unsubscribe = this.ref
        this.unsubscribe = this.#Reference
            .orderBy("createdAt", "asc")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        callback(this.parse(change.doc));
                    }
                    // if (change.type === "modified") {
                    //     //console.log("Modified city: ", change.doc.data());
                    //     // val = change.doc.data();
                    //     callback(() => this.parse(change.doc.data()));
                    // }
                    // if (change.type === "removed") {
                    //     //console.log("Removed city: ", change.doc.data());
                    //     callback(() => this.parse(change.doc.data()));
                    // }
                });
                //console.log("Metadata Changes", snapshot.docChanges());
                //callback(this.parse(snapshot.docChanges()));
                //callback(this.parse(val));
            });
    };

    // get timestamp() {
    //     return firebase.firestore.FieldValue.serverTimestamp();
    // }

    // send the message to the Backend
    send = (messages) => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                createdAt: new Date(),
                //timestamp: this.timestamp
            };
            this.append(message);
        }
    };

    //append = message => this.ref.push(message);
    //append = (message) => this.ref.add(message);
    append = (message) => this.#Reference.add(message);
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // });

    off() {
        //FirestoreService.ref.off();
        //unsubscribe();
        //this.ref.off();
        this.unsubscribe();
    }

    // User specific functions
    createRoomMetadataIfNotExists = (SenderUID1, ReceiverUID2) => {
        //let cityRef = db.collection("cities").doc("SF");
        let roomName = this.createRoomName(SenderUID1, ReceiverUID2);
        let chatRoomRef = firebase
            .firestore()
            .collection(this.#ParentCollection);
        //let chatRoomRef = reference;
        let getDoc = chatRoomRef
            .doc(roomName)
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    //console.log("No such document!");
                    // Add metadata
                    chatRoomRef.doc(roomName).set({
                        sender: SenderUID1,
                        receiver: ReceiverUID2,
                    });
                } else {
                    //console.log("Document data:", doc.data());
                    //Parse doc contents...
                }
                // add message
                //chatRoomRef.doc(roomName).collection("Messages").add(message);
            })
            .catch((err) => {
                console.log("Error getting document", err);
            });

        this.#Reference = chatRoomRef.doc(roomName).collection("Messages");
    };

    createRoomName = (userUID1, userUID2) => {
        // const user1 = "1qNODTJ1hwelwSBl5sT2ASU8wKn1"; // UID of user 1
        // const user2 = "JNivC3IPU0bBbYz45UtXAL08xWs2"; // UID of user 2
        // const user3 = "JNivC3IPU0bBbYz45UtXAL08xWs2"; // UID of user 3
        // const user4 = "1qNODTJ1hwelwSBl5sT2ASU8wKn1"; // UID of user 4

        const roomName =
            "chat_" +
            (userUID1 < userUID2
                ? userUID1 + "_" + userUID2
                : userUID2 + "_" + userUID1);

        return roomName;
        // const roomName2 =
        //     "chat_" +
        //     (user3 < user4 ? user3 + "_" + user4 : user4 + "_" + user3);

        //console.log(userUID1 + ", " + userUID2 + " => " + roomName);
        //console.log(user3 + ", " + user4 + " => " + roomName2);
    };
}

FirestoreService = new FirestoreService();
export default FirestoreService;
