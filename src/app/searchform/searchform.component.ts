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


    this.form = this.formBuilder.group({
      city: [""]
    });

    this.form
      .get("city")
      .valueChanges.distinctUntilChanged()
      .filter(value => value != this.lastSelectedCity)
      .debounceTime(500)
      .switchMap(value => this.searchApiService.getCitiesGoogle(value))
      .subscribe(

        result => {
          this.candidates=[];
          this.candidates.push(...result);
          console.log('candidates', this.candidates)
        },
        error => {}
      );
  }

  onSelectCity(city: ICandidate) {
    this.lastSelectedCity = city.description;
    this.form.controls["city"].setValue(city.description);
    this.candidates=[];
    let cityArgument = city.place_id;

    this.searchApiService.getCityInfoGoogle(cityArgument).subscribe(res => {
      this.queryBox = res;
      this.gpskeeper.changeGps(this.getQueryBoxGps(res));
    });
  }

  getQueryBoxGps(queryBox: ICityInfoGoogle) {
    const queryBoxGps = `${queryBox.geometry.location.lat},${
      queryBox.geometry.location.lng
    }`;

    return queryBoxGps;
  }

  /*setCandidates(candidates: ICandidate[]) {
    const results = candidates.filter(
      item => item.matchLevel == "city" || item.matchLevel == "state"
    );
    this.candidates = results;
  }*/
  /*setCandidates(candidates: ICandidate[]) {
    this.candidates = results;
  }*/
}
