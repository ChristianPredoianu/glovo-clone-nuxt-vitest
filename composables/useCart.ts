import type { ICartProduct } from '@/interfaces/interfaces.interface';

export function useCart() {
  const cartProducts = useState<ICartProduct[]>('error', () => []);

  const { startProgressBar } = useProgressBar();

  const numberOfCartProducts = computed(() => cartProducts.value.length);

  function addToCart(product: ICartProduct | null) {
    if (product !== null) {
      console.log('added');
      cartProducts.value.push(product);
      startProgressBar();
      console.log(cartProducts.value);
    }
  }

  return { cartProducts, addToCart, numberOfCartProducts };
}
