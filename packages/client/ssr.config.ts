import * as path from 'path';

import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      styles: path.resolve(__dirname, './src/styles'),
      src: path.resolve(__dirname, './src'),
    }
  },
  css: {
    preprocessorOptions: { scss: { quietDeps: true } },
    modules: { generateScopedName: '[name]_[local]__[hash:base64:5]' },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  ssr: { noExternal: ['react-helmet-async', '@reduxjs/toolkit'] },
})
