import { getCurrenciesList } from '../actions/actionCalcCurr';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';  // You can use any http mocking library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test thunk action creator', () => {
    it('expected actions should be dispatched on successful request', () => {
        beforeEach(() => {
            fetchMock.restore()
        })
        const store = mockStore({})
        const expectedActions = [
            'SET_CURRENCIES'
        ]

        // Mock the fetch() global to always return the same value for GET
        // requests to all URLs.
        fetchMock.get('*', {response: 200})

        return store.dispatch(getCurrenciesList())
            .then(() => {
                const actualActions = store.getActions().map(action => action.type);
                expect(actualActions).toEqual(expectedActions);
            });
    })

    it('expected actions should be dispatched on failed request', () => {
        beforeEach(() => {
            fetchMock.restore()
        })
        const store = mockStore({})
        const expectedActions = [
            'SET_CURRENCIES_ERROR'
        ]
        // Mock the fetch() global to always return the same value for GET
        // requests to all URLs.
        fetchMock.mock('https://api.exchangeratesapi.io/latest', 404)

        return store.dispatch(getCurrenciesList())
            .then(() => {
                const actualActions = store.getActions().map(action => action.type)
                expect(actualActions).toEqual(expectedActions);
            })
    })
})
