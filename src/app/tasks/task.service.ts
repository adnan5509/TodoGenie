import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { LogService } from '../log.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  constructor(private logService: LogService) {
    const savedTask = localStorage.getItem('tasks');

    if (savedTask) {
      this.tasks.set(JSON.parse(savedTask));
    } else {
      this.getSampleTasks();
    }

  }

  addTask(taskData: { title: string, description: string }) {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      status: 'OPEN' as TaskStatus,
    };

    this.tasks.set([...this.tasks(), newTask]);
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));

    this.logService.log(`Task added: ${newTask.title}`);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    }));
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));

    this.logService.log(`This task status has been updated to : ${newStatus}`);
  }
  getSampleTasks() {
    const sampleTasks = [
      {
        title: 'Implement User Authentication for New Web Application',
        description: 'Develop and integrate a secure user authentication system for a new web application. This will include creating sign-up, login, and password recovery functionalities. The authentication process should be built with security best practices, using JWT (JSON Web Tokens) for token-based authentication and implementing a strong password policy.',
      },
      {
        title: 'Set Up CI/CD Pipeline for E-commerce Platform',
        description: 'Create a Continuous Integration and Continuous Deployment (CI/CD) pipeline for an e-commerce platform. The pipeline should automate testing, building, and deployment processes to production. This should include setting up GitHub Actions and integrating with AWS for automatic deployment to EC2 instances.',
      },
      {
        title: 'Build Product Recommendation System',
        description: 'Develop a machine learning-based product recommendation system for an online store. The system should use collaborative filtering or content-based filtering to suggest relevant products to users based on their browsing and purchasing history.',
      },
      {
        title: 'Develop REST API for Mobile App',
        description: 'Design and implement a RESTful API to support the functionality of a mobile application. The API should include endpoints for user management, data retrieval, and transactions. Ensure that the API is secure and follows REST best practices.',
      },
      {
        title: 'Upgrade Website UI/UX Design',
        description: 'Redesign the user interface and user experience of an existing website to improve accessibility, speed, and overall design. The new design should be responsive, visually appealing, and optimized for both desktop and mobile users.',
      }
    ];

    const tasksWithIds = sampleTasks.map((task) => ({
      ...task,
      id: uuidv4(),
      status: 'OPEN' as TaskStatus,
    }));
    this.tasks.set(tasksWithIds);
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}

