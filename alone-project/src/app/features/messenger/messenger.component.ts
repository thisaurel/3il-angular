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

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((routeId) => {
      this.messagesList = this.authService.getMessagesForUser(+routeId);
    });
  }

  ngOnInit() {
    console.log(this.messagesList);
  }

}
