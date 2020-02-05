import Calculator from '../Calculator/Calculator';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import Homepage from './HomePage';
import Movies from '../Movies/Movies';
import ProfilePage from '../ProfilePage/ProfilePage';
import PropertiesPage from '../PropertiesPage/PropertiesPage';
import React from 'react';
import Weather from '../Weather/Weather';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './Home.css';

const routes = [
    {
        path: "/properties",
        main: PropertiesPage
    },
    {
        path: "/movies",
        main: Movies
    },
    {
        path: "/profile",
        main: () => ProfilePage()
    },
    {
        path: "/currencyConverter",
        main: CurrencyConverter
    },
    {
        path: "/weather",
        main: Weather
    },
    {
        path: "/calculator",
        main: Calculator
    },
    {
        path: "/",
        main: Homepage
    },

]

const Home = () => {
    return (
        <Router>
            <div className="mainStyle">
                <div className="mainStyle__header">
                    <div className="header__title_middle">Apps on <span className="header__title_middle-bold">React+Redux</span></div>
                </div>

                <div className="mainStyle__container">
                    <div className="column-left">
                        <div className="column-left__menuBar ">
                            <div className="menuBar__options">
                                <div className="menuBar__options-content">
                                    <p><Link className="menuBar__options-content-link-first" to="/home">Home</Link></p>
                                    <p><Link className="menuBar__options-content-link" to="/properties">Addresses List</Link></p>
                                    <p><Link className="menuBar__options-content-link" to="/weather">Weather</Link></p>
                                    <p><Link className="menuBar__options-content-link" to="/movies">Movie</Link></p>
                                    <p><Link className="menuBar__options-content-link" to="/currencyConverter">Currency Converter</Link></p>
                                    <p><Link className="menuBar__options-content-link" to="/calculator">Calculator</Link></p>
                                    <p><Link className="menuBar__options-content-link" to="/profile">Social Card</Link></p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="column-right__profile">
                        <div className="column-right__content">
                            <div className="input-form__profile">
                                <form className="input-form__profile">
                                    <Switch>
                                        {routes.map((route, index) => (
                                            <Route key={index}
                                                path={route.path}
                                                children={<route.main />}
                                            />
                                        ))}
                                    </Switch>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Home;