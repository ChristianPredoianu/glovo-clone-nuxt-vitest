export interface IMeals {
  hits: {
    recipe: {
      cuisineType: string[];
      label: string;
      image: string;
    };
  }[];
}

export interface ISingleMeal {
  recipe: {
    cuisineType: string[];
    label: string;
    image: string;
  };
}

export interface ICuisineType {
  id: number;
  cuisineType: string;
  icon: string;
}
