import { ref, onMounted, onUnmounted } from 'vue';

export function useScreenWidth() {
  const screenWidth = useState<number>('screenWidth', () =>
    process.client ? window.innerWidth : 0
  );

  function changeWidth() {
    screenWidth.value = window.innerWidth;
  }

  onMounted(() => {
    if (process.client) {
      window.addEventListener('resize', changeWidth);
    }
  });

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', changeWidth);
    }
  });

  return { screenWidth } as const;
}
