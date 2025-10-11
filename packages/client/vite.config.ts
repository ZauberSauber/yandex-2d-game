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
    outDir: path.join(__dirname, 'dist/client'),
  },
  ssr: {
    format: 'cjs',
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    pluginChecker({
      typescript: { tsconfigPath: './tsconfig.json' },
      stylelint: {
        watchPath: 'src',
        lintCommand: 'stylelint "**/*.scss"',
        dev: { logLevel: ['error'] },
      },
      eslint: {
        watchPath: 'src',
        lintCommand: 'eslint "**/*.{ts,tsx}"',
        dev: { logLevel: ['error'] },
      },
    }),
  ],
});
