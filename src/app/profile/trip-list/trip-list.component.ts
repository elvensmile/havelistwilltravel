import {Component, OnInit} from "@angular/core";
import {FirebaseService} from "../../services/firebase.service";
import {AuthService} from "../../services/auth.service";
import {IUser} from "../../model/i-user";

@Component({
  selector: "hlwt-trip-list",
  templateUrl: "./trip-list.component.html",
  styleUrls: ["./trip-list.component.css"]
})
export class TripListComponent implements OnInit {
  user: IUser;

  trips: any = [];

  constructor(
    private firebaseService: FirebaseService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user != null) {
        this.user = user;
        return this.getTrips(user.uid);
      }
    });
  }

  getTrips(user) {
    return this.firebaseService
      .getUserTripsList(user)
      .snapshotChanges()

      .subscribe(elements => {
        this.trips = [];
        elements.forEach(element => {
          const x = element.payload.toJSON();

          x["key"] = element.key;

          this.trips.push(x);

          this.firebaseService.changeList(this.trips.length);
        });
      });
  }

  onDelete(key: string) {
    event.preventDefault();
    event.stopPropagation();
    this.firebaseService.removeTrip(this.user.uid, key);
  }
}
