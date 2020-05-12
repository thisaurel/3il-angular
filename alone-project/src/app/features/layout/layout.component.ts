import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewChecked {

	public user: User;

	constructor(
		private authService: AuthService,
	) {}

	ngOnInit() {
	}

	ngAfterViewChecked() {
		setTimeout(() => {
			if (this.user == null) this.user = this.authService.userConnected;
		});
	}

}

