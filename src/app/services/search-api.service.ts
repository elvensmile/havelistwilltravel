import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {IPlace} from "../model/i-place";
import {fromPromise} from "rxjs/observable/fromPromise";


const BASE_URL_HERE3 = "https://image.maps.cit.api.here.com/mia/1.6/";
const API_KEY_HERE = "YOUR_KEY"; //use your key please - используйте ваши ключи, пожалуйста
const APP_CODE_HERE = "YOUR_KEY"; //use your key please - используйте ваши ключи, пожалуйста







@Injectable()
export class SearchApiService {
  constructor(private http: HttpClient) {
  }



  getPlaceMapImage(query: string): Observable<string> {
    const url = `${BASE_URL_HERE3}mapview?app_id=${API_KEY_HERE}&app_code=${APP_CODE_HERE}&n=10&w=390&${query}&ml=rus`;

    return fromPromise(this.getAsyncImage(url));
  }

  getAsyncImage(query: string): Promise<any> {

    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img.src);
      img.onerror = () => reject(new Error("404"));
      img.src = query;
    });
  }

  getCitiesGoogle(query: string) {

    if (query === undefined) {
      return [];
    }


    return Observable.create(obs => {

        const displaySuggestions = function (predictions, status) {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            obs.error(status);
          }
          else {
            obs.next(predictions);
            obs.complete();
          }
        };

        const service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({input: query, types: 'cities'}, displaySuggestions)
      });




  }

  getCityInfoGoogle(placeid: string) {


    return Observable.create(obs => {
      const displayPlaceDetals = function (details, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          obs.error(status);
        }
        else {

          obs.next({lat: details.geometry.location.lat(), lng: details.geometry.location.lng()});
          obs.complete();
        }
      };
      const service = new google.maps.places.PlacesService(document.getElementById('map'));
      service.getDetails({placeId: placeid}, displayPlaceDetals)
    });


  }

  getPlacesGoogle(query: string) {

    return Observable.create(obs => {
      const displayPlaceDetals = function (nearbyPlaces, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          obs.error(status);
        }
        else {

          obs.next(nearbyPlaces);
          obs.complete();
        }
      };
      const service = new google.maps.places.PlacesService(document.getElementById('map'));
      service.textSearch({location: query, query: 'достопримечательности', radius: 1000}, displayPlaceDetals)
    });

  }


getPicturesUrlGoogle(place:IPlace){
    if(!place.photos) { return 'https://res.cloudinary.com/elvenapps/image/upload/v1524746683/390x300_jufqje.png'}

    const url = place.photos['0'].getUrl({'maxWidth': 400, 'maxHeight': 350});

    return url;
  }

  getPlaceDetailsGoogle(placeid: string) {


    return Observable.create(obs => {
      const displayPlaceDetals = function (details, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          obs.error(status);
        }
        else {

          obs.next(details);
          obs.complete();
        }
      };
      const service = new google.maps.places.PlacesService(document.getElementById('map'));
      service.getDetails({placeId: placeid}, displayPlaceDetals)
    });


  }

}
