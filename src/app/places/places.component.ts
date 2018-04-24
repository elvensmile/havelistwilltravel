import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchApiService} from '../services/search-api.service';
import {GpskeeperService} from '../services/gpskeeper.service';
import {FirebaseService} from '../services/firebase.service';
import {IPlace} from '../model/i-place';
import {Observable} from 'rxjs/Observable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SharingPlacesService} from '../services/sharing-places.service';


@Component({
  selector: 'hlwt-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit, OnDestroy {



  errorMessage: string;
  places: IPlace[] = [];
  showplaces = false;
  allThings = [];
  popularThingsToDo = {};
  beenHere: any = '';
  doneThat: any = '';

  place: IPlace;
  currentPlace;

  showSpinner: boolean = true;


  constructor(private searchApiService: SearchApiService, private gpskeeper: GpskeeperService, private firebase: FirebaseService, private modalService: NgbModal, private share: SharingPlacesService) {
  }

  ngOnInit() {

    this.currentPlace = this.share.currentPlace
      .distinctUntilChanged()
      .filter(place => place != '')
      .subscribe(place => {
        console.log('place sent', place);
        return this.place = place;
      });

    this.gpskeeper.currentGps
      .distinctUntilChanged()
      .filter(query => query != '')
      .subscribe(query => this.getPlaces(query));



  }

  ngOnDestroy() {

    this.currentPlace.unsubscribe();

  }


  getPlaces(placeGps) {
    Observable.of(placeGps)
      .do(() => {this.places = [];
        this.showplaces = false;
      })
      .switchMap(queryBoxGps => this.searchApiService.getPlaces(queryBoxGps))
      .do(() => {
        this.showplaces = true;
      })
      .flatMap(places => {
        console.log('places', places);
        return Observable.from(places);
      })
      .flatMap(place => {
        return this.searchApiService.getPicturesUrl(place.id)
          .map(pictureUrl => {
            place['imageUrl'] = pictureUrl;
            return place;
          });
      })
      .subscribe(place => {
        this.places.push(place);



      }, (error) => {
        this.errorMessage = 'Ой, мы ничего не нашли';

      });
  }


  onAdd(place: IPlace, content) {
    event.preventDefault();

    this.changePlace(place);

   return this.modalService.open(content).result;


  }


  changePlace(place: IPlace) {
    this.place = place;

    this.share.sendPlace(this.place);
  }


}
