const LOCAL_SERVER_PORT = '8000';

const hostByEnv = (env = process.env.NODE_ENV) => (
  env === 'production' ? 'server.lambda.com' : `localhost:${LOCAL_SERVER_PORT}`
);
const protocolByEnv = (env = process.env.NODE_ENV) => (
  env === 'production' ? 'https://' : 'http://'
);

export const SERVER_HOST = hostByEnv();
export const PROTOCOL = protocolByEnv();
export const FUZZY_SEARCH_URL = `${PROTOCOL}${SERVER_HOST}/items?fuzzy=`;
