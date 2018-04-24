import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SearchApiService} from '../services/search-api.service';
import {SharingPlacesService} from '../services/sharing-places.service';
import {IPlace} from '../model/i-place';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'hlwt-place-view',
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.css']
})
export class PlaceViewComponent implements OnInit, OnDestroy {

  placeId: IPlace;
  place: any = [];
  sharePlace: ISubscription;
  getDetails: ISubscription;
  placeUrl: string;
  showSpinner = true;


  constructor(private searchapiservice: SearchApiService, private route: ActivatedRoute,
              private router: Router, private share: SharingPlacesService) {
  }

  ngOnInit() {

    this.sharePlace = this.share.currentPlace
      .subscribe(place1 =>

        this.placeId = place1);


    this.getDetails = this.route.paramMap
      .switchMap((params: ParamMap) => this.searchapiservice.getPlaceDetails(params.get('id')))
      .subscribe((result) => {
        this.place = result;
        this.showSpinner = false;
        return this.placeUrl = `${result.bestPhoto.prefix}612x612${result.bestPhoto.suffix}`;
      });

  }

  ngOnDestroy() {
    this.sharePlace.unsubscribe();
    this.getDetails.unsubscribe();
  }



}
