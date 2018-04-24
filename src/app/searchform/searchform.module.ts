import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {SearchFormComponent} from './searchform.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchApiService} from '../services/search-api.service';
import {GpskeeperService} from '../services/gpskeeper.service';
import {FirebaseService} from '../services/firebase.service';
import {PlacesComponent} from '../places/places.component';
import {RouterModule} from '@angular/router';

import {AddIntoTripModule} from '../add-into-trip/add-into-trip.module';
import {SharingPlacesService} from '../services/sharing-places.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    AddIntoTripModule

  ],
  declarations: [SearchFormComponent, PlacesComponent],
  exports: [SearchFormComponent],
  providers: [SearchApiService, GpskeeperService, FirebaseService, SharingPlacesService]
})
export class SearchFormModule { }
