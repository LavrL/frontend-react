import { handleErrors, make_base_auth } from '../utils/loginFunctions';
import { history } from '../components/App/App';
import {
    SET_LOGIN_PENDING,
    SET_LOGIN_SUCCESS,
    SET_LOGIN_ERROR,
    BACKEND_URL
} from '../actions/actionTypes';

export function login(username, password) {
    return (dispatch) => {
        dispatch(setLoginPending(true));

        const url = BACKEND_URL + "me";
        const headers = new Headers();
        headers.append("Authorization", make_base_auth(username, password));
        headers.append("Content-Type", "application/json");

        fetch(url, {
            method: "GET",
            headers: headers,
        }).then(handleErrors)
            .then(response => {
                return response.json()
            }).then((data) => {
                dispatch(setLoginPending(false));
                dispatch(setLoginError(false));
                dispatch(setLoginSuccess(true));

                history.push('/home');
            })
            .catch(error => {
                console.log(error);
                dispatch(setLoginSuccess(false));
                dispatch(setLoginPending(false));
                dispatch(setLoginError(error));
            })
    }

}

function setLoginPending(isLoginPending) {
    return {
        type: SET_LOGIN_PENDING,
        isLoginPending
    };
}

function setLoginSuccess(isLoginSuccess) {
    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    };
}

function setLoginError(loginError) {
    return {
        type: SET_LOGIN_ERROR,
        loginError
    }
}
