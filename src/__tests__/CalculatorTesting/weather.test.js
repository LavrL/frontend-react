import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Weather from '../../components/Weather/Weather';
import { mount, configure } from 'enzyme';
import axios from 'axios';
import { REACT_APP_WEATHER_APPID } from '../../utils/constants';
jest.mock('axios');

configure({ adapter: new Adapter() });

describe('Calculator testing', () => {
    let wrapper;


    beforeEach(() => {
        wrapper = mount(<Weather />);
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

    test('fetches successfully data from OpenWeather API', async () => {
        const API = 'https://api.openweathermap.org/data/2.5/weather';

        const fetchData = async (city, country, REACT_APP_WEATHER_APPID) => {
            const url = `${API}?q=${city},${country}&units=metric&appid=${REACT_APP_WEATHER_APPID}`;

            return await axios.get(url);
        };

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
    });
});
