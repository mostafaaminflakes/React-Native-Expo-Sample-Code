import Firebase, { db } from "../../firestore/FirestoreInit";

// define types

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";

export const updateEmail = (email) => {
    return {
        type: UPDATE_EMAIL,
        payload: email,
    };
};

export const updatePassword = (password) => {
    return {
        type: UPDATE_PASSWORD,
        payload: password,
    };
};

export const login = () => {
    return async (dispatch, getState) => {
        //console.log(getState());
        try {
            const { email, password } = getState().MembershipReducer;
            const response = await Firebase.auth().signInWithEmailAndPassword(
                email,
                password
            );
            dispatch(getUser(response.user.uid));
            //console.log(getState().MembershipReducer);
            //console.log(getState().MembershipReducer.user);
        } catch (e) {
            console.log(e);
        }
    };
};

export const getUser = (uid) => {
    return async (dispatch, getState) => {
        try {
            const user = await db.collection("users").doc(uid).get();
            //console.log(user.data());
            dispatch({ type: LOGIN, payload: user.data() });
        } catch (e) {
            alert(e);
        }
    };
};

export const logout = () => {
    return async (dispatch, getState) => {
        //console.log(getState());
        try {
            await Firebase.auth().signOut();
            //const { uid } = getState().MembershipReducer;
            dispatch({ type: LOGOUT });
            //console.log(getState());
        } catch (e) {
            console.log(e);
        }
    };
};

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().MembershipReducer;
            const response = await Firebase.auth().createUserWithEmailAndPassword(
                email,
                password
            );
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email,
                };

                db.collection("users").doc(response.user.uid).set(user);

                dispatch({ type: SIGNUP, payload: user });
            }
        } catch (e) {
            console.log(e);
        }
    };
};
