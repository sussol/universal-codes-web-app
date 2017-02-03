import Api from './Api.jsx';

module.exports = {
  path: '/api',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Api);
    });
  },
};
