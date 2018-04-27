import {Injectable} from "@angular/core";
import {IPlace} from "../model/i-place";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ITrip} from "../model/i-trip";
import {IUser} from "../model/i-user";

const BASE_URL = "https://have-list-will-t-1523390586858.firebaseio.com/";

@Injectable()
export class FirebaseService {
  usersTripsList: AngularFireList<any>;

  private tripListLength = new BehaviorSubject(0);
  currentTripListLength = this.tripListLength.asObservable();

  constructor(private firebasedb: AngularFireDatabase) {}

  changeList(length: number) {
    this.tripListLength.next(length);
  }

  getTripList(user: string, key: any) {
    return this.firebasedb.list(`users/${user}/places/${key}`);
  }

  getTripDetails(user: string, key: any) {
    return this.firebasedb.list(`users/${user}/trips/${key}`);
  }

  addPlace(user: string, place: IPlace, trip: any) {
    return this.firebasedb.list(`users/${user}/places/${trip.key}`).push({
      name: place.name,
      imageUrl: place.imageUrl,
      id: place.id
    });
  }

  removePlace(user: string, tripKey: string, key: string) {
    this.firebasedb.list(`users/${user}/places/${tripKey}`).remove(key);
  }

  getUserTripsList(user: string) {
    this.usersTripsList = this.firebasedb.list(`users/${user}/trips/`);

    return this.usersTripsList;
  }

  addTrip(user: IUser, trip: ITrip) {
    return this.firebasedb.list(`users/${user.uid}/trips/`).push({
      title: trip.title
    });
  }

  removeTrip(user: string, key: string) {
    this.firebasedb.list(`users/${user}/trips/`).remove(key);
  }
}
