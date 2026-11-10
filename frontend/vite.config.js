import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react({
        include: '**/*.{jsx,js}',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: false,
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
                return 'vendor-motion';
              }
              if (id.includes('date-fns') || id.includes('react-day-picker')) {
                return 'vendor-calendar';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    define: {
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(env.REACT_APP_BACKEND_URL || 'http://localhost:8001'),
      'process.env': JSON.stringify(env),
    },
  };
});
