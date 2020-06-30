import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private router: Router) {
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
