import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from '../auth/auth.component';

@NgModule({
	imports: [
		CommonModule,
		LayoutRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		HttpClientModule,
	],
	declarations: [LayoutComponent, AuthComponent],
	providers: [
	]
})
export class LayoutModule { }
