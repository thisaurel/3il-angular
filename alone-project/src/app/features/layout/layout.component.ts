import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

	public user: User;

	constructor(
		private authService: AuthService,
		private usersService: UsersService,
		public router: Router
	) {
		this.authService.onUserConnected.subscribe((user: User) => {
			this.user = user;
			this.usersService.setUser(this.user);
		});
	}

	ngOnInit() { }

	/**
	* Procédure pour déconnecter l'utilisateur en appelant le service d'authentification
	*
	* @memberof LayoutComponent
	*/
	public logout(): void {
		if (this.authService.logout()) {
			this.authService.router.navigate(['/']);
		} else {
			alert('ERREUR');
		}
	}

}

