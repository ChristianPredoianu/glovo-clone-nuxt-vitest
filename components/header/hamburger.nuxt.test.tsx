import { it, expect, vi } from 'vitest';

import { mountSuspended } from 'nuxt-vitest/utils';
import AppHeader from '@/components/header/AppHeader.vue';

it('can mount some component', async () => {
  const wrapper = await mountSuspended(AppHeader);

  const hamburgerBtn = wrapper.find('button');
  const navListDiv = wrapper.findAll('div').at(1);

  expect(navListDiv!.classes()).toContain('-translate-x-[50rem]');

  await hamburgerBtn.trigger('click');

  expect(navListDiv!.classes()).toContain('translate-x-[0rem]');

  await hamburgerBtn.trigger('click');

  expect(navListDiv!.classes()).toContain('-translate-x-[50rem]');
});
