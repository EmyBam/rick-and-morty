import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  constructor(private authService: AuthService,
              public router: Router) { }

  isLoading = false;
  error: string = null;

  onSubmit(form: NgForm) {
    this.error = null;
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;
    this.authService.authenticateUser(username, password).subscribe(
      resData => {
        console.log(resData);
        if (!resData.isRegistered) {
          this.error = resData.error;
          this.isLoading = false;
        } else {
          const redirectUrl = '/characters';
          this.router.navigate([redirectUrl]);
          this.isLoading = false;
        }
      },
    );
    form.reset();
  }
}

