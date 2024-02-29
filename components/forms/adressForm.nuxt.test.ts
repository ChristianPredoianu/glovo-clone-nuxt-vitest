import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AdressForm from '@/components/forms/AdressForm.vue';

describe('AdressForm', () => {
  it('handles input elements correctly', async () => {
    const wrapper = mount(AdressForm);

    const input = wrapper.find('input[type="text"]');
    await input.setValue('123456789012345678901');

    const locationIcon = wrapper.find('.location-icon');
    const locationText = wrapper.find('.location-text');
    expect(locationIcon.classes()).toContain('md:hidden');
    expect(locationText.classes()).toContain('md:hidden');

    await input.setValue('1234567890');

    expect(locationIcon.classes()).not.toContain('md:hidden');
    expect(locationText.classes()).not.toContain('md:hidden');
  });
});
