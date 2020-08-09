import * as Actions from "../actions/ActionTypes";

const initialState = {
    authError: false,
    loggedIn: false,
    credentials: null,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SIGNIN_SUCCESS:
            console.log("success");
            return {
                ...state,
                authError: false,
                loggedIn: true,
                credentials: action.payload,
            };
        case Actions.SIGNIN_ERROR:
            console.log("error");
            return { ...state, authError: true, loggedIn: false };
        case Actions.SIGNOUT_SUCCESS:
            console.log("signout success");
            return initialState;
        case Actions.UPDATE_PROFILE:
            console.log("updated profile");
            return state;
        case Actions.UPDATE_PASSWORD:
            console.log("updated password");
            //console.log(action.payload);
            return {
                ...state,
                credentials: { ...state.credentials, password: action.payload },
            };
        case Actions.UPDATE_AVATAR:
            console.log("updated avatar");
            return state;
        default:
            return state;
    }
};

export default AuthReducer;
