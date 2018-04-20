import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from "../firebase.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {




  tripsCounter: number;



  constructor(private firebase: FirebaseService) { }

  ngOnInit() {

    this.firebase.currentTripListLength.subscribe(number => this.tripsCounter = number)
  }




}
