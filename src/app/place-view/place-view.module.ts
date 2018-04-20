import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PlaceViewComponent} from "./place-view.component";
import {SearchApiService} from "../search-api.service";

import {AddIntoTripModule} from "../add-into-trip/add-into-trip.module";
import {SharingPlacesService} from "../sharing-places.service";
import {AddIntoTripComponent} from "../add-into-trip/add-into-trip.component";


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    AddIntoTripModule

  ],

  providers: [SearchApiService, SharingPlacesService]


})
export class PlaceViewModule { }
