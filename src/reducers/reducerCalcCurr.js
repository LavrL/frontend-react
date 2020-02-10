const reducerCalcCurr = (
    state = {
        currencyBase: 'USD',
        currencyTo: 'GBP',
        currencyList: [],
        currencyAmount: 1,
        finalResult: 0
    }, action) => {
    switch (action.type) {
        case "SET_CURRENCIES":
            console.log('SET_CURRENCIES');
            return {
                ...state,
                currencyList: action.currencyAr
            }
        case "UPDATE_CURRENCY_BASE":
            console.log('UPDATE_CURRENCY_BASE');
            return {
                ...state,
                currencyBase: action.currency
            }
        case "UPDATE_CURRENCY_AMOUNT":
            console.log('UPDATE_CURRENCY_AMOUNT');
            return {
                ...state,
                currencyAmount: action.value
            }
        case "UPDATE_CURRENCY_TARGET":
            console.log('UPDATE_CURRENCY_TARGET');
            return {
                ...state,
                currencyTo: action.currency
            }
        case "CALCULATE_TOTAL_AMOUNT":
            console.log('CALCULATE_TOTAL_AMOUNT');
            return {
                ...state,
                finalResult: action.result.rates[state.currencyTo] * state.currencyAmount
            }

        default:
            return state;
    }
}
export default reducerCalcCurr;