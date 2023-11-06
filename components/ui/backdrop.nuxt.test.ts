import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { mountSuspended } from 'nuxt-vitest/utils';
import Backdrop from '@/components/ui/Backdrop.vue';

describe('Backdrop', () => {
  it('should be closed', async () => {
    const wrapper = mount(Backdrop);

    const backdrop = wrapper.find('div');

    expect(backdrop.exists()).toBe(false);
  });
});
