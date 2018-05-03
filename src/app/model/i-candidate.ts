/*
export interface ICandidate {
  label: string;
  language: string;
  countryCode: string;
  locationId: string;
  address: {
    country: string;
    state: string;
    county: string;
    city: string;
    district: string;
    postalCode: string;
  };
  distance: number;
  matchLevel: string;
}
*/

export interface ICandidate {
  description: string;
  id: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  terms: Term[];
  types: string[];
}

  export interface MatchedSubstring {
    length: number;
    offset: number;
  }

  export interface Term {
    offset: number;
    value: string;
  }






