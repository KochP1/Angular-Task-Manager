import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/projects/project.service';

@Component({
  selector: 'app-actualizar-project',
  templateUrl: './actualizar-project.component.html',
  styleUrls: ['./actualizar-project.component.css']
})
export class ActualizarProjectComponent implements OnInit {
  isLoading : boolean;
  errorMessage: string;
  actForm: FormGroup;
  project: Project;
  id: number;
  
  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService, private fb: FormBuilder) { 
    this.actForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(80)]]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadProject(this.id);
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

    if (this.actForm.valid) {
      const formValues = this.actForm.value;
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
      this.actForm.patchValue({
        name: this.project.name,
        description: this.project.description
      });
    }
  }

}
