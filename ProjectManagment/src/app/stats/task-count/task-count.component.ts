import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task-count',
  templateUrl: './task-count.component.html',
  styleUrls: ['./task-count.component.css']
})
export class TaskCountComponent implements OnInit {
  completed: number;
  pending: number;
  onCourse: number;
  isLoading: boolean;
  errorMessage: string;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadCompleted();
    this.loadOnCourse();
    this.loadPending();
  }

  loadCompleted() {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getCompletedTasks().subscribe({
      next: (completed) => {
        this.completed = completed;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Error al recuperar datos: ";
        this.isLoading = false;
        console.error(this.errorMessage + error);
      }
    })
  }

  loadPending() {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getPendingTasks().subscribe({
      next: (pending) => {
        this.pending = pending;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Error al recuperar datos: ";
        this.isLoading = false;
        console.error(this.errorMessage + error);
      }
    })
  }

    loadOnCourse() {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getOnCourseTasks().subscribe({
      next: (onCourse) => {
        this.onCourse = onCourse;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Error al recuperar datos: ";
        this.isLoading = false;
        console.error(this.errorMessage + error);
      }
    })
  }

}
