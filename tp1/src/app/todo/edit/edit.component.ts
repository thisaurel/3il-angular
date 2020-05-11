import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Task } from '../interfaces/task.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  public task: Task;
  public id: string;

  constructor(
    private taskService$: TodoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
    })
    this.task = this.taskService$.getById(+this.id);
  }

}
