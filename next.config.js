// smile-meter-api/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Konfigurasi khusus untuk API routes
    api: {
      // Ukuran upload maksimum (10MB)
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
    // Ignore optional dependencies that cause build issues
    webpack: (config) => {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
      });
      return config;
    },
    // Jika ingin mengganti direktori output
    // distDir: 'build',
  }
  
  module.exports = nextConfig