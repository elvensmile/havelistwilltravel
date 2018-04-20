import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FirebaseService} from "../firebase.service";
import {TripComponent} from "./trip.component"

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [TripComponent],
  exports: [TripComponent],
  providers: [FirebaseService]
})
export class TripModule { }
