import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { TaskStatus } from '../enums/task-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private tasks: Task[] = [];

  constructor() {
    this.add('Hello 0', 'Hello description 0');
    this.add('Hello 1', 'Hello description 1');
  }

  public get all(): Task[] {
    return this.tasks;
  }

  public getById(id: number): Task {
    return this.tasks.find((t) => t.id == id);
  }

  public add(title: string, description: string): boolean {
    if (title !== '' && description !== '') {
      let lastTask = this.all.slice(-1)[0];
      let newId = (lastTask != null) ? lastTask.id + 1 : 0;
      let newTask: Task = {
        id: newId,
        title: title,
        description: description,
        status: TaskStatus.todo
      };
      this.tasks.push(newTask);
      return true;
    } else {
      return false;
    }
  }

  public delete(id: number): void {
    if (this.tasks.filter((t) => t.id == id)) this.tasks.splice(this.tasks.findIndex((t) => t.id == id), 1);
  }

  public switchState(id: number): void {
    let task = this.tasks.find((t) => t.id == id);
    task.status = (task.status == TaskStatus.todo ? TaskStatus.done : TaskStatus.todo);
  }

}
