import { describe, vi, beforeEach, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MealCategoryFilterModal from '@/components/modals/MealCategoryFilterModal.vue';
import MealCategoryFilterModalOverlay from '@/components/modals/MealCategoryFilterOverlay.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import Backdrop from '@/components/ui/Backdrop/Backdrop.vue';

describe('MealCategoryFilterModal', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(MealCategoryFilterModalOverlay);
  });

  it('Should display backdrop and meal category filter overlay', async () => {});

  it('Should close modal when screen width is >= 1024', async () => {});

  it('Should close modal and backdrop whan apply btn is clicked', async () => {
    const backdrop = wrapper.findComponent(Backdrop);
    console.log(backdrop.html());
  });
});
