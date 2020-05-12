import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

	public user: User;

	constructor(
		private authService: AuthService,
		public router: Router
	) {
		this.authService.onUserConnected.subscribe((user: User) => {
			this.user = user;
		});
	}

	ngOnInit() { }

	public logout() {
		if (this.authService.logout()) {
			this.authService.router.navigate(['/']);
		} else {
			alert('ERREUR');
		}
	}

}

