import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesService } from 'src/app/services/messages/messages.service';

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
  ) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((routeId) => {
      this.user = this.authService.getUserById(+routeId);
      this.mapsURL = `https://maps.google.com/maps?q=${this.user.localisation.lat},${this.user.localisation.long}&hl=es&z=14&output=embed`;
    });
  }

  ngOnInit() { }

  public get age(): number {
    let birthDate = new Date(this.user.birthDate);
    let ageDiff = Date.now() - birthDate.getTime();
    let ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadedPicture = reader.result.toString();
    };
  }

  updateProfilPicture() {
    if (!this.messageService.updateProfilPicture(this.uploadedPicture)) {
      alert('Erreur lors de l\'envoie');
    }
  }

}
