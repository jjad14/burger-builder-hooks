import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESSS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    // remove items from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

// async action creator
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // sign up url
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_FIREBASE_API_KEY;

        if (!isSignup) {
            // sign in url
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_FIREBASE_API_KEY;
        }

        // TODO: Authenticate User
        axios.post(url, authData)
            .then(response => {

                // get the expiration date by adding the token expiration date and current data into a new date object
                const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000);

                // store token, expirationDate and user id in local storage
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });

    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

// utility action creator
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            // check if token is expired
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }

            dispatch(authSuccess());
        }

    };
};