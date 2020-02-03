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
                case '':
                    this.setState({
                        result: '0'
                    });
                    break;
                default:
                    this.setState({
                        result: this.state.result + key
                    }, () => { return console.log(this.state.result) })
            }
        }
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
                    <Button value={this.state.result} buttonClass=" btn-input" />
                    <div className="calculator-row">
                        <Button value="AC"
                            buttonClass="btn btn-lightgrey"
                            onClick={() => this.ButtonClick('')} />
                        <Button value="+/-"
                            buttonClass="btn btn-lightgrey"
                            onClick={() => this.ButtonClick('+/-')} />
                        <Button value="%"
                            buttonClass="btn btn-lightgrey"
                            onClick={() => this.ButtonClick('%')} />
                        <Button value="/"
                            buttonClass="btn btn-orange btn-text-color"
                            onClick={() => this.ButtonClick('/')} />
                    </div>
                    <div className="calculator-row">
                        <Button value="7"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('7')} />
                        <Button value="8"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('8')} />
                        <Button value="9"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('9')} />
                        <Button value="*"
                            buttonClass="btn btn-orange btn-text-color"
                            onClick={() => this.ButtonClick('*')} />
                    </div>
                    <div className="calculator-row">
                        <Button value="4"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('4')} />
                        <Button value="5"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('5')} />
                        <Button value="6"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('6')} />
                        <Button value="-"
                            buttonClass="btn btn-orange btn-text-color"
                            onClick={() => this.ButtonClick('-')} />
                    </div>
                    <div className="calculator-row">
                        <Button value="1"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('1')} />
                        <Button value="2"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('2')} />
                        <Button value="3"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('3')} />
                        <Button value="+"
                            buttonClass="btn btn-orange btn-text-color"
                            onClick={() => this.ButtonClick('+')} />
                    </div>
                    <div className="calculator-row">
                        <Button value="0"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('0')} />
                        <Button value="00"
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('00')} />
                        <Button value="."
                            buttonClass="btn btn-grey btn-text-color"
                            onClick={() => this.ButtonClick('.')} />
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