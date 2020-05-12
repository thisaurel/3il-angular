import { Injectable } from '@angular/core';
import * as data from '../../data/data.json';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    console.log(data.users);
  }

  public get all(): User[] {
    return data.users;
  }

}
