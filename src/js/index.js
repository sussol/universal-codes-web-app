import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import AboutRoute from './routes/about';
import ApiRoute from './routes/api';
import { globalStyles } from './globalStyles.js';
import LegendRoute from './routes/legend';
import ResultRoute from './routes/result';
import App from './components/App.jsx';

// Apply app wide styles here (http://www.material-ui.com/#/customization/themes)
const muiTheme = getMuiTheme(globalStyles);

// routesConfig
const routesConfig = {
  path: '/',
  component: App,
  // indexRoute: {component: Home},
  childRoutes: [
    AboutRoute,
    ApiRoute,
    LegendRoute,
    ResultRoute,
  ],
};

// Needed for onTouchTap, won't be required once official React version released.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router
      history={browserHistory}
      routes={routesConfig}
    />
  </MuiThemeProvider>
), document.getElementById('root'));
