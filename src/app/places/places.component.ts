import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchApiService} from '../search-api.service';
import {GpskeeperService} from "../gpskeeper.service";
import {FirebaseService} from "../firebase.service"
import {IPlace} from "../model/i-place";
import {Observable} from "rxjs/Observable";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SharingPlacesService} from "../sharing-places.service";




@Component({
  selector: 'hlwt-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {



  errorMessage: string;
  places: IPlace[] = [];
  showplaces = false;
  allThings = [];
  popularThingsToDo = {};
  beenHere: any = '';
  doneThat: any = '';

  place: IPlace;


  constructor(private searchApiService: SearchApiService, private gpskeeper: GpskeeperService, private firebase: FirebaseService, private modalService: NgbModal, private share:SharingPlacesService) {
  }

  ngOnInit() {

    this.share.currentPlace.subscribe(place => {
      console.log('place sent',place);
      return this.place = place})

//код после лекции по RX
    this.gpskeeper.currentGps
      .distinctUntilChanged()
      .filter(query => query != "")
      .subscribe(query => this.getPlaces(query))


    console.log('---pttd', this.popularThingsToDo)

  }

  getPlaces(placeGps) {
    Observable.of(placeGps)
      .do(() => {this.places = [];
      this.showplaces = false;})
      .switchMap(queryBoxGps => this.searchApiService.getPlaces(queryBoxGps))
      .do(()=>this.showplaces = true)
      .flatMap(places => {
        console.log('places', places);
        return Observable.from(places)
      })
      .flatMap(place => {
        return this.searchApiService.getPicturesUrl(place.id)
          .map(pictureUrl => {
            place['imageUrl'] = pictureUrl;
            return place
          })
      })
      .subscribe(place => {
        this.places.push(place)
        console.log('places f', this.places.length);
      }, (error) => {
        this.errorMessage = "Ой, мы ничего не нашли";
        console.log('---error', error)
      });
  }

  /*
  Код до лекции по RX
  .subscribe(queryBoxGps => {
          this.urls = [];
          this.searchApiService.getPlaces(queryBoxGps)
            .subscribe(places => {
              this.places = places;
              console.log('places', places)
              places.forEach(place => {
                let x = place.id;
                this.searchApiService.getPicturesUrl(place.id)
                  .subscribe(
                  url => this.urls[x] = url)
              })


              console.log(this.urls);
            })


        })*/

  //   places.forEach(item => this.allThings.push(item.categories[0]) )
  /*  this.popularThingsToDo = this.allThings.reduce((acc, curr) => {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }

      return acc;
    }, {});*/


  /* this.beenHere = Object.keys(this.popularThingsToDo)[0];
   this.doneThat = Object.keys(this.popularThingsToDo)[1];*/

/*  sendPlace(place:IPlace) {
    this.place = place;
    this.sendPlaceEvent.emit(this.selectedPlace)
    console.log('otpravil place', this.selectedPlace)
  }*/

 onAdd(place:IPlace, content) {
    event.preventDefault();

    this.changePlace(place);

   return this.modalService.open(content).result;

}


  changePlace(place:IPlace){
    this.place = place;
    console.log('onadd triggered', this.place);
    this.share.sendPlace(this.place);
  }

}
