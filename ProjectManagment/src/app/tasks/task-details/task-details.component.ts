import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/interfaces';
import { SubTaskService } from 'src/app/services/subTasks/sub-task.service';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  isLoading: boolean;
  errorMessage: string;
  task: Task;
  id: number;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private subTaskService: SubTaskService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadTask(this.id);
  }

    loadTask(id: number) {
    this.isLoading = true;
    this.errorMessage = "";

    this.taskService.getTaskSubTaskById(id).subscribe({
      next: (task) => {
        this.task = task;
        this.isLoading = false;
        console.log(this.task)
      },
      error: (error) => {
        this.errorMessage = "Error al obtener la tarea: "
        this.isLoading = false;
        console.error(this.errorMessage + error);
      }
    });
  }

  delete(id: number) {
    if (confirm("Estas seguro de que quieres eliminar la sub-tarea?")) {
      this.isLoading = true;
      this.errorMessage = "";

      this.subTaskService.deleteSubTask(id).subscribe({
        next: () => {
          alert(`Tarea eliminado`);
          this.task.subTasks = this.task.subTasks.filter(st => st.id !== id);
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = "Error al eliminar la sub-tarea: ";
          this.isLoading = false;
          console.error(this.errorMessage + error);
        }
      })
    }
  }

  update(id: number) {
    this.router.navigate([`update_subTask/${id}`]);
  }

  subTask(id:number) {
    this.router.navigate([`create_Subtasks/${id}`]);
  }

}
