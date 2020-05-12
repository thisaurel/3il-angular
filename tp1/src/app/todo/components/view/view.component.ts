import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public id: Observable<string>;
  public task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TodoService,
  ) {
    this.id = this.route.params.pipe(map(p => p.id));
  }

  ngOnInit() {
    this.id.subscribe((d) => {
      this.task = this.taskService.getById(+d);
    });
  }

}
