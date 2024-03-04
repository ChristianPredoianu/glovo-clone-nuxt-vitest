import type { IProductCategories } from '@/interfaces/productCategories.interface';

export const productCategories: IProductCategories[] = [
  { category: 'generic-foods', text: 'Generic Foods', img: 'generic-food.jpg' },
  {
    category: 'packaged-food',
    text: 'Packaged Foods',
    img: 'packaged-food.jpg',
  },
  { category: 'generic-meals', text: 'Generic Meals', img: 'generic-meals.jpg' },
  { category: 'fast-foods', text: 'Fast Foods', img: 'fast-food.jpg' },
  { category: 'electronics', text: 'Electronics', img: 'electronics.jpg' },
  { category: 'jewelery', text: 'Jewelery', img: 'jewelery.jpg' },
  {
    category: "men's clothing",
    text: "Men's clothing",
    img: 'mens-clothing.jpg',
  },
  {
    category: "women's clothing",
    text: "Women's clothing",
    img: 'womens-clothing.jpg',
  },
];
