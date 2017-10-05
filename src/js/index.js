import React from 'react';
import { render } from 'react-dom';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// load styles into bundle
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import '@blueprintjs/table/dist/table.css';

import { About, Api, Header, Legend, Search } from './components';

// load styles into bundle
import '../fonts/fonts.css';
import '../css/custom.css';

// load images into build directory
import './favicons';

// patch global Promise for older browsers; for using `import()`
require('es6-promise').polyfill();

// Needed for onTouchTap, won't be required once official React version released.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const renderApp = () => {
  render(
    <AppContainer>
      <MuiThemeProvider>
        <Router>
          <div>
            <Header />
            <div className={'box-content mui-shadow'}>
              <Route exact path="/" component={Search} />
              <Route exact path="/about" component={About} />
              <Route exact path="/api" component={Api} />
              <Route exact path="/legend" component={Legend} />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components', () => {
    renderApp();
  });
}
