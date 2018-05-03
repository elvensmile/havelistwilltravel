export interface ICityInfoGoogle {
  address_components: AddressComponent[];
  formatted_address: string;
  formatted_phone_number: string;
  geometry: Geometry;
  icon: string;
  id: string;
  international_phone_number: string;
  name: string;
  place_id: string;
  scope: string;
  alt_ids: AltId[];
  rating: number;
  reference: string;
  reviews: Review[];
  types: string[];
  url: string;
  vicinity: string;
  website: string;
}

export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  export interface Location {
    lat: number;
    lng: number;
  }

  export interface Northeast {
    lat: number;
    lng: number;
  }

  export interface Southwest {
    lat: number;
    lng: number;
  }

  export interface Viewport {
    northeast: Northeast;
    southwest: Southwest;
  }

  export interface Geometry {
    location: Location;
    viewport: Viewport;
  }

  export interface AltId {
    place_id: string;
    scope: string;
  }

  export interface Aspect {
    rating: number;
    type: string;
  }

  export interface Review {
    aspects: Aspect[];
    author_name: string;
    author_url: string;
    language: string;
    rating: number;
    text: string;
    time: any;
  }



