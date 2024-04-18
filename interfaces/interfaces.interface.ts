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

export interface ICountriesData {
  name: {
    common: string;
  };
}

export interface IMeal {
  hits: {
    recipe: {
      cuisineType: string[];
      label: string;
      image: string;
    };
  }[];
}

export interface ICuisineType {
  id: number;
  cuisineType: string;
  icon: string;
}

export interface IDropdownOptions {
  id: number;
  text: string;
}

export interface IProductCategories {
  category: string;
  text: string;
  img: string;
}

export interface IProduct {
  id: number;
  category: string;
  description?: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
  title?: string;
}

export interface IFakeStoreCategories {
  id: number;
  category: string;
  icon: string;
}

export interface ISelectedCategory {
  index: number;
  img: string;
  text: string;
  category: string;
}
