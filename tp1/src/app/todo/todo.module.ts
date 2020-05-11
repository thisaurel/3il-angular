import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './services/todo.service';
import { TodoComponent } from './list/todo.component';
import { TodoRoutingModule } from './todo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskelementComponent } from './taskelement/taskelement.component';
import { TodolistComponent } from './todolist/todolist.component';

@NgModule({
  declarations: [TodoComponent, EditComponent, TasklistComponent, TaskelementComponent, TodolistComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: []
})
export class TodoModule { }
