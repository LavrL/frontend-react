import reducer from '../reducers/reducerCalcCurr';
import store from '../redux/store';
import {
    updateCurrencyBase,
    updateCurrencyTarget,
    updateCurrencyAmount
} from '../actions/actionCalcCurr';


describe('reducer testing', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                currencyBase: 'USD',
                currencyTo: 'GBP',
                currencyList: [],
                currencyAmount: 1,
                finalResult: 0
            }
        )
    })
});

describe('Base currency action test', () => {

    beforeAll(() => {
        store.dispatch(updateCurrencyBase("EUR"));
    });

    it('base currency changing', () => {
        const state = store.getState();
        expect(state.reducerCalcCurr.currencyBase).toBe('EUR');
    });
})

describe('Target currency action test', () => {
    beforeAll(() => {
        store.dispatch(updateCurrencyTarget("USD"));
    });

    it('target currency changing', () => {
        const state = store.getState();
        expect(state.reducerCalcCurr.currencyTo).toBe('USD');
    });
})

describe('Amount currency action test', () => {
    beforeAll(() => {
        store.dispatch(updateCurrencyAmount(123));
    });

    it('Amount currency changing', () => {
        const state = store.getState();
        expect(state.reducerCalcCurr.currencyAmount).toBe(123);
    });
})
