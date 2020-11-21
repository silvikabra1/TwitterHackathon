import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reactLogo from './logo-react.svg';
import djangoLogo from './logo-django.svg';
import HomePage from './pages/HomePage';


class App extends Component {
  render() {
    return (
        <main>
          <Router>
              <Switch>
                <Route exact path="/home" component={HomePage} />
              </Switch>
          </Router>
        </main>
    );
  }
}

export default App;
