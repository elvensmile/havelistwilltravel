import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FirebaseService} from '../../services/firebase.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IUser} from "../../model/i-user";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'hlwt-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {


  user: IUser;


  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private firebase: FirebaseService, private modalService: NgbModal, private auth: AuthService, public  activeModal: NgbActiveModal) {
  }

  ngOnInit() {

    this.auth.user.subscribe(user => {
      console.log('user hi:', user.uid);
      return this.user = user;
    });

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
    this.firebase.addTrip(this.user, {title: this.form.value.title})
      .then(() => this.form.reset())

  }

  open(content) {
    return this.modalService.open(content).result;
  }


  }
