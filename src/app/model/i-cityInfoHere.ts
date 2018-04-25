export interface ICityInfoHere {
  MapView: MapView;
  Address: Address;
  DisplayPosition: DisplayPosition;
}

export interface Address {
  Label: string;
  Country: string;
  City: string;
}

export interface TopLeft {
  Latitude: number;
  Longitude: number;
}

export interface BottomRight {
  Latitude: number;
  Longitude: number;
}

export interface MapView {
  TopLeft: TopLeft;
  BottomRight: BottomRight;
}

export interface DisplayPosition {
  Latitude: number;
  Longitude: number;
}
