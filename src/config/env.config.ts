export default () => {
  if (process.env.NODE_ENV == 'local')
    return {
      port: 4000,
      database: {
        uri: 'mongodb://localhost:27017/saarthi_service',
        port: 2707,
        poolSize: 50,
      },
      INTERNAL_BASE_URL: 'http://localhost:8000',
      redis: {
        uri: 'redis://127.0.0.1:6379',
      },
      http: {
        timeout: 5000,
        maxRedirects: 5,
      },
      // kafka: {
      //   clientId: 'localhost:9092',
      //   brokers: 'localhost:9092',
      //   groupId: 'test',
      // },
      logger: {
        logs: 'error,warn,debug,verbose,log',
      },
    };
  else if (process.env.NODE_ENV == 'development')
    return {
      port: parseInt(process.env.PORT) || 3000,
      database: {
        uri: process.env.MONGODB_URI,
        port: parseInt(process.env.DATABASE_PORT) || 2707,
        poolSize: parseInt(process.env.POOL_SIZE) || 50,
      },
      http: {
        timeout: parseInt(process.env.HTTP_TIMEOUT) || 30000,
        maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS) || 5,
      },
      INTERNAL_BASE_URL: process.env.INTERNAL_BASE_URL,
      // redis: {
      //   uri: 'redis://127.0.0.1:6379',
      // },
      // kafka: {
      //   clientId: process.env.KAFKA_CLIENT || 'localhost:9092',
      //   brokers: process.env.KAFKA_BROKERS || 'localhost:9092',
      //   groupId: process.env.KAFKA_GROUP_ID || 'test',
      // },
      logger: {
        logs: process.env.LOGS || 'error,warn,debug,verbose,log',
      },
    };
};
