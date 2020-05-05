import reducerAuth from '../reducers/reducerAuth';


describe('reducerAuth testing', () => {
    it('should return initial state', () => {
        expect(reducerAuth(undefined, {})).toEqual(
            {
                isLoginSuccess: false,
                isLoginPending: false,
                loginError: null
            }
        )
    });
});
