import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateService} from "../../service/create.service";
import {CertificateWithTags} from "../../model/certificate-with-tags";

@Component({
  selector: 'app-add-new-certificate',
  templateUrl: './add-new-certificate.component.html',
  styleUrls: ['./add-new-certificate.component.scss']
})

export class AddNewCertificateComponent implements OnInit{
  certificateForm!: FormGroup;
  submitted = false;
  newTags: string[] = [];
  @Input()
  pageTitle: string = '';
  @Input()
  currentCertificate!: CertificateWithTags;
  @Input()
  disabled: boolean = false;

  @Output()
  inAction = new EventEmitter<boolean>();

  constructor(private service: CreateService) {
  }
  submit() {
    console.log("Submitted!");
    this.submitted = true;
    if (this.certificateForm.invalid) {
      console.log("Errors: " + this.certificateForm.errors);
      return;
    }
    if (this.currentCertificate.id == 0) {
      this.service.create('/certificates_with_tags', this.createCertificate())
        .subscribe(() => {
          window.location.reload();
        });
    } else {
      this.service.update('/certificates_with_tags/' + this.currentCertificate.id, this.createCertificate())
        .subscribe(() => {
          window.location.reload();
        });
    }
    this.inAction.emit(false);
  }

  createCertificate(): CertificateWithTags {
    return new CertificateWithTags(
      this.currentCertificate.id,
      this.certificateForm.value.title,
      this.newTags,
      this.certificateForm.value.description,
      this.certificateForm.value.price,
      this.certificateForm.value.duration,
      this.currentCertificate.createDate)
  }


  cancelPressed(){
    this.inAction.emit(false);
  }

  addTag() {
    console.log('Adding tag: ' + this.certificateForm.value.tags);
    this.newTags.push(this.certificateForm.value.tags);
    this.certificateForm.get('tags')?.reset();
    console.log('Tags: ' + this.newTags);
  }

  deleteTag(tag: string) {
    console.log('Deleting tag: ' + tag);
    const index = this.newTags.indexOf(tag, 0);
    if (index > -1) {
      this.newTags.splice(index, 1);
    }
    console.log('Tags: ' + this.newTags);
  }

  ngOnInit(): void {
    this.certificateForm = new FormGroup({
      title: new FormControl({value: this.currentCertificate.name, disabled: this.disabled},
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
      ]),
      description: new FormControl({value: this.currentCertificate.description, disabled: this.disabled},
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(1000)
        ]),
      duration: new FormControl({value: this.currentCertificate.duration, disabled: this.disabled},
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('[0-9]+')
      ]),
      price: new FormControl({value: this.currentCertificate.price, disabled: this.disabled},
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('[0-9]*(\\.)?([0-9]{1,2})?')
      ]),
      tags: new FormControl({value: null, disabled: this.disabled},
        [
          //Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(15)
      ])
    });
    this.newTags = this.currentCertificate.tags;
  }
}
