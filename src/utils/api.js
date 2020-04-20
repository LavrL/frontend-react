export const API = 'https://api.openweathermap.org/data/2.5/weather';

export const api1 = (city, country, REACT_APP_WEATHER_APPID) => {
    return fetch(`${API}?q=${city},${country}&units=metric&appid=${REACT_APP_WEATHER_APPID}`)
        .then(res => { return res.json() });

};
