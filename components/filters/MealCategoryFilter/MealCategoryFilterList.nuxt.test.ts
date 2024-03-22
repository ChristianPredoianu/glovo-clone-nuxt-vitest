import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MealCategoryFilterList from '@/components/filters/MealCategoryFilter/MealCategoryFilterList.vue';

describe('MealCateGoryFilterList', () => {
  it('should emits selected category when clicked', async () => {
    const filters = [
      { id: 1, cuisineType: 'American', icon: 'fa-burger' },
      { id: 2, cuisineType: 'Asian', icon: 'fa-bowl-food' },
      { id: 3, cuisineType: 'British', icon: 'fa-bowl-rice' },
    ];

    const wrapper = mount(MealCategoryFilterList, {
      props: {
        filters: filters,
      },
    });

    await wrapper.findComponent({ name: 'MealCategoryFilterListItem' }).trigger('click');

    expect(wrapper.emitted('emitSelected')).toBeTruthy();
    expect(wrapper.emitted('emitSelected')![0][0]).toBe('American');
  });
});
