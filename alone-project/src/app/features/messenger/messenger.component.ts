import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from 'src/app/interfaces/user';
import { Message } from 'src/app/interfaces/message';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, AfterViewChecked {

  @ViewChild('chatBox', { static: true }) private chatBox: ElementRef;
  public messagesList: Message[];
  public user: User;
  public whoAmI: User;
  public id: number;
  public uploadedPicture: string = '';
  public updateMessageSwitch: boolean = false;

  messageForm = new FormGroup({
    messageInput: new FormControl('', [
      Validators.required
    ]),
  });

  updateGroup = new FormGroup({
    inputUpdateMessage: new FormControl()
  });

  constructor(
    private authService: AuthService,
    private messageService: MessagesService,
    route: ActivatedRoute,
    public dialog: MatDialog,
    public usersService: UsersService,
  ) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((routeId) => {
      this.id = +routeId;
      this.messagesList = this.messageService.getMessagesForUser(this.id);
      this.user = this.usersService.getUserById(this.id);
    });
    this.whoAmI = this.usersService.userConnected;
  }

  ngOnInit() {
    console.log(this.messagesList);
    console.log(this.whoAmI);
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  public removeMessage(id: number): void {
    if (this.messageService.deleteMessage(id)) {
      this.messagesList = this.messageService.getMessagesForUser(this.id);
    } else {
      alert('Erreur lors de la suppression');
    }
  }

  public addMessage(message: string): void {
    const emitterId = this.usersService.userConnected.id;
    const receiverId = this.id;
    const msg = message;
    const pic = this.uploadedPicture;
    if (this.messageService.add(msg, pic,emitterId, receiverId)) {
      this.messagesList = this.messageService.getMessagesForUser(this.id);
      this.messageForm.reset();
    } else {
      alert('Erreur lors de l\'envoie');
    }
  }

  public openModal(template: any): void {
    this.dialog.open(template, {
        width: '500px',
    });
  }

  public updateMessage(id: number): void {
    if (typeof this.updateGroup.value.inputUpdateMessage === 'string') {
      if (this.messageService.updateMessage(id, this.updateGroup.value.inputUpdateMessage)) {
        this.messagesList = this.messageService.getMessagesForUser(this.id);
        alert('Message mis à jour !');
      } else {
        alert('Erreur lors de la mise à jour du message');
      }
    }
  }

  onSubmit(): void {
    const message = this.messageForm.value.messageInput;
    if (typeof message === 'string' ) {
      if (message !== '') {
        this.addMessage(message);
      }
    }
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadedPicture = reader.result.toString();
    };
  }

  public isMessageFromMe(message: Message): boolean {
    return (this.usersService.userConnected.id === message.emitterId) ? true : false;
  }

  scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err);
    }
}

}
