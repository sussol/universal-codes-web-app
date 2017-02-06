import All from './All.jsx';

module.exports = {
  path: '/all',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, All);
    });
  },
};
