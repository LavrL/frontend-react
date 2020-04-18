import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Weather from '../../components/Weather/Weather';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import axios from 'axios';
import { REACT_APP_WEATHER_APPID } from '../../utils/constants';
import { fetchData } from '../../utils/fetchData';

jest.mock('axios');

configure({ adapter: new Adapter() });

describe('Calculator testing', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(<Weather />);
    });

    afterAll(() => {
        wrapper.unmount();
    });

    test('should return weather component initial state', () => {
        expect(new Weather().state).toEqual({
            temp: '',
            maxTemp: '',
            minTemp: '',
            main: '',
            city: 'Riga',
            cityToShow: '',
            countryToShow: '',
            country: 'LV',
            showWeather: false,
            showError: false
        })
    });

    test('Weather component renders correctly', () => {
        const tree = renderer
            .create(<Weather />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('render 2 input fields and 1 button GET WEATHER', () => {
        expect(wrapper.find('input').length).toBe(2);
        expect(wrapper.find('button').length).toBe(1);

    })

    test('fetches successfully data from OpenWeather API', async () => {
        const data = {
            result: {
                temp: '10',
                minTemp: '6',
                maxTemp: '12',
                description: 'rain'
            }
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(fetchData('Riga', 'Latvia', REACT_APP_WEATHER_APPID)).resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledTimes(1);

    });

    test('fetches erroneously data from OpenWeather API', async () => {
        const errorMsg = 'Network error';
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMsg)));

        await expect(fetchData('Riga', 'Latvia', REACT_APP_WEATHER_APPID)).rejects.toThrow(errorMsg);
    });
});
