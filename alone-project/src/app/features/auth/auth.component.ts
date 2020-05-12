import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public formError: string = '';

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const username = this.authForm.value.username;
    const password = this.authForm.value.password;
    if (typeof username === 'string' && typeof password === 'string') {
      if (username !== '' && password !== '') {
        if (this.authService.auth(username, password)) {
          this.formError = '';
          alert('Connecté !');
        } else {
          this.formError = 'Nom d\'utilisateur ou mot de passe incorrect';
        }
      } else {
        this.formError = 'Veuillez saisir tous les champs';
      }
    } else {
      this.formError = 'Veuillez saisir tous les champs';
    }
  }

}
