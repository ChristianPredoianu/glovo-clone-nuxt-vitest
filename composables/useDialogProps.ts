import Modal from '@/components/modals/Modal/Modal.vue';
import { useIsMealData } from '@/composables/useIsMealData';
import type {
  IProduct,
  ISingleMeal,
  IMealModalProps,
  IProductModalProps,
  ModalProps,
} from '@/interfaces/interfaces.interface';

interface IModalRef extends Ref<InstanceType<typeof Modal> | null> {}

export function useDialogProps(dialogRef: IModalRef) {
  const mealModalProps = useState<IMealModalProps | null>('mealModalProps', () => null);
  const productModalProps = useState<IProductModalProps | null>(
    'productModalProps',
    () => null
  );

  const { isSingleMealData } = useIsMealData();

  function extractRecipeId(uri: string): string {
    const prefix = '#recipe_';
    const index = uri.indexOf(prefix);

    return uri.substring(index + prefix.length);
  }

  function handleCardClick(item: ISingleMeal | IProduct) {
    if (isSingleMealData(item)) {
      console.log(item);
      mealModalProps.value = {
        id: +extractRecipeId(item.recipe.uri),
        label: item.recipe.label,
        img: item.recipe.image,
        ingredients: item.recipe.ingredients || [],
      };
      productModalProps.value = null;
    } else {
      productModalProps.value = {
        id: item.id,
        label: item.title!,
        img: item.image,
      };
      mealModalProps.value = null;
    }

    dialogRef.value?.showDialog();
  }

  const currentModalProps = computed<ModalProps | null>(() => {
    return mealModalProps.value || productModalProps.value || null;
  });

  return { currentModalProps, handleCardClick };
}
