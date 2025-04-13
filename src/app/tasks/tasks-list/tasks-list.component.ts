import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { TASK_STATUS_OPTION, TaskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionsProvider]
})
export class TasksListComponent {

  constructor(private taskService: TaskService) { }

  taskStatusOptions = inject(TASK_STATUS_OPTION);

  selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.taskService.allTasks().filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.taskService.allTasks().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService.allTasks().filter((task) => task.status === 'DONE');
      default:
        return this.taskService.allTasks();
    }

  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
