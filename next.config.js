const withPlugins = require('next-compose-plugins');



module.exports = {
  trailingSlash: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    domains: ['strapi90m.s3.us-west-1.amazonaws.com'],
  },
  async headers() {
    return [
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Instead of this value:
            value: 'public, max-age=259200, s-maxage=259200, stale-while-revalidate=259200',
            // Cache-Control response header is `public, max-age=60` in production
            // and `public, max-age=0, must-revalidate` in development
          },
        ],
      },
    ]
  },
}