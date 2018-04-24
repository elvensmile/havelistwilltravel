import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../../services/auth.service';
import {IUser} from '../../model/i-user';

@Component({
  selector: 'hlwt-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
  animations: [
    trigger('actual', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter',
          stagger('300ms', [
            animate('1s ease-in', keyframes([
              style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
              style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
            ]))]), {optional: true})
      ])
    ])
  ]


})
export class TripListComponent implements OnInit {

  user: IUser;

  trips: any = [];

  disableAnimation = true; //пока так


  constructor(private firebaseService: FirebaseService, private auth: AuthService) {
  }

  ngOnInit() {

    this.auth.user.subscribe(user => {
      this.user = user;
      return this.getTrips(user.uid);
    });


  }

  getTrips(user) {
    return this.firebaseService.getUserTripsList(user)
      .snapshotChanges()

      .subscribe(item => {
        this.trips = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['key'] = element.key;
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
