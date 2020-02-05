import App from '../src/components/App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../src/redux/store';
import { Provider } from 'react-redux';
import './index.css';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
