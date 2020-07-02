import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {tap, delay} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

const REGISTERED_USER_CREDENTIALS = {
  username: 'User',
  password: '123456'
};

const TOKEN = 'some_token';

interface AuthResponseData {
  username: string;
  isRegistered: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService) { }
  isTokenPresents = new BehaviorSubject<boolean>(this.checkToken());

  authenticateUser(username: string, password: string): Observable<AuthResponseData> {
    const usernameMatch: boolean = username === REGISTERED_USER_CREDENTIALS.username;
    const passwordMatch: boolean = password === REGISTERED_USER_CREDENTIALS.password;
    const isRegistered = (usernameMatch && passwordMatch);
    const error = (!isRegistered && 'Wrong login or password');
    const authResponse = { username, isRegistered, error };
    return of(authResponse).pipe(
        delay(1000),
        tap(resData => {
          if (resData.isRegistered) {
            this.cookieService.set('token', TOKEN);
            this.isTokenPresents.next(true);
          };
        })
      );
  }

  checkToken(): boolean  {
    return this.cookieService.check('token');
  }

  logout() {
    this.cookieService.delete('token', TOKEN);
    this.isTokenPresents.next(false);
  }
}
