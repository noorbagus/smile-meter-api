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
    // Jika ingin mengganti direktori output
    // distDir: 'build',
  }
  
  module.exports = nextConfig