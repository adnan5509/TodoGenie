import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export type TaskStatusOptionsType = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  label: string;
}[]

export const TASK_STATUS_OPTION = new InjectionToken<TaskStatusOptionsType>('task-status-options');

export const TaskStatusOptions: TaskStatusOptionsType = [{
  value: 'open',
  taskStatus: 'OPEN',
  label: 'Open',
}, {
  value: 'in-progress',
  taskStatus: 'IN_PROGRESS',
  label: 'In-Progress',
}, {
  value: 'done',
  taskStatus: 'DONE',
  label: 'Completed',
}
]


export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}


export const TaskStatusOptionsProvider: Provider = { provide: TASK_STATUS_OPTION, useValue: TaskStatusOptions }