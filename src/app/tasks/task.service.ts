import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly;

  constructor() { }

  addTask(taskData: { title: string, description: string }) {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      status: 'OPEN' as TaskStatus,
    };

    this.tasks.set([...this.tasks(), newTask]);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    }));

  }
}
