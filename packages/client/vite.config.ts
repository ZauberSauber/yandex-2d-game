import path from 'path';

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import pluginChecker from 'vite-plugin-checker';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    open: false,
  },
  define: {
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 5000,
    outDir: path.join(__dirname, 'dist/client'),
    copyPublicDir: !isSsrBuild,
  },
  publicDir: 'public',
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
    VitePWA({
      strategies: 'injectManifest',
      srcDir: path.resolve(__dirname, 'src', 'utils', 'serviceWorker'),
      filename: 'sw.ts',
      injectRegister: null,
      manifest: {
        name: 'Neo-Tokyo Network',
        short_name: 'NTN',
        description: 'Киберпространство будущего',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [{ src: '/vite.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      devOptions: { enabled: false, type: 'module' },
    }),
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
  ssr: { noExternal: ['react-helmet-async', '@reduxjs/toolkit'] },
}));
