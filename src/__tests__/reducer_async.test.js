import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';  // http mocking library
import thunk from 'redux-thunk';
import { getCurrenciesList } from '../actions/actionCalcCurr';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test thunk action creator', () => {

    it('should expect actions should be dispatched on successful request', () => {
        beforeEach(() => {
            fetchMock.restore()
        });

        const store = mockStore({});
        const expectedActions = [
            'SET_CURRENCIES'
        ];

        // Mock the fetch() global to always return the same value for GET
        // requests to all URLs.
        fetchMock.get('*', { response: 200 });
        return store.dispatch(getCurrenciesList())
            .then(() => {
                const actualActions = store.getActions().map(action => action.type);
                expect(actualActions).toEqual(expectedActions);
            });
    })

    it('should expect that actions had been dispatched on failed request', () => {
        beforeEach(() => {
            fetchMock.restore()
        });

        const store = mockStore({});
        const expectedActions = [
            'SET_CURRENCIES_ERROR'
        ];

        // Mock the fetch() global to always return the same value for GET
        // requests to all URLs.
        fetchMock.mock('https://api.exchangeratesapi.io/latest', 404);
        return store.dispatch(getCurrenciesList())
            .then(() => {
                const actualActions = store.getActions().map(action => action.type)
                expect(actualActions).toEqual(expectedActions);
            });
    });
});
