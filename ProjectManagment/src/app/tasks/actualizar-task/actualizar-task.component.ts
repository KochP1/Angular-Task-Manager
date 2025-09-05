import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Task } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/projects/project.service';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-actualizar-task',
  templateUrl: './actualizar-task.component.html',
  styleUrls: ['./actualizar-task.component.css']
})
export class ActualizarTaskComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  form: FormGroup;
  task:Task;
  projects: Project[]
  id: number;

  constructor(private taskService: TaskService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private projectService: ProjectService) { 
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(80)]],
      status: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      idProject: ['']
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadProjects();
    this.loadTasks(this.id);
  }

  loadTasks(id: number) {
    this.isLoading = true;
    this.errorMessage = "";

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;
        this.cargarDatosAlFormulario();
        this.isLoading = false;
        console.log(this.task);
      },
      error: (error) => {
        this.errorMessage = "Error al obtener tarea: ";
        this.isLoading = false;
        console.error(this.errorMessage + error)
      }
    })
  }

  loadProjects() {
    this.isLoading = true;
    this.errorMessage = "";

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Error al obtener proyectos: ";
        this.isLoading = false;
        console.error(this.errorMessage + error)
      }
    })
  }

  editTask(id: number) {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.form.valid) {
      const formValues = this.form.value;
      const updatedTask: Task = {
        title: formValues.title,
        description: formValues.description,
        status: formValues.status,
        dueDate: formValues.dueDate,
        idProject: formValues.idProject
      }

      if(formValues.idProject == '') {
        updatedTask.idProject = null;
      }

      this.taskService.updateTask(id, updatedTask).subscribe({
        next: () => {
          alert("La tarea fue actualizado");
          this.isLoading = false;
          this.router.navigate(['tasks']);
        },
        error: (error) => {
          this.errorMessage = "Error al actualizar tarea";
          alert(this.errorMessage);
          this.isLoading = false;
          console.error(this.errorMessage + error);
        }
      });
    }
  }

  cargarDatosAlFormulario() {
    if (this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        dueDate: this.task.dueDate,
        idProject: this.task.idProject,
      });
    }
  }

}
