export function useKeyDown(optionsLength: number, callback: (index: number) => void) {
  const selectedIndex = useState<number>('selectedIndex', () => -1);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex.value = Math.min(selectedIndex.value + 1, optionsLength - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      selectedIndex.value !== -1 && callback(selectedIndex.value);
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });

  return {
    selectedIndex,
  };
}
