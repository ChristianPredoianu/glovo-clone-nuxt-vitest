import { it, describe, expect, vi } from 'vitest';
import { mountSuspended } from 'nuxt-vitest/utils';
import { shallowMount } from '@vue/test-utils';
import Hamburger from '@/components/header/Hamburger.vue';

describe('Hamburger', () => {
  it('should toggle navigation menu on hamburger button click', async () => {
    const wrapper = await mountSuspended(Hamburger);
    /*  const wrapper = shallowMount(Hamburger); */

    /*  const spy = vi.spyOn(useNav, 'openNav'); */
    const spy = vi.spyOn(wrapper.vm, 'openNavigation');
    /* const mock = vi.fn().mockImplementation(openNav); */
    /* const spy = vi.spyOn(wrapper.vm, 'openNavigation'); */

    const btn = wrapper.find('button');
    await btn.trigger('click');
    await wrapper.vm.openNavigation();

    expect(spy).toHaveBeenCalled();
  });
});
