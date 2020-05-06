import reducerAuth from '../reducers/reducerAuth';

describe('reducerAuth testing', () => {
    let action;
    const initialState = {
        isLoginSuccess: false,
        isLoginPending: false,
        loginError: null
    }

    it('should return initial state', () => {
        expect(reducerAuth(undefined, {})).toEqual(
            {
                isLoginSuccess: false,
                isLoginPending: false,
                loginError: null
            });
    });

    test('should return SET_LOGIN_PENDING', () => {
        action = {
            type: "SET_LOGIN_PENDING",
            isLoginPending: true
        };

        expect(reducerAuth(initialState, action))
            .toEqual({
                isLoginSuccess: false,
                isLoginPending: true,
                loginError: null
            });
    });

    test('should return SET_LOGIN_SUCCESS', () => {
        action = {
            type: "SET_LOGIN_SUCCESS",
            isLoginSuccess: true
        };

        expect(reducerAuth(initialState, action))
            .toEqual({
                isLoginSuccess: true,
                isLoginPending: false,
                loginError: null
            });
    });

    test('should return SET_LOGIN_ERROR', () => {
        action = {
            type: "SET_LOGIN_ERROR",
            loginError: true
        };

        expect(reducerAuth(initialState, action))
            .toEqual({
                isLoginSuccess: false,
                isLoginPending: false,
                loginError: true
            });
    });
});
