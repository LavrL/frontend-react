import { CURRENCY_CONVERTER_URL_API } from "./actionTypes";

export function fetchCurrencies() {
    return dispatch => {
        dispatch(getCurrenciesList());
    }
}
export function updateCurrencyBase(currency) {
    return { type: 'UPDATE_CURRENCY_BASE', currency }
}

export function updateCurrencyTarget(currency) {
    return { type: 'UPDATE_CURRENCY_TARGET', currency }
}

export function updateCurrencyAmount(value) {
    return { type: 'UPDATE_CURRENCY_AMOUNT', value }
}

export function calculateResult(result) {
    return { type: 'CALCULATE_TOTAL_AMOUNT', result }
}

export function updateCurBase(currency) {
    return { type: 'UPDATE_CURRENCY_BASE', currency }
}

export function getCurrenciesList() {
    return async dispatch => {
        try {
            const res = await fetch(CURRENCY_CONVERTER_URL_API);
            const result = await res.json();
            const currencyAr = ["EUR"];
            for (let key in result.rates) {
                currencyAr.push(key);
            }
            dispatch(setCurrencies(currencyAr));
        }
        catch (err) {
            //console.log('Error = ', err);
            dispatch(setCurrenciesError(err));
        }
    }
}

export function setCurrencies(currencyAr) {
    return { type: "SET_CURRENCIES", currencyAr }
}

export function setCurrenciesError(error) {
    return { type: "SET_CURRENCIES_ERROR", error }
}