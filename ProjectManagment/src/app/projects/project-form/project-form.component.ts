import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  action: number;
  project: Project;
  id: number;

  constructor(private projectService: ProjectService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { 
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(80)]],
    });
  }

  ngOnInit(): void {
    this.action = this.route.snapshot.params['action'];

    if (this.action == 2) {
      this.id = this.route.snapshot.params['id'];
      this.loadProject(this.id);
    }
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

    loadProject(id: number) {
    this.isLoading = true;
    this.errorMessage = "";

    this.projectService.getProjectById(id).subscribe({
      next: (project) => {
        this.project = project;
        this.cargarDatosAlFormulario();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Error al obtener proyeto: "
        this.isLoading = false;
        console.error(this.errorMessage + error);
      }
    });
  }

  editProject(id: number) {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.projectForm.valid) {
      const formValues = this.projectForm.value;
      const updatedProject: Project = {
        name: formValues.name,
        description: formValues.description,
      }

      this.projectService.updateProjects(id, updatedProject).subscribe({
        next: () => {
          alert("El proyecto fue actualizado");
          this.isLoading = false;
          this.router.navigate(['projects']);
        },
        error: (error) => {
          this.errorMessage = "Error al actualizar Proyecto";
          alert(this.errorMessage);
          this.isLoading = false;
          console.error(this.errorMessage + error);
        }
      });
    }
  }

  cargarDatosAlFormulario() {
    if (this.project) {
      this.projectForm.patchValue({
        name: this.project.name,
        description: this.project.description
      });
    }
  }

}
