const currenciesList = (
    state = {
        baseCurrency: "",
        currenciesRates: [],
        favorites: []
    }, action
) => {
    switch (action.type) {
        case "SET_CURRENCIES":
            return {
                ...state,
                currenciesRates: action.rates

            }
        default: return state
    }
}

export default currenciesList;

