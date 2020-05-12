import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.sass']
})
export class TasklistComponent implements OnInit {

  @Input() tasksList: Task[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.tasksList);
  }

}
