import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private data: DataService,
    private authService: AuthService,
  ) { }

  public get all(): User[] {
    return this.data.users;
  }

  public getUserById(id: number): User {
    const user = this.data.users.filter((u) => u.id === id);
    if (user) return user[0];
  }

  public get allWithoutMe(): User[] {
    return this.data.users.filter((u) => u != this.authService.connectedUser);
  }

}
