import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public user: User;

  constructor(
    private authService: AuthService,
    private messageService: MessagesService,
  ) {
    this.authService.onUserConnected.subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
      if (this.user == null) this.authService.router.navigate(['/']);
    });
  }

  ngOnInit() {
  }

}
