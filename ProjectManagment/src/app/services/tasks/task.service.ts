import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Percentage, Task } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = `${environment.apiBaseUrl}/tasks`;
  constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(this.url);
    }

    getTasksWithNoProject(): Observable<Task[]> {
      return this.http.get<Task[]>(`${this.url}/no_project`);
    }

    getCompletedTasks(): Observable<number> {
      return this.http.get<number>(`${this.url}/completed_tasks`);
    }

    getPendingTasks(): Observable<number> {
      return this.http.get<number>(`${this.url}/pending_tasks`);
    }

    getOnCourseTasks(): Observable<number> {
      return this.http.get<number>(`${this.url}/onCourse_tasks`);
    }

    getPercentagesTasks(): Observable<Percentage> {
      return this.http.get<Percentage>(`${this.url}/percentage`);
    }

    getTaskById(id: number): Observable<Task> {
      return this.http.get<Task>(`${this.url}/${id}`);
    }
  
    getTaskSubTaskById(id: number): Observable<Task> {
      return this.http.get<Task>(`${this.url}/collection/${id}`);
    }
  
    createTask(project: Task): Observable<Task> {
      return this.http.post<Task>(this.url, project);
    }
  
    updateTask(id: number, project: Task): Observable<void> {
      return this.http.put<void>(`${this.url}/${id}`, project)
    }
  
    deleteTask(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`)
    }
}
