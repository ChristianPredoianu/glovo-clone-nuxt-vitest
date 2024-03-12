export function useModal() {
  const isModalOpen = useState<boolean>('isModalOpen', () => false);

  function openModal() {
    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
  }

  return { isModalOpen, openModal, closeModal };
}
