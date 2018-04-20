
export interface ICandidate {
  label: string,
  language: string,
  countryCode: string,
  locationId: string,
  address: {
    country: string,
    state: string,
    county: string,
    city: string,
    district: string,
    postalCode: string,
  },
  distance: number,
  matchLevel: string
}

