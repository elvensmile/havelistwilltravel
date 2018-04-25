import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {FirebaseService} from "../services/firebase.service";
import {ITrip} from "../model/i-trip";
import {IPlace} from "../model/i-place";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SharingPlacesService} from "../services/sharing-places.service";
import {AuthService} from "../services/auth.service";
import {IUser} from "../model/i-user";

@Component({
  selector: "hlwt-add-into-trip",
  templateUrl: "./add-into-trip.component.html",
  styleUrls: ["./add-into-trip.component.css"]
})
export class AddIntoTripComponent implements OnInit, OnDestroy {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  user: IUser;
  place: IPlace;

  trips: any = [];
  form: FormGroup;
  selectedTrip = this.trips[0];
  added: string = "";

  getTripsFromBase;
  sharePlace;

  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private share: SharingPlacesService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getTripsFromBase = this.auth.user.subscribe(user => {
      this.user = user;
      if (user != null) {
        this.getTrips(user.uid);
      }
    });

    this.sharePlace = this.share.currentPlace.subscribe(place => {
      return (this.place = place);
    });

    this.form = this.formBuilder.group({
      chooseTrip: [""]
    });

    this.form.get("chooseTrip").valueChanges.subscribe(() => (this.added = ""));
  }

  ngOnDestroy() {
    this.getTripsFromBase.unsubscribe();
    this.sharePlace.unsubscribe();
  }

  getTrips(user: string) {
    return this.firebaseService
      .getUserTripsList(user)
      .snapshotChanges()
      .subscribe(item => {
        this.trips = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x["key"] = element.key;
          this.trips.push(x);

          this.firebaseService.changeList(this.trips.length);
        });
      });
  }

  onAddTrip(trip: ITrip) {
    event.preventDefault();
    this.firebaseService
      .addPlace(this.user.uid, this.place, trip)
      .then(() => (this.added = "Добавлено"));
  }
}
