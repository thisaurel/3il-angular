import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  { path: '', component: TodolistComponent },
  { path: ':id', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
