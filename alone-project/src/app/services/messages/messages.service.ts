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

  /**
  * Retourne tous les messages
  *
  * @readonly
  * @type {Message[]}
  * @memberof MessagesService
  */
  public get all(): Message[] {
    return this.data.messages;
  }

  /**
  * Ajoute un message aux données
  *
  * @param {string} message
  * @param {string} pic
  * @param {number} emitterIdVal
  * @param {number} receiverIdVal
  * @returns {boolean}
  * @memberof MessagesService
  */
  public add(message: string, pic: string, emitterIdVal: number, receiverIdVal: number): boolean {
    if (this.usersService.userConnected == null) this.authService.router.navigate(['/']);
    const listLength = this.data.messages.length;
    let lastMessage = this.all.slice(-1)[0];
    let newId = (lastMessage != null) ? lastMessage.id + 1 : 0;
    let d = new Date();
    let datestring = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let newMsg: Message = {
      id: newId,
      receiverId: receiverIdVal,
      datetime: datestring,
      emitterId: emitterIdVal,
      picture: pic,
      content: message
    };
    this.data.messages.push(newMsg);
    const newListLength = this.data.messages.length;
    return (listLength < newListLength);
  }

  /**
  * Supprime un message des données par son id
  *
  * @param {number} id
  * @returns {boolean}
  * @memberof MessagesService
  */
  public deleteMessage(id: number): boolean {
    if (this.usersService.userConnected == null) this.authService.router.navigate(['/']);
    const listLength = this.data.messages.length;
    if (this.data.messages.filter((m) => m.id === id)) this.data.messages.splice(this.data.messages.findIndex((m) => m.id == id), 1);
    const newListLength = this.data.messages.length;
    return (listLength > newListLength);
  }

  /**
  * Met à jour la photo de profil de l'utilisateur connecté
  *
  * @param {string} picture
  * @returns {boolean}
  * @memberof MessagesService
  */
  public updateProfilPicture(picture: string): boolean {
    if (this.usersService.userConnected == null) this.authService.router.navigate(['/']);
    const previousPic = this.usersService.userConnected.picture;
    this.usersService.userConnected.picture = picture;
    const newPic = this.usersService.userConnected.picture;
    return (previousPic !== newPic);
  }

  /**
  * Met à jour le message de l'utilisateur connecté
  *
  * @param {number} id
  * @param {string} message
  * @returns {boolean}
  * @memberof MessagesService
  */
  public updateMessage(id: number, message: string): boolean {
    if (this.usersService.userConnected == null) this.authService.router.navigate(['/']);
    const msg = this.getMessagePerId(id);
    const previousMsg = msg.content;
    msg.content = message;
    const newMsg = msg.content;
    return (previousMsg !== newMsg);
  }

  /**
  * Retourne le message par son id
  *
  * @private
  * @param {number} id
  * @returns {Message}
  * @memberof MessagesService
  */
  private getMessagePerId(id: number): Message {
    if (this.usersService.userConnected == null) this.authService.router.navigate(['/']);
    return this.data.messages.filter((m) => m.id === id)[0];
  }

  /**
  * Retourne le dernier message d'une conversation entre l'utilisateur connecté et un autre par son id
  *
  * @param {number} id
  * @returns {Message}
  * @memberof MessagesService
  */
  public getLastMessagePerUser(id: number): Message {
    if (this.usersService.userConnected == null) this.authService.router.navigate(['/']);
    if (this.usersService.userConnected == null) this.authService.router.navigate(['/']);
    const msg = this.data.messages.filter((m) =>
      (m.emitterId === this.usersService.userConnected.id || m.receiverId === this.usersService.userConnected.id) &&
      (m.emitterId === id || m.receiverId === id));
    return msg[msg.length - 1];
  }

  /**
  * Retourne tous les messages entre l'utilisateur connecté et un autre par son id
  *
  * @param {number} id
  * @returns {Message[]}
  * @memberof MessagesService
  */
  public getMessagesForUser(id: number): Message[] {
    if (this.usersService.userConnected == null) this.authService.router.navigate(['/']);
    return this.data.messages.filter((m) =>
      (m.emitterId === this.usersService.userConnected.id || m.receiverId === this.usersService.userConnected.id) &&
      (m.emitterId === id || m.receiverId === id));
  }

}
