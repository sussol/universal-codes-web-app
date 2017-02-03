import Legend from './Legend.jsx';

module.exports = {
  path: '/legend',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Legend);
    });
  },
};
