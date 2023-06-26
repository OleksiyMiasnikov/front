import { Component } from '@angular/core';
import {ErrorService} from "../../service/error.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(public errorService: ErrorService) {
   }
}
