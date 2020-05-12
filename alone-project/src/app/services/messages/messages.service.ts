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

  public getMessagesForUser(id: number): Message[] {
    if (this.user == null) this.authService.router.navigate(['/']);
    return data.messages.filter((m) => m.emitterId === id && m.receiverId === this.user.id);
  }

}
