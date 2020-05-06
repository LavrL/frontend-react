import React from 'react';

class Homepage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h2>Welcome to home page</h2>
                <p>Here you can find collection of small apps written on React, using </p>
                <ul>
                    <li>Redux</li>
                    <li>React Hooks</li>    
                    <li>Tests</li>    
                </ul>
                and bundled with Webpack.
                <p>Hope you enjoy it!</p>
            </React.Fragment>
        )
    }
}

export default Homepage;