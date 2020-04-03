import React, { Component } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { inject } from 'mobx-react';
import Link from 'next/link';


@inject('tasksStore')
class Task extends Component {
  deleteTask = () => {
    this.props.tasksStore.deleteTask(this.props.id);
  };

  handleStatusChange = e => {
    this.props.tasksStore.updateTaskStatus(this.props.id, e.target.value, this.props.type);
  };

  render() {
    const { id, title, description } = this.props;

    return (
      <div>
        <Card>
          <CardContent>
            <h1>{title}</h1>
            {description}
          </CardContent>
          <CardActions style={{ padding: '14px' }} disableSpacing>
            <Grid
              justify="space-between" // Add it here :)
              container
            >
              <Grid item>
                <FormControl style={{ width: '140px' }}>
                  <Select
                    value={this.props.status}
                    onChange={this.handleStatusChange}
                    displayEmpty
                  >
                    <MenuItem value={'OPEN'}>Open</MenuItem>
                    <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                    <MenuItem value={'DONE'}>Done</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <Link href="/tasks/[id]" as={`/tasks/${id}`}>
                  <a>Task detail</a>
                </Link>
              </Grid>

              <Grid item>
                <IconButton onClick={this.deleteTask}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Task;
