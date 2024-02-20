import { ref, onMounted, onUnmounted } from 'vue';

export function useScreenWidth() {
  const screenWidth = ref<number>(window.innerWidth);

  function changeWidth() {
    screenWidth.value = window.innerWidth;
  }

  onMounted(() => {
    window.addEventListener('resize', changeWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', changeWidth);
  });

  return { screenWidth } as const;
}
