export function useNav() {
  const isNavOpen = ref<boolean>(false);

  function openNav() {
    isNavOpen.value = true;
  }

  function closeNav() {
    isNavOpen.value = false;
  }

  return { isNavOpen, openNav, closeNav } as const;
}
