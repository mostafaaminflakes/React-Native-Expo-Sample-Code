import * as Actions from "../actions/ActionTypes";

const initialState = {
    lat: null,
    lng: null,
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SAVE_LOCATION:
            console.log("Location saved");
            return {
                ...state,
                lat: action.payload.lat,
                lng: action.payload.lng,
            };
        default:
            return state;
    }
};

export default AppReducer;
