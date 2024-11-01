import { getDatabase, ref, set, push } from 'firebase/database';
import type { IItem } from '@/interfaces/interfaces.interface';

export function useFirebaseActions() {
  const db = getDatabase();

  function writeFavoriteUserItemData(favoriteItem: IItem) {
    const favoriteItemRef = ref(db, 'favoriteItems');
    const newFavoriteItemRef = push(favoriteItemRef);
    return set(newFavoriteItemRef, favoriteItem);
  }
  return { writeFavoriteUserItemData } as const;
}
