import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env');

  return {
    server: { hmr: true },
    assetsInclude: ['**/*.xlsx', '**/*.xls', '**/*.csv'],
    plugins: [
      react({
        include: ['**/*.tsx', '**/*.ts'],
      }),
      svgr({
        exportAsDefault: false,
        svgrOptions: {
          icon: true,
        },
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            ...env,
            MODE: mode,
          },
        },
      }),
      mode !== 'production' && checker({ typescript: true }),
    ].filter(Boolean),
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src/') },
      tsconfigPaths: true,
    },
    css: {
      postcss: {
        plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
      },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
            warning.message.includes("'use client'")
          ) {
            return;
          }
          warn(warning);
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor';
              }
          
              if (
                id.includes('@radix-ui') ||
                id.includes('lucide') ||
                id.includes('@mui')
              ) {
                return 'ui';
              }
          
              if (
                id.includes('react-hook-form') ||
                id.includes('yup') ||
                id.includes('@hookform')
              ) {
                return 'forms';
              }
          
              if (id.includes('recharts')) {
                return 'charts';
              }
          
              return 'vendor';
            }
          },
        },
      },
    },
    test: {
      globals: true,
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
    },
  };
});
