import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../firebase.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {trigger, state, style, animate, transition, query, stagger, keyframes} from '@angular/animations';

@Component({
  selector: 'hlwt-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
  animations: [
    trigger('actual', [
      transition('* => *', [
         query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter',
           stagger('300ms', [
             animate('1s ease-in', keyframes([
               style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
               style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
               style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
             ]))]), {optional: true})
      ])
  ])
]




})
export class TripListComponent implements OnInit {

  trips: any =[];

  disableAnimation:boolean = true; //пока так


  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
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

  onDelete(key : string){
    event.preventDefault();
    event.stopPropagation();
    this.firebaseService.removeTrip(key);


  }



}
