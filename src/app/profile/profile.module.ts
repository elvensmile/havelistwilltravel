import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {TripListComponent} from "./trip-list/trip-list.component";
import {FirebaseService} from "../firebase.service";
import {AddTripComponent} from "./add-trip/add-trip.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [ReactiveFormsModule, ProfileComponent],
  providers: [FirebaseService, NgbModal],
  declarations: [AddTripComponent,TripListComponent, ProfileComponent]
})
export class ProfileModule { }
