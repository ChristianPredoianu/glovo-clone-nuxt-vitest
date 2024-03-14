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
