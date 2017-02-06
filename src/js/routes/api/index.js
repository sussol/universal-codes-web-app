module.exports = {
  path: '/api',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Api.jsx').default);
    });
  },
};
