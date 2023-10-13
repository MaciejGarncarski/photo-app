/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    alias: {
      '^~/(.*)$': new URL('./', import.meta.url).pathname,
      '^@/(.*)$': new URL('./src/', import.meta.url).pathname,
    },
    coverage: {
      provider: 'v8',
    },
  },
});
