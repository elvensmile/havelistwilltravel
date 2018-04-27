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
import {ICityInfoHere} from "../model/i-cityInfoHere";
import {Observable} from "rxjs/Observable";

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
  queryBox: ICityInfoHere;
  offlineMessage:string = 'Ой, вы не в сети :(';
  isOnline: Observable<boolean>;


  constructor(
    private formBuilder: FormBuilder,
    private searchApiService: SearchApiService,
    private gpskeeper: GpskeeperService
  ) {
    this.isOnline = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').mapTo(true),
      Observable.fromEvent(window, 'offline').mapTo(false)
    )

  }

  ngOnInit() {


    this.form = this.formBuilder.group({
      city: [""]
    });

    this.form
      .get("city")
      .valueChanges.distinctUntilChanged()
      .filter(value => value != undefined)
      .filter(value => value != this.lastSelectedCity)
      .debounceTime(500)
      .switchMap(value => this.searchApiService.getCities(value))
      .subscribe(
        result => {
          this.setCandidates(result);
        },
        error => {}
      );
  }

  onSelectCity(city: ICandidate) {
    this.lastSelectedCity = city.label;
    this.form.controls["city"].setValue(city.label);
    this.setCandidates([]);
    let cityArgument = city.address.city;

    if (cityArgument === undefined) {
      cityArgument = city.address.state;
    }

    this.searchApiService.getCityInfo(cityArgument).subscribe(res => {
      this.queryBox = res;
      this.gpskeeper.changeGps(this.getQueryBoxGps(res));
    });
  }

  getQueryBoxGps(queryBox: ICityInfoHere) {
    const queryBoxGps = `${queryBox.DisplayPosition.Latitude},${
      queryBox.DisplayPosition.Longitude
    }`;

    return queryBoxGps;
  }

  setCandidates(candidates: ICandidate[]) {
    const results = candidates.filter(
      item => item.matchLevel == "city" || item.matchLevel == "state"
    );
    this.candidates = results;
  }
}
