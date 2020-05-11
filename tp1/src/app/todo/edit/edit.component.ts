import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Task } from '../interfaces/task.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  public task: Task;

  constructor(
    private taskService$: TodoService,
  ) { }

  ngOnInit() {
    this.task = this.taskService$.getById(0);
  }

}
