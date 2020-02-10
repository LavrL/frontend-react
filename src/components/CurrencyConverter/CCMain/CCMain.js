import React, { Component } from 'react';
import { CURRENCY_CONVERTER_URL_API } from "../../../actions/actionTypes";
import { connect } from "react-redux";
import {
        fetchCurrencies,
        updateCurrencyBase,
        updateCurrencyTarget,
        updateCurrencyAmount,
        calculateResult } from "../../../actions/actionCalcCurr";
import './CCMain.css';

export class CCMain extends Component {
    componentDidMount() {
        this.props.fetchCurrencies();
    }
    onChange = (e) => {
        e.preventDefault();
        const value = (e.target.validity.valid) ? e.target.value : this.props.currencyAmount;
        this.props.updateCurrencyAmount(value);
    }

    change = (event) => {
        event.preventDefault();
        if (event.target.name === "from") {
            this.props.updateCurrencyBase(event.target.value);
        } else if (event.target.name === "to") {
            this.props.updateCurrencyTarget(event.target.value);
        }
    }

    convert = (e) => {
        e.preventDefault();
        console.log('converting ...');
        fetch(`${CURRENCY_CONVERTER_URL_API}?base=${this.props.currencyBase}&symbols=${this.props.currencyTo}`)
            .then((res) => { return res.json() })
            .then((result) => {
                this.props.calculateResult(result);
            })
            .catch(err => {
                console.log('Error = ', err);
            });
    }

    render() {
        return (
            <div>
                <h2 className="cc__header">Currency Converter</h2>
                <div className="cc__row">
                    <p>Currency I have
                <input type="text"
                            className="cc__input-text"
                            name="currencyAmount"
                            pattern="[0-9]*"
                            value={this.props.currencyAmount}
                            onChange={this.onChange} />
                        <select name="from"
                            onChange={this.change}
                            value={this.props.currencyBase}>
                            {this.props.currencyList.map((item, key) =>
                                <option key={key}>{item}</option>)}
                        </select></p>
                    <p>Currency I want
                <select name="to"
                            className="cc__input-text"
                            onChange={this.change}
                            value={this.props.currencyTo}>
                            {this.props.currencyList.map((item, key) =>
                                <option key={key}>{item}</option>)}
                        </select></p>
                </div>
                <div className="cc__button">
                    <button className="button-currency__orange"
                        onClick={this.convert}>Convert</button>
                </div>
                <div className="cc__result">Result : {this.props.finalResult}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currencyAmount: state.reducerCalcCurr.currencyAmount,
    currencyList: state.reducerCalcCurr.currencyList,
    currencyBase: state.reducerCalcCurr.currencyBase,
    currencyTo: state.reducerCalcCurr.currencyTo,
    finalResult: state.reducerCalcCurr.finalResult
});

const mapDispatchToProps = dispatch => ({
    fetchCurrencies: () => dispatch(fetchCurrencies()),
    updateCurrencyBase: (currency) => dispatch(updateCurrencyBase(currency)),
    updateCurrencyTarget: (currency) => dispatch(updateCurrencyTarget(currency)),
    updateCurrencyAmount: (value) => dispatch(updateCurrencyAmount(value)),
    calculateResult: (result) => dispatch(calculateResult(result)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CCMain);
