import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { globalStyles } from '../globalStyles.js';

import Header from './Header.jsx';

// Apply app wide styles here (http://www.material-ui.com/#/customization/themes)
const muiTheme = getMuiTheme(globalStyles);

const App = (props) => (
  <div>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Header {...props} />
    </MuiThemeProvider>

    {props.children ?
      <div className={'box-content mui-shadow'}>
      {props.children}
    </div> :
    null}
  </div>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
