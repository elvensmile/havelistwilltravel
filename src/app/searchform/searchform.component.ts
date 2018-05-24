import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchApiService} from "../services/search-api.service";
import {GpskeeperService} from "../services/gpskeeper.service";
import "rxjs/Rx";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/merge";
import {ICandidate} from "../model/i-candidate";
import {Observable} from "rxjs/Observable";
import {ICityInfoGoogle} from "../model/i-cityInfoGoogle";

@Component({
  selector: "app-searchform",
  templateUrl: "./searchform.component.html",
  styleUrls: ["./searchform.component.css"]
})
export class SearchFormComponent implements OnInit {
  form: FormGroup;
  candidates: ICandidate[] = [];
  model: any;
  lastSelectedCity = "";
  queryBox: ICityInfoGoogle;
  offlineMessage:string = 'Ой, вы не в сети :(';
  isOnline: Observable<boolean>;


  constructor(
    private formBuilder: FormBuilder,
    private searchApiService: SearchApiService,
    private gpskeeper: GpskeeperService
  ) {
    /*this.isOnline = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').mapTo(true),
      Observable.fromEvent(window, 'offline').mapTo(false)
    )*/

  }

  ngOnInit() {

    const googleMap = new google.maps.Map(document.getElementById('map'),{center: { lat: -33.867, lng: 151.206 },zoom: 15});
    this.form = this.formBuilder.group({
      city: [""]
    });

    this.form
      .get("city")
      .valueChanges.distinctUntilChanged()
      .filter(value => value != this.lastSelectedCity)

      .debounceTime(300)

      .switchMap(value => this.searchApiService.getCitiesGoogle(value))
      .subscribe(

        result => {
          this.candidates=[];
          this.candidates.push(...result);

        },
        error => {}
      );
  }

  onSelectCity(city: ICandidate) {
    this.lastSelectedCity = city.description;
    this.form.controls["city"].setValue(city.description);
    this.candidates=[];
    let cityArgument = city.place_id;
   // this.gpskeeper.changeGps(cityArgument);

    this.searchApiService.getCityInfoGoogle(cityArgument).subscribe(res => {


      this.gpskeeper.changeGps(res);
    });
  }

  getQueryBoxGps(queryBox: ICityInfoGoogle) {
    const queryBoxGps = `${queryBox.geometry.location.lat},${
      queryBox.geometry.location.lng
    }`;

    return queryBoxGps;
  }


}
