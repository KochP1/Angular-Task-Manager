import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/projects/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  isLoding: boolean;
  errorMessage: string;
  projects: Project[] = [];
  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoding = true;
    this.errorMessage = "";

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoding = false;
        console.log(this.projects);
      },
      error: (error) => {
        this.errorMessage = "Error al obtener proyectos: ";
        this.isLoding = false;
        console.error(this.errorMessage + error)
      }
    })
  }

  editProject(id: number) {
    this.router.navigate([`update_projects/${id}`]);
  }

  detail_project(id: number) {
    this.router.navigate([`detail_projects/${id}`]);
  }

  delete(id: number) {
    if (confirm("Estas seguro de que quieres eliminar el proyecto?")) {
      this.isLoding = true;
      this.errorMessage = "";

      this.projectService.deleteProjects(id).subscribe({
        next: () => {
          alert(`Proyecto eliminado`);
          this.projects = this.projects.filter(project => project.id !== id);
          this.isLoding = false;
        },
        error: (error) => {
          this.errorMessage = "Error al eliminar proyecto: ";
          this.isLoding = false;
          console.error(this.errorMessage + error);
        }
      })
    }
  }

}
