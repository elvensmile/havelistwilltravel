import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {IPlace} from '../model/i-place';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {IUser} from '../model/i-user';
import {AuthService} from '../services/auth.service';
import {SharingPlacesService} from '../services/sharing-places.service';

@Component({
  selector: 'hlwt-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  places: any = [];
  tripTitle: string;
  id;
  user: IUser;
  place: IPlace;


  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute, private auth: AuthService, private share: SharingPlacesService) {
  }

  ngOnInit() {

    this.auth.user.subscribe(user => {

      this.user = user;
      this.getTripList(user.uid);
      this.getTripDetails(user.uid);
    });


    console.log('--- places', this.places);


  }

  getTripList(user: string) {

    return this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this.firebaseService.getTripList(user, params.get('id'))
          .snapshotChanges();
      })

      .subscribe(item => {
        this.places = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['key'] = element.key;
          this.places.push(x);
        });
      });

  }

  getTripDetails(user: string) {
    return this.firebaseService.getTripDetails(user, this.route.snapshot.paramMap.get('id'))
      .snapshotChanges()
      .subscribe(
        item => {
          this.tripTitle = item['0'].payload.toJSON();
          console.log(item);
        }
      );

  }


  onDelete(key: string) {

    this.firebaseService.removePlace(this.user.uid, this.id, key);
  }

  changePlace(place: IPlace) {
    this.place = place;

    this.share.sendPlace(this.place);
  }


}
