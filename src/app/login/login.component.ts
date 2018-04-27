import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {fromPromise} from "rxjs/observable/fromPromise";

const AUTH_ERROR_CODE = "auth/wrong-password";
const AUTH_SIGN_UP_ERROR = "auth/email-already-in-use";
const errorMessages = {
  DEFAULT: "Неизвестная ошибка. Попробуйте позже.",
  AUTH_ERROR_CODE: "Неверные имя пользователя и пароль.",
  AUTH_SIGN_UP_ERROR: "Пользователь с такими данными уже существует"
};

@Component({
  selector: "hlwt-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage = "";

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      inputEmailForm: ["", [Validators.required, Validators.email]],
      inputPasswordForm: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
        ]
      ]
    });
  }

  getErrors(errors: any): string {
    if (errors["required"]) {
      return "поле обязательно для заполнения";
    }

    if (errors["minlength"]) {
      return `минимальная длина — ${errors["minlength"]["requiredLength"]}`;
    }

    if (errors["maxlength"]) {
      return `максимальная длина — ${errors["maxlength"]["requiredLength"]}`;
    }

    if (errors["email"]) {
      return `Введите корректный email`;
    }
  }

  onSubmitLogin() {
    if (this.form.invalid) {
      return;
    }

    event.preventDefault();

    fromPromise(
      this.auth.login(
        this.form.value.inputEmailForm,
        this.form.value.inputPasswordForm
      )
    ).subscribe(
      () => {
        this.form.setValue({
          inputEmailForm: "",
          inputPasswordForm: ""
        });
      },
      error => {
        this.handleLoginError(error);
      }
    );
  }

  onSubmitSignUp() {
    if (this.form.invalid) {
      return;
    }

    event.preventDefault();

    fromPromise(
      this.auth.signup(
        this.form.value.inputEmailForm,
        this.form.value.inputPasswordForm
      )
    ).subscribe(
      () => {
        this.form.setValue({
          inputEmailForm: "",
          inputPasswordForm: ""
        });
      },
      error => {
        this.handleLoginError(error);
      }
    );
  }

  private handleLoginError(error: any) {
    let errorMessage = errorMessages.DEFAULT;

    if (error && error.code === AUTH_ERROR_CODE) {
      errorMessage = errorMessages.AUTH_ERROR_CODE;
    } else if (error && error.code === AUTH_SIGN_UP_ERROR) {
      errorMessage = errorMessages.AUTH_SIGN_UP_ERROR;
    }

    this.errorMessage = errorMessage;
  }
}
