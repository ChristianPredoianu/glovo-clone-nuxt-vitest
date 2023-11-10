import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Backdrop from '@/components/ui/Backdrop.vue';

describe('Backdrop', () => {
  it('should be closed', async () => {
    const wrapper = mount(Backdrop);

    const backdrop = wrapper.find('div');

    expect(backdrop.exists()).toBe(false);
  });
});
