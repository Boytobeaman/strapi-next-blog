const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withImages = require('next-images');

module.exports = withPlugins([
  [withImages, {

  }],
  [optimizedImages, {
    /* config for next-optimized-images */
    // imagesFolder:"public"
    optimizeImagesInDev: true
  }],
  // your other plugins here

]);