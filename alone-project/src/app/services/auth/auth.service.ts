import { Injectable } from '@angular/core';
import * as data from '../../data/data.json';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private connectedUser: User;

  constructor() {
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

  public auth(username: string, password: string): boolean {
    const user = data.users.filter((u) => u.username === username && u.password === password);
    if (user.length > 0) {
      this.connectedUser = user[0];
      return true;
    } else {
      return false;
    }
  }

}
