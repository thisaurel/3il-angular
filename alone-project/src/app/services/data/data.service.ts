import { Injectable } from '@angular/core';
import * as data from '../../data/data.json';
import { User } from 'src/app/interfaces/user';
import { Message } from 'src/app/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  /**
  * Retourne le tableau d'utilisateur compris dans le fichier de données
  *
  * @readonly
  * @type {User[]}
  * @memberof DataService
  */
  public get users(): User[] {
    return data.users;
  }

  /**
  * Retourne le tableau des messages compris dans le fichier de données
  *
  * @readonly
  * @type {Message[]}
  * @memberof DataService
  */
  public get messages(): Message[] {
    return data.messages;
  }

}
