module.exports = {
  path: '/:name/:code',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Result.jsx').default);
    });
  },
};
