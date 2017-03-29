const hostByEnv = (env = process.env.NODE_ENV) => {
  if (env === 'production') {
	// @todo change on API launch
    return 'yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev';
  }
  return 'yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev';
};

export const SERVER_HOST = hostByEnv();
// local will call dev upstream
export const SEARCH_URL = `https://${SERVER_HOST}/items?search=`;
