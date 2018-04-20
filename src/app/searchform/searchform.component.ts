import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

import {Observable} from 'rxjs/Observable';
import {SearchApiService} from '../search-api.service';
import {GpskeeperService} from "../gpskeeper.service";
import 'rxjs/Rx';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import {ICandidate} from "../model/i-candidate";
import {ICityInfoHere} from "../model/i-cityInfoHere";
import {IPlace} from "../model/i-place";


@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchFormComponent implements OnInit {

  errorMessage: string = '';
  form: FormGroup;
  candidates: ICandidate[] = [];
  model: any;
  lastSelectedCity = "";
  queryBox: ICityInfoHere;


  constructor(private formBuilder: FormBuilder, private searchApiService: SearchApiService, private gpskeeper: GpskeeperService) {
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      city: ['']

    });

    this.form.get('city').valueChanges
      .distinctUntilChanged()

      .filter(value => value != this.lastSelectedCity)
      .debounceTime(500)
      .switchMap(value =>
        this.searchApiService.getCities(value))
      .subscribe((result) => {
        console.log('-selected city', this.lastSelectedCity);
        this.setCandidates(result);


      }, (error) => {

        console.log('-error', this.errorMessage)
      });
  }

  onSelectCity(city: ICandidate) {
    this.lastSelectedCity = city.label;
    this.form.controls['city'].setValue(city.label);
    this.setCandidates([]);
    let cityArgument = city.address.city;

    if (cityArgument === undefined) {

      cityArgument = city.address.state
    }

    this.searchApiService.getCityInfo(cityArgument)
      .subscribe(
        (res) => {
          this.queryBox = res;
          this.gpskeeper.changeGps(this.getQueryBoxGps(res));
        }
      );


  }

  getQueryBoxGps(queryBox: ICityInfoHere) {
    let queryBoxGps = `${queryBox.DisplayPosition.Latitude},${queryBox.DisplayPosition.Longitude}`
    console.log('-GPS', queryBoxGps)
    return queryBoxGps
  }


  setCandidates(candidates: ICandidate[]) {
    let results = candidates.filter(item => item.matchLevel == "city" || item.matchLevel == "state");
    this.candidates = results;
    console.log('- candidates', candidates);
  }


}
