/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.logIn(email, password).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        errorRes => {
          console.log(errorRes);
          if (!errorRes.error || !errorRes.error.error) {
            this.error = 'Unkonwn Error!';
            this.isLoading = false;
          }
          this.error = errorRes.error.error.message;
          this.isLoading = false;
        }
      );
    } else {
      this.authService.signUp(email, password).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        errorRes => {
          console.log(errorRes);
          if (!errorRes.error || !errorRes.error.error) {
            this.error = 'Unkonwn Error!';
            this.isLoading = false;
          }
          this.error = errorRes.error.error.message;
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

}
