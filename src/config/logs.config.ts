export default (): any => {
  // return process.env.LOG_LEVEL.split(',');
  return ['error', 'log', 'warn', 'debug', 'verbose'];
};
