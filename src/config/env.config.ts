export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    uri: process.env.DATABASE_URI,
    port: parseInt(process.env.DATABASE_PORT) || 2707,
    poolSize: parseInt(process.env.POOL_SIZE) || 50,
  },
  http: {
    timeout: parseInt(process.env.HTTP_TIMEOUT) || 5000,
    maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS) || 5,
  },
  kafka: {
    clientId: process.env.KAFKA_CLIENT || 'localhost:9092',
    brokers: process.env.KAFKA_BROKERS || 'localhost:9092',
    groupId: process.env.KAFKA_GROUP_ID || 'test',
  },
  logger: {
    logs: process.env.LOGS || 'error,warn,debug,verbose,log',
  },
});