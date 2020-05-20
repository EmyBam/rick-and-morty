import {Injectable} from '@angular/core';
import {User} from './user.model';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {tap, delay, catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

const REGISTERED_USER_CREDENTIALS = {
  username: 'User',
  password: '123456'
};

interface AuthResponseData {
  username: string;
  isRegistered: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  user = new BehaviorSubject<User>(null);
  token = 'some_token';

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
            const token = this.token;
            const user = new User(username, token);
            this.user.next(user);
          };
        })
      );
  }

  logout() {
    this.user.next(null);
  }
}
