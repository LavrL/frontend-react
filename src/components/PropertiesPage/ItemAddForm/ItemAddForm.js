import React, { Component } from 'react';
import './ItemAddForm.css';

class ItemAddForm extends Component {
    state = {
        label: ''
    };

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

    render() {
        return (
            <div>
                <div id="todo-form"
                    className="header">

                    <input id="add-input"
                        type="text"
                        value={this.state.label}
                        onChange={this.onLabelChange} />
                        {/* onKeyDown = {this.keyDown} */}

                    <button id="add-button"
                        type="button" onClick={this.onSubmit}>Add</button>
                </div>
            </div>
        )
    }
}

export default ItemAddForm;