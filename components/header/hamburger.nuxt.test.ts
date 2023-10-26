// tests/components/SomeComponents.nuxt.spec.ts
import { mountSuspended } from 'nuxt-vitest/utils';
import { it, expect } from 'vitest';
import Hamburger from '../header/Hamburger.vue';
import App from '../../app.vue';

it('can mount some component', async () => {
  const component = await mountSuspended(Hamburger);
  expect(component.text()).toMatchInlineSnapshot('This is an auto-imported component');
});

// tests/App.nuxt.spec.ts
it('can also mount an app', async () => {
  const component = await mountSuspended(App, { route: '/test' });
  expect(component.html()).toMatchInlineSnapshot(`
    "<div>This is an auto-imported component</div>
    <div> I am a global component </div>
    <div>/</div>
    <a href=\\"/test\\"> Test link </a>"
  `);
});
