import reducer from '../reducers/reducerCalcCurr';
import store from '../redux/store';
import {
    updateCurrencyBase,
    updateCurrencyTarget,
    updateCurrencyAmount
} from '../actions/actionCalcCurr';


describe('Reducer testing', () => {

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                currencyBase: 'USD',
                currencyTo: 'GBP',
                currencyList: [],
                currencyAmount: 1,
                finalResult: 0
            });
    });
});

describe('Base currency action test', () => {

    beforeAll(() => {
        store.dispatch(updateCurrencyBase("EUR"));
    });

    it('should return Base currency changing', () => {
        const state = store.getState();
        expect(state.reducerCalcCurr.currencyBase).toBe('EUR');
    });
})

describe('Target currency action test', () => {
    beforeAll(() => {
        store.dispatch(updateCurrencyTarget("USD"));
    });

    it('should return Target currency changing', () => {
        const state = store.getState();
        expect(state.reducerCalcCurr.currencyTo).toBe('USD');
    });
})

describe('Amount currency action test', () => {
    beforeAll(() => {
        store.dispatch(updateCurrencyAmount(123));
    });

    it('should return Amount currency changing', () => {
        const state = store.getState();
        expect(state.reducerCalcCurr.currencyAmount).toBe(123);
    });
})
