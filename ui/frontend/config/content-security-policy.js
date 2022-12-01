module.exports = function () {
  return {
    delivery: ['meta'],
    enabled: true,
    failTests: true,
    policy: {
      'default-src': ["'none'"],
      'script-src': ["'self'"],
      'font-src': ["'self'"],
      'connect-src': ["'self'", 'https://foun-api.pudr.com'],
      'img-src': ["'self'"],
      'style-src': ["'self'"],
      'media-src': ["'self'"],
    },
    reportOnly: true,
  };
};
