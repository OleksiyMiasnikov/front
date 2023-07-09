import {Component, EventEmitter, Output} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  isNewPressed = new EventEmitter<boolean>();

  constructor(public auth: AuthService,
              private router: Router) {}

  isButtonPressed() {
    this.isNewPressed.emit(!this.isNewPressed);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout('');
  }

  getUser() {
    return localStorage.getItem('user');
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

  isAdmin(): boolean {
    return 'ADMIN' === localStorage.getItem('authorities')
  }

}
