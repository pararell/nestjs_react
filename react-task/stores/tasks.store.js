import { observable, action } from 'mobx';

export default class TasksStore {
  @observable task = null;
  @observable tasks = [];
  @observable filters = { status: '', search: '' };

  constructor(tasksService) {
    this.tasksService = tasksService;
  }

  updateFilters({ status, search }) {
    this.filters.status = status;
    this.filters.search = search;
    this.fetchTasks();
  }

  @action
  resetTasks() {
    this.tasks = [];
  }

  @action
  async fetchTasks() {
    const result = await this.tasksService.fetchTasks(this.filters);

    if (result) {
      this.tasks = result.data;
    }
  }

  @action
  async fetchTask(id) {
    this.task = null;
    const result = await this.tasksService.fetchTask(id);

    if (result) {
      this.task = result.data;
    }
  }

  @action
  async createTask(title, description) {
    const result = await this.tasksService.createTask(title, description);

    if (result) {
      this.tasks.push(result.data);
    }
  }

  @action
  async deleteTask(id) {
    const idx = this.tasks.findIndex(task => task.id === id);
    await this.tasksService.deleteTask(id);
    this.tasks.splice(idx, 1);
  }

  @action
  async updateTaskStatus(id, status, type) {
    const task = type === 'task' ? this.task : this.tasks.find(task => task.id === id);
    await this.tasksService.updateTaskStatus(id, status);
    task.status = status;
  }
}
