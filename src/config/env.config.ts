export default () => {
  if (process.env.NODE_ENV == 'local') {
    return {
      port: parseInt(process.env.PORT) || 4000,
      database: {
        saarthi: 'mongodb://localhost:27017/saarthi_service',
      },
      INTERNAL_BASE_URL: 'http://localhost:8000',
      http: {
        timeout: 10000,
        maxRedirects: 5,
      },
      redis: {
        url: 'redis://127.0.0.1:6379',
        retries: 5,
      },
      log_levels: ['error', 'log', 'warn', 'debug', 'verbose'],
    };
  } else if (process.env.NODE_ENV == 'develop') {
    return {
      port: parseInt(process.env.PORT) || 4000,
      database: {
        saarthi:
          'mongodb+srv://penpencil_local:wDPS8evNoisUYeJJ@penpencil-dev.dwter.mongodb.net/saarthi_service_staging?retryWrites=false&w=majority',
      },
      INTERNAL_BASE_URL: 'https://dev-api.penpencil.co',
      http: {
        timeout: 10000,
        maxRedirects: 5,
      },
      redis: {
        url: 'redis://:prateekboob123@159.89.175.51:6379',
        retries: 3,
      },
      log_levels: ['error', 'log', 'warn', 'debug', 'verbose'],
    };
  } else if (process.env.NODE_ENV == 'stage') {
  } else if (process.env.NODE_ENV == 'production') {
  }
};
