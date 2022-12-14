module.exports = function () {
  return {
    delivery: ['meta'],
    enabled: true,
    failTests: true,
    policy: {
      'default-src': ["'none'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      'font-src': ["'self'"],
      'manifest-src': ["'self'"],
      'connect-src': ["'self'", 'https://foun-api.pudr.com'],
      'img-src': ["'self'", 'data:'],
      'style-src': ["'self'", "'unsafe-inline'"],
      'media-src': ["'self'"],
    },
    reportOnly: true,
  };
};
