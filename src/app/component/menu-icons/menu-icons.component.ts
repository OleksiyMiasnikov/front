import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-menu-icons',
  templateUrl: './menu-icons.component.html',
  //styleUrls: ['./menu-icons.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
})
export class MenuIconsComponent {

}
