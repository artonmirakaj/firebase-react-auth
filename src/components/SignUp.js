import React, { Component } from 'react';
import { Link, history } from 'react-router-dom';

import * as routes from '../constants/routes';
import { auth } from '../firebase';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState('error', error);
      });
    event.preventDefault();
  }

  render() {
    const { email, password, error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
        />

        <input
          tye="password"
          placeholder="password"
          value={password}
          onChange={event => this.setState({ password: event.target.value })}
        />

        <button type="submit">Sign Up</button>

        {error && <p>{error.message}</p>}

        <p>
          <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
      </form>
    );
  }
}

export default SignUp;
