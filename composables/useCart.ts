import type { ICartProduct } from '@/interfaces/interfaces.interface';

export function useCart() {
  function addToCart(product: ICartProduct | null) {
    console.log(product);
  }

  return { addToCart };
}
