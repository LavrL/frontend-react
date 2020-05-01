import Button from './Button/Button';
import React, { Component } from 'react';
import './Calculator.css';

const initiateState = {
    result: '0'
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = initiateState;
    }

    ButtonClick = (key) => {
        if (this.state.result === '0') {
            this.setState({
                result: key
            })
        } else {
            switch (key) {
                case '%':
                case '.':
                case '-':
                case '+':
                case '*':
                case '/':
                    this.setState({
                        result: this.state.result + key
                    });
                    break;
                case '+/-':
                    if (this.state.result > 0) {
                        this.setState({
                            result: '-' + this.state.result
                        })
                    } else {
                        this.setState({
                            result: this.state.result.substring(1)
                        })
                    };
                    break;
                case 'AC':
                    this.setState({ result: '0' });
                    break;
                default:
                    this.setState({
                        result: this.state.result + key
                    })
            }
        }
    }
    btn = (btnClass, value) => {
        let btnValue;
        if (value === "AC") {
            btnValue = 'AC';
        } else {
            btnValue = value
        }
        return (
            <Button value={value}
                buttonClass={btnClass}
                onClick={() => this.ButtonClick(btnValue)} />
        )
    }

    calculate = () => {
        this.setState({
            result: eval(this.state.result)
        })
    }

    render() {
        return (
            <div className="calculator-row-center">
                <h1>Calculator</h1>
                <div>
                    <Button value={this.state.result} buttonClass="btn-input" />
                    <div className="calculator-row">
                        {this.btn("btn btn-lightgrey", "AC")}
                        {this.btn("btn btn-lightgrey", "+/-")}
                        {this.btn("btn btn-lightgrey", "%")}
                        {this.btn("btn btn-lightgrey", "/")}
                    </div>
                    <div className="calculator-row">
                        {this.btn("btn btn-grey btn-text-color", "7")}
                        {this.btn("btn btn-grey btn-text-color", "8")}
                        {this.btn("btn btn-grey btn-text-color", "9")}
                        {this.btn("btn btn-orange btn-text-color", "*")}
                    </div>
                    <div className="calculator-row">
                        {this.btn("btn btn-grey btn-text-color", "4")}
                        {this.btn("btn btn-grey btn-text-color", "5")}
                        {this.btn("btn btn-grey btn-text-color", "6")}
                        {this.btn("btn btn-orange btn-text-color", "-")}
                    </div>
                    <div className="calculator-row">
                        {this.btn("btn btn-grey btn-text-color", "1")}
                        {this.btn("btn btn-grey btn-text-color", "2")}
                        {this.btn("btn btn-grey btn-text-color", "3")}
                        {this.btn("btn btn-orange btn-text-color", "+")}
                    </div>
                    <div className="calculator-row">
                        {this.btn("btn btn-grey btn-text-color", "0")}
                        {this.btn("btn btn-grey btn-text-color", "00")}
                        {this.btn("btn btn-grey btn-text-color", ".")}

                        <Button value="="
                            buttonClass="btn btn-orange btn-text-color"
                            onClick={() => this.calculate()} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;