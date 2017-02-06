import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header.jsx';
import { globalStyles } from '../globalStyles.js';

// Apply app wide styles here (http://www.material-ui.com/#/customization/themes)
const muiTheme = getMuiTheme(globalStyles);

const App = (props) => (
  <div>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Header {...props} />
    </MuiThemeProvider>

    {/* @delete-me: debug a result path*/}
    <div>FAKE TABLE</div>
    <div>@DEBUG: <Link to={'/amoxicillin/am500'}>I link to a result, w00t!</Link></div>
    <div>@DEBUG: <Link to={'/hydrochlorothiazide/hy50'}>I link to another result, w00t!</Link></div>
    <div>@DEBUG: <Link to={'/metaformin/me1000'}>I link to  yet another result, w00t!</Link></div>
    {/* end @debug */}

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
