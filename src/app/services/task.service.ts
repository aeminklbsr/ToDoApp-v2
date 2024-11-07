import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';  // Task modelini import ediyoruz
import { CreateTask } from '../models/createtask.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://freeapi.miniprojectideas.com/api/JWT/GetAllTaskList';
  private createTaskUrl = 'https://freeapi.miniprojectideas.com/api/JWT/CreateNewTask';
  private updateTaskUrl = 'https://freeapi.miniprojectideas.com/api/JWT/UpdateTask';
  private deleteTaskUrl = 'https://freeapi.miniprojectideas.com/api/JWT/DeleteTask';


  constructor(private http: HttpClient) {}

  getTasks(): Observable<{ message: string; result: boolean; data: Task[] }> {
    return this.http.get<{ message: string; result: boolean; data: Task[] }>(this.apiUrl);
  }

  createTask(task: CreateTask): Observable<{ message: string; result: boolean; data: Task }> {
    return this.http.post<{ message: string; result: boolean; data: Task }>(this.createTaskUrl, task);
  }

  updateTask(task: Task): Observable<{ message: string; result: boolean; data: Task }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // JSON formatında veri gönderdiğimizi belirtir
    });
    return this.http.put<{ message: string; result: boolean; data: Task }>(
      this.updateTaskUrl,
      task,
      { headers }
    );
  }

  deleteTask(itemId: number): Observable<{ message: string; result: boolean }> {
    // Silme isteği için URL parametresi ekliyoruz
    const params = new HttpParams().set('itemId', itemId.toString());
    return this.http.delete<{ message: string; result: boolean }>(this.deleteTaskUrl, { params });
  }
}