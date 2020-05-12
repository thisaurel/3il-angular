import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

	@Output() sendFormValue: EventEmitter<string[]> = new EventEmitter<string[]>();

  todoForm: FormGroup;

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
    this.todoForm.reset();
    this.sendFormValue.emit([v.todoTitle, v.todoDescription]);
  }

}
