export function useKeyDown(
  optionsLength: Ref<number>,
  callback: (index: number) => void
) {
  const selectedIndex = useState<number>(() => 0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex.value = Math.min(selectedIndex.value + 1, optionsLength.value - 1);
      console.log(optionsLength.value);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0); // Ensure selectedIndex is not below 0
      console.log(selectedIndex.value);
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
