import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

// can use PureComponent here since given same props, state
// the result is the same
export class Menu extends PureComponent {
  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={open => this.props.drawerChange(open)}
      >
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <Link to="/">
          <MenuItem onClick={this.props.close} primaryText="Search" />
        </Link>
        <Link to="about">
          <MenuItem onClick={this.props.close} primaryText="About" />
        </Link>
        <Link to="legend">
          <MenuItem onClick={this.props.close} primaryText="Legend" />
        </Link>
        <Link to="api">
          <MenuItem onClick={this.props.close} primaryText="API" />
        </Link>
      </Drawer>
    );
  }
}

Menu.defaultProps = {
  close: () => {},
  drawerChange: () => {},
};

Menu.propTypes = {
  close: PropTypes.func,
  open: PropTypes.bool.isRequired,
  drawerChange: PropTypes.func,
};
