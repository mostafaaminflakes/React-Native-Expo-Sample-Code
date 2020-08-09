import React from "react";

import MainNavigator from "./navigation/AppNavigator";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import store from "./store/CreateStore";
import rrfProps from "./firestore/FirestoreReduxLink";

export default function App() {
    //console.log(store.getState());
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <MainNavigator />
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}
