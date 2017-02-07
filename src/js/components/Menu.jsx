import React, { PureComponent } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';

// can use PureComponent here since given same props, state
// the result is the same
export class Menu extends PureComponent {
  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={(open) => this.props.drawerChange(open)}
      >
        <Link to={'about'}>
          <MenuItem onTouchTap={this.props.close} primaryText="About" />
        </Link>
        <Link to={'legend'}>
          <MenuItem onTouchTap={this.props.close} primaryText="Legend" />
        </Link>
        <Link to={'api'}>
          <MenuItem onTouchTap={this.props.close} primaryText="API" />
        </Link>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  close: React.PropTypes.func,
  open: React.PropTypes.bool,
  drawerChange: React.PropTypes.func,
};
