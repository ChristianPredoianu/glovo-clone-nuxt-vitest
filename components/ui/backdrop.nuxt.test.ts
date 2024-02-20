import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Backdrop from '@/components/ui/Backdrop.vue';

describe('Backdrop', () => {
  it('should be closed', async () => {
    const { isBackdropOpen } = useBackdrop();
    expect(isBackdropOpen.value).toBe(false);
  });

  it('should be opened when openBackdrop is called', async () => {
    const { isBackdropOpen, openBackdrop } = useBackdrop();
    openBackdrop();
    expect(isBackdropOpen.value).toBe(true);
  });

  it('should be closed when closeBackdrop is called', async () => {
    const { isBackdropOpen, closeBackdrop } = useBackdrop();
    closeBackdrop();
    expect(isBackdropOpen.value).toBe(false);
  });
});
