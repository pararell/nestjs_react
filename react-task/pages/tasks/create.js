import React, { Component } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';
import Router from 'next/router';


const FormWrapper = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const FormContainer = {
  maxWidth: '480px',
  width: '100%',
  backgroundColor: '#edf4ff',
  padding: '30px',
  borderRadius: '5px'
}

@inject('tasksStore')
class CreateTaskPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      errorMessage: null,
    };
  }

  handleSubmitTask = async () => {
    const { tasksStore } = this.props;
    const { title, description } = this.state;

    try {
      await tasksStore.createTask(title, description);
      Router.push('/tasks');
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    return (
      <div style={FormWrapper}>
        <div style={FormContainer}>
          <h1>Create a new task</h1>
          <p>Provide information about the task you wish to complete.</p>

          { this.state.errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <FormControl fullWidth>
            <TextField
              label="Title"
              placeholder="Title"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Description"
              placeholder="Description"
              multiline
              rows="8"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ description: e.target.value })}
            />
          </FormControl>

          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmitTask}
          >
            CREATE TASK
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateTaskPage;
