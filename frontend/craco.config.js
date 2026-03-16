const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@/app': path.resolve(__dirname, 'src/app'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/containers': path.resolve(__dirname, 'src/components/containers'),
      '@/elements': path.resolve(__dirname, 'src/components/elements'),
      '@/ui': path.resolve(__dirname, 'src/components/ui'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/store': path.resolve(__dirname, 'src/store'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/http': path.resolve(__dirname, 'src/http'),
    },
  },
};

