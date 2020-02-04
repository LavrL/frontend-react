import React, { Component } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Home from "../Home/Home";
import { createBrowserHistory } from 'history';
import './App.css';

export const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    console.log('creating ...');
  }

  render() {
    return (
      <React.Fragment >
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/home" />)} />
            <Route path="/home" component={Home} ></Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
