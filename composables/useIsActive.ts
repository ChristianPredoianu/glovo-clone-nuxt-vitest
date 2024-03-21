export function useIsActive() {
  const selected = useState<string | number>('selected', () => '');

  function toggleActive(userSelected: string | number) {
    selected.value === userSelected
      ? (selected.value = '')
      : (selected.value = userSelected);
  }

  function isActive(userSelected: string | number): boolean {
    return selected.value === userSelected;
  }

  return { selected, toggleActive, isActive };
}
