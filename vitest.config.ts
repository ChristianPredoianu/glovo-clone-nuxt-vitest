import * as path from 'path';
import { defineVitestConfig } from 'nuxt-vitest/config';

const r = (p: string) => path.resolve(__dirname, p);

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
  },
  plugins: [],

  resolve: {
    alias: {
      '@': r('.'),
    },
  },
});
