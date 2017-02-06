import React from 'react';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';

const Menu = (props) => (
  <Drawer
    docked={false}
    open={props.open}
    onRequestChange={(open) => props.drawerChange(open)}
  >
    <Link to={'/'}>
      <MenuItem onTouchTap={props.close} primaryText="Search" />
    </Link>
    <Link to={'/about'}>
      <MenuItem onTouchTap={props.close} primaryText="About" />
    </Link>
    <Link to={'/legend'}>
      <MenuItem onTouchTap={props.close} primaryText="Legend" />
    </Link>
    <Link to={'/api'}>
      <MenuItem onTouchTap={props.close} primaryText="API" />
    </Link>
  </Drawer>
);

Menu.propTypes = {
  close: React.PropTypes.func,
  open: React.PropTypes.bool,
  drawerChange: React.PropTypes.func,
};

export default Menu;
