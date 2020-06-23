import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
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

