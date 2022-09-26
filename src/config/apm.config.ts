import * as apm from 'elastic-apm-node';
export const apmConfig = (): apm.AgentConfigOptions => {
  return {
    // Override the service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'saarthi-dev',

    // Use if APM Server requires a secret token
    secretToken: 'sq9RqncjFIuyaoN2ao',

    // Set the custom APM Server URL (default: http://localhost:8200)
    serverUrl:
      'https://b4157ebbd68647be8dd19c14cbcdf2c1.apm.us-central1.gcp.cloud.es.io:443',

    // Set the service environment
    environment: 'production',
    active: false, //adding false will dissable the apm
  };
};
