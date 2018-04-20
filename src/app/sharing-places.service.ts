import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IPlace} from "./model/i-place";

@Injectable()
export class SharingPlacesService {

  private placeSource = new BehaviorSubject<IPlace>('');
  currentPlace = this.placeSource.asObservable();

  constructor() { }

  sendPlace(place: IPlace) {
    this.placeSource.next(place)
  }



}
