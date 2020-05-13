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
import { FilesService } from 'src/app/services/files/files.service';
import { HTMLInputEvent } from '../../interfaces/html-input-event';

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
    public filesService: FilesService
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

  /**
  * Maintient le scroll de la chatbox en bas
  *
  * @memberof MessengerComponent
  */
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  /**
  * Appelle le service message pour pouvoir supprimer un message à partir de son id
  *
  * @param {number} id
  * @memberof MessengerComponent
  */
  public removeMessage(id: number): void {
    if (this.messageService.deleteMessage(id)) {
      this.messagesList = this.messageService.getMessagesForUser(this.id);
    } else {
      alert('Erreur lors de la suppression');
    }
  }

  /**
  * Appelle le service message pour ajouter un message aux données
  *
  * @param {string} message
  * @memberof MessengerComponent
  */
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

  /**
  * Ouvre la boîte de dialogue pour l'édition d'un message
  *
  * @param {*} template
  * @memberof MessengerComponent
  */
  public openModal(template: any): void {
    this.dialog.open(template, {
        width: '500px',
    });
  }

  /**
  * Met à jour un message avec sa nouvelle valeure
  *
  * @param {number} id
  * @memberof MessengerComponent
  */
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

  /**
  * Appelle une fonction du composant pour ajouter un message
  *
  * @memberof MessengerComponent
  */
  onSubmit(): void {
    const message = this.messageForm.value.messageInput;
    if (typeof message === 'string' ) {
      if (message !== '') {
        this.addMessage(message);
      }
    }
  }

  /**
  * Appelle le service de fichier pour récupérer le fichier en base64
  *
  * @param {Event} event
  * @memberof UserComponent
  */
  handleUpload(event: HTMLInputEvent): void {
    this.filesService.handleUpload(event).then((file) => {
      this.uploadedPicture = file;
    }).catch((e) => {
      console.log(e);
    })
  }

  /**
  * Retourne un booleen pour savoir si l'utilisateur connecté est l'expéditeur ou non
  *
  * @param {Message} message
  * @returns {boolean}
  * @memberof MessengerComponent
  */
  public isMessageFromMe(message: Message): boolean {
    return (this.usersService.userConnected.id === message.emitterId) ? true : false;
  }

  /**
  * Permet de maintenir le scroll de la chatbox
  *
  * @memberof MessengerComponent
  */
  scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err);
    }
}

}
