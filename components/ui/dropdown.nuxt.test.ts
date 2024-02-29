import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Dropdown from '@/components/ui/Dropdown.vue';
import AdressForm from '@/components/forms/AdressForm.vue';
import { Suspense } from 'vue';

describe('Dropdown', () => {
  it('renders correctly with provided options', async () => {
    const options = [
      { id: 1, text: 'Option 1' },
      { id: 2, text: 'Option 2' },
    ];

    const dropdownWrapper = mount(Dropdown, {
      props: {
        options,
        idKey: 'id',
        textKey: 'text',
      },
    });

    const TestComponent = defineComponent({
      components: { AdressForm },
      template: `<Suspense><AdressForm :options="[{
        id:1, 
        text:'Option1'
      }, {id:2, text: 'Option 2'}]" textKey="text"
      idKey="id"/></Suspense>`,
    });

    const wrapper = mount(TestComponent);
    console.log(wrapper.html()); // Log the HTML of TestComponent
    await flushPromises();

    await wrapper.vm.$nextTick(); // Wait for next tick after mounting

    const adressFormWrapper = wrapper.findComponent({ name: 'AdressForm' });
    console.log(adressFormWrapper.html()); // Log the HTML of AdressForm component
    const input = adressFormWrapper.find('[data-testid="address-input"]');
    console.log(input.exists()); // Check if input exists
    expect(input.exists()).toBe(true);
  });
});
