import { Injectable } from '@angular/core';
import * as data from '../../data/data.json';
import { User } from 'src/app/interfaces/user';
import { Message } from 'src/app/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public get users(): User[] {
    return data.users;
  }

  public get messages(): Message[] {
    return data.messages;
  }

}
