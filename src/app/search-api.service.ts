import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {ICandidate} from "./model/i-candidate";
import {IPlace} from "./model/i-place";
import {ICityInfoHere} from "./model/i-cityInfoHere";
import {onErrorResumeNext} from "rxjs/operators";
import {IPlaceDetails} from "./model/i-placeDetails";


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

const  mockPlace =  {
    "meta": {"code": 200, "requestId": "5ad7a3236a60717d254c5b7d"},
    "response": {
      "venue": {
        "id": "4b5ac862f964a52072d428e3",
        "name": "Wat Hua Lampong (วัดหัวลําโพง)",
        "contact": {"phone": "+6622338109", "formattedPhone": "+66 2 233 8109"},
        "location": {
          "address": "728 Rama IV Rd.",
          "lat": 13.7323788865762,
          "lng": 100.5293176195154,
          "postalCode": "10500",
          "cc": "TH",
          "city": "บางรัก",
          "state": "กรุงเทพมหานคร",
          "country": "Таиланд",
          "formattedAddress": ["728 Rama IV Rd.", "Bang Rak", "Bangkok 10500", "Таиланд"]
        },
        "canonicalUrl": "https:\/\/foursquare.com\/v\/%E0%B8%A7%E0%B8%94%E0%B8%AB%E0%B8%A7%E0%B8%A5%E0%B8%B2%E0%B9%82%E0%B8%9E%E0%B8%87-wat-hua-lampong\/4b5ac862f964a52072d428e3",
        "categories": [{
          "id": "52e81612bcbc57f1066b7a3e",
          "name": "Буддистский храм",
          "pluralName": "Буддистские храмы",
          "shortName": "Буддистский храм",
          "icon": {"prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/building\/religious_", "suffix": ".png"},
          "primary": true
        }],
        "verified": false,
        "stats": {"tipCount": 123},
        "url": "http:\/\/www.wathualampong.com",
        "likes": {"count": 424, "groups": [{"type": "others", "count": 424, "items": []}], "summary": "Лайки:424"},
        "dislike": false,
        "ok": false,
        "rating": 9.2,
        "ratingColor": "00B551",
        "ratingSignals": 490,
        "beenHere": {"count": 0, "unconfirmedCount": 0, "marked": false, "lastCheckinExpiredAt": 0},
        "specials": {"count": 0, "items": []},
        "photos": {
          "count": 5303,
          "groups": [{
            "type": "venue",
            "name": "Фотографии заведения",
            "count": 5303,
            "items": [{
              "id": "51a9cd36498ea2cea51661bf",
              "createdAt": 1370082614,
              "source": {"name": "Instagram", "url": "http:\/\/instagram.com"},
              "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
              "suffix": "\/2205847_btf6OTL_jehQmQaOoBaqna98FlBueb5zvS0Tltwv8lE.jpg",
              "width": 612,
              "height": 612,
              "user": {
                "id": "2205847",
                "firstName": "Podum",
                "lastName": "Sitons",
                "gender": "male",
                "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/2205847-N5M03XMS1Y4G3AAA.jpg"}
              },
              "visibility": "public"
            }, {
              "id": "511cd0b8e4b0a03a88cf7dec",
              "createdAt": 1360842936,
              "source": {"name": "Foursquare for iOS", "url": "https:\/\/foursquare.com\/download\/#\/iphone"},
              "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
              "suffix": "\/19378174_tQXZzLeHGIXSrlDOwbt7w3QK17xjohf_8mMM14r1y3s.jpg",
              "width": 720,
              "height": 960,
              "user": {
                "id": "19378174",
                "firstName": "sorravee",
                "lastName": "KibKib",
                "gender": "none",
                "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/XHTOAPG1WM2SQ54K.jpg"}
              },
              "visibility": "public"
            }]
          }]
        },
        "reasons": {
          "count": 1,
          "items": [{"summary": "Многим нравится это место", "type": "general", "reasonName": "rawLikesReason"}]
        },
        "hereNow": {"count": 0, "summary": "Здесь никого нет", "groups": []},
        "createdAt": 1264240738,
        "tips": {
          "count": 123,
          "groups": [{
            "type": "others",
            "name": "Все подсказки",
            "count": 123,
            "items": [{
              "id": "4ba0d8c070c603bba1b894b4",
              "createdAt": 1268832448,
              "text": "ทำบุญโลงศพกันค่ะ มารถไฟใต้ดินลงสถานีสามย่าน สะดวกดีค่ะ",
              "type": "user",
              "canonicalUrl": "https:\/\/foursquare.com\/item\/4ba0d8c070c603bba1b894b4",
              "lang": "th",
              "likes": {"count": 26, "groups": [{"type": "others", "count": 26, "items": []}], "summary": "Лайки:26 "},
              "logView": true,
              "agreeCount": 8,
              "disagreeCount": 0,
              "todo": {"count": 1},
              "user": {
                "id": "197519",
                "firstName": "DearAnNie",
                "gender": "female",
                "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/LIMYZKSN1B40CRX4.jpg"}
              }
            }, {
              "id": "4dac630c7abaf9a10c1e6c06",
              "createdAt": 1303143180,
              "text": "วัดหัวลำโพง เดิมชื่อ \"วัดวัวลำพอง\" เชิญสักการะสิ่งศักดิ์สิทธิ์ภายในพระอุโบสถและบริเวณโดยรอบ ทำบุญวันเกิดด้วยการถวายสังฆทานและต่อด้วยทำบุญโลงศพให้แก่ผู้ล่วงลับที่ มูลนิธิร่วมกตัญญูข้างๆวัด อิ่มบุญครับ",
              "type": "user",
              "canonicalUrl": "https:\/\/foursquare.com\/item\/4dac630c7abaf9a10c1e6c06",
              "lang": "th",
              "likes": {"count": 24, "groups": [{"type": "others", "count": 24, "items": []}], "summary": "Лайки:24 "},
              "logView": true,
              "agreeCount": 24,
              "disagreeCount": 0,
              "todo": {"count": 2},
              "user": {
                "id": "1246154",
                "firstName": "Onizugolf",
                "gender": "male",
                "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/1246154-L3STJUEBOD3CJ43P.jpg"}
              },
              "authorInteractionType": "liked"
            }]
          }]
        },
        "shortUrl": "http:\/\/4sq.com\/8BszLn",
        "timeZone": "Asia\/Bangkok",
        "listed": {
          "count": 64,
          "groups": [{
            "type": "others",
            "name": "Списки других пользователей",
            "count": 64,
            "items": [{
              "id": "4e509ee818383eb2af3348d3",
              "name": "Guide to Bangkok",
              "description": "",
              "type": "others",
              "user": {
                "id": "7575090",
                "firstName": "vannavit",
                "lastName": "savetvilas",
                "gender": "male",
                "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/EOGF2J1W2QF3OQ0J.jpg"}
              },
              "editable": false,
              "public": true,
              "collaborative": true,
              "url": "\/user\/7575090\/list\/guide-to-bangkok",
              "canonicalUrl": "https:\/\/foursquare.com\/user\/7575090\/list\/guide-to-bangkok",
              "createdAt": 1313906408,
              "updatedAt": 1442494792,
              "photo": {
                "id": "4e4a067d52b11cf651ad7d43",
                "createdAt": 1313474173,
                "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
                "suffix": "\/CGE3X40A0WYUP2UL4FCSOJHT4XG3VX5KJHGD5BGCGNFBA3SC.jpg",
                "width": 537,
                "height": 720,
                "user": {
                  "id": "7575090",
                  "firstName": "vannavit",
                  "lastName": "savetvilas",
                  "gender": "male",
                  "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/EOGF2J1W2QF3OQ0J.jpg"}
                },
                "visibility": "friends"
              },
              "followers": {"count": 572},
              "listItems": {
                "count": 200,
                "items": [{
                  "id": "v4b5ac862f964a52072d428e3",
                  "createdAt": 1396251605,
                  "photo": {
                    "id": "50e25435e4b0a2ae350cbdfc",
                    "createdAt": 1357009973,
                    "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
                    "suffix": "\/7343765_KALvTNzQ6wL0MzTyT4FiiH9MBj5B5DGRUnoF0kCjVEQ.jpg",
                    "width": 717,
                    "height": 959,
                    "user": {
                      "id": "7343765",
                      "firstName": "Eddie",
                      "lastName": "Khurat",
                      "gender": "male",
                      "photo": {
                        "prefix": "https:\/\/igx.4sqi.net\/img\/user\/",
                        "suffix": "\/7343765-ONAVMX0LQGCWBKKV.jpg"
                      }
                    },
                    "visibility": "public"
                  }
                }]
              }
            }, {
              "id": "4eb104515c5c80159c79c411",
              "name": "Holy Places in Thailand that I've checked in!!",
              "description": "สถานที่ศักดิ์สิทธิ์ที่ข้าพเจ้าได้มีโอกาสได้ไปในช่วงชีวิตนี้...",
              "type": "others",
              "user": {
                "id": "1246154",
                "firstName": "Onizugolf",
                "gender": "male",
                "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/1246154-L3STJUEBOD3CJ43P.jpg"}
              },
              "editable": false,
              "public": true,
              "collaborative": false,
              "url": "\/onizugolf\/list\/holy-places-in-thailand-that-ive-checked-in",
              "canonicalUrl": "https:\/\/foursquare.com\/onizugolf\/list\/holy-places-in-thailand-that-ive-checked-in",
              "createdAt": 1320223825,
              "updatedAt": 1423943120,
              "photo": {
                "id": "4efd8f0e61af974bcbce75ab",
                "createdAt": 1325240078,
                "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
                "suffix": "\/OCIARDBSA1MHAXVKTC0YBZ4K22EGRKPVUOBTOJBFA0NV4GLS.jpg",
                "width": 956,
                "height": 1280,
                "user": {
                  "id": "1246154",
                  "firstName": "Onizugolf",
                  "gender": "male",
                  "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/1246154-L3STJUEBOD3CJ43P.jpg"}
                },
                "visibility": "public"
              },
              "followers": {"count": 46},
              "listItems": {
                "count": 137,
                "items": [{
                  "id": "t4dac630c7abaf9a10c1e6c06",
                  "createdAt": 1320224093,
                  "photo": {
                    "id": "4eba059d775bf193ede1e9cf",
                    "createdAt": 1320813981,
                    "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
                    "suffix": "\/0M2YZDIR0HMC4SWNIKBFQWVPKA0K2EYNECULKPGPM3UUKGHE.jpg",
                    "width": 537,
                    "height": 720,
                    "user": {
                      "id": "1246154",
                      "firstName": "Onizugolf",
                      "gender": "male",
                      "photo": {
                        "prefix": "https:\/\/igx.4sqi.net\/img\/user\/",
                        "suffix": "\/1246154-L3STJUEBOD3CJ43P.jpg"
                      }
                    },
                    "visibility": "public"
                  }
                }]
              }
            }, {
              "id": "4ec749f97ee537da7e57f696",
              "name": "Visit: FindYourWayInBangkok",
              "description": "Our top visits in Bangkok!\n\n\nFacebook: FindYourWayInBangkok\nFacebook: FindYourEventInBangkok\nFb: FindYourRoomInBangkok\nFb: FindYourStuffInBangkok",
              "type": "others",
              "user": {
                "id": "16545983",
                "firstName": "FindYourWayInBangkok",
                "gender": "none",
                "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/KLXY3ZGK15XINYDD.jpg"},
                "type": "page"
              },
              "editable": false,
              "public": true,
              "collaborative": false,
              "url": "\/fywinbangkok\/list\/visit-findyourwayinbangkok",
              "canonicalUrl": "https:\/\/foursquare.com\/fywinbangkok\/list\/visit-findyourwayinbangkok",
              "createdAt": 1321683449,
              "updatedAt": 1363172049,
              "photo": {
                "id": "4e91051de5fa2c09eb966dd1",
                "createdAt": 1318126877,
                "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
                "suffix": "\/PDB3VGES41BPAMVSELYEJ4Z0VIPVE0XHA0HXT1QL5OZLEBHO.jpg",
                "width": 460,
                "height": 345,
                "user": {
                  "id": "5189024",
                  "firstName": "Paisarn",
                  "lastName": "Arunchoknumlap",
                  "gender": "male",
                  "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/RMVMSEHPYPPDMFG3.jpg"}
                },
                "visibility": "public"
              },
              "logView": true,
              "followers": {"count": 662},
              "listItems": {
                "count": 27,
                "items": [{
                  "id": "v4b5ac862f964a52072d428e3",
                  "createdAt": 1322764289,
                  "photo": {
                    "id": "4ed1da9a2c5bc35058c64464",
                    "createdAt": 1322375834,
                    "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
                    "suffix": "\/XH1UGT5BVXE152MAAFUINLM243PK1SRAQJ00R0ICOYFRTK4C.jpg",
                    "width": 612,
                    "height": 612,
                    "user": {
                      "id": "6884654",
                      "firstName": "YUKI",
                      "lastName": "TANIMOTO",
                      "gender": "male",
                      "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/B4H0U5PTUM2SBET3.jpg"}
                    },
                    "visibility": "public"
                  }
                }]
              }
            }, {
              "id": "4f38d762e4b0e313d4f86fc9",
              "name": "ไหว้พระ",
              "description": "รวมรายชื่อวัดต่างๆ",
              "type": "others",
              "user": {
                "id": "12149054",
                "firstName": "¯|¯Õ~b\u20ac~Ï~m\u20ac~m@\u200b\u200b\u200bx",
                "lastName": "™",
                "gender": "male",
                "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/UJBN03M5C0X02INR.jpg"}
              },
              "editable": false,
              "public": true,
              "collaborative": false,
              "url": "\/max_present\/list\/%E0%B9%84%E0%B8%AB%E0%B8%A7%E0%B8%9E%E0%B8%A3%E0%B8%B0",
              "canonicalUrl": "https:\/\/foursquare.com\/max_present\/list\/%E0%B9%84%E0%B8%AB%E0%B8%A7%E0%B8%9E%E0%B8%A3%E0%B8%B0",
              "createdAt": 1329125218,
              "updatedAt": 1427005727,
              "photo": {
                "id": "4f37546ae4b0edf91ce9b633",
                "createdAt": 1329026154,
                "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
                "suffix": "\/DN1PGG2W7iy1872o_yrZY7r-ithGBHJ4ntD3Ad2poHY.jpg",
                "width": 450,
                "height": 325,
                "user": {
                  "id": "12149054",
                  "firstName": "¯|¯Õ~b\u20ac~Ï~m\u20ac~m@\u200b\u200b\u200bx",
                  "lastName": "™",
                  "gender": "male",
                  "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/UJBN03M5C0X02INR.jpg"}
                },
                "visibility": "public"
              },
              "followers": {"count": 34},
              "listItems": {
                "count": 57,
                "items": [{
                  "id": "t4f3787fce4b0571dc79384b8",
                  "createdAt": 1329126898,
                  "photo": {
                    "id": "4f37880de4b00af17a16c69c",
                    "createdAt": 1329039373,
                    "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
                    "suffix": "\/YqG2_3Lqjtoct9pmsPcLb4JRwSQzgIAznObZ3lS8e7w.jpg",
                    "width": 350,
                    "height": 364,
                    "user": {
                      "id": "12149054",
                      "firstName": "¯|¯Õ~b\u20ac~Ï~m\u20ac~m@\u200b\u200b\u200bx",
                      "lastName": "™",
                      "gender": "male",
                      "photo": {"prefix": "https:\/\/igx.4sqi.net\/img\/user\/", "suffix": "\/UJBN03M5C0X02INR.jpg"}
                    },
                    "visibility": "public"
                  }
                }]
              }
            }]
          }]
        },
        "popular": {
          "isOpen": false,
          "isLocalHoliday": false,
          "timeframes": [{
            "days": "Сегодня",
            "includesToday": true,
            "open": [{"renderedTime": "13:00\u201314:00"}, {"renderedTime": "16:00\u201322:00"}],
            "segments": []
          }, {
            "days": "Пт",
            "open": [{"renderedTime": "Полдень\u201314:00"}, {"renderedTime": "16:00\u201323:00"}],
            "segments": []
          }, {"days": "Сб", "open": [{"renderedTime": "10:00\u201323:00"}], "segments": []}, {
            "days": "Вс",
            "open": [{"renderedTime": "9:00\u201322:00"}],
            "segments": []
          }, {"days": "Пн", "open": [{"renderedTime": "Полдень\u201322:00"}], "segments": []}, {
            "days": "Вт",
            "open": [{"renderedTime": "Полдень\u201314:00"}, {"renderedTime": "16:00\u201322:00"}],
            "segments": []
          }, {"days": "Ср", "open": [{"renderedTime": "Полдень\u201322:00"}], "segments": []}]
        },
        "pageUpdates": {"count": 0, "items": []},
        "inbox": {"count": 0, "items": []},
        "attributes": {"groups": []},
        "bestPhoto": {
          "id": "51a9cd36498ea2cea51661bf",
          "createdAt": 1370082614,
          "source": {"name": "Instagram", "url": "http:\/\/instagram.com"},
          "prefix": "https:\/\/igx.4sqi.net\/img\/general\/",
          "suffix": "\/2205847_btf6OTL_jehQmQaOoBaqna98FlBueb5zvS0Tltwv8lE.jpg",
          "width": 612,
          "height": 612,
          "visibility": "public"
        },
        "colors": {
          "highlightColor": {"photoId": "51a9cd36498ea2cea51661bf", "value": -10475480},
          "highlightTextColor": {"photoId": "51a9cd36498ea2cea51661bf", "value": -1},
          "algoVersion": 3
        }
      }
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


    return this.http.get(`${BASE_URL_FOURSQUARE}/search?ll=${query}&categoryId=${CATEGORIES_FOURSQARE}&client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413&limit=5`)

     /*return Observable.of(mockArray)*/
     .map(res => res['response'].venues as IPlace[] || [])



  }

  getPicturesUrl(query) {
    return /*Observable.of('https://res.cloudinary.com/elvenapps/image/upload/v1523968290/450x250_wxrfpd.png')*/this.http.get(`${BASE_URL_FOURSQUARE}/${query}/photos?group=venue&client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413`)
      .map(res => `${res['response'].photos.items[0].prefix}400x250${res['response'].photos.items[0].suffix}`)
      .onErrorResumeNext(Observable.empty<string>());
  }


  getPlaceDetails(query){
    console.log('---------fired')
    return /*Observable.of(mockPlace)*/this.http.get(`https://api.foursquare.com/v2/venues/${query}?client_id=${API_KEY_FOURSQUARE}&client_secret=${APP_CODE_FOURSQUARE}&v=20180413`)
      .map(res=>{console.log('res'); return res['response'].venue as IPlaceDetails[] || []});
  }


}
