import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {ICandidate} from "./model/i-candidate";
import {IPlace} from "./model/i-place";
import {ICityInfoHere} from "./model/i-cityInfoHere";
import {onErrorResumeNext} from "rxjs/operators";

const BASE_URL_SYGIC = 'https://api.sygictravelapi.com/1.0/en/';
const API_KEY_SYGIC = 'k1B2oF80M962jH3hJANnu4W8Twvzauvc2n2Q5wAD';



const BASE_URL_HERE ='https://autocomplete.geocoder.cit.api.here.com/6.2/';
const BASE_URL_HERE2 ='https://geocoder.cit.api.here.com/6.2/';
const API_KEY_HERE = 'JbIOPoL5RQKXY4qcnTwn';
const APP_CODE_HERE = 's2hsEBmd2aTzMRonEVqJqg';

const BASE_URL_GOOGLE = 'https://maps.googleapis.com/maps/api/place/';
const API_KEY_GOOGLE = 'AIzaSyDNQi-8ESi5eB22KlDK3O8I_iG--Tbzio0';

const BASE_URL_FOURSQUARE ='https://api.foursquare.com/v2/venues';
const API_KEY_FOURSQUARE ='NMXZN4BEVXXKXKMXABZKKUXG25DXMBNJ0VOMGUX24UPMTUYX';
const APP_CODE_FOURSQUARE ='2SPUP30SILNAJO4KOQUMQSFEDK4M04CBUPQGHUIBFOW5WU4P';
const CATEGORIES_FOURSQARE = '4d4b7105d754a06377d81259,4deefb944765f83613cdba6e,5642206c498e4bfca532186c,4bf58dd8d48988d1e2931735,4bf58dd8d48988d181941735,507c8c4091d498d9fc8c67a9,4d4b7105d754a06373d81259,4bf58dd8d48988d131941735,4bf58dd8d48988d1e2941735';

const mockArray = {
  "meta": {
    "code": 200,
    "requestId": "5ac51d7e6a607143d811cecb"
  },
  "response": {
    "venues": [
      {
        "id": "5642aef9498e51025cf4a7a5",
        "name": "Mr. Purple",
        "location": {
          "address": "180 Orchard St",
          "crossStreet": "btwn Houston & Stanton St",
          "lat": 40.72173744277209,
          "lng": -73.98800687282996,
          "labeledLatLngs": [
            {
              "label": "display",
              "lat": 40.72173744277209,
              "lng": -73.98800687282996
            }
          ],
          "distance": 8,
          "postalCode": "10002",
          "cc": "US",
          "city": "New York",
          "state": "NY",
          "country": "United States",
          "formattedAddress": [
            "180 Orchard St (btwn Houston & Stanton St)",
            "New York, NY 10002",
            "United States"
          ]
        },
        "categories": [
          {
            "id": "4bf58dd8d48988d1d5941735",
            "name": "Hotel Bar",
            "pluralName": "Hotel Bars",
            "shortName": "Hotel Bar",
            "icon": {
              "prefix": "https://ss3.4sqi.net/img/categories_v2/travel/hotel_bar_",
              "suffix": ".png"
            },
            "primary": true
          }
        ],
        "venuePage": {
          "id": "150747252"
        }
      }
    ]
  }
}

@Injectable()
export class SearchApiService {

  constructor(private http: HttpClient) {
  }


  getCities(query) {
    return this.http.get(`${BASE_URL_HERE}suggest.json?query=${query}&app_id=${API_KEY_HERE}&app_code=${APP_CODE_HERE}`)
      .map(res => res['suggestions'] as ICandidate[] || [])
      .map<ICandidate[], ICandidate[]>(result => {
        return Object.entries(result).map(
          ([id, value]) => Object.assign({}, value, {id})
        );
      });
  }

  getCityInfo(searchtext) {
    console.log('mytext', searchtext);
    return this.http.get<ICityInfoHere>(`${BASE_URL_HERE2}geocode.json?app_id=${API_KEY_HERE}&app_code=${APP_CODE_HERE}&searchtext=${searchtext}`)
      .map(res => res['Response'].View["0"].Result["0"].Location as ICityInfoHere)


  }

  getPlacesSygic(query) {

    return this.http.get(`${BASE_URL_SYGIC}places/list?location=${query}&levels=poi&limit=10`, {
      headers: new HttpHeaders({
        'x-api-key': API_KEY_SYGIC
      })
    }).map(res => res['data'].places as IPlace[] || [])
      .map<IPlace[], IPlace[]>(result => {
        return Object.entries(result).map(
          ([id, value]) => Object.assign({}, value, {id})
        );
      });
  }

  /* getPlaces(query) {

     return this.http.get(`${BASE_URL_GOOGLE}radarsearch/json?location=${query}&radius=5000`, {
       headers: new HttpHeaders({
         'Content-Type': 'application/x-www-form-urlencoded'
       })
     }).map(res => res.results as IPlace[] || [])
       .map<IPlace[], IPlace[]>(result => {
         return Object.entries(result).map(
           ([id, value]) => Object.assign({}, value, {id})
         );
       });
   }*/

  getPlaces(query) {


    return this.http.get(`${BASE_URL_FOURSQUARE}/search?ll=${query}&categoryId=${CATEGORIES_FOURSQARE}&client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413&limit=10`)

     /*return Observable.of(mockArray)*/
     .map(res => res['response'].venues as IPlace[] || [])



  }

  getPicturesUrl(query) {
    return Observable.of('https://af-cdn-v-uploads.azureedge.net/uploads/activityphoto-29ad3179-055c-444c-a25e-f672a3dda6cd.jpg')/*this.http.get(`${BASE_URL_FOURSQUARE}/${query}/photos?group=venue&client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413`)
      .map(res => `${res['response'].photos.items[0].prefix}400x250${res['response'].photos.items[0].suffix}`)
      .onErrorResumeNext(Observable.empty<string>());*/
  }



}
