import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rick and Morty Characters';
  private userSub: Subscription;


  // ngOnInit() {
  //   this.userSub = this.authService.user.subscribe();
  // }
  //
  // ngOnDestroy() {
  //   this.userSub.usubscribe();
  // }

  logout() {
    this.authService.logout();
    const redirectUrl = '/login';
    this.router.navigate([redirectUrl]);
  }
  constructor(private authService: AuthService,
              public router: Router) {
  }
}
