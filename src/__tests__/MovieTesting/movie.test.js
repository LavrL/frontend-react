import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Movies from '../../components/Movies/Movies';
import { reducer } from '../../components/Movies/Movies';
import Movie from '../../components/Movies/Movie/Movie';
import Search from '../../components/Movies/Search/Search';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import fetchMock from 'jest-fetch-mock';
import { DEFAULT_IMAGE } from '../../utils/constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//import nock from 'nock';
//import fetch from 'isomorphic-fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
        wrapper = mount(<Movies />);
        fetchMock.resetMocks();
    });

    afterAll(() => {
        wrapper.unmount();
    });

    test('Movie component renders correctly', () => {
        const tree = renderer
            .create(<Movies />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('testing Movie component parameters', () => {
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

    test('testing default Poster Movie parameter', () => {
        const movie = {
            Poster: 'N/A'
        };
        let movieComponent = mount(<Movie movie={movie} />);
        expect(movieComponent.find('img').prop('src')).toEqual(DEFAULT_IMAGE);
    });

    test('reducer testing: SEARCH_MOVIES_REQUEST', () => {
        const mockStore = configureMockStore();
        const store = mockStore({});

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

    test('reducer testing: SEARCH_MOVIES_SUCCESS', () => {
        action = { type: "SEARCH_MOVIES_SUCCESS" };
        expect(reducer(initialState, action))
            .toEqual({
                loading: false,
                errorMessages: null,
                movies: Array[
                    { 'Poster': "Superman", 'Title': "Superman returns" },
                    { 'Poster': "Batman", 'Title': "Batman returns" }
                ]
            });
    });

    test('reducer testing: SEARCH_MOVIES_FAILURE', () => {
        action = { type: "SEARCH_MOVIES_FAILURE" };
        expect(reducer(initialState, action))
            .toEqual({
                loading: false,
                errorMessages: undefined,
                movies: []
            });
    });

});