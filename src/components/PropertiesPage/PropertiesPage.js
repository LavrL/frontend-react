import AppHeader from './AppHeader/AppHeader';
import ItemAddForm from './ItemAddForm/ItemAddForm';
import React, { Component } from 'react';
import TodoList from './TodoList/TodoList';
import './PropertiesPage.css';

class PropertiesPage extends Component {

    constructor(props) {
        super(props);
        this.genId = 50;

        this.prCB = this.prCB.bind(this);

        this.state = {
            returnedValue: '',
            items: [
                {
                    id: 1,
                    label: '123',
                    editBtnName: 'EDIT',
                    inputClassName: 'textFieldHide',
                    labelClassName: 'labelShow'
                },
                {
                    id: 2,
                    label: '456',
                    editBtnName: 'EDIT',
                    inputClassName: 'textFieldHide',
                    labelClassName: 'labelShow'
                }]
        }
    }

    onItemAdded = (label) => {
        this.setState((state) => {
            const item = this.createItem(label);
            console.log(item);
            return { items: [...state.items, item] }
        })
    }

    createItem = (label) => {
        return {
            id: this.genId++,
            label: label,
            editBtnName: 'EDIT',
            inputClassName: 'textFieldHide',
            labelClassName: 'labelShow'
        }
    }

    onChange = (e, label) => {
        e.preventDefault();
        return e.target.value + label
    }

    editItem = (index) => {
        console.log('index = ', index);
        this.setState((state) => {
            const items = state.items.map((item) => {
                if ((item.id === index) && (item.editBtnName === 'EDIT')) {
                    item.inputClassName = "textFieldShow";
                    item.editBtnName = 'SAVE';
                    item.labelClassName = "labelHide"
                } else if ((item.id === index) && (item.editBtnName === 'SAVE')) {
                    if (state.returnedValue) {
                        item.label = this.state.returnedValue;
                    }
                    
                    console.log('item.label ', item.label);
                    item.inputClassName = "textFieldHide"
                    item.editBtnName = 'EDIT';
                    item.labelClassName = "labelShow"
                }
                return item;
            });
            return items
        }, () => console.log('ok'));
    }

    deleteItem = (index) => {
        const { items } = this.state;
        this.setState({
            items: items.filter((item) => {
                return item.id !== index
            }),
        });
    }

    // componentDidUpdate(prevProps, prevState) {
    prCB = (value) => {
        console.log('value = ', value);
        this.setState({
            returnedValue: value
        }, () => console.log('returnedValue', this.state.returnedValue))

    }

    render() {
        const { items } = this.state;

        return (
            <div className="App">
                <AppHeader />
                <ItemAddForm onItemAdded={this.onItemAdded} />
                <TodoList items={items}
                    onDelete={this.deleteItem}
                    onEdit={this.editItem}
                    prCB={this.prCB} />
            </div>
        )
    }
}

export default PropertiesPage;
