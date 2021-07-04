const withPlugins = require('next-compose-plugins');


module.exports = {
  trailingSlash: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    domains: ['strapi90m.s3.us-west-1.amazonaws.com'],
  },
}