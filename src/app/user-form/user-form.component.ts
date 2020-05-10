import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  constructor(private authService: AuthService ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
   if (!form.valid) {
     return;
   };
   const username = form.value.username;
   const password = form.value.password;
   this.authService.login(username, password);
   console.log(this.authService.user);
   form.reset();
  }
}
