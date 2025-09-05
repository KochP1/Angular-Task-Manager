import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectTasks } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = `${environment.apiBaseUrl}/projects`;

  constructor(private http: HttpClient) {  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  getProjectCollectionById(id: number): Observable<ProjectTasks> {
    return this.http.get<ProjectTasks>(`${this.url}/collection/${id}`);
  }

  getProjectById(id: number): Observable<ProjectTasks> {
    return this.http.get<ProjectTasks>(`${this.url}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project);
  }

  updateProjects(id: number, project: Project): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, project)
  }

  deleteProjects(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }
}
