import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public user: User;

  constructor(
    private authService: AuthService,
  ) {
    this.authService.onUserConnected.subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
    });
  }

  ngOnInit() {
  }

}
