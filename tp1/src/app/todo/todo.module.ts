import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './services/todo.service';
import { TodoRoutingModule } from './todo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskelementComponent } from './taskelement/taskelement.component';
import { TodolistComponent } from './todolist/todolist.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [TasklistComponent, TaskelementComponent, TodolistComponent, AddComponent],
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
