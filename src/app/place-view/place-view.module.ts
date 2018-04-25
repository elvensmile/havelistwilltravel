import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PlaceViewComponent} from "./place-view.component";
import {SearchApiService} from "../services/search-api.service";

import {AddIntoTripModule} from "../add-into-trip/add-into-trip.module";
import {SharingPlacesService} from "../services/sharing-places.service";
import {WorkingTimePipe} from "../pipes/working-time.pipe";
import {LoadingSpinnerModule} from "../ui/loading-spinner/loading-spinner.module";

@NgModule({
  imports: [CommonModule, NgbModule, AddIntoTripModule, LoadingSpinnerModule],
  declarations: [PlaceViewComponent, WorkingTimePipe],
  providers: [SearchApiService, SharingPlacesService]
})
export class PlaceViewModule {}
