import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FilesService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public id: number;
  public user: User;
  public mapsURL: string = '';
  public uploadedPicture: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessagesService,
    route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public usersService: UsersService,
    public filesService: FilesService
  ) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((routeId) => {
      this.user = this.usersService.getUserById(+routeId);
      this.mapsURL = `https://maps.google.com/maps?q=${this.user.localisation.lat},${this.user.localisation.long}&hl=es&z=14&output=embed`;
    });
  }

  ngOnInit() { }

  /**
  * Calcul l'âge à partir de la date de l'utilisateur
  *
  * @readonly
  * @type {number}
  * @memberof UserComponent
  */
  public get age(): number {
    let birthDate = new Date(this.user.birthDate);
    let ageDiff = Date.now() - birthDate.getTime();
    let ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  /**
  * Appelle le service de fichier pour récupérer le fichier en base64
  *
  * @param {Event} event
  * @memberof UserComponent
  */
  handleUpload(event: Event): void {
    this.filesService.handleUpload(event).then((file) => {
      this.uploadedPicture = file;
    }).catch((e) => {
      console.log(e);
    })
  }

  /**
  * Met à jour la photo de profil de l'utilisateur
  *
  * @memberof UserComponent
  */
  updateProfilPicture(): void {
    if (!this.messageService.updateProfilPicture(this.uploadedPicture)) {
      alert('Erreur lors de l\'envoie');
    }
  }

}
