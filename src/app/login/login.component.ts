import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';


const AUTH_ERROR_CODE = 'auth/wrong-password';
const errorMessages = {
  DEFAULT: 'Неизвестная ошибка. Попробуйте позже.',
  AUTH_ERROR_CODE: 'Неверные имя пользователя и пароль.'
};


@Component({
  selector: 'hlwt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage = '';


  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      inputEmailForm: ['', [Validators.required, Validators.email]],
      inputPasswordForm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
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

    if (errors['email']) {
      return `Введите корректный email`;
    }

  }

  onSubmitLogin() {
    if (this.form.invalid) {
      return;
    }

    event.preventDefault();

    this.auth.login(this.form.value.inputEmailForm, this.form.value.inputPasswordForm)
      .catch(error =>
        this.handleLoginError(error)
      )
      .then(() => this.form.reset());

  }

  onSubmitSignUp() {

    if (this.form.invalid) {
      return;
    }

    event.preventDefault();

    this.auth.signup(this.form.value.inputEmailForm, this.form.value.inputPasswordForm)
      .then(() => this.form.reset())

      .catch(error =>
        this.handleLoginError(error)
      );

  }

  private handleLoginError(error: any) {
    console.log('--- error', error);
    let errorMessage = errorMessages.DEFAULT;

    if (error && error.code === AUTH_ERROR_CODE) {
      errorMessage = errorMessages.AUTH_ERROR_CODE;
    }

    this.errorMessage = errorMessage;
  }


}
