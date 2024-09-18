export function useCart() {
  function addToCart(product) {
    console.log(product.value);
  }

  return { addToCart };
}
