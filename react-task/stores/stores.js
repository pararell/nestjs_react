import { useStaticRendering } from 'mobx-react';

import TasksStore from './tasks.store';
import UserStore from './user.store';

import AuthService from '../services/auth.service';
import TasksService from '../services/tasks.service';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let stores = null;

export default function initializeStore() {
    const tasksService = new TasksService();
    const authService = new AuthService();

    if (isServer) {
      return {
        tasksStore: new TasksStore(tasksService),
        userStore: new UserStore(authService)
      };
    }
    if (stores === null) {
      stores = {
        tasksStore: new TasksStore(tasksService),
        userStore: new UserStore(authService)
      };
    }

    return stores;
  }