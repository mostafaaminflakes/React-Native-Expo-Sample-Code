// Redux
import { combineReducers } from "redux";

// Reducers
//import LoginReducer from "./reducers/LoginReducer";
//import MembershipReducer from "./reducers/MembershipReducer";
import AuthReducer from "./reducers/AuthReducer";
import AppReducer from "./reducers/AppReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const RootReducer = combineReducers({
    //MembershipReducer: MembershipReducer,
    //MembershipReducer,
    //loginReducer: LoginReducer,
    auth: AuthReducer,
    app: AppReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});

export default RootReducer;
