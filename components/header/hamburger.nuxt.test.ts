import { it, expect, vi } from 'vitest';

import { mountSuspended } from 'nuxt-vitest/utils';
import AppHeader from '@/components/header/AppHeader.vue';

import { useNav } from '@/composables/useNav';

const { openNav, closeNav } = useNav();

it('should toggle navigation menu on hamburger button click', async () => {
  const wrapper = await mountSuspended(AppHeader);
});
