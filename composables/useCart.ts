import type { ICartProduct } from '@/interfaces/interfaces.interface';

export function useCart() {
  const cartProducts = useState<ICartProduct[]>('cartProducts', () => []);

  const { startProgressBar } = useProgressBar();

  function addToCart(product: ICartProduct | null) {
    if (product !== null) {
      // Check if existing product
      const existingProduct = cartProducts.value.find((p) => p.id === product.id);

      if (existingProduct) {
        // Product already in the cart, increase quantity
        existingProduct.quantity = (existingProduct.quantity || 1) + 1; //If existingProduct.quantity is truthy (i.e., it has a value that is not null, undefined, 0, false, or an empty string), then that value will be used.
        console.log(`Increased quantity for ${existingProduct}`);
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

    if (productIndex !== -1) {
      const product = cartProducts.value[productIndex];

      if (product.quantity && product.quantity > 1) {
        product.quantity--;
        console.log(`Decreased quantity for ${product.label}`);
      } else {
        cartProducts.value.splice(productIndex, 1);
        console.log(`Removed ${product.label} from the cart.`);
      }
    }

    console.log(cartProducts.value);
  }

  const updatedTotalPrice = computed(() => {
    return cartProducts.value.reduce((total, product) => {
      const quantity = product.quantity ?? 0; // Default to 0 if undefined or null
      return +(total + quantity * product.price).toFixed(2);
    }, 0);
  });

  const numberOfCartProducts = computed(() => {
    return cartProducts.value.reduce((total, product) => {
      return total + (product.quantity || 0); //If product.quantity is undefined or null, we fall back to 0
    }, 0);
  });

  return {
    cartProducts,
    addToCart,
    removeFromCart,
    numberOfCartProducts,
    updatedTotalPrice,
  };
}
