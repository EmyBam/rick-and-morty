import {Injectable} from "@angular/core";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isUserValid: boolean = false;
  private userCreds = new User('user@email.com', 'rickyPass');

 authenticateUser(user): boolean {
   let emailMatch: boolean = user.email === this.userCreds.email;
   let passwordMatch: boolean = user.password === this.userCreds.password;
   return (emailMatch && passwordMatch) ? true : false;
 }

  constructor() { }
}
