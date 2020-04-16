import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../../components/Calculator/Button/Button';

describe('Button', () => {
    test('Calculator Button snapshot', () => {
        const component = renderer.create(<Button className={"btn"}
            onClick={"onClick"}>{"Save"}</Button>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    
})