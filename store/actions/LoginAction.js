// export const login1 = trueFalse => ({
//     type: "LOGIN1",
//     trueFalse: trueFalse
// });

export const login = (loggedIn, token, userData) => ({
    type: "LOGIN",
    payload: { loggedIn, token, userData }
});

export const editProfile = (name, email, mobile) => ({
    type: "EDITPROFILE",
    payload: { name, email, mobile }
});

// export const register = (name, email, mobile) => ({
//     type: "REGISTER",
//     payload: { name, email, mobile }
// });

export const logout = () => ({
    type: "LOGOUT"
});

export const saveLocation = (lat, lng) => ({
    type: "SAVELOCATION",
    payload: { lat, lng }
});

// export const login = responseObject => ({
//     type: "LOGIN",
//     payload: responseObject
// });
