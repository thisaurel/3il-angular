import { Injectable } from '@angular/core';
import * as data from '../../data/data.json';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected connectedUser: User;

  constructor() {
    console.log(data.users);
  }

  public get all(): User[] {
    return data.users;
  }

  public auth(username: string, password: string): boolean {
    const user = data.users.filter((u) => u.username === username && u.password === password);
    if (user.length > 0) {
      this.connectedUser = user[1];
      return true;
    } else {
      return false;
    }
  }

}
