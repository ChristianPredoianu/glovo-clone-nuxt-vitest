import { it, expect, vi } from 'vitest';

import { mountSuspended } from 'nuxt-vitest/utils';
import AppHeader from '@/components/header/AppHeader.vue';

it('should close the navigation when the backdrop is clicked', async () => {
  const wrapper = await mountSuspended(AppHeader);

  /*   const hamburger = wrapper.findComponent({ name: 'Hamburger' });
  const listDiv = wrapper.find('.list-div');

  expect(listDiv.classes()).toContain('closed');
  const test = hamburger.find('button');

  await test.trigger('click');

  expect(listDiv.classes()).toContain('opened');

  await test.trigger('click');

  expect(listDiv.classes()).toContain('closed'); */
});
