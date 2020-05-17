import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  title = 'Rick and Morty Characters';

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
   this.userSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
    const redirectUrl = '/login';
    this.router.navigate([redirectUrl]);
  }
  constructor(private authService: AuthService,
              public router: Router) {
  }
}
