import {Component, OnDestroy, OnInit} from "@angular/core";
import {SearchApiService} from "../../services/search-api.service";
import {GpskeeperService} from "../../services/gpskeeper.service";
import {FirebaseService} from "../../services/firebase.service";
import {IPlace} from "../../model/i-place";
import {Observable} from "rxjs/Observable";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SharingPlacesService} from "../../services/sharing-places.service";

@Component({
  selector: "hlwt-places",
  templateUrl: "./places.component.html",
  styleUrls: ["./places.component.css"]
})
export class PlacesComponent implements OnInit, OnDestroy {
  errorMessage: string;
  places: IPlace[] = [];
  showplaces = false;

  place: IPlace;
  currentPlace;
  gotPlaces;
  showSpinner: boolean = true;

  constructor(
    private searchApiService: SearchApiService,
    private gpskeeper: GpskeeperService,
    private firebase: FirebaseService,
    private modalService: NgbModal,
    private share: SharingPlacesService
  ) {}

  ngOnInit() {
    this.currentPlace = this.share.currentPlace
      .distinctUntilChanged()
      .filter(place => place !=  '')
      .subscribe(place => (this.place = place));

   this.gotPlaces= this.gpskeeper.currentGps
      .distinctUntilChanged()
      .filter(query => query != "")
      .subscribe(query => this.getPlaces(query));
  }

  ngOnDestroy() {
  this.currentPlace.unsubscribe();

  }

  getPlaces(placeGps: string) {
    this.places = [];
    this.showplaces = false;


    this.searchApiService
      .getPlacesGoogle(placeGps)
      .do(() => {
        this.showplaces = true;
      })
      .switchMap(places => this.setPicturesUrlsGoogle(places))

      .onErrorResumeNext()
      .finally(() => {

        this.showSpinner = false;
      })

      .subscribe(
        () => {



        },
        error => {console.log('err', error);
          this.errorMessage = "Ой, мы ничего не нашли";
        }
      );
  }

  setPicturesUrlsGoogle(places): Observable<any> {
    return Observable.combineLatest(
      places.map(place => {

     place["imageUrl"] =  this.searchApiService.getPicturesUrlGoogle(place);
     return  this.places.push(place);



        })
    )}



  onAdd(place: IPlace, content) {
    event.preventDefault();

    this.changePlace(place);

    return this.modalService.open(content).result;
  }

  changePlace(place: IPlace)
{
  this.place = place;

  this.share.sendPlace(this.place);
}
}
