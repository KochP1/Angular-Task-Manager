import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubTask, Task } from 'src/app/interfaces/interfaces';
import { SubTaskService } from 'src/app/services/subTasks/sub-task.service';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-actualizar-sub-tasks',
  templateUrl: './actualizar-sub-tasks.component.html',
  styleUrls: ['./actualizar-sub-tasks.component.css']
})
export class ActualizarSubTasksComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  subTask: SubTask;
  form: FormGroup;
  id: number;
  tasks: Task[];

  constructor(private subTaskService: SubTaskService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private taskService: TaskService) {
    this.form = this.fb.group({
          description: ['', [Validators.required, Validators.maxLength(80)]],
          isCompleted: [true, [Validators.required]],
          idTask: ['', [Validators.required]]
      })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadSubTasks(this.id);
    this.loadTasks();
  }

  editTask(id: number) {
    this.isLoading = true;
    this.errorMessage = '';

    const formValues = this.form.value;

    let isCompleted = true;

    if(this.form.value.isCompleted === 'false') {
      isCompleted = false;
    }

    if (this.form.valid) {
      const updatedTask: SubTask = {
        description: formValues.description,
        isCompleted: isCompleted,
        idTask: formValues.idTask
      }

      console.log(updatedTask)

      this.subTaskService.updateTask(id, updatedTask).subscribe({
        next: () => {
          alert("La sub tarea fue actualizado");
          this.isLoading = false;
          this.router.navigate([`detail_tasks/${updatedTask.idTask}`]);
        },
        error: (error) => {
          this.errorMessage = "Error al actualizar sub tarea";
          alert(this.errorMessage);
          this.isLoading = false;
          console.error(this.errorMessage + error);
        }
      });
    }
  }

  loadSubTasks(id: number) {
    this.isLoading = true;
    this.errorMessage = "";

    this.subTaskService.getSubTaskById(id).subscribe({
      next: (subTask) => {
        this.subTask = subTask;
        this.cargarDatosAlFormulario();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Error al obtener sub-tarea: ";
        this.isLoading = false;
        console.error(this.errorMessage + error)
      }
    })
  }

  loadTasks() {
    this.isLoading = true;
    this.errorMessage = "";

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Error al obtener tareas: ";
        this.isLoading = false;
        console.error(this.errorMessage + error)
      }
    })
  }


  cargarDatosAlFormulario() {
    if (this.subTask) {
      this.form.patchValue({
        description: this.subTask.description,
        isCompleted: this.subTask.isCompleted,
        idTask: this.subTask.idTask,
      });
    }
  }

}
