import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private data: DataService
  ) { }

  public get all(): User[] {
    return this.data.users;
  }

  public getUserById(id: number): User {
    const user = this.data.users.filter((u) => u.id === id);
    if (user) return user[0];
  }

}
