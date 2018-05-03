import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class GpskeeperService {
  private queryBoxGps = new BehaviorSubject<string>("");
  currentGps = this.queryBoxGps.asObservable();

  constructor() {}

  changeGps(gps: string) {
    console.log(gps);
    this.queryBoxGps.next(gps);
  }
}
