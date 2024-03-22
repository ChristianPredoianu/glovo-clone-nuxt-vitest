import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MealCategoryFilterListItem from '@/components/filters/MealCategoryFilter/MealCategoryFilterListItem.vue';
import type { IFakeStoreCategories } from '@/interfaces/products.interface';
import type { ICuisineType } from '@/interfaces/meals.interface';

describe('MealCategoryFilterListItem', () => {
  it('emits selected category when clicked', async () => {
    const category: IFakeStoreCategories | ICuisineType = {
      id: 1,
      category: 'American',
      icon: 'fa-category',
    };

    const wrapper = mount(MealCategoryFilterListItem, {
      props: {
        category: category,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('emitSelected')).toBeTruthy();
    expect(wrapper.emitted('emitSelected')![0][0]).toBe('American');
  });
});
