import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineVitestConfig } from 'nuxt-vitest/config';

const r = (p: string) => path.resolve(__dirname, p);

export default defineVitestConfig({
  plugins: [vue()],
  test: {
    environment: 'nuxt',
  },
  resolve: {
    alias: {
      '@': r('.'),
    },
  },
});
