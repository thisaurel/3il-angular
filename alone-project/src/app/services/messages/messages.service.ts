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

  public add(message: string, emitterIdVal: number, receiverIdVal: number): Message {
    let lastMessage = this.all.slice(-1)[0];
    let newId = (lastMessage != null) ? lastMessage.id + 1 : 0;
    let newMsg: Message = {
      id: newId,
      receiverId: receiverIdVal,
      datetime: new Date().toDateString(),
      emitterId: emitterIdVal,
      picture: '',
      content: message
    };
    return newMsg;
  }

  public getLastMessagePerUser(id: number): Message{
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
