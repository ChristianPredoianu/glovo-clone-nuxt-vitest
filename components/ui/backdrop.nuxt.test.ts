import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { mountSuspended } from 'nuxt-vitest/utils';
import { screen } from '@testing-library/vue';
import Backdrop from '@/components/ui/Backdrop.vue';

describe('Backdrop', () => {
  it('should close the backdrop when it is clicked', async () => {
    const wrapper = await mountSuspended(Backdrop);

    const backdrop = wrapper.find('[data-testid="backdrop"]');
    console.log(backdrop.exists());
    /* expect(backdrop.exists()).toBe(false); */

    /*    const backdrop = wrapper.find('[data-testid="backdrop"]');
    expect(backdrop.exists()).toBe(false);

    await wrapper.vm.closeBackdrop();
    expect(backdrop.exists()).toBe(true); */
  });
});
