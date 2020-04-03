import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

import Router from 'next/router';
import { inject } from 'mobx-react';
import ErrorMessage from '../components/ErrorMessage';


const FormContainer = {
  maxWidth: '480px',
  width: '100%',
  backgroundColor: '#edf4ff',
  padding: '30px',
  borderRadius: '5px'
}

const FullscreenWrapper  = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

@inject('userStore')
 class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMesssage: null,
    };
  }

  submit = async () => {
    this.setState({ errorMessage: null });
    const { username, password } = this.state;

    try {
      await this.props.userStore.signin(username, password);
      Router.push('/tasks');
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  goToSignUp = () => {
    Router.push('/signup')
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div style={FullscreenWrapper}>
        <div style={FormContainer}>
          <h1>Hello!</h1>
          <p>Fill in your username and password to sign in.</p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <TextField
              id="outlined-name"
              label="Username"
              margin="dense"
              variant="outlined"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <TextField
              id="outlined-name"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <hr/>
          <div>
            <Button
              style={{ marginBottom: '10px' }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              SIGN IN
            </Button>

            <Button fullWidth onClick={this.goToSignUp}>
              Don't have an account? Sign up now!
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
