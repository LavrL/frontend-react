import PropTypes from 'prop-types';
import React from 'react';
import './InputComponent.css';

const InputComponent = (props) => (
    <React.Fragment>
        <input type={props.type}
            className={props.className}
            name={props.name}
            value={props.place}
            onChange={props.onChange} />
    </React.Fragment>
)

InputComponent.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default InputComponent;