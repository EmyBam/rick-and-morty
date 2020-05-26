import { Component, OnInit, OnDestroy } from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              public router: Router) {
  }

  isAuthenticated = false;
  private tokenSub: Subscription;

  title = 'Rick and Morty';

  ngOnInit() {
    this.tokenSub = this.authService.isTokenPresents.subscribe(
      isTokenPresent => {
        this.isAuthenticated = isTokenPresent;
      });
  }

  ngOnDestroy() {
    this.tokenSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
    const redirectUrl = '/login';
    this.router.navigate([redirectUrl]);
  }
}
