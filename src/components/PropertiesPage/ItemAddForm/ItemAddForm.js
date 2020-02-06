import React, { Component } from 'react';
import './ItemAddForm.css';

class ItemAddForm extends Component {
    constructor(props) {
        super(props);
        this.keyDown = this.keyDown.bind(this);
        this.state = {
            label: ''
        };
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { label } = this.state;
        this.setState({ label: '' });
        if (label !== '') {
            this.props.onItemAdded(label);
        }
    }

    keyDown(e) {
        if (e.keyCode === 13) {
            this.onSubmit(e);
        }
    }

    render() {
        return (
            <div>
                <div id="todo-form"
                    className="header">

                    <input id="add-input"
                        type="text"
                        value={this.state.label}
                        onChange={this.onLabelChange}
                        onKeyDown={this.keyDown}
                    />
                    <button id="add-button"
                        type="submit"
                        onClick={this.onSubmit}>Add</button>
                </div>
            </div>
        )
    }
}

export default ItemAddForm;