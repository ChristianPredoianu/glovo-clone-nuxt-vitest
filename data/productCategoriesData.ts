import type { IProductCategories } from '@/interfaces/productCategories.interface';

export const productCategories: IProductCategories[] = [
  { category: 'Breakfast', text: 'Breakfast', img: 'generic-food.jpg' },
  {
    category: 'Lunch',
    text: 'Lunch',
    img: 'packaged-food.jpg',
  },
  { category: 'Dinner', text: 'Dinner', img: 'generic-meals.jpg' },
  { category: 'Snack', text: 'Snacks', img: 'fast-food.jpg' },
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
