module.exports = {
  path: '/all',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./All.jsx').default);
    });
  },
};
