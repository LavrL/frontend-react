import axios from 'axios';

export const API = 'https://api.openweathermap.org/data/2.5/weather';
export const fetchData = async (city, country, REACT_APP_WEATHER_APPID) => {
    const url = `${API}?q=${city},${country}&units=metric&appid=${REACT_APP_WEATHER_APPID}`;

    return await axios.get(url);
};