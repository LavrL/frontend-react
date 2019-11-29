import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    fetchCurrencies,
    updateCurrencyBase,
    updateCurrencyTarget,
    updateCurrencyAmount,
    calculateResult
} from "../../../../src/actions/actionCalc";
import './CCMain.css';
import { CALCULATOR_URL_API } from "../../../actions/actionTypes";

export class CCMain extends Component {
    componentDidMount() {
        this.props.fetchCurrencies();
    }
    onChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
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
        fetch(`${CALCULATOR_URL_API}?base=${this.props.currencyBase}&symbols=${this.props.currencyTo}`)
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
                <input type="text"
                    name="currencyAmount"
                    value={this.props.currencyAmount}
                    onChange={this.onChange} />
                <select name="from"
                    onChange={this.change}
                    value={this.props.currencyBase}>
                    {this.props.currencyList.map((item, key) =>
                        <option key={key}>{item}</option>)}
                </select>
                <select name="to"
                    onChange={this.change}
                    value={this.props.currencyTo}>
                    {this.props.currencyList.map((item, key) =>
                        <option key={key}>{item}</option>)}
                </select>
                <button className="button-currency__orange"
                    onClick={this.convert}>Convert</button>
                <div>Result : {this.props.finalResult}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currencyAmount: state.reducerCalc.currencyAmount,
    currencyList: state.reducerCalc.currencyList,
    currencyBase: state.reducerCalc.currencyBase,
    currencyTo: state.reducerCalc.currencyTo,
    finalResult: state.reducerCalc.finalResult
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
