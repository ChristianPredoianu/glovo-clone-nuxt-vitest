import { describe, beforeEach, vi, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import MealCategoryFilterModalOverlay from '@/components/modals/MealCategoryFilterModal/MealCategoryFilterOverlay/MealCategoryFilterOverlay.vue';
import Backdrop from '../ui/Backdrop/Backdrop.vue';

describe('MealCategoryFilterModalOverlay', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(MealCategoryFilterModalOverlay);
  });

  it('Should emit', async () => {
    const applyBtn = wrapper.find('[data-test="apply-btn"]');

    await applyBtn.trigger('click');

    expect(wrapper.emitted().emitSelected).toBeTruthy();
  });

  it('Should be active class when click on filter', async () => {
    const filterListItem = wrapper.find('li');

    await filterListItem.trigger('click');

    const filterIcon = wrapper.find('[data-test="filter-icon"]');

    expect(filterIcon.classes()).toContain('bg-orange-200');
  });

  it('Should remove active class when click on filter', async () => {
    const filterListItem = wrapper.find('li');
    const filterIcon = wrapper.find('[data-test="filter-icon"]');

    await filterListItem.trigger('click');

    expect(filterIcon.classes()).not.toContain('bg-orange-200');
  });
});
