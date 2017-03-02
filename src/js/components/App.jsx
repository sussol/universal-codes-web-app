import React from 'react';

import { Header } from './Header.jsx';
import { Search } from './Search.jsx';

export const App = (props) => (
  <div>
    <Header {...props} />

    {/* show children components as we navigate */}
    {props.children ?
      <div className={'box-content mui-shadow'}>
      {props.children}
    </div> :
    null}

    <Search />
  </div>

);

App.propTypes = {
  children: React.PropTypes.object,
};
