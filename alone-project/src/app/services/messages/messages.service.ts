import { Injectable, EventEmitter } from '@angular/core';
import * as data from '../../data/data.json';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { Message } from 'src/app/interfaces/message';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public user: User;

  constructor(
    private authService: AuthService,
  ) {
		this.authService.onUserConnected.subscribe((user: User) => {
			this.user = user;
		});
  }

  public get all(): Message[] {
    return data.messages;
  }

  public add(message: string, pic: string,emitterIdVal: number, receiverIdVal: number): boolean {
    const listLength = data.messages.length;
    let lastMessage = this.all.slice(-1)[0];
    let newId = (lastMessage != null) ? lastMessage.id + 1 : 0;
    let newMsg: Message = {
      id: newId,
      receiverId: receiverIdVal,
      datetime: new Date().toDateString(),
      emitterId: emitterIdVal,
      picture: pic,
      content: message
    };
    data.messages.push(newMsg);
    const newListLength = data.messages.length;
    return (listLength < newListLength);
  }

  public deleteMessage(id: number): boolean {
    const listLength = data.messages.length;
    if (data.messages.filter((m) => m.id === id)) data.messages.splice(data.messages.findIndex((m) => m.id == id), 1);
    const newListLength = data.messages.length;
    return (listLength > newListLength);
  }

  public updateProfilPicture(picture: string): boolean {
    const previousPic = this.authService.userConnected.picture;
    this.authService.userConnected.picture = picture;
    const newPic = this.authService.userConnected.picture;
    return (previousPic !== newPic);
  }

  public getLastMessagePerUser(id: number): Message {
    const msg = data.messages.filter((m) =>
      (m.emitterId === this.authService.userConnected.id || m.receiverId === this.authService.userConnected.id) &&
      (m.emitterId === id || m.receiverId === id));
    return msg[msg.length - 1];
  }

  public getMessagesForUser(id: number): Message[] {
    if (this.authService.userConnected == null) this.authService.router.navigate(['/']);
    return data.messages.filter((m) =>
      (m.emitterId === this.authService.userConnected.id || m.receiverId === this.authService.userConnected.id) &&
      (m.emitterId === id || m.receiverId === id));
  }

}
