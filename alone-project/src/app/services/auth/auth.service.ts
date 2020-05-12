import { Injectable, EventEmitter } from '@angular/core';
import * as data from '../../data/data.json';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { Message } from 'src/app/interfaces/message';

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

  public getUserById(id: number): User {
    const user = data.users.filter((u) => u.id === id);
    if (user) return user[0];
  }

  public get allWithoutMe(): User[] {
    return data.users.filter((u) => u != this.connectedUser);
  }

  public get userConnected(): User {
    return this.connectedUser;
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
