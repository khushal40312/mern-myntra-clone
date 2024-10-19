import react from '@vitejs/plugin-react';

// vite.config.js
export default {
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['jwt-decode'], // Exclude jwt-decode from the bundle
    },
  },
};

