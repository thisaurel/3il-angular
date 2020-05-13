import { Injectable, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data/data.service';
import { Message } from 'src/app/interfaces/message';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public user: User;

  constructor(
    private authService: AuthService,
    private data: DataService,
    private usersService: UsersService
  ) {
		this.authService.onUserConnected.subscribe((user: User) => {
			this.user = user;
		});
  }

  public get all(): Message[] {
    return this.data.messages;
  }

  public add(message: string, pic: string,emitterIdVal: number, receiverIdVal: number): boolean {
    const listLength = this.data.messages.length;
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
    this.data.messages.push(newMsg);
    const newListLength = this.data.messages.length;
    return (listLength < newListLength);
  }

  public deleteMessage(id: number): boolean {
    const listLength = this.data.messages.length;
    if (this.data.messages.filter((m) => m.id === id)) this.data.messages.splice(this.data.messages.findIndex((m) => m.id == id), 1);
    const newListLength = this.data.messages.length;
    return (listLength > newListLength);
  }

  public updateProfilPicture(picture: string): boolean {
    const previousPic = this.usersService.userConnected.picture;
    this.usersService.userConnected.picture = picture;
    const newPic = this.usersService.userConnected.picture;
    return (previousPic !== newPic);
  }

  public updateMessage(id: number, message: string): boolean {
    const msg = this.getMessagePerId(id);
    const previousMsg = msg.content;
    msg.content = message;
    const newMsg = msg.content;
    return (previousMsg !== newMsg);
  }

  private getMessagePerId(id: number): Message {
    return this.data.messages.filter((m) => m.id === id)[0];
  }

  public getLastMessagePerUser(id: number): Message {
    const msg = this.data.messages.filter((m) =>
      (m.emitterId === this.usersService.userConnected.id || m.receiverId === this.usersService.userConnected.id) &&
      (m.emitterId === id || m.receiverId === id));
    return msg[msg.length - 1];
  }

  public getMessagesForUser(id: number): Message[] {
    if (this.usersService.userConnected == null) this.authService.router.navigate(['/']);
    return this.data.messages.filter((m) =>
      (m.emitterId === this.usersService.userConnected.id || m.receiverId === this.usersService.userConnected.id) &&
      (m.emitterId === id || m.receiverId === id));
  }

}
