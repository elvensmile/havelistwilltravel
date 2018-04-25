export interface IPlace {
  id: string;
  name: string;
  location: Location;
  categories: Category[];
  venuePage: VenuePage;
  imageUrl: string;
}

export interface LabeledLatLng {
  label: string;
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  crossStreet: string;
  lat: number;
  lng: number;
  labeledLatLngs: LabeledLatLng[];
  distance: number;
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

export interface VenuePage {
  id: string;
}

/*geometry: Geometry,
  icon: string,
  id: string,
  name: string,
  place_id: string,
  reference: string,
  scope: string,
  types: string[],
  vicinity: string,
  opening_hours: OpeningHours,
  photos: Photo[],
  price_level?: number,
  rating?: number,






/*id: string,
categories: any,
rating: number,

location: {
  lat: number
  lng: number
},

name: string,
perex:string,

thumbnail_url: string|null,*/

/*
export interface Location {
  lat: number,
  lng: number,
}

export interface Northeast {
  lat: number,
  lng: number,
}

export interface Southwest {
  lat: number,
  lng: number,
}

export interface Viewport {
  northeast: Northeast,
  southwest: Southwest,
}

export interface Geometry {
  location: Location,
  viewport: Viewport,
}

export interface OpeningHours {
  open_now: boolean,
  weekday_text: any[],
}

export interface Photo {
  height: number,
  html_attributions: string[],
  photo_reference: string,
  width: number,
}
*/

declare namespace namespace {
  export interface Meta {
    code: number;
    requestId: string;
  }

  export interface Warning {
    text: string;
  }

  export interface Ne {
    lat: number;
    lng: number;
  }

  export interface Sw {
    lat: number;
    lng: number;
  }

  export interface SuggestedBounds {
    ne: Ne;
    sw: Sw;
  }

  export interface Item2 {
    summary: string;
    type: string;
    reasonName: string;
  }

  export interface Reasons {
    count: number;
    items: Item2[];
  }

  export interface LabeledLatLng {
    label: string;
    lat: number;
    lng: number;
  }

  export interface Location {
    address: string;
    crossStreet: string;
    lat: number;
    lng: number;
    labeledLatLngs: LabeledLatLng[];
    distance: number;
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

  export interface VenuePage {
    id: string;
  }

  export interface Venue {
    id: string;
    name: string;
    location: Location;
    categories: Category[];
    venuePage: VenuePage;
  }

  export interface Item {
    reasons: Reasons;
    venue: Venue;
  }

  export interface Group {
    type: string;
    name: string;
    items: Item[];
  }

  export interface Response {
    warning: Warning;
    suggestedRadius: number;
    headerLocation: string;
    headerFullLocation: string;
    headerLocationGranularity: string;
    totalResults: number;
    suggestedBounds: SuggestedBounds;
    groups: Group[];
  }

  export interface RootObject {
    meta: Meta;
    response: Response;
  }
}
