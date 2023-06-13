import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateService} from "../../service/create.service";

@Component({
  selector: 'app-add-new-certificate',
  templateUrl: './add-new-certificate.component.html',
  styleUrls: ['./add-new-certificate.component.scss']
})

export class AddNewCertificateComponent implements OnInit{
  form!: FormGroup;
  newTags: string[] = [];
  @Output()
  isCancelled = new EventEmitter<boolean>();

  constructor(private service: CreateService) {
  }
  submit() {
    console.log("Submitted!");
    const json: string = '';
    this.service.create('/certificates_with_tags',
      {
        name: this.form.value.title,
        tags: this.newTags,
        description: this.form.value.description,
        price: this.form.value.price,
        duration: this.form.value.duration
      })
      .subscribe();
    console.log("Created!");
    this.isCancelled.emit(false);
  }

  cancelPressed(){
    this.isCancelled.emit(false);
  }

  addTag() {
    console.log('Adding tag: ' + this.form.value.tags);
    this.newTags.push(this.form.value.tags);
    this.form.get('tags')?.reset();
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
    this.form = new FormGroup({
      title: new FormControl(null,
        [
        Validators.required
      ]),
      description: new FormControl(null,
        [
          Validators.required
        ]),
      duration: new FormControl(0,
        [
        Validators.required,
        Validators.min(0)
      ]),
      price: new FormControl(0.01,
        [
        Validators.required,
        Validators.min(0.01)
      ]),
      tags: new FormControl(null,
        [
        Validators.required
      ])
    });
  }
}
