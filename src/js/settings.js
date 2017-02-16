const LOCAL_PORT = '8081';

const hostByEnv = (env = process.env.NODE_ENV) => (
  env === 'production' ? 'server.lambda.com' : `localhost:${LOCAL_PORT}`
);
const protocolByEnv = (env = process.env.NODE_ENV) => (
  env === 'production' ? 'https://' : 'http://'
);

export const SERVER_HOST = hostByEnv();
export const PROTOCOL = protocolByEnv();
