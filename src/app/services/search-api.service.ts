import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {ICandidate} from "../model/i-candidate";
import {IPlace} from "../model/i-place";
import {ICityInfoHere} from "../model/i-cityInfoHere";
import {IPlaceDetails} from "../model/i-placeDetails";
import {fromPromise} from "rxjs/observable/fromPromise";
import {ICityInfoGoogle} from "../model/i-cityInfoGoogle";

const BASE_URL_HERE = "https://autocomplete.geocoder.cit.api.here.com/6.2/";
const BASE_URL_HERE2 = "https://geocoder.cit.api.here.com/6.2/";
const BASE_URL_HERE3 = "https://image.maps.cit.api.here.com/mia/1.6/";
const API_KEY_HERE = "JbIOPoL5RQKXY4qcnTwn";
const APP_CODE_HERE = "s2hsEBmd2aTzMRonEVqJqg";

const BASE_URL_FOURSQUARE = "https://api.foursquare.com/v2/venues";
const API_KEY_FOURSQUARE = "NMXZN4BEVXXKXKMXABZKKUXG25DXMBNJ0VOMGUX24UPMTUYX";
const APP_CODE_FOURSQUARE = "2SPUP30SILNAJO4KOQUMQSFEDK4M04CBUPQGHUIBFOW5WU4P";
const CATEGORIES_FOURSQARE =
  "4d4b7105d754a06377d81259,4deefb944765f83613cdba6e,5642206c498e4bfca532186c,4bf58dd8d48988d1e2931735,4bf58dd8d48988d181941735,507c8c4091d498d9fc8c67a9,4d4b7105d754a06373d81259,4bf58dd8d48988d131941735,4bf58dd8d48988d1e2941735";

const BASE_URL_GOOGLE = 'https://maps.googleapis.com/maps/api/';
const API_KEY_GOOGLE = 'AIzaSyDNQi-8ESi5eB22KlDK3O8I_iG--Tbzio0';



@Injectable()
export class SearchApiService {
  constructor(private http: HttpClient) {}

  getCities(query: string) {
    return this.http
      .get(
        `${BASE_URL_HERE}suggest.json?query=${query}&app_id=${API_KEY_HERE}&app_code=${APP_CODE_HERE}`
      )
      .map(res => (res["suggestions"] as ICandidate[]) || []);
  }

  getCityInfo(searchtext: string) {
    return this.http
      .get<ICityInfoHere>(
        `${BASE_URL_HERE2}geocode.json?app_id=${API_KEY_HERE}&app_code=${APP_CODE_HERE}&searchtext=${searchtext}`
      )
      .map(
        res => res["Response"].View["0"].Result["0"].Location as ICityInfoHere
      );
  }

  getPlaces(query: string) {
    return this.http
      .get(
        `${BASE_URL_FOURSQUARE}/search?ll=${query}&categoryId=${CATEGORIES_FOURSQARE}&client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413&limit=10`
      )

      .map(res => (res["response"].venues as IPlace[]) || [])
      .onErrorResumeNext(Observable.empty<IPlace>());
  }

  getPicturesUrl(query: string) {
    return this.http
      .get(
        `${BASE_URL_FOURSQUARE}/${query}/photos?group=venue&client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413`
      )
      .map(
        res =>
          `${res["response"].photos.items[0].prefix}400x250${
            res["response"].photos.items[0].suffix
          }`
      )
      .onErrorResumeNext(Observable.empty<string>());
  }

  getPlaceDetails(query: string): Observable<IPlaceDetails> {
    return this.http
      .get(
        `https://api.foursquare.com/v2/venues/${query}?client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413`
      )
      .map(res => {
        return res["response"].venue as IPlaceDetails;
      });
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
    console.log('query', query);
    return this.http
      .get(
        `${BASE_URL_GOOGLE}place/autocomplete/json?input=${query}&types=(cities)&language=ru_RU&key=${API_KEY_GOOGLE}`
      )
      .take(5)
      .map(res => (res["predictions"] as ICandidate[]) || []);
  }

  getCityInfoGoogle(placeid: string) {
    return this.http
      .get<ICityInfoGoogle>(
        `${BASE_URL_GOOGLE}place/details/json?placeid=${placeid}&key=${API_KEY_GOOGLE}`
      )
      .map(
        res => res['result'] as ICityInfoGoogle
      );
  }

  getPlacesGoogle(query: string) {
    return this.http
      .get(
        `${BASE_URL_GOOGLE}place/textsearch/json?query=Достопримечательности&location=${query}&radius=10000&key=${API_KEY_GOOGLE}`
      )
      .take(5)

      .map(res => (res["results"] as IPlace[]) || [])
      .do((res)=>console.log('11', res))
      .onErrorResumeNext(Observable.empty<IPlace>());
  }

getPicturesUrlGoogle(query: string) {
    console.log('query', query);
    if (query === 'https://res.cloudinary.com/elvenapps/image/upload/v1523968290/450x250_wxrfpd.png')

    { console.log('wut:', Observable.of('https://res.cloudinary.com/elvenapps/image/upload/v1523968290/450x250_wxrfpd.png') );
      return Observable.of('https://res.cloudinary.com/elvenapps/image/upload/v1523968290/450x250_wxrfpd.png')}

    else
      console.log('wut1:', Observable.of(this.http.get(
        `${BASE_URL_GOOGLE}place/photo?maxwidth=400&photoreference=${query}&key=${API_KEY_GOOGLE}`)));
    return Observable.of(this.http.get(
        `${BASE_URL_GOOGLE}place/photo?maxwidth=400&photoreference=${query}&key=${API_KEY_GOOGLE}`))


      .onErrorResumeNext(Observable.empty<string>());}




}
