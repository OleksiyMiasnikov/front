import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/user";
import {ConfirmPasswordValidator} from "./confirm-password.validator";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      confirmPassword: [null, [
        Validators.required
      ]]
    },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
      );
  }

  submit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    const user = new User(this.signUpForm.value.username, this.signUpForm.value.password);
    console.log('Submitted. Name: ' + user.username + ', password: ' + user.password);
    this.authService.signUp(user)
      .subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  cancelPressed() {
    this.router.navigate(['/login']);
  }

}
