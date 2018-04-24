import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GpskeeperService {


  private queryBoxGps = new BehaviorSubject<string>('');
  currentGps = this.queryBoxGps.asObservable();

  constructor() { }

  changeGps(gps: string) {
    this.queryBoxGps.next(gps);
    console.log('new gps', this.queryBoxGps);
  }


}
