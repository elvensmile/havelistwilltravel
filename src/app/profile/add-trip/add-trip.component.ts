import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {FirebaseService} from "../../firebase.service";
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'hlwt-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {


  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private firebase: FirebaseService, private modalService: NgbModal) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });

  }

  getErrors(errors: any): string {
    if (errors['required']) {
      return 'поле обязательно для заполнения';
    }

    if (errors['minlength']) {
      return `минимальная длина — ${errors['minlength']['requiredLength']}`;
    }

    if (errors['maxlength']) {
      return `максимальная длина — ${errors['maxlength']['requiredLength']}`;
    }

  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

      event.preventDefault();
      this.firebase.addTrip({title:this.form.value.title})
        .then(()=>this.form.reset())

  }

  open(content) {
    return this.modalService.open(content).result;
  }


  }
