import Adapter from 'enzyme-adapter-react-16';
import Movie from '../../components/Movies/Movie/Movie';
import Movies from '../../components/Movies/Movies';
import React from 'react';
import Search from '../../components/Movies/Search/Search';
import fetchMock from 'jest-fetch-mock';
import renderer from 'react-test-renderer';
import { DEFAULT_IMAGE } from '../../utils/constants';
import { mount, configure, shallow } from 'enzyme';
import { reducer } from '../../components/Movies/Movies';

jest.mock('axios');
configure({ adapter: new Adapter() });

describe('Movie testing', () => {
    let wrapper;
    let action;

    const initialState = {
        loading: true,
        movies: [],
        errorMessages: null
    };

    beforeAll(() => {
        wrapper = shallow(<Movies />);
        fetchMock.resetMocks();
    });

    afterAll(() => {
        wrapper.unmount();
    });

    test('should check if Movie component renders correctly', () => {
        const tree = renderer
            .create(<Movies />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('should test Movie component parameters', () => {
        const props = {
            movie: {
                Poster: 'Superman',
                Title: 'Superman returns',
                Year: 2015
            }
        };

        let movieComponent = mount(<Movie movie={props.movie} />);
        expect(movieComponent.find('h2').text()).toEqual('Superman returns');
    });

    test('should test default Poster Movie parameter', () => {
        const movie = {
            Poster: 'N/A'
        };
        let movieComponent = mount(<Movie movie={movie} />);

        expect(movieComponent.find('img').prop('src')).toEqual(DEFAULT_IMAGE);
    });

    test('should test reducer action.type: SEARCH_MOVIES_REQUEST', () => {
        let state;

        expect(reducer(state, {})).toEqual(initialState)
        action = { type: "SEARCH_MOVIES_REQUEST" };

        expect(reducer(initialState, action))
            .toEqual({
                loading: true,
                errorMessages: null,
                movies: []
            });
    });

    test('should test reducer action.type: SEARCH_MOVIES_SUCCESS', () => {
        action = {
            type: "SEARCH_MOVIES_SUCCESS",
            payload: [{ 'Poster': "Superman", 'Title': "Superman returns" }]
        };

        expect(reducer(initialState, action))
            .toEqual({
                loading: false,
                errorMessages: null,
                movies: [
                    { 'Poster': "Superman", 'Title': "Superman returns" }
                ]
            });
    });

    test('should test reducer action.type: SEARCH_MOVIES_FAILURE', () => {
        action = {
            type: "SEARCH_MOVIES_FAILURE",
            payload: { 'Error': 'Not found' }
        };

        expect(reducer(initialState, action))
            .toEqual({
                loading: false,
                errorMessages: { 'Error': 'Not found' },
                movies: []
            });
    });

    test('should test Search component: update typed value', () => {
        const props = { search: jest.fn() };
        let wrapper = shallow(<Search {...props} />);

        expect(wrapper.exists()).toBeTruthy();

        wrapper.find('input').at(0).simulate('change', {
            target: {
                value: 'Superman'
            }
        });

        expect(wrapper.find('input').at(0).prop('value')).toEqual('Superman');
    });

    test('should test Search component: check if Search button works', () => {
        const props = { search: jest.fn() };
        let wrapper = shallow(<Search {...props} />);

        wrapper.find('input').at(1).simulate('click', { preventDefault: () => { } });
        expect(wrapper.find('input').at(0).prop('value')).toEqual('');
    });

});