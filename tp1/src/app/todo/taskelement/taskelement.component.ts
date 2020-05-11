import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-taskelement',
  templateUrl: './taskelement.component.html',
  styleUrls: ['./taskelement.component.scss']
})
export class TaskelementComponent implements OnInit {

  @Input() task: Task;

  constructor(
    private taskService: TodoService,
  ) { }

  ngOnInit() {
  }

  deleteTodo(id: number): void {
    this.taskService.delete(id);
  }

  switchTodoState(id: number): void {
    this.taskService.switchState(id);
  }

}
