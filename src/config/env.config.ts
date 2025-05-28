export default () => {
    return {
      port: parseInt(process.env.PORT) || 4000,
      database: {
        mariohackathon:
          'mongodb://mongo-proxy-stage.penpencil.co:27015/mario-hackathon',
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
      openAiApiKey: process.env.OPENAI_API_KEY,
    };
};
