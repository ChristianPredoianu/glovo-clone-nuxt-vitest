import { describe, vi, beforeEach, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import FilterModalListItem from '@/components/modals/FilterModal/List/Item/FilterModalListItem.vue';
import { VueWrapper } from '@vue/test-utils';
import Backdrop from '@/components/ui/Backdrop/Backdrop.vue';

describe('MealCategoryFilterModal', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(FilterModalListItem);
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
