import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Task } from '../interfaces/task.interface';
import { TaskStatus } from '../enums/task-status.enum';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  todoForm;

  constructor(
    private taskService$: TodoService,
    public formBuilder: FormBuilder,
  ) {
    this.todoForm = this.formBuilder.group({
      todoTitle: '',
      todoDescription: ''
    })
  }

  ngOnInit() {
  }

  validationForm(v: any) {
    let lastTask = this.taskService$.getAll().slice(-1)[0];
    let newId = (lastTask != null) ? lastTask.id + 1 : 0;
    let newTask: Task = {
      id: newId,
      title: v.todoTitle,
      description: v.todoDescription,
      status: TaskStatus.todo
    };
    this.taskService$.add(newTask);
  }

}
