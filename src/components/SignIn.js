import React, { Component } from 'react';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState({ error: error });
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
        />

        <input
          tye="password"
          placeholder="Password"
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
        />

        <button type="submit">Sign In</button>
      </form>
    );
  }
}

export default SignIn;
