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

const reducer = (state, action) => {
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
            // console.log('action ', action)
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
                // console.log('jsonResponse ', jsonResponse)
                dispatch({
                    type: "SEARCH_MOVIES_SUCCESS",
                    payload: jsonResponse.Search
                })
            })
    }, []);

    const search = searchValue => {
        dispatch({
            type: "SEARCH_MOVIES_REQUEST"
        });

        // console.log('searchValue = ', searchValue)

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=5d508a92`)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Response === "True") {
                    dispatch({
                        type: "SEARCH_MOVIES_SUCCESS",
                        payload: jsonResponse.Search
                    })
                } else {
                    // console.log('jsonResponse ', jsonResponse);
                    dispatch({
                        type: "SEARCH_MOVIES_FAILURE",
                        payload: jsonResponse.Error
                    })
                }
            });
    };

    const { movies, errorMessages, loading } = state;
    // console.log('state ', errorMessages);

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
