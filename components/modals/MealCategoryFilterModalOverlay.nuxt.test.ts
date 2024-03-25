import { describe, vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import MealCategoryFilterModalOverlay from '@/components/modals/MealCategoryFilterOverlay.vue';

describe('MealCategoryFilterModalOverlay', () => {
  it('Should emit', async () => {
    const wrapper = mount(MealCategoryFilterModalOverlay);

    const applyBtn = wrapper.find('[data-test="apply-btn"]');

    await applyBtn.trigger('click');
  });

  it('Should close modal when screen width is >= 1024', async () => {});
});
