import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reactLogo from './logo-react.svg';
import djangoLogo from './logo-django.svg';
import HomePage from './pages/HomePage';
import SlideshowPage from './pages/SlideshowPage';
import UserPage from './pages/UserPage';


class App extends Component {
  render() {
    return (
        <main>
          <Router>
              <Switch>
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/impact" component={SlideshowPage} />
                <Route exact path="/user/:screenName" component={UserPage} />
              </Switch>
          </Router>
        </main>
    );
  }
}

export default App;
