import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Calculator from '../../components/Calculator/Calculator';
import { mount, render, configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });
describe('Calculator testing', () => {
    let wrapper;
    let buttonTyping;

    beforeEach(() => {
        wrapper = mount(<Calculator />);

        buttonTyping = (nodeNumber) => {
            const submitButton = wrapper.find('Button').at(nodeNumber);
            submitButton.simulate('click');
        };
    });

    test('should return calculator initial state', () => {
        expect(new Calculator().state).toEqual({ "result": "0" }
        )
    });

    test('check title of page', () => {
        expect(wrapper.find('h1').text()).toEqual("Calculator");
    });

    test('check typing number and click event', () => {
        buttonTyping(5);
        buttonTyping(6);

        expect(wrapper.find('Button').at(0).text()).toBe('78');
    });
    test('check if state changing after button clicked', () => {

        const submitButtonEleven = wrapper.find('Button').at(11);
        submitButtonEleven.simulate('click');

        expect(submitButtonEleven.text()).toBe('6');
        expect(wrapper.state()).toEqual({ "result": "6" });
    });

    test('check switching positive number to negative and reverse', () => {
        buttonTyping(15);
        expect(wrapper.state()).toEqual({ "result": "3" });

        const submitButtonTwo = wrapper.find('Button').at(2);
        submitButtonTwo.simulate('click');

        expect(wrapper.state()).toEqual({ "result": "-3" });

        submitButtonTwo.simulate('click');
        expect(wrapper.state()).toEqual({ "result": "3" });
    });
    test('check if all buttons are shown on calculator', () => {
        expect(wrapper.find('Button').length).toBe(21);
    });

    test('check if 8 + 5 equals 13 and not equal 14', () => {
        buttonTyping(6);
        buttonTyping(16)
        buttonTyping(10);
        buttonTyping(20);

        expect(wrapper.state()).toEqual({ "result": 13 }); // state = 13
        expect(wrapper.find('Button').at(0).text()).toBe('13'); //shown = 13

        expect(wrapper.state()).not.toEqual({ "result": 14 }); // state = 13
        expect(wrapper.find('Button').at(0).text()).not.toBe('14'); //shown = 13

    });
    test('checking working with float numbers(4.2 * 6.004) = 25.2168 ', () => {

        buttonTyping(9); // 4
        buttonTyping(19); // .
        buttonTyping(14); // 2
        buttonTyping(8); // *
        buttonTyping(11) // 6
        buttonTyping(19); // .
        buttonTyping(18); // 00
        buttonTyping(9); // 4
        buttonTyping(20); // =

        expect(wrapper.state()).toEqual({ "result": 25.2168 });
        expect(wrapper.state()).not.toEqual({ "result": 25.2167 });
    })
});