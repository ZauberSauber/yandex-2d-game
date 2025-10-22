import path from 'path';

import { defineConfig } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    open: true,
  },
  define: {
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 5000,
    outDir: path.join(__dirname, 'dist/client'),
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, './src/styles'),
      src: path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: { scss: { quietDeps: true } },
    modules: { generateScopedName: '[name]_[local]__[hash:base64:5]' },
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    pluginChecker({
      typescript: { tsconfigPath: path.resolve(__dirname, './tsconfig.json') },
      stylelint: {
        watchPath: './src',
        lintCommand:
          'stylelint "**/*.{css,scss}" --cache --cache-location ./node_modules/.cache/stylelint/.stylelintcache',
        dev: { logLevel: ['error'] },
      },
      eslint: {
        watchPath: './src',
        lintCommand:
          'eslint "**/*.{ts,tsx}" --cache --cache-location ./node_modules/.cache/eslint/.eslintcache',
        dev: { logLevel: ['error'] },
      },
    }),
  ],
});
