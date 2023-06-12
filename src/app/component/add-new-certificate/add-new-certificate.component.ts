import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-new-certificate',
  templateUrl: './add-new-certificate.component.html',
  styleUrls: ['./add-new-certificate.component.scss']
})
export class AddNewCertificateComponent {
  form!: FormGroup;
  @Output()
  isCancelled = new EventEmitter<boolean>();

  submit() {
    console.log("Submitted!");
  }

  cancelPressed(){
    this.isCancelled.emit(false);
  }
}
