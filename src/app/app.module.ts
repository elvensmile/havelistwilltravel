import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from "./app.component";

import {SearchFormModule} from "./searchform/searchform.module";
import {TripModule} from "./trip/trip.module";
import {HttpClientModule} from "@angular/common/http";

import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {PlaceViewModule} from "./place-view/place-view.module";
import {SearchFormComponent} from "./searchform/searchform.component";
import {TripComponent} from "./trip/trip.component";
import {ProfileComponent} from "./profile/profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PlaceViewComponent} from "./place-view/place-view.component";
import {AddIntoTripModule} from "./add-into-trip/add-into-trip.module";
import {NavbarModule} from "./navbar/navbar.module";
import {ProfileModule} from "./profile/profile.module";
import {LoginComponent} from "./login/login.component";
import {LoginModule} from "./login/login.module";
import {AngularFireAuthModule} from "angularfire2/auth";
import {LoadingSpinnerModule} from "./ui/loading-spinner/loading-spinner.module";
import {AuthGuard} from "./auth.guard";

const appRoutes: Routes = [
  { path: "", component: SearchFormComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "trip/:id", component: TripComponent, canActivate: [AuthGuard] },
  { path: "place/:id", component: PlaceViewComponent }
];

@NgModule({
  declarations: [AppComponent],
  providers: [NgbActiveModal, AuthGuard],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NavbarModule,
    LoginModule,
    SearchFormModule,
    PlaceViewModule,
    TripModule,
    AddIntoTripModule,
    ProfileModule,

    NgbModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoadingSpinnerModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
