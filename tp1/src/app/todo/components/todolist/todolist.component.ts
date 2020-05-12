import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  public displayAddForm: boolean = false;

  constructor(
    private taskService: TodoService,
  ) { }

  ngOnInit() {
  }

  public addToTodoList(value: string[]): boolean {
    if (value[0] !== '' && value[1] !== '') {
      if (this.taskService.add(value[0], value[1])) {
        alert('Todo ajoutée');
        return true;
      } else {
        alert('ERREUR');
        return false;
      }
    } else {
      alert('ERREUR');
      return false;
    }
  }

}
