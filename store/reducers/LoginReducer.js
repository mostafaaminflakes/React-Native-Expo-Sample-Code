//import { MEALS } from '../../data/dummy-data';

const initialState = {
    baseUrl: "http://192.168.1.3/t/avatars/",
    loggedIn: false,
    token: null,
    userData: {},
    lat: null,
    lng: null,
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        // Login
        case "LOGIN": {
            //console.log(action.payload.token);
            return {
                // State
                ...state,
                // Redux Store
                loggedIn: action.payload.loggedIn,
                token: action.payload.token,
                userData: action.payload.userData,
            };
        }
        case "EDITPROFILE": {
            //console.log(action.payload.token);
            // const newState = Object.assign({}, state, {
            //     //loggedIn: action.payload.loggedIn,
            //     //token: action.payload.token,
            //     userData: {
            //         ...state.userData,
            //         userData: action.payload.userData
            //     }
            // });
            //return newState;
            return {
                // State
                ...state,
                userData: {
                    ...state.userData,
                    name: action.payload.name,
                    email: action.payload.email,
                    mobile: action.payload.mobile,
                },
            };
        }
        case "LOGOUT": {
            //console.log(action.payload.token);
            return {
                // State
                ...state,
                // Redux Store
                loggedIn: false,
                token: null,
                userData: {},
            };
        }
        case "SAVELOCATION": {
            //console.log(action.payload.token);
            return {
                // State
                ...state,
                // Redux Store
                lat: action.payload.lat,
                lng: action.payload.lng,
            };
        }
        // Default
        default: {
            return state;
        }
    }
    //return state;
};

export default LoginReducer;
