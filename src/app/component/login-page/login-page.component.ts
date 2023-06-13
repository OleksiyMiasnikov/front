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

  form!: FormGroup;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

submit() {
    console.log(
      'Submitted. Name: ' +
        this.form.value.username +
        ', password: ' +
        this.form.value.password
    );
    const user: User = new User(
      this.form.value.username,
      this.form.value.password
    );
    console.log(user);
    this.auth.login(user)
      .subscribe(() => {
        this.router.navigate(['/certificates_with_tags']);
      });
  }
}
