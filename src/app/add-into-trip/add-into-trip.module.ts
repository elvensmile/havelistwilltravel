import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddIntoTripComponent} from './add-into-trip.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  exports: [AddIntoTripComponent],
  declarations: [AddIntoTripComponent]
})
export class AddIntoTripModule { }
