export default () => {
  return {
    port: parseInt(process.env.PORT) || 4000,
    database: {
      saarthi: process.env.MONGODB_URI,
    },
    http: {
      timeout: parseInt(process.env.HTTP_TIMEOUT) || 10000,
      maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS) || 5,
    },
    redis: {
      url: process.env.REDIS_URI,
      retries: process.env.REDIS_RETRIES || 5,
    },
    log_levels: process.env.LOG_LEVELS?.split(',') || [
      'error',
      'log',
      'warn',
      'debug',
      'verbose',
    ],
  };
};
