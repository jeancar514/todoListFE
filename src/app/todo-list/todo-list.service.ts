import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  Task } from './models/task';
import { RequestBodyComplete } from './models/task';




@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private readonly baseUri = environment.baseUrl;
  private readonly  getAllTasksUrl = 'task';
  private readonly  createTaskUrl = 'task/create';
  private readonly  deleteTaskUrl = 'task/delete';
  private readonly  updateTaskCompletedUrl = 'task/completed';

  constructor(
    private http: HttpClient,
    ) {}


  getTasks(): Observable<Task[]> {
      const headers = new HttpHeaders()
          .append('Accept', 'application/json')
          .append('Content-Type', 'application/json');

      return this.http.get(`${this.baseUri + this.getAllTasksUrl }`, {headers})
          .pipe(
            map((result:any) => {
              return result;
      }));
  }

  deleteTask(id:number): Observable<any> {
    const headers = new HttpHeaders()
        .append('Accept', 'application/json')
        .append('Content-Type', 'application/json');

    return this.http.delete(`${this.baseUri + this.deleteTaskUrl }/${id}`, {headers})
        .pipe(
          map((result:any) => {
            return result;
    }));
  }

  maskCompletedTask(body:RequestBodyComplete): Observable<any> {
    const headers = new HttpHeaders()
        .append('Accept', 'application/json')
        .append('Content-Type', 'application/json');

    return this.http.post(`${this.baseUri + this.updateTaskCompletedUrl }`, body, {headers})
        .pipe(
          map((result:any) => {
            return result;
    }));
  }

  createTask(body:Task): Observable<any> {
    const headers = new HttpHeaders()
        .append('Accept', 'application/json')
        .append('Content-Type', 'application/json');

        console.log(body)

    return this.http.post(`${this.baseUri + this.createTaskUrl }`, body, {headers})
        .pipe(
          map((result:any) => {
            return result;
    }));
  }




}
