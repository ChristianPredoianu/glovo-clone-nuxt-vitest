export interface ILocationsData {
  place_id: number;
  display_name: string;
}

export interface ILocationAdress {
  address: {
    road: string;
    postcode: string;
    town: string;
    country: string;
  };
}
