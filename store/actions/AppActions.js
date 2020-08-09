import * as Actions from "./ActionTypes";

export const saveLocation = (lat, lng) => ({
    type: Actions.SAVE_LOCATION,
    payload: { lat, lng },
});
