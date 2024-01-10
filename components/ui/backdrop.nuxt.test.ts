import { nextTick } from 'vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Backdrop from '@/components/ui/Backdrop.vue';
import Hamburger from '@/components/header/Hamburger.vue';

describe('Backdrop', () => {
  const backdropWrapper = mount(Backdrop);
  const hamburgerWrapper = mount(Hamburger);

  it('should be closed', async () => {
    const backdrop = backdropWrapper.find('div');

    expect(backdrop.exists()).toBe(false);
  });

  it('should be opened when clicking hamburger', async () => {
    const hamburger = hamburgerWrapper.find('button');

    await hamburger.trigger('click');

    const backdrop = backdropWrapper.find('div');

    expect(backdrop.classes()).toContain('w-full');
  });

  it('should be closed when clicking backdrop', async () => {
    const backdrop = backdropWrapper.find('div');

    await backdrop.trigger('click');

    expect(backdrop.exists()).toBe(false);
  });
});
