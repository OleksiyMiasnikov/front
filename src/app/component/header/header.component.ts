import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  centerX = window.screen.width/2;
  private centerY = window.screen.height/2;
  constructor(public auth: AuthService, private router: Router) {}

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
  popupWindow() {
    const w = 520;
    const h = 570;
    const y = window.outerHeight / 2 + window.screenY - ( h / 2)
    const x = window.outerWidth / 2 + window.screenX - ( w / 2)
    return window.open('certificates_with_tags/add_new',
    '_blank',
    'location=yes,left=auto, left=' +
      x + ', top=' +
      y + ', height=' +
      h + ',width=' +
      w + ',scrollbars=yes,status=yes');
  }
}
