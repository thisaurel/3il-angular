import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private connectedUser: User;

  constructor(
    private data: DataService,
    private authService: AuthService,
  ) { }

  /**
  * Instancie l'utilisateur dans la variable connectedUser
  *
  * @param {User} user
  * @memberof UsersService
  */
  public setUser(user: User): void {
    this.connectedUser = user;
  }

  /**
  * Retourne l'utilisateur courant
  *
  * @readonly
  * @type {User}
  * @memberof UsersService
  */
  public get user(): User {
    return this.connectedUser;
  }

  /**
  * Retourne tous les utilisateurs
  *
  * @readonly
  * @type {User[]}
  * @memberof UsersService
  */
  public get all(): User[] {
    return this.data.users;
  }

  /**
  * Retourne l'utilisateur par son id
  *
  * @param {number} id
  * @returns {User}
  * @memberof UsersService
  */
  public getUserById(id: number): User {
    const user = this.data.users.filter((u) => u.id === id);
    if (user) return user[0];
  }

  /**
  * Retourne tous les utilisateurs sauf l'utilisateur connecté
  *
  * @readonly
  * @type {User[]}
  * @memberof UsersService
  */
  public get allWithoutMe(): User[] {
    return this.data.users.filter((u) => u != this.authService.connectedUser);
  }

  /**
  * Retourne l'utilisateur connecté
  *
  * @readonly
  * @type {User}
  * @memberof UsersService
  */
  public get userConnected(): User {
    return this.authService.connectedUser;
  }

}
