import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MealCard from '@/components/cards/MealCard/MealCard.vue';

describe('Meal card', () => {
  it('renders correctly with props', async () => {
    const wrapper = mount(MealCard, {
      props: {
        category: 'food',
        label: 'Delicious recipes',
        img: 'food.jpg',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('img').attributes('src')).toBe('food.jpg');
    expect(wrapper.find('img').attributes('alt')).toBe('Delicious recipes');
    expect(wrapper.find('p').text()).toBe('Food');
    expect(wrapper.find('h3').text()).toBe('Delicious');
    expect(wrapper.find('.text-green-500').text()).toMatch(/^\d+(\.\d+)?\$$/);
  });
});
