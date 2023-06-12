import {Component, EventEmitter, Output} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {isNewCertificatePressed} from "../../common/globals";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  isPressed = new EventEmitter<boolean>();

  constructor(public auth: AuthService,
              private router: Router) {}

  isButtonPressed() {
    this.isPressed.emit(!this.isPressed);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

}
