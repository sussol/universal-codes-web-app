import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';

// load styles into bundle
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import '@blueprintjs/table/dist/table.css';

import { AboutRoute } from './routes/about';
import { ApiRoute } from './routes/api';
import { App } from './components/App';
import { globalStyles } from './globalStyles';
import { LegendRoute } from './routes/legend';
import { Search } from './components/Search';

// load styles into bundle
import '../fonts/fonts.css';
import '../css/custom.css';

// load images into build directory
import './favicons';

// patch global Promise for older browsers; for using `import()`
require('es6-promise').polyfill();

// Apply app wide styles here (http://www.material-ui.com/#/customization/themes)
const muiTheme = getMuiTheme(globalStyles);

// react-router routes main config
const routesConfig = {
  path: '/',
  component: App,
  indexRoute: { component: Search },
  childRoutes: [
    AboutRoute,
    ApiRoute,
    LegendRoute,
  ],
};

// Needed for onTouchTap, won't be required once official React version released.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const renderApp = () => {
  render(
    <AppContainer>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router
          history={browserHistory}
          routes={routesConfig}
        />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp();
  });
}
