import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from 'src/app/interfaces/user';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  public messagesList: Message[];
  public user: User;
  public id: number;

  constructor(
    private authService: AuthService,
    route: ActivatedRoute,
  ) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((routeId) => {
      this.id = +routeId;
      this.messagesList = this.authService.getMessagesForUser(this.id);
      this.user = this.authService.getUserById(this.id);
    });
  }

  ngOnInit() {
    console.log(this.messagesList);
  }

  public isMessageFromMe(message: Message): boolean {
    return (this.authService.userConnected.id === message.emitterId) ? true : false;
  }

}
