import About from './About.jsx';

module.exports = {
  path: '/about',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, About);
    });
  },
};
