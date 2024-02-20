export function useBackdrop(elementToClose?: () => void) {
  const isBackdropOpen = useState<boolean>('isBackdropOpen', () => false);

  function openBackdrop() {
    isBackdropOpen.value = true;
  }

  function closeBackdrop() {
    if (elementToClose) elementToClose();
    isBackdropOpen.value = false;
  }

  return { isBackdropOpen, openBackdrop, closeBackdrop };
}
