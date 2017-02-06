import React from 'react';
import { Link } from 'react-router';

import Header from './Header.jsx';

const App = (props) => (
  <div>
    <Header {...props} />

    {/* @delete-me: debug a result path*/}
    <div>FAKE TABLE</div>
    <div>
      @DEBUG: <Link to={'/amoxicillin/am500'}>I link to a result, w00t!</Link>
    </div>
    <div>@DEBUG:
      <Link to={'/hydrochlorothiazide/hy50'}>I link to another result, w00t!</Link>
    </div>
    <div>@DEBUG:
      <Link to={'/metaformin/me1000'}>I link to  yet another result, w00t!</Link>
    </div>
    <br />
    <div><Link to={'/all'}>SHOW ALL RESULTS</Link></div>
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
