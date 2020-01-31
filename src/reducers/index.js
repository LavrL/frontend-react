import { combineReducers } from "redux";
import reducerAuth from "./reducerAuth";
import reducerCalc from "./reducerCalc";
import reducerCurrenciesList from "./reducerCurrenciesList";

export default combineReducers({
    reducerAuth,
    reducerCalc,
    reducerCurrenciesList
});
