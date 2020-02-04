import PropTypes from 'prop-types';
import React from 'react';
import './TodoListItem.css';

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.label
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        }, () => { this.props.prCB(this.state.value) })
    }

    render() {
        return (
            <React.Fragment>
                <label className={this.props.labelClassName}>{this.props.label}</label>
                <input type="text"
                    className={this.props.inputClassName}
                    onChange={this.onChange}
                    value={this.state.value}
                />
                <button className="edit"
                    onClick={this.props.onEdit} >{this.props.editBtnName}</button>
                <button className="delete"
                    onClick={this.props.onDelete}>Delete</button>
            </React.Fragment>
        )
    }
}

TodoListItem.propTypes = {
    label: PropTypes.string,
    inputClassName: PropTypes.string,
    value: PropTypes.string,
    editBtnName: PropTypes.string,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
}

export default TodoListItem;