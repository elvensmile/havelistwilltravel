export interface IPlaceDetails {

  id: string;
  name: string;
  contact: Contact;
  location: Location;
  canonicalUrl: string;
  categories: Category[];
  verified: boolean;
  stats: Stats;
  url: string;
  likes: Likes;
  rating: number;
  ratingColor: string;
  ratingSignals: number;
  beenHere: BeenHere;
  photos: Photos;
  description: string;
  storeId: string;
  page: Page;
  hereNow: HereNow;
  createdAt: number;
  tips: Tips2;
  shortUrl: string;
  timeZone: string;
  listed: Listed;
  phrases: Phras[];
  hours: Hours;
  popular: Popular;
  pageUpdates: PageUpdates;
  inbox: Inbox;
  venueChains: any[];
  attributes: Attributes;
  bestPhoto: BestPhoto;
}

  export interface Contact {
  phone: string;
  formattedPhone: string;
  twitter: string;
  instagram: string;
  facebook: string;
  facebookUsername: string;
  facebookName: string;
}

export interface Location {
  address: string;
  crossStreet: string;
  lat: number;
  lng: number;
  postalCode: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
}

export interface Icon {
  prefix: string;
  suffix: string;
}

export interface Category {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: Icon;
  primary: boolean;
}

export interface Stats {
  checkinsCount: number;
  usersCount: number;
  tipCount: number;
  visitsCount: number;
}

export interface Likes {
  count: number;
  summary: string;
}

export interface BeenHere {
  count: number;
  unconfirmedCount: number;
  marked: boolean;
  lastCheckinExpiredAt: number;
}

export interface Source {
  name: string;
  url: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface Item {
  id: string;
  createdAt: number;
  source: Source;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  user: User;
  visibility: string;
}

export interface Group {
  type: string;
  name: string;
  count: number;
  items: Item[];
}

export interface Photos {
  count: number;
  groups: Group[];
}

export interface Item2 {
  url: string;
}

export interface Links {
  count: number;
  items: Item2[];
}

export interface PageInfo {
  description: string;
  banner: string;
  links: Links;
}

export interface Photo {
  prefix: string;
  suffix: string;
}

export interface Tips {
  count: number;
}

export interface Group2 {
  type: string;
  count: number;
  items: any[];
}

export interface Lists {
  groups: Group2[];
}

export interface Contact2 {
  twitter: string;
  facebook: string;
}

export interface User2 {
  id: string;
  firstName: string;
  gender: string;
  photo: Photo;
  type: string;
  tips: Tips;
  lists: Lists;
  homeCity: string;
  bio: string;
  contact: Contact2;
}

export interface Page {
  pageInfo: PageInfo;
  user: User2;
}

export interface Group3 {
  type: string;
  name: string;
  count: number;
  items: any[];
}

export interface HereNow {
  count: number;
  summary: string;
  groups: Group3[];
}

export interface Source2 {
  name: string;
  url: string;
}

export interface Photo2 {
  id: string;
  createdAt: number;
  source: Source2;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  visibility: string;
}

export interface Group5 {
  type: string;
  count: number;
  items: any[];
}

export interface Likes2 {
  count: number;
  groups: Group5[];
  summary: string;
}

export interface Todo {
  count: number;
}

export interface Photo3 {
  prefix: string;
  suffix: string;
}

export interface User3 {
  id: string;
  firstName: string;
  gender: string;
  photo: Photo3;
  type: string;
}

export interface Item3 {
  id: string;
  createdAt: number;
  text: string;
  type: string;
  canonicalUrl: string;
  photo: Photo2;
  photourl: string;
  lang: string;
  likes: Likes2;
  logView: boolean;
  agreeCount: number;
  disagreeCount: number;
  todo: Todo;
  user: User3;
  editedAt?: number;
  authorInteractionType: string;
  url: string;
}

export interface Group4 {
  type: string;
  name: string;
  count: number;
  items: Item3[];
}

export interface Tips2 {
  count: number;
  groups: Group4[];
}

export interface Photo4 {
  prefix: string;
  suffix: string;
}

export interface User4 {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  photo: Photo4;
}

export interface Photo6 {
  prefix: string;
  suffix: string;
}

export interface User5 {
  id: string;
  firstName: string;
  gender: string;
  photo: Photo6;
  type: string;
}

export interface Photo5 {
  id: string;
  createdAt: number;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  user: User5;
  visibility: string;
}

export interface Followers {
  count: number;
}

export interface Photo7 {
  id: string;
  createdAt: number;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  visibility: string;
}

export interface Item5 {
  id: string;
  createdAt: number;
  photo: Photo7;
}

export interface ListItems {
  count: number;
  items: Item5[];
}

export interface Item4 {
  id: string;
  name: string;
  description: string;
  type: string;
  user: User4;
  editable: boolean;
  public: boolean;
  collaborative: boolean;
  url: string;
  canonicalUrl: string;
  createdAt: number;
  updatedAt: number;
  photo: Photo5;
  followers: Followers;
  listItems: ListItems;
}

export interface Group6 {
  type: string;
  name: string;
  count: number;
  items: Item4[];
}

export interface Listed {
  count: number;
  groups: Group6[];
}

export interface Entity {
  indices: number[];
  type: string;
}

export interface Sample {
  entities: Entity[];
  text: string;
}

export interface Phras {
  phrase: string;
  sample: Sample;
  count: number;
}

export interface Open {
  renderedTime: string;
}

export interface Timeframe {
  days: string;
  includesToday: boolean;
  open: Open[];
  segments: any[];
}

export interface Hours {
  status: string;
  isOpen: boolean;
  isLocalHoliday: boolean;
  timeframes: Timeframe[];
}

export interface Open2 {
  renderedTime: string;
}

export interface Timeframe2 {
  days: string;
  open: Open2[];
  segments: any[];
}

export interface Popular {
  status: string;
  isOpen: boolean;
  isLocalHoliday: boolean;
  timeframes: Timeframe2[];
}

export interface PageUpdates {
  count: number;
  items: any[];
}

export interface Inbox {
  count: number;
  items: any[];
}

export interface Item6 {
  displayName: string;
  displayValue: string;
}

export interface Group7 {
  type: string;
  name: string;
  summary: string;
  count: number;
  items: Item6[];
}

export interface Attributes {
  groups: Group7[];
}

export interface Source3 {
  name: string;
  url: string;
}

export interface BestPhoto {
  id: string;
  createdAt: number;
  source: Source3;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  visibility: string;
}




