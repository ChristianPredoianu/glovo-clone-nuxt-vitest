export interface IMeal {
  hits: {
    recipe: {
      cuisineType: string[];
      label: string;
      image: string;
    };
  }[];
}
