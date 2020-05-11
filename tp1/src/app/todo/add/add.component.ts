import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Task } from '../interfaces/task.interface';
import { TaskStatus } from '../enums/task-status.enum';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {

	@Output() sendFormValue: EventEmitter<any> = new EventEmitter<any>();

  todoForm;

  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.todoForm = this.formBuilder.group({
      todoTitle: '',
      todoDescription: ''
    })
  }

  ngOnInit() { }

  validationForm(v: any) {
    this.sendFormValue.emit([v.todoTitle, v.todoDescription]);
  }

}
