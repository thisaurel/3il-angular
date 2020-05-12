import { Injectable, EventEmitter } from '@angular/core';
import * as data from '../../data/data.json';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private connectedUser: User;
  public onUserConnected: EventEmitter<User> = new EventEmitter();

  constructor(
    public router: Router
  ) {
    console.log(data.users);
  }

  public get all(): User[] {
    return data.users;
  }

  public get allWithoutMe(): User[] {
    return data.users.filter((u) => u != this.connectedUser);
  }

  public get userConnected(): User {
    return this.connectedUser;
  }

  public getMessagesForUser(id: number) {
    if (this.connectedUser == null) this.router.navigate(['/']);
    return data.messages.filter((m) => m.emitterId === id && m.receiverId === this.connectedUser.id);
  }

  public auth(username: string, password: string): boolean {
    const user = data.users.filter((u) => u.username === username && u.password === password);
    if (user.length > 0) {
      this.connectedUser = user[0];
      this.onUserConnected.emit(this.connectedUser);
      return true;
    } else {
      return false;
    }
  }

  public logout(): boolean {
    this.connectedUser = null;
    this.onUserConnected.emit(this.connectedUser);
    if (this.connectedUser == null) {
      return true;
    } else {
      return false;
    }
  }

}
