import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubTask } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubTaskService {

  url = `${environment.apiBaseUrl}/subTasks`;
  constructor(private http: HttpClient) { }

  crearSubTask(subTask: SubTask): Observable<SubTask> {
    return this.http.post<SubTask>(this.url, subTask);
  }

  getSubTaskById(id: number) {
    return this.http.get<SubTask>(`${this.url}/${id}`);
  }

  deleteSubTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updateTask(id: number, updatedSubTask: SubTask): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, updatedSubTask)
  }
}
