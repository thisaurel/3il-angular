import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    console.log(this.authService.getMessagesForUser(2));
  }

}
