import React from 'react';
import { render } from 'react-dom';
import { App } from './App.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { globalStyles } from './globalStyles.js';

// Needed for onTouchTap, won't be required once official React version released.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Apply app wide styles here (http://www.material-ui.com/#/customization/themes)
const muiTheme = getMuiTheme(globalStyles);

const StyledApp = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

render(<StyledApp />, document.getElementById('root'));
