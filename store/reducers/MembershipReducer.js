import {
    LOGIN,
    LOGOUT,
    SIGNUP,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
} from "../actions/MembershipActions";

// function removeByKey(myObj, deleteKey) {
//     //console.log(Object.keys(myObj));
//     return Object.keys(myObj)
//         .filter((key) => key !== deleteKey)
//         .reduce((result, current) => {
//             result[current] = myObj[current];
//             return result;
//         }, {});
// }

const initialState = {};
const MembershipReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload;
        //return { ...state, user: action.payload };
        case LOGOUT:
            return { ...initialState };
        case SIGNUP:
            return action.payload;
        case UPDATE_EMAIL:
            return { ...state, email: action.payload };
        // return {
        //     ...state,
        //     user: { ...state.user, email: action.payload },
        // };
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload };
        // return {
        //     ...state,
        //     user: { ...state.user, password: action.payload },
        // };
        default:
            return state;
    }
};

// const rootReducer = combineReducers({
//     user,
// });

export default MembershipReducer;
