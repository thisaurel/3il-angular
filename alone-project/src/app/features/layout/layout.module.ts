import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from '../auth/auth.component';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../../services/auth/auth.service';
import { MessagesService } from '../../services/messages/messages.service';
import { MessengerComponent } from '../messenger/messenger.component';
import { UserComponent } from '../users/user/user.component';
import { DataService } from 'src/app/services/data/data.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FilesService } from 'src/app/services/files/files.service';

@NgModule({
	imports: [
		CommonModule,
		LayoutRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		MaterialModule,
		HttpClientModule,
	],
	declarations: [
        LayoutComponent,
        AuthComponent,
        UsersListComponent,
		HomeComponent,
		MessengerComponent,
		UserComponent,
    ],
	providers: [
		AuthService,
		MessagesService,
		DataService,
		UsersService,
		FilesService
	]
})
export class LayoutModule { }
