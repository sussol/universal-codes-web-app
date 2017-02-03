import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import AboutRoute from './routes/about';
import ApiRoute from './routes/api';
import LegendRoute from './routes/legend';
import App from './components/App.jsx';

// routesConfig
const routesConfig = {
  path: '/',
  component: App,
  // indexRoute: {component: Home},
  childRoutes: [
    AboutRoute,
    ApiRoute,
    LegendRoute,
  ],
};

// Needed for onTouchTap, won't be required once official React version released.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render((
  <Router
    history={browserHistory}
    routes={routesConfig}
  />
), document.getElementById('root'));
