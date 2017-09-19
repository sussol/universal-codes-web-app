import React from 'react';
import PropTypes from 'prop-types';

import { Header } from './Header';

export const App = props => (
  <div>
    <Header {...props} />

    {/* show children components as we navigate */}
    {
      props.children ?
        <div className={'box-content mui-shadow'}>
          {props.children}
        </div>
        : null
    }
  </div>
);

App.defaultProps = {
  children: null,
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
    PropTypes.symbol,
  ]),
};
