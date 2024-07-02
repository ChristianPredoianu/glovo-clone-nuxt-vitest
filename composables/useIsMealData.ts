import type { IMeals, ISingleMeal, IProduct } from '@/interfaces/interfaces.interface';

export function useIsMealData() {
  function isMealData(data: IMeals | ISingleMeal | null): data is IMeals | ISingleMeal {
    return (data !== null && 'hits' in data) || (data !== null && 'recipe' in data);
  }

  function isSingleMealData(item: ISingleMeal | IProduct): item is ISingleMeal {
    return (item as ISingleMeal).recipe !== undefined;
  }

  return { isMealData, isSingleMealData };
}
