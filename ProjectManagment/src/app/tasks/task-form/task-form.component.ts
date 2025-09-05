import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, SubTask, Task } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/projects/project.service';
import { SubTaskService } from 'src/app/services/subTasks/sub-task.service';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  taskForm: FormGroup;
  taskId?: number;
  projects: Project[];

  constructor(
    private taskService: TaskService,
    private subTaskService: SubTaskService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      status: ['Pendiente', [Validators.required]],
      dueDate: ['', [Validators.required]],
      idProject: [''],
      subTasks: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['id'];
    this.loadProjects();
  }

  get subTasks(): FormArray {
    return this.taskForm.get('subTasks') as FormArray;
  }

  createSubTaskGroup(subTask?: SubTask): FormGroup {
    return this.fb.group({
      description: [subTask?.description || '', [Validators.required, Validators.maxLength(200)]],
      isCompleted: [subTask?.isCompleted || false],
      id: [subTask?.id]
    });
  }

  addSubTask(): void {
    this.subTasks.push(this.createSubTaskGroup());
  }

  removeSubTask(index: number): void {
    this.subTasks.removeAt(index);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formValue = this.taskForm.value;
      console.log(formValue.idProject);
      const taskData: Task = {
        title: formValue.title,
        description: formValue.description,
        status: formValue.status,
        dueDate: formValue.dueDate,
        idProject: parseInt(formValue.idProject) || null
      };
      console.log(taskData);
      this.createTask(taskData);

    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }

  loadProjects() {
    this.isLoading = true;
    this.errorMessage = "";

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
        console.log(this.projects);
      },
      error: (error) => {
        this.errorMessage = "Error al obtener proyectos: ";
        this.isLoading = false;
        console.error(this.errorMessage + error)
      }
    })
  }

  createTask(taskData: Task): void {
    this.taskService.createTask(taskData).subscribe({
      next: (createdTask) => {
        this.createSubTasks(createdTask.id!);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al crear la tarea';
        alert(this.errorMessage);
        console.error(error)
      }
    });
  }

  createSubTasks(taskId: number): void {
    const subTasks = this.taskForm.value.subTasks;
    if (subTasks && subTasks.length > 0) {
      const subTaskRequests = subTasks.map((subTask: any) => {
        const subTaskData: SubTask = {
          description: subTask.description,
          isCompleted: subTask.isCompleted,
          idTask: taskId
        };
        return this.subTaskService.crearSubTask(subTaskData).toPromise();
      });

      Promise.all(subTaskRequests)
        .then(() => {
          this.isLoading = false;
          alert('Tarea creada exitosamente');
          this.router.navigate(['/tasks']);
        })
        .catch((error) => {
          this.isLoading = false;
          this.errorMessage = 'Error al crear subtareas';
          alert(this.errorMessage);
          console.error(error);
        });
    } else {
      this.isLoading = false;
      alert('Tarea creada exitosamente');
      this.router.navigate(['/tasks']);
    }
  }
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl: any) => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

}
