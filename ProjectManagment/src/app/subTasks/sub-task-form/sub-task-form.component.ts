import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubTask, Task } from 'src/app/interfaces/interfaces';
import { SubTaskService } from 'src/app/services/subTasks/sub-task.service';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-sub-task-form',
  templateUrl: './sub-task-form.component.html',
  styleUrls: ['./sub-task-form.component.css']
})
export class SubTaskFormComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  form: FormGroup;
  tasks: Task[] = [];
  id: number;
  constructor(private taskService: TaskService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private subTaskService: SubTaskService) { 
    this.form = this.fb.group({
          description: ['', [Validators.required, Validators.maxLength(80)]],
          isCompleted: [true, [Validators.required]],
      })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
  }

  crear() {
    this.isLoading = true;
    this.errorMessage = '';

    const formValues = this.form.value;

    let isCompleted = true;

    if(this.form.value.isCompleted === 'false') {
      isCompleted = false;
    }

    if (this.form.valid) {
      const subTask: SubTask = {
        description: formValues.description,
        isCompleted: isCompleted,
        idTask: this.id
      }

      this.subTaskService.crearSubTask(subTask).subscribe({
        next: () => {
          alert("La sub tarea fue creada");
          this.isLoading = false;
          this.router.navigate([`detail_tasks/${subTask.idTask}`]);
        },
        error: (error) => {
          this.errorMessage = "Error al actualizar sub tarea";
          alert(this.errorMessage);
          this.isLoading = false;
          console.error(this.errorMessage + error);
        }
      })
    }
  }

}
