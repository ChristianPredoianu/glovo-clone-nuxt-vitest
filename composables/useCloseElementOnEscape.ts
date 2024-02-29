export function useCloseElementOnEscape(callback: () => void) {
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
  });
}
