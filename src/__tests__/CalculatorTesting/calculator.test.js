import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Calculator from '../../components/Calculator/Calculator';
import { mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });
describe('Calculator testing', () => {
    let wrapper;
    let buttonTyping;

    buttonTyping = (nodeNumber) => {
        const submitButton = wrapper.find('Button').at(nodeNumber);
        submitButton.simulate('click');
    };

    beforeEach(() => {
        wrapper = mount(<Calculator />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test('should return calculator initial state', () => {
        expect(new Calculator().state).toEqual({ "result": "0" });
    });

    test('should return title of page', () => {
        expect(wrapper.find('h1').text()).toEqual("Calculator");
    });

    test('should check typed numbers and click events', () => {
        buttonTyping(5);
        buttonTyping(6);
        buttonTyping(7);
        buttonTyping(13);
        buttonTyping(17);

        expect(wrapper.find('Button').at(0).text()).toBe('78910');
    });

    test('should test typed numbers', () => {
        buttonTyping(17);
        expect(wrapper.find('Button').at(0).text()).toBe('0'); // typed '0'

        buttonTyping(3);
        expect(wrapper.find('Button').at(0).text()).toBe('%');

    });

    test('should check if state changed after button was clicked', () => {
        const submitButtonEleven = wrapper.find('Button').at(11);
        submitButtonEleven.simulate('click');

        expect(submitButtonEleven.text()).toBe('6');
        expect(wrapper.state()).toEqual({ "result": "6" });
    });

    test('should check switching positive number to negative and reverse', () => {
        buttonTyping(15);
        expect(wrapper.state()).toEqual({ "result": "3" });

        const submitButtonTwo = wrapper.find('Button').at(2);
        submitButtonTwo.simulate('click');
        expect(wrapper.state()).toEqual({ "result": "-3" });

        submitButtonTwo.simulate('click');
        expect(wrapper.state()).toEqual({ "result": "3" });
    });

    test('should check if all buttons was shown on calculator', () => {
        expect(wrapper.find('Button').length).toBe(21);
    });

    test('should check if (8 + 5) equals "13" and not equal "14"', () => {
        buttonTyping(6);
        buttonTyping(16)
        buttonTyping(10);
        buttonTyping(20);

        expect(wrapper.state()).toEqual({ "result": 13 }); 
        expect(wrapper.find('Button').at(0).text()).toBe('13'); 

        expect(wrapper.state()).not.toEqual({ "result": 14 }); 
        expect(wrapper.find('Button').at(0).text()).not.toBe('14'); 
    });

    test('should check working with float numbers (4.2 * 6.004) = 25.2168 ', () => {
        buttonTyping(9); 
        buttonTyping(19);
        buttonTyping(14); 
        buttonTyping(8); 
        buttonTyping(11) 
        buttonTyping(19); 
        buttonTyping(18); 
        buttonTyping(9); 
        buttonTyping(20); 

        expect(wrapper.state()).toEqual({ "result": 25.2168 });
        expect(wrapper.state()).not.toEqual({ "result": 25.2167 });
    });

    test('should check clicking on button "AC", return "state = 0"', () => {
        buttonTyping(11);
        buttonTyping(3);
        buttonTyping(1);

        expect(wrapper.state()).toEqual({ "result": "0" });
    });
});
