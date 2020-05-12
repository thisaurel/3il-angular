import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
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
export class MessengerComponent implements OnInit, AfterViewChecked {

  @ViewChild('chatBox', { static: true }) private chatBox: ElementRef;
  public messagesList: Message[];
  public user: User;
  public id: number;

  constructor(
    private authService: AuthService,
    private messageService: MessagesService,
    route: ActivatedRoute,
  ) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((routeId) => {
      this.id = +routeId;
      this.messagesList = this.messageService.getMessagesForUser(this.id);
      this.user = this.authService.getUserById(this.id);
    });
  }

  ngOnInit() {
    console.log(this.messagesList);
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  public isMessageFromMe(message: Message): boolean {
    return (this.authService.userConnected.id === message.emitterId) ? true : false;
  }

  scrollToBottom(): void {
    try {
        this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err);
    }
}

}
