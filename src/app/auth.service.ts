import { Injectable } from '@angular/core';
import { User } from './user.model';
import {Observable, of, Subject, throwError} from 'rxjs';
import { tap, delay } from 'rxjs/operators';

const REGISTERED_USER_CREDENTIALS = {
  username: 'User',
  password: '123456'
};

// todo: guard
interface AuthResponseData {
  username: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  user = new Subject<User>();

  login(username: string, password: string): Observable<AuthResponseData> {
      const usernameMatch: boolean = username === REGISTERED_USER_CREDENTIALS.username;
      const passwordMatch: boolean = password === REGISTERED_USER_CREDENTIALS.password;
      const registered = (usernameMatch && passwordMatch);
      const authResponseData = {username, registered};
      return of(authResponseData)
        .pipe(
          delay(1000),
          tap(resData => {
            if (!resData.registered) {
             throw new Error('User not found');
            } else {
              const user = new User(resData.username);
              this.user.next(user);
            }
          })
        );
  }

  logout() {
    this.user = null;
  }
}
