import { Component, OnInit } from '@angular/core';
import {IPlaceDetails} from "../model/i-placeDetails";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FirebaseService} from "../firebase.service";
import {SearchApiService} from "../search-api.service";
import {SharingPlacesService} from "../sharing-places.service";
import {IPlace} from "../model/i-place";

@Component({
  selector: 'hlwt-place-view',
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.css']
})
export class PlaceViewComponent implements OnInit {

  placeId: IPlace;
  place:any =[];

  constructor(private searchapiservice: SearchApiService, private route: ActivatedRoute,
              private router: Router, private share:SharingPlacesService) { }

  ngOnInit() {

    this.share.currentPlace

      .subscribe(place1 => {
        console.log('place recieved',place1);
        return this.placeId = place1})

     /*this.searchapiservice.getPlaceDetails().subscribe(
      (result) => {console.log('11122', result); return this.place = result;})*/

    this.route.paramMap
      .switchMap((params: ParamMap) => this.searchapiservice.getPlaceDetails(params.get('id')))
      .subscribe((result)=> {console.log(result); this.place = result})

  }

}
