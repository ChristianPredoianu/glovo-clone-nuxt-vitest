import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import AdressForm from '@/components/forms/AdressForm.vue';
import { Suspense } from 'vue';

describe('AdressForm', () => {
  it('renders input field correctly', async () => {
    /*   const options = [
      { id: 1, text: 'Option 1' },
      { id: 2, text: 'Option 2' },
      { id: 3, text: 'Option 3' },
    ];

    const TestComponent = {
      components: {
        Suspense,
        AdressForm,
      },
      template: `
        <Suspense>  
          <AdressForm :options="[ 
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' },
          ]" idKey="id" textKey="text" />
        </Suspense>
      `,
    };

    const wrapper = mount(TestComponent);

    await flushPromises();

    const input = wrapper.find('input[type="text"]');

    expect(input.exists()).toBe(true); */
  });
});
