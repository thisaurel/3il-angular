import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './services/todo.service';
import { TodoRoutingModule } from './todo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { TaskelementComponent } from './components/taskelement/taskelement.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { AddComponent } from './components/add/add.component';
import { ViewComponent } from './components/view/view.component';

@NgModule({
  declarations: [TasklistComponent, TaskelementComponent, TodolistComponent, AddComponent, ViewComponent],
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
