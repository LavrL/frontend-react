import React from 'react';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './Home.css';
import ProfilePage from '../ProfilePage/ProfilePage';
// import PropertiesPage from '../PropertiesPage/PropertiesPage';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import Weather from '../Weather/Weather';
import Calculator from '../Calculator/Calculator';
import Movies from '../Movies/Movies';

const routes = [
    {
        path: "/properties",
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
        main: () => homepage()
    },
    
]

function homepage() {
    return (
        <React.Fragment>
            <h2>Welcome to home page</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Porro, voluptate aliquam. Laborum vero, asperiores alias
                iure odio expedita cupiditate reiciendis nobis aliquam dolor,
                ex dolorem ipsa sit iste nihil deleniti? Esse distinctio in,
                ratione magni beatae quam perspiciatis? Libero tenetur eaque
                rem sequi voluptas repudiandae nobis? Voluptas neque quis
                repudiandae error nam est illo harum voluptatem veritatis quos enim,
                eveniet distinctio dolorum voluptatibus mollitia hic exercitationem
                beatae dignissimos. Libero doloremque laboriosam minima ut aut numquam,
                at quas possimus! Asperiores quasi nobis adipisci dignissimos
                exercitationem nulla eligendi nemo aliquam sed architecto, esse quia
                iusto cumque explicabo sapiente. Rem cupiditate quasi eveniet.</p>
        </React.Fragment>
    )
}

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
                                    <p><Link className="menuBar__options-content-link" to="/properties">Movie</Link></p>
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