import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Routes, RouterModule, RouterLink} from '@angular/router';

import { AppComponent } from './app.component';


import {SearchFormModule} from "./searchform/searchform.module";
import {TripModule} from "./trip/trip.module"
import {HttpClientModule} from "@angular/common/http";

import { NavbarComponent } from './navbar/navbar.component';

import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {PlaceViewModule} from "./place-view/place-view.module";
import {SearchFormComponent} from "./searchform/searchform.component"
import {TripComponent} from "./trip/trip.component";
import { TripListComponent } from './profile/trip-list/trip-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AddTripComponent } from './profile/add-trip/add-trip.component'
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PlaceViewComponent} from "./place-view/place-view.component";
import { WorkingTimePipe } from './pipes/working-time.pipe';
import { AddIntoTripComponent } from './add-into-trip/add-into-trip.component';
import {AddIntoTripModule} from "./add-into-trip/add-into-trip.module";
import {NavbarModule} from "./navbar/navbar.module";
import {ProfileModule} from "./profile/profile.module";




const appRoutes: Routes =[
  { path: '', component: SearchFormComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'trip/:id', component: TripComponent },
  { path: 'place/:id', component: PlaceViewComponent }
];



@NgModule({
  declarations: [
    AppComponent




  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NavbarModule,
    SearchFormModule,
    PlaceViewModule,
    TripModule,
    AddIntoTripModule,
    ProfileModule,


    NgbModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,



  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
