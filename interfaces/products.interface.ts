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
