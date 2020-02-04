import React from 'react';
import './Header.css';

const Header = ({ text }) => {
    return (
        <header>
            <h2 className="header__text">{text}</h2>
        </header>
    )
}

export default Header;
