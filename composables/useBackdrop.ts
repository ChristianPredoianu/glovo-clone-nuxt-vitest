export function useBackdrop(elementToClose?: () => void) {
  const isBackdropOpen = ref<boolean>(false);

  function openBackdrop() {
    isBackdropOpen.value = true;
  }

  function closeBackdrop() {
    if (elementToClose) elementToClose();
    isBackdropOpen.value = false;
  }

  return { isBackdropOpen, openBackdrop, closeBackdrop };
}
