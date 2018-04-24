import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AuthService]
})
export class LoginModule {
}
