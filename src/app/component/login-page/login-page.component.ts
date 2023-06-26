import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  submit() {
    console.log(
      'Submitted. Name: ' +
        this.loginForm.value.username +
        ', password: ' +
        this.loginForm.value.password
    );
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const user: User = new User(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    console.log(user);
    this.auth.login(user)
      .subscribe(() => {
        this.router.navigate(['/certificates_with_tags']);
      });
  }

}
