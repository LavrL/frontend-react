import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Home from "../Home/Home";
import { createBrowserHistory } from 'history';
import './App.css';

export const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    console.log('Creating ...');
  }

  render() {
    return (
      <React.Fragment >
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} ></Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
