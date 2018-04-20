import { Injectable } from '@angular/core';
import {IPlace} from "./model/i-place";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {ITrip} from "./model/i-trip";

const BASE_URL = 'https://have-list-will-t-1523390586858.firebaseio.com/'

@Injectable()
export class FirebaseService {


  usersTripsList:AngularFireList<any>;
//  tripsList: AngularFireList<any>;

  private tripListLength = new BehaviorSubject(0);
  currentTripListLength = this.tripListLength.asObservable();

  constructor(private firebasedb: AngularFireDatabase) { }


  changeList(length: number) {
    this.tripListLength.next(length)
  }

  getTripList(key:any) {

    return this.firebasedb.list(`users/1/places/${key}`);
  }

  getTripDetails(key:any) {
    return this.firebasedb.list(`users/1/trips/${key}`);
  }


  addPlace(place:IPlace, trip:any){

    return this.firebasedb.list(`users/1/places/${trip.key}`).push({
    name: place.name,
    imageUrl: place.imageUrl,
    id: place.id
    });


}

  removePlace(tripKey:string, key: string) {

    this.firebasedb.list(`users/1/places/${tripKey}`).remove(key);
  }



  getUserTripsList(){

    this.usersTripsList = this.firebasedb.list('users/1/trips/');

    return this.usersTripsList;

  }

  addTrip(trip:ITrip){

    return this.getUserTripsList().push({
      title: trip.title,

    });


  }
  removeTrip(key: string) {

  this.getUserTripsList().remove(key);
}


}
