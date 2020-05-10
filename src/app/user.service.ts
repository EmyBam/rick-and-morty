import {Injectable} from '@angular/core';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User;
  public isUserValid: boolean = false;
  private userCreds = new User('User', '12345');

 authenticateUser(user): boolean {
   const {username, password} = user;
   const usernameMatch: boolean = username === this.userCreds.username;
   const passwordMatch: boolean = password === this.userCreds.password;
   this.user = {username, password};
   console.log(user);
   return (usernameMatch && passwordMatch) ? true : false;
 }

  constructor() { }
}
