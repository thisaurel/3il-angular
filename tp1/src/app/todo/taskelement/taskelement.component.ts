import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Component({
  selector: 'app-taskelement',
  templateUrl: './taskelement.component.html',
  styleUrls: ['./taskelement.component.sass']
})
export class TaskelementComponent implements OnInit {

  @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }

}
