import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FirebaseService} from "../services/firebase.service";
import {TripComponent} from "./trip.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],

  declarations: [TripComponent],
  exports: [TripComponent],
  providers: [FirebaseService]
})
export class TripModule {}
