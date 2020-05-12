import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public id: number;
  public user: User;
  public mapsURL: string = '';

  constructor(
    private authService: AuthService,
    route: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((routeId) => {
      this.user = this.authService.getUserById(+routeId);
      this.mapsURL = `https://maps.google.com/maps?q=${this.user.localisation.lat},${this.user.localisation.long}&hl=es&z=14&output=embed`;
    
    });
  }

  ngOnInit() {
  }

}
