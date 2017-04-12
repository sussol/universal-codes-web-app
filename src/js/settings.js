// which version to deploy / test
const API_VERSION = process.env.API_VERSION || 'v1';
const _hostByEnv = (env = process.env.NODE_ENV) => {
  if (env === 'production') {
    return `api.universalcodes.msupply.org.nz/${API_VERSION}`;
  }
  return 'yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev';
};

// set fixed widths for any columns
// e.g. column 1 should be 150px
export const ColumnFixedWidths = { 1: 150 };

export const SERVER_HOST = _hostByEnv();
// local will call dev upstream
export const SEARCH_URL = `https://${SERVER_HOST}/items?search=`;
