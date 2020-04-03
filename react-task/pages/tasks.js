import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SignOutIcon from '@material-ui/icons/ExitToApp'
import Router from 'next/router';

import Task from '../components/Task';
import TasksFilters from '../components/TasksFilters';

const TasksWrapper = {
  width: '100%',
  maxWidth: '860px',
  margin: 'auto',
  padding: '20px',
  boxSizing: 'border-box'
};

const TasksHeader = {
  display: 'flex',
  justifyContent: 'center',
  borderBottom: '3px solid #757c87'
};

const CreateButtonContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
};

const EmptyTasksPlaceholder = {
  color: '#edf4ff',
  textAlign: 'center',
  fontSize: '22px'
};


@inject('tasksStore', 'userStore')
@observer
class TasksPage extends Component {
  componentDidMount() {
    this.props.tasksStore.fetchTasks();
  }

  handleSignOut = () => {
    const { userStore, tasksStore } = this.props;
    userStore.signout();
    tasksStore.resetTasks();
    Router.push('/signin');
  };

  renderTasks = () => {
    const { tasksStore } = this.props;

    if (!tasksStore.tasks.length) {
      return <p style={EmptyTasksPlaceholder}>No tasks available. Create one?</p>
    }

    return tasksStore.tasks.map(task => (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
        type='tasks'
      />
    ));
  };

  render() {
    return (
      <div style={TasksWrapper}>
        <div style={TasksHeader}>
          <h1>Get things done.</h1>

          <div style={CreateButtonContainer}>
            <Fab
              variant="extended"
              onClick={() => Router.push('/tasks/create')}
            >
              <AddIcon />
              Create Task
            </Fab>

            <div>
              <IconButton onClick={this.handleSignOut}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </div>
          </div>
        </div>

        <TasksFilters />

        <div style={{padding: '20px'}}>
          {this.renderTasks()}
        </div>
      </div>
    );
  }
}

export default TasksPage;
