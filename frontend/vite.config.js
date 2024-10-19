import react from '@vitejs/plugin-react';

// vite.config.js
export default {
  plugins: [react()],
  build: {
    rollupOptions: {
      // No need to add jwt-decode to external here
    },
  },
};

