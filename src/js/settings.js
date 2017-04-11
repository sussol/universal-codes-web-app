// which version to deploy / test
const API_VERSION = process.env.API_VERSION || 'v1';
const hostByEnv = (env = process.env.NODE_ENV) => {
  if (env === 'production') {
    return `api.universalcodes.msupply.org.nz/${API_VERSION}`;
  }
  return 'yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev';
};

export const SERVER_HOST = hostByEnv();
// local will call dev upstream
export const SEARCH_URL = `https://${SERVER_HOST}/items?search=`;
