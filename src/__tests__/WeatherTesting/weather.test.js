import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Weather from '../../components/Weather/Weather';
import renderer from 'react-test-renderer';
import { mount, configure, shallow } from 'enzyme';
import axios from 'axios';
import { REACT_APP_WEATHER_APPID } from '../../utils/constants';
import { fetchData } from '../../utils/fetchData';
import { api } from '../../utils/api';
import fetchMock from 'jest-fetch-mock';
//import InputComponent from '../../components/InputComponent/InputComponent';

jest.mock('axios');

configure({ adapter: new Adapter() });

describe('Weather testing', () => {

    let wrapper;
    const data = {
        result: {
            temp: '10',
            minTemp: '6',
            maxTemp: '12',
            description: 'rain'
        }
    };

    beforeAll(() => {
        wrapper = mount(<Weather />);
        fetchMock.resetMocks();
    });

    afterAll(() => {
        wrapper.unmount();
    });

    test('getWeather button click event', () => {
        const mockCallBack = jest.fn();

        const buttonGetWeather = shallow(<button onClick={mockCallBack} />);
        buttonGetWeather.getElement().props.onClick();
        expect(mockCallBack).toHaveBeenCalled();
    });

    test('should handle click correctly', async () => {
        fetch.mockResponseOnce(JSON.stringify({main : { temp_min : '123'} }));
        const buttonWrapper = shallow(<Weather />);

        expect(buttonWrapper.find('button.button-weather__orange').length).toBe(1);
        expect(wrapper.state().showWeather).toBe(false);

        expect(buttonWrapper.find('button.button-weather__orange').simulate('click', { preventDefault: () => { } }));
        
    })

    test('return result response.json', () => {
        fetchMock.mockResponseOnce(JSON.stringify(['Riga', 'Latvia', REACT_APP_WEATHER_APPID]));
        const onResponse = jest.fn();
        const onError = jest.fn();

        return api('Riga', 'Latvia', REACT_APP_WEATHER_APPID)
            .then(onResponse)
            .catch(onError)
            .finally(() => {
                expect(onResponse).toHaveBeenCalled()
                expect(onError).not.toHaveBeenCalled();

                expect(onResponse.mock.calls[0][0]).toEqual(['Riga', 'Latvia', REACT_APP_WEATHER_APPID]);
            })
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

    });

    test('updates first input field "city" ', () => {
        const fieldName = 'city';

        wrapper.find('[name="city"]').at(0).simulate('change', {
            target: {
                name: fieldName,
                value: 'Paris'
            }
        });
        expect(wrapper.state().city).toEqual('Paris');
    });

    test('updates second input field "country" ', () => {
        const fieldName = 'country';

        wrapper.find('[name="country"]').at(1).simulate('change', {
            target: {
                name: fieldName,
                value: 'France'
            }
        });
        expect(wrapper.state().country).toEqual('France');
    });

    test('fetches successfully data from OpenWeather API', async () => {

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(fetchData('Riga', 'Latvia', REACT_APP_WEATHER_APPID)).resolves.toEqual(data);

        wrapper.setState({ showWeather: true });
        expect(wrapper.state().showWeather).toEqual(true);

        expect(axios.get).toHaveBeenCalledTimes(1);

    });

    test("checks if fields rendered correctly", () => {

        const data = {
            result: {
                temp: '10',
                minTemp: '6',
                maxTemp: '12',
                description: 'rain'
            }
        };

        wrapper.setState({ temp: data.result.temp });
        expect(wrapper.find('span').at(1).text()).toEqual("10");

        wrapper.setState({ minTemp: data.result.minTemp });
        expect(wrapper.find('span').at(2).text()).toEqual("6");

        wrapper.setState({ maxTemp: data.result.maxTemp });
        expect(wrapper.find('span').at(3).text()).toEqual("12");

        wrapper.setState({ main: data.result.description });
        expect(wrapper.find('h3').at(3).text()).toEqual("rain");
    })

    test('fetches erroneously data from OpenWeather API', async () => {
        const errorMsg = 'Network error';
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMsg)));

        await expect(fetchData('Riga', 'Latvia', REACT_APP_WEATHER_APPID)).rejects.toThrow(errorMsg);
    });
    test('show error when search is not successfull', () => {
        wrapper.setState({ showError: true });

        expect(wrapper.find('div.weather-error').text()).toEqual('Incorrect City or Country');
    });
    test('show no error when search is successfull', () => {
        wrapper.setState({ showError: false });

        expect(wrapper.find('div.weather-error')).toHaveLength(0);
    });

});





