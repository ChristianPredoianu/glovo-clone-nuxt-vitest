interface Modal {
  id: string;
  isOpen: Ref<boolean>;
}

export function useModal(): {
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => Ref<boolean>;
} {
  const modals: Ref<Record<string, boolean>> = ref({});

  const { screenWidth } = useScreenWidth();

  const openModal = (modalId: string) => {
    if (!modals.value[modalId]) {
      modals.value[modalId] = true;
    }
  };

  const closeModal = (modalId?: string) => {
    if (modals.value[modalId!]) {
      modals.value[modalId!] = false;
    }
  };

  const isModalOpen = (modalId: string): Ref<boolean> => {
    return computed(() => !!modals.value[modalId]);
  };

  watch(
    () => screenWidth.value,
    () => {
      if (screenWidth.value >= 1024) closeModal();
    }
  );

  return { openModal, closeModal, isModalOpen };
}
