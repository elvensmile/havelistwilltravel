import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {FirebaseService} from "../firebase.service";
import {IPlace} from "../model/i-place";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'hlwt-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  places: any = [];
  tripTitle: string;
  id;


  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {


       this.route.paramMap
        .switchMap((params: ParamMap) => { this.id = params.get('id');
         return this.firebaseService.getTripList(params.get('id'))
           .snapshotChanges()})
            .subscribe(item => {
              this.places = [];
              item.forEach(element => {
                let x = element.payload.toJSON();
                x["key"] = element.key;
                this.places.push(x);
              })
            })

    this.firebaseService.getTripDetails(this.route.snapshot.paramMap.get('id'))
      .snapshotChanges()
      .subscribe(
        item=> {
          this.tripTitle = item['0'].payload.toJSON();
        console.log(item);}
      );




        console.log('--- places', this.places);


  }


  onDelete(key : string){
    console.log(this.id);
    this.firebaseService.removePlace(this.id, key);
  }


}
