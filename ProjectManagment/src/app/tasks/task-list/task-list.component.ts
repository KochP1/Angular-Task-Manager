import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/interfaces';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  isLoding: boolean;
  errorMessage: string;
  tasks: Task[] = [];
  constructor(private taskSrvice: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

    loadTasks() {
    this.isLoding = true;
    this.errorMessage = "";

    this.taskSrvice.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoding = false;
        console.log(this.tasks);
      },
      error: (error) => {
        this.errorMessage = "Error al obtener proyectos: ";
        this.isLoding = false;
        console.error(this.errorMessage + error)
      }
    })
  }

  detail_task(id: number) {
    this.router.navigate([`detail_tasks/${id}`]);
  }

  editTask(id: number) {
    this.router.navigate([`update_task/${id}`])
  }

  delete(id: number) {
    if (confirm("Estas seguro de que quieres eliminar la Tarea?, podria tener subtareas")) {
      this.isLoding = true;
      this.errorMessage = "";

      this.taskSrvice.deleteTask(id).subscribe({
        next: () => {
          alert(`Tarea eliminado`);
          this.tasks = this.tasks.filter(project => project.id !== id);
          this.isLoding = false;
        },
        error: (error) => {
          this.errorMessage = "Error al eliminar Tarea: ";
          this.isLoding = false;
          console.error(this.errorMessage + error);
        }
      })
    }
  }

}
