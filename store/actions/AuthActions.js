import * as Actions from "./ActionTypes";

export const signIn = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        await firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                //console.log(getState());
                dispatch({
                    type: Actions.SIGNIN_SUCCESS,
                    payload: credentials,
                });
            })
            .catch((err) => {
                dispatch({ type: Actions.SIGNIN_ERROR, err });
            });
        //console.log(getState());
    };
};

export const signOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        await firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: Actions.SIGNOUT_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: Actions.SIGNOUT_ERROR, err });
            });
    };
};

export const updateProfile = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const { email, password } = getState().auth.credentials;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
        );

        await user
            .reauthenticateWithCredential(credential)
            .then((userCredential) => {
                // User successfully re-authenticated and does not require a second factor challenge.
                // Main firebase
                user.updateEmail(credentials.email);
                // [Users] collection
                firebase.updateProfile({
                    name: credentials.name,
                    email: credentials.email,
                    mobile: credentials.mobile,
                });
                dispatch({ type: Actions.UPDATE_PROFILE });
            });
    };
};

export const updatePassword = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const { email, password } = getState().auth.credentials;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
        );
        await user
            .reauthenticateWithCredential(credential)
            .then((userCredential) => {
                // User successfully re-authenticated and does not require a second factor challenge.
                // Main firebase
                user.updatePassword(credentials.password).then(() => {
                    //console.log(credentials.password);
                    dispatch({
                        type: Actions.UPDATE_PASSWORD,
                        payload: credentials.password,
                    });
                });
            });
        //console.log(getState().auth.credentials);
    };
};

export const updateAvatar = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const { email, password } = getState().auth.credentials;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
        );

        await user
            .reauthenticateWithCredential(credential)
            .then((userCredential) => {
                // User successfully re-authenticated and does not require a second factor challenge.
                // Main firebase
                //user.updateEmail(credentials.email);
                // [Users] collection
                firebase.updateProfile({
                    avatar: credentials.avatar,
                });
                dispatch({ type: Actions.UPDATE_AVATAR });
            });
    };
};

export const registerUser = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        await firebase
            .auth()
            .createUserWithEmailAndPassword(
                credentials.email,
                credentials.password
            )
            .then(() => {
                const user = firebase.auth().currentUser;
                //console.log(user.uid);
                //firebase.updateProfile({
                const userObject = {
                    name: credentials.name,
                    email: credentials.email,
                    mobile: credentials.mobile,
                    uid: user.uid,
                    avatar: "",
                };

                firebase
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .set(userObject);

                dispatch({
                    type: Actions.SIGNIN_SUCCESS,
                    payload: {
                        email: credentials.email,
                        password: credentials.password,
                    },
                });
            })
            .catch((err) => {
                //dispatch({ type: Actions.SIGNIN_ERROR, err });
            });
    };
};
