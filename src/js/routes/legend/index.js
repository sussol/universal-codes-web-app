module.exports = {
  path: '/legend',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Legend.jsx').default);
    });
  },
};
