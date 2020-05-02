import React, { useState, useReducer } from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Movies from '../../components/Movies/Movies';
import Movie from '../../components/Movies/Movie/Movie';
import Search from '../../components/Movies/Search/Search';
import renderer from 'react-test-renderer';
import { mount, configure, shallow } from 'enzyme';
import axios from 'axios';
import { fetchData } from '../../utils/fetchData';
import fetchMock from 'jest-fetch-mock';
import { DEFAULT_IMAGE } from '../../utils/constants';
import * as ReactRedux from 'react-redux'

jest.mock('axios');

configure({ adapter: new Adapter() });

describe('Moview testing', () => {

    let wrapper;

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

    // test('handleSearchInputChanges calls setSearchValue(e.target.value)', () => {
    //     const useStateSpy = jest.spyOn(React, 'useState');
    //     const mockSetState = jest.fn();
    //     jest.mock('react', () => ({
    //         useState: initial => [initial, mockSetState]
    //     }));
    // });

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

});