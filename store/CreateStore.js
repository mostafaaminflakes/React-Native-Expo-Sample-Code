// Redux
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Enhancers
import { getFirebase } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";

// Reducer
import RootReducer from "./CreateRootReducer";

const middleware = applyMiddleware(
    compose(thunk.withExtraArgument({ getFirebase, getFirestore }))
);
// const middleware = applyMiddleware(
//     compose(
//         thunk.withExtraArgument({ getFirebase, getFirestore }),
//         reduxFirestore(FirebaseConfigObj),
//         reactReduxFirebase(FirebaseConfigObj, rrfConfig)
//     )
// );
const store = createStore(RootReducer, middleware);
export default store;
