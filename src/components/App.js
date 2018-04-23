import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Landing from './Landing';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';

import * as routes from '../constants/routes';
import { firebase } from '../firebase';

class App extends Component {
  constructor(props) {
    super(props);
    // if user is authenticated and/or currently signed in
    this.state = { authUser: null };
  }

  // if user signs out, authUser is null
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <Route exact path={routes.HOME} component={() => <Home />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUp />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignIn />} />
          <Route exact path={routes.LANDING} component={() => <Landing />} />
        </div>
      </Router>
    );
  }
}

export default App;
