import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DishTypesList from '@/components/ui/DishTypesList.vue';

describe('AdressForm', () => {
  it('should renders dish types correctly', async () => {
    const dishTypes = [
      { id: 1, dishType: 'salad' },
      { id: 2, dishType: 'soup' },
      { id: 3, dishType: 'dessert' },
    ];

    const wrapper = shallowMount(DishTypesList, {
      props: {
        dishTypes,
      },
    });

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBe(dishTypes.length);

    dishTypes.forEach((dishType, index) => {
      expect(listItems[index].text()).toContain(
        dishType.dishType.charAt(0).toUpperCase() + dishType.dishType.slice(1)
      );
    });
  });
});
