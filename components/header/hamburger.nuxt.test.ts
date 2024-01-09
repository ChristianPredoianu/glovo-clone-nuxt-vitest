import { it, describe, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Hamburger from '@/components/header/Hamburger.vue';
import AppHeader from '@/components/header/AppHeader.vue';

describe('Hamburger', () => {
  it('should toggle navigation menu on hamburger button click', async () => {
    const hamburgerWrapper = mount(Hamburger);
    const appHeaderWrapper = mount(AppHeader);

    const navListDiv = appHeaderWrapper.find('#test');

    const btn = hamburgerWrapper.find('button');
    await btn.trigger('click');

    expect(navListDiv.classes()).toContain('translate-x-[0rem]');
  });
});
