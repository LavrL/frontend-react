import PropTypes from 'prop-types';
import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import './TodoList.css';

const TodoList = (props) => {
    const elements = props.items.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className="todo-item">
                <TodoListItem {...itemProps}
                    onDelete={() => props.onDelete(id)}
                    onEdit={() => props.onEdit(id)}
                    prCB={props.prCB} />
            </li>
        )
    });
    return (<ul className="todo-list">{elements}</ul>)
}

TodoList.propTypes = {
    prCB: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
}

export default TodoList;