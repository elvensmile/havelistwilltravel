import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {ICandidate} from '../model/i-candidate';
import {IPlace} from '../model/i-place';
import {ICityInfoHere} from '../model/i-cityInfoHere';
import {IPlaceDetails} from '../model/i-placeDetails';


const BASE_URL_HERE = 'https://autocomplete.geocoder.cit.api.here.com/6.2/';
const BASE_URL_HERE2 = 'https://geocoder.cit.api.here.com/6.2/';
const API_KEY_HERE = 'JbIOPoL5RQKXY4qcnTwn';
const APP_CODE_HERE = 's2hsEBmd2aTzMRonEVqJqg';

const BASE_URL_FOURSQUARE = 'https://api.foursquare.com/v2/venues';
const API_KEY_FOURSQUARE = 'NMXZN4BEVXXKXKMXABZKKUXG25DXMBNJ0VOMGUX24UPMTUYX';
const APP_CODE_FOURSQUARE = '2SPUP30SILNAJO4KOQUMQSFEDK4M04CBUPQGHUIBFOW5WU4P';
const CATEGORIES_FOURSQARE = '4d4b7105d754a06377d81259,4deefb944765f83613cdba6e,5642206c498e4bfca532186c,4bf58dd8d48988d1e2931735,4bf58dd8d48988d181941735,507c8c4091d498d9fc8c67a9,4d4b7105d754a06373d81259,4bf58dd8d48988d131941735,4bf58dd8d48988d1e2941735';



@Injectable()
export class SearchApiService {

  constructor(private http: HttpClient) {
  }


  getCities(query) {
    return this.http.get(`${BASE_URL_HERE}suggest.json?query=${query}&app_id=${API_KEY_HERE}&app_code=${APP_CODE_HERE}`)
      .map(res => res['suggestions'] as ICandidate[] || []);

  }

  getCityInfo(searchtext) {

    return this.http.get<ICityInfoHere>(`${BASE_URL_HERE2}geocode.json?app_id=${API_KEY_HERE}&app_code=${APP_CODE_HERE}&searchtext=${searchtext}`)
      .map(res => res['Response'].View['0'].Result['0'].Location as ICityInfoHere);


  }


  getPlaces(query) {


    return this.http.get(`${BASE_URL_FOURSQUARE}/search?ll=${query}&categoryId=${CATEGORIES_FOURSQARE}&client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413&limit=15`)

    /*return Observable.of(mockArray)*/
      .map(res => res['response'].venues as IPlace[] || []);


  }

  getPicturesUrl(query) {
    return this.http.get(`${BASE_URL_FOURSQUARE}/${query}/photos?group=venue&client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413`)
          .map(res => `${res['response'].photos.items[0].prefix}400x250${res['response'].photos.items[0].suffix}`)
      .onErrorResumeNext(Observable.empty<string>());
  }


  getPlaceDetails(query) {

    return this.http.get(`https://api.foursquare.com/v2/venues/${query}?client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413`)
      .map(res => {
        console.log('res');
        return res['response'].venue as IPlaceDetails[] || [];
      });
  }


}