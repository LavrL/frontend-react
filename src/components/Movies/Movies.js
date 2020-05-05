import Header from "./Header/Header";
import Movie from "./Movie/Movie";
import React, { useEffect, useReducer } from 'react';
import Search from "./Search/Search";

import { MOVIE_API } from '../../utils/constants.js';
import './Movies.css';

const initialState = {
    loading: true,
    movies: [],
    errorMessages: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_MOVIES_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessages: null
            };
        case "SEARCH_MOVIES_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case "SEARCH_MOVIES_FAILURE":
            return {
                ...state,
                loading: false,
                errorMessages: action.payload
            };
        default:
            return state;
    }
}

const Movies = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch(MOVIE_API)
            .then(response => response.json())
            .then(jsonResponse => {
                dispatch({
                    type: "SEARCH_MOVIES_SUCCESS",
                    payload: jsonResponse.Search
                })
            })
            .catch(err => console.log(err))
    }, []);

    const search = searchValue => {
        dispatch({
            type: "SEARCH_MOVIES_REQUEST"
        });

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=5d508a92`)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Response === "True") {
                    dispatch({
                        type: "SEARCH_MOVIES_SUCCESS",
                        payload: jsonResponse.Search
                    })
                } else {
                    dispatch({
                        type: "SEARCH_MOVIES_FAILURE",
                        payload: jsonResponse.Error
                    })
                }
            })
            .catch(err => console.log(err));
    };

    const { movies, errorMessages, loading } = state;

    return (
        <div className="Movies">
            <Header text="MOVIE SEARCH" />
            <Search search={search} />
            <p className="Movies-intro">Find your favourite movies</p>
            <div className="movies">
                {loading && !errorMessages ? (<span>loading ... </span>) : (errorMessages !== null) ? (
                    <div className="error-text"> {errorMessages}</div>) : (
                        movies.map((movie, index) => (
                            <Movie key={`${index}-${movie.Title}`} movie={movie} />
                        ))
                    )}
            </div>
        </div>
    );
}

export default Movies;
