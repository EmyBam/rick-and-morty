import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  user = new User('', '');

  constructor(private userService: UserService ) { }

  ngOnInit(): void {
  }

  onSubmit(): boolean {
    return this.userService.authenticateUser(this.user);
  }
}
