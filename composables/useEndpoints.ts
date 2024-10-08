import { fakeStoreCategories } from '@/data/productCategoriesData';

export function useEndpoints(
  category?: string | string[],
  filter?: Ref<string>,
  routeIndex?: string
) {
  const runtimeConfig = useRuntimeConfig();

  const restCountriesEndpoint = 'https://restcountries.com/v3.1/region/europe';

  const indexMealDataEndpoint = computed(() => {
    return `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=Dinner&dishType=Main%20course`;
  });

  const locationEndpoint = computed(() => {
    if (filter)
      return `${runtimeConfig.public.apiAutoconfig}pk.a75cdfe1cc307b34218d8021f4122dc6&q=${filter.value}&limit=5`;
  });

  const initialFetchEndpoint = computed(() => {
    if (routeIndex)
      return routeIndex !== null && +routeIndex >= 0 && +routeIndex <= 3
        ? edamamApiEndpoint.value
        : fakeStoreEndpoint.value;
  });

  const edamamApiEndpoint = computed(() => {
    return `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${category}&dishType=Main%20course`;
  });

  const edamamApiFilteredEndpoint = computed(() => {
    if (filter)
      return `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${category}&cuisineType=${filter.value}`;
  });

  const fakeStoreEndpoint = computed(() => {
    return `${runtimeConfig.public.fakeStoreBase}${category}`;
  });

  const fakeStoreFilteredEndpoint = computed(() => {
    if (filter)
      return `${runtimeConfig.public.fakeStoreBase}${filter.value.toLowerCase()}`;
  });

  const selectedApiEndpoint = computed(() => {
    let shouldFetchFromFakeStore;

    if (filter) {
      shouldFetchFromFakeStore = fakeStoreCategories.some(
        (category) => category.category.toLowerCase() === filter.value.toLowerCase()
      );
    }

    return shouldFetchFromFakeStore
      ? fakeStoreFilteredEndpoint.value
      : edamamApiFilteredEndpoint.value;
  });

  return {
    indexMealDataEndpoint,
    locationEndpoint,
    restCountriesEndpoint,
    initialFetchEndpoint,
    selectedApiEndpoint,
  } as const;
}
