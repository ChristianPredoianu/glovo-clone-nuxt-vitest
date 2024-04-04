export function edamamApiEndpoint(api: string, routeParamCategory: string | string[]) {
  return `${api}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${routeParamCategory}&dishType=Main%20course`;
}
