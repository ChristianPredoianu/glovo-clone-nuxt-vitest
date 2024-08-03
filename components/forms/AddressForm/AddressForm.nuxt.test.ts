import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AddressForm from './AddressForm.vue'; // Adjust the import path as needed
import type {
  IDropdownOptions,
  ILocationAdress,
} from '@/interfaces/interfaces.interface';

// Mock implementations
const mockGeolocation = {
  latitude: { value: 0 },
  longitude: { value: 0 },
  getLocation: vi.fn(),
};

const mockFetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({} as ILocationAdress),
  })
);

const mockRuntimeConfig = {
  public: {
    apiReverse: 'https://api.example.com/',
  },
};

vi.mock('@/composables/useGeolocation', () => ({
  useGeolocation: () => mockGeolocation,
}));

vi.mock('@/composables/useFetch', () => (url: string) => mockFetch(url));

vi.mock('@/composables/useRuntimeConfig', () => () => mockRuntimeConfig);

describe('AddressForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and location icon correctly', () => {
    const wrapper = mount(AddressForm, {
      props: {
        options: [],
        idKey: 'id',
        textKey: 'text',
      },
    });

    // Check input field presence
    const input = wrapper.find('[data-testid="input"]');
    console.log(wrapper.html());
    console.log(input);
    /*  expect(wrapper.find('input').exists()).toBe(true); */

    // Check location icon and text
    expect(wrapper.find('[data-testid="address"]').exists()).toBe(true);
    expect(wrapper.find('.location-text').exists()).toBe(true);
  });

  /*   it('emits emitInput event when input changes', async () => {
    const wrapper = mount(AddressForm, {
      props: {
        options: [],
        idKey: 'id',
        textKey: 'text',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('New input');
    await input.trigger('input');

    expect(wrapper.emitted('emitInput')).toBeTruthy();
    expect(wrapper.emitted('emitInput')![0]).toEqual(['New input']);
  }); */

  /* it('calls getUserLocation when location icon is clicked', async () => {
    const wrapper = mount(AddressForm, {
      props: {
        options: [],
        idKey: 'id',
        textKey: 'text',
      },
    });

    const locationIcon = wrapper.find('[data-testid="address"]');
    await locationIcon.trigger('click');

    expect(mockGeolocation.getLocation).toHaveBeenCalled();
  });

  it('emits emitLocation event when data changes', async () => {
    const locationData: ILocationAdress = {
      address: '123 Main St',
      latitude: 40.7128,
      longitude: -74.006,
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(locationData),
    } as unknown as Response);

    const wrapper = mount(AddressForm, {
      props: {
        options: [],
        idKey: 'id',
        textKey: 'text',
      },
    });

    await wrapper.vm.$nextTick(); // Ensure that the watch effect is triggered

    expect(wrapper.emitted('emitLocation')).toBeTruthy();
    expect(wrapper.emitted('emitLocation')![0]).toEqual([locationData]);
  }); */
});
