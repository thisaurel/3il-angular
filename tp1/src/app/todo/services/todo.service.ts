import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { TaskStatus } from '../enums/task-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private tasks: Task[] = [];

  constructor() { }

  public getAll(): Task[] {
    return this.tasks;
  }

  public getById(id: number): Task {
    return this.tasks.find((t) => t.id == id);
  }

  public add(task: Task) {
    this.tasks.push(task);
  }

  public delete(id: number) {
    if (this.tasks.filter((t) => t.id == id)) this.tasks.splice(this.tasks.findIndex((t) => t.id == id), 1);
  }

  public switchState(id: number) {
    let task = this.tasks.find((t) => t.id == id);
    task.status = (task.status == TaskStatus.todo ? TaskStatus.done : TaskStatus.todo);
  }

}
