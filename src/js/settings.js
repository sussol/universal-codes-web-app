const LOCAL_SERVER_PORT = '8000';

const hostByEnv = (env = process.env.NODE_ENV) => {
  switch (env) {
    case 'production':
      return 'NOT_DEPLOYED';
    case 'dev':
      return 'yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev';
    default:
      return `localhost:${LOCAL_SERVER_PORT}`;
  }
};
const protocolByEnv = (env = process.env.NODE_ENV) => (
  (env === 'production' || env === 'dev') ? 'https://' : 'http://'
);

export const SERVER_HOST = hostByEnv();
export const PROTOCOL = protocolByEnv();
export const SEARCH_URL = `${PROTOCOL}${SERVER_HOST}/items?search=`;
