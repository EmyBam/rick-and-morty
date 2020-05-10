import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public user: User;
  private userCreds: User = {username: 'User', password: '123456'};

  login(username: string, password: string): void {
    const usernameMatch: boolean = username === this.userCreds.username;
    const passwordMatch: boolean = password === this.userCreds.password;
    const registered = (usernameMatch && passwordMatch);
    this.user = {username, password, registered};
    // todo: to simulate http request
    // todo: guard
  }
}
