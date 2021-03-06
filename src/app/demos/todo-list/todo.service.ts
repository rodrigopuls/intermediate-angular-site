import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './task';
import { Store } from './todo.store';
import { tap } from 'rxjs/operators';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient, private store: Store) { }

  getTodoList$: Observable<Task[]> = this.http
    .get<Task[]>('https://my-json-server.typicode.com/rodrigopuls/fake-json-server/todolist/')
    .pipe(
      tap(next => this.store.set('todolist', next)));

  /* getToDoList(): Observable<Task[]> {
    return this.http
      .get<Task[]>('http://localhost:3000/todolist');
  } */

  toggle(event: any) {
    this.http
      .put(`https://my-json-server.typicode.com/rodrigopuls/fake-json-server/todolist/${event.task.id}`, event.task)
      .subscribe(() => {

        const value = this.store.value.todolist;

        const todolist = value.map((task: Task) => {
          if (event.task.id === task.id) {
            return { ...task, ...event.task };
          } else {
            return task;
          }
        });

        this.store.set('todolist', todolist);
      });
  }

  adicionar(task: Task) {
    this.http
      .post('https://my-json-server.typicode.com/rodrigopuls/fake-json-server/todolist', task)
      .subscribe(() => {

        const value = this.store.value.todolist;

        task.id = value.slice(-1).pop().id + 1
        task.finalizado = false;
        task.iniciado = false;

        value.push(task);
        this.store.set('todolist', value);
      });
  }

  remover(id: number) {
    this.http
      .delete(`https://my-json-server.typicode.com/rodrigopuls/fake-json-server/todolist/${id}`)
      .subscribe(() => {

        const value = this.store.value.todolist.filter(item => item.id !== id);

        this.store.set('todolist', value);
      });
  }
}