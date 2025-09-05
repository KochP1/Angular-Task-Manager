import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectTasks } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/projects/project.service';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  project: ProjectTasks;
  id: number;
  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadProject(this.id);
  }

  loadProject(id: number) {
    this.isLoading = true;
    this.errorMessage = "";

    this.projectService.getProjectCollectionById(id).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
        console.log(this.project)
      },
      error: (error) => {
        this.errorMessage = "Error al obtener proyeto: "
        this.isLoading = false;
        console.error(this.errorMessage + error);
      }
    });
  }

  detailTask(id: number) {
    this.router.navigate([`detail_tasks/${id}`]);
  }

  delete(id: number) {
    if (confirm("Estas seguro de que quieres eliminar la Tarea?, podria tener subtareas")) {
      this.isLoading = true;
      this.errorMessage = "";

      this.taskService.deleteTask(id).subscribe({
        next: () => {
          alert(`Tarea eliminado`);
          this.project.tasks = this.project.tasks.filter(task => task.id !== id);
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = "Error al eliminar Tarea: ";
          this.isLoading = false;
          console.error(this.errorMessage + error);
        }
      })
    }
  }

}
