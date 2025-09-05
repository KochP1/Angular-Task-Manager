import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/projects/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isLoading: boolean;
  errorMessage: string;

  constructor(private projectService: ProjectService, private router: Router, private fb: FormBuilder) { 
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(80)]],
    });
  }

  ngOnInit(): void {
  }

  post() {
    this.isLoading = true;
    this.errorMessage = "";

    if (this.projectForm.valid) {
      const formValues = this.projectForm.value;

      const newProject: Project = {
        name: formValues.name,
        description: formValues.description
      }

      this.projectService.createProject(newProject).subscribe({
        next: () => {
          alert("Proyecto creado");
          this.isLoading = false;
          this.router.navigate(["projects"]);
        },
        error: (error) => {
          this.errorMessage = "Error al crear el proyecto: ";
          this.isLoading = false;
          console.error(this.errorMessage + error);
        }
      })
    }
  }

}
