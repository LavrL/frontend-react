import React from 'react';
import { DEFAULT_IMAGE } from '../../../utils/constants';

const Movie = ({ movie }) => {
    const poster = movie.Poster === 'N/A' ? DEFAULT_IMAGE : movie.Poster
    return (
        <div className='movie'>
            <h2>{movie.Title}</h2>
            <div>
                <img width="200px"
                    alt={`The movie title: ${movie.Title}`}
                    src={poster} />
            </div>
            <p>({movie.Year})</p>
        </div>
    )
}

export default Movie;
