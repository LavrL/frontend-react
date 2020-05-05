//import logger from 'redux-logger'; //disabled
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(reducer, {}, applyMiddleware(thunk)); // "logger" to log events
export default store;