import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AuthComponent } from '../auth/auth.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{ path: '', component: HomeComponent },
			{ path: 'auth', component: AuthComponent },
			{ path: 'user-list', component: UsersListComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule {}
