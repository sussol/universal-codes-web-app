import Result from './Result.jsx';

module.exports = {
  path: '/:name/:code',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Result);
    });
  },
};
