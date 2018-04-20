import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirebaseService} from "../firebase.service";
import {ITrip} from "../model/i-trip";
import {IPlace} from "../model/i-place";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SharingPlacesService} from "../sharing-places.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'hlwt-add-into-trip',
  templateUrl: './add-into-trip.component.html',
  styleUrls: ['./add-into-trip.component.css']
})
export class AddIntoTripComponent implements OnInit {





  place:IPlace;

  trips:any =[];
  form: FormGroup;
  selectedTrip = this.trips[0];


  constructor(private firebaseService: FirebaseService, private formBuilder: FormBuilder, private share:SharingPlacesService, public activeModal: NgbActiveModal) { }

  ngOnInit() {



    this.share.currentPlace

      .subscribe(place => {
      console.log('place recieved',place);
      return this.place = place})


    this.form = this.formBuilder.group({
      chooseTrip: ['']

    });



    this.firebaseService.getUserTripsList()
      .snapshotChanges()
      .subscribe(item => {
        this.trips = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          this.trips.push(x);
          console.log('---', this.trips)
          this.firebaseService.changeList(this.trips.length);
        });

      });


  }



  onAddTrip(trip: ITrip) {

    event.preventDefault();
    this.firebaseService.addPlace(this.place, trip);


    return this.activeModal.dismiss();

  }



}
