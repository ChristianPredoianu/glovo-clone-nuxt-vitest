import type { ICartProduct } from '@/interfaces/interfaces.interface';

export function useCart() {
  const cartProducts = useState<ICartProduct[]>('cartProducts', () => []);
  const totalPrice = useState<number>('totalPrice', () => 0);
  const productQuantity = useState<number>('productQuantity', () => 0);

  const { startProgressBar } = useProgressBar();

  const numberOfCartProducts = computed(() => cartProducts.value.length);

  function addToCart(product: ICartProduct | null) {
    if (product !== null) {
      const existingProduct = cartProducts.value.find((p) => p.id === product.id);

      if (existingProduct) {
        // Product already in the cart, increase quantity
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
        console.log(`Increased quantity for ${existingProduct.name}`);
      } else {
        // New product, add to the cart with quantity 1
        cartProducts.value.push({ ...product, quantity: 1 });
        console.log('Product added to the cart.');
      }

      startProgressBar();
      console.log(cartProducts.value);
    }
  }

  function removeFromCart(productId: number | string) {
    const productIndex = cartProducts.value.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) cartProducts.value.splice(productIndex, 1);

    console.log(cartProducts.value);
  }

  function isProductInCart(productId: number | string) {
    return cartProducts.value.some((product) => product.id === productId);
  }

  return { cartProducts, addToCart, removeFromCart, numberOfCartProducts };
}
