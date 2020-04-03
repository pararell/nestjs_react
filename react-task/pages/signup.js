import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

import { inject } from 'mobx-react';
import ErrorMessage from '../components/ErrorMessage';
import Router from 'next/router';

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
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: null,
    };
  }

  submit = async () => {
    const { username, password } = this.state;

    try {
      await this.props.userStore.signup(username, password);
      Router.push('/signin');
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div style={FullscreenWrapper}>
        <div style={FormContainer}>
          <h1>Join us!</h1>
          <p>Start managing tasks easily.</p>

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
          <p>
            Passwords must contain at least 1 upper case letter, 1 lower case letter and one number OR special charracter.
          </p>
          <hr/>
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              SIGN UP
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
