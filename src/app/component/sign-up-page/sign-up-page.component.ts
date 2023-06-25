import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {throwError} from "rxjs";
import {ErrorService} from "../../service/error.service";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    public authService: AuthService,
    private errorService: ErrorService) {}
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      psw: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      repeat_psw: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  submit() {
    if (this.form.value.psw != this.form.value.repeat_psw) {
      console.log('incorrect');
      this.errorHandler('Passwords do not match');
    } else {
      const user = new User(this.form.value.username, this.form.value.psw);
      console.log('Submitted. Name: ' + user.username + ', password: ' + user.password);
      this.authService.signUp(user).subscribe();
      this.router.navigate(['/login']);
    }
  }

  cancelPressed() {
    this.router.navigate(['/login']);
  }


  errorHandler(errorMessage: string){
    if (errorMessage == '') {
      this.errorService.clear();
      return ;
    }
    this.errorService.handle(errorMessage);
    return throwError(()=>errorMessage)
  }
}
