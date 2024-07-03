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
  const mealModalProps = ref<IMealModalProps | null>(null);
  const productModalProps = ref<IProductModalProps | null>(null);

  const { isSingleMealData } = useIsMealData();

  function handleCardClick(item: ISingleMeal | IProduct) {
    if (isSingleMealData(item)) {
      console.log(item);
      mealModalProps.value = {
        label: item.recipe.label,
        img: item.recipe.image,
        ingredients: item.recipe.ingredients![0].text,
      };
    } else {
      console.log(item);
      productModalProps.value = {
        label: item.title!,
        img: item.image,
      };
    }

    dialogRef.value?.showDialog();
  }

  const currentModalProps = computed<ModalProps | null>(() => {
    return mealModalProps.value || productModalProps.value;
  });

  return { currentModalProps, handleCardClick };
}
