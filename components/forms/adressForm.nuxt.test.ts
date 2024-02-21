import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AdressForm from '@/components/forms/AdressForm.vue'; // Adjust the path to your component

describe('MyComponent', () => {
  it('handles input elements correctly', async () => {
    const wrapper = mount(AdressForm);

    // Simulate user input
    const input = wrapper.find('input[type="text"]');
    await input.setValue('123456789012345678901'); // Simulate input with length > 20

    // Check if classes are added/removed correctly
    const locationIcon = wrapper.find('.location-icon');
    const locationText = wrapper.find('.location-text');
    expect(locationIcon.classes()).toContain('md:hidden');
    expect(locationText.classes()).toContain('md:hidden');

    // Simulate input with length <= 20
    await input.setValue('1234567890'); // Simulate input with length <= 20

    // Check if classes are added/removed correctly
    expect(locationIcon.classes()).not.toContain('md:hidden');
    expect(locationText.classes()).not.toContain('md:hidden');
  });
});
