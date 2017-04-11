const _hostByEnv = (env = process.env.NODE_ENV) => {
  if (env === 'production') {
	// @todo change on API launch
    return 'yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev';
  }
  return 'yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev';
};

// set fixed widths for any columns
// e.g. column 1 should be 150px
export const ColumnFixedWidths = { 1: 150 };

export const SERVER_HOST = _hostByEnv();
// local will call dev upstream
export const SEARCH_URL = `https://${SERVER_HOST}/items?search=`;
