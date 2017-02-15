import React, { PureComponent } from 'react';
import AppBar from 'material-ui/AppBar';

import { Menu } from './Menu.jsx';

const styles = {
  backgroundColor: '#FFF',
  borderBottom: '2px solid rgba(242, 101, 50, 0.55)',
};

// can use PureComponent here since given same props, state
// the result is the same
export class Header extends PureComponent {
  constructor(props) {
    super(props);
    // initialise state
    this.state = { open: false };
  }

  // close the menu
  handleClose = () => this.setState({ open: false })

  // toggle menu (typically from a closed state)
  handleToggle = () => this.setState({ open: !this.state.open })

  // when drawer's 'dock' prop is set to 'false'
  // you can press 'esc' to close, or click the outer canvas
  // thus, provide a callback for chance to change the visible state
  handleDrawerChange = (open) => this.setState({ open })

  render() {
    return (
      <div>
        <AppBar
<<<<<<< Updated upstream
          title="Universal Drug Codes"
          onLeftIconButtonTouchTap={this.handleToggle}
=======
          className="header"
          onLeftIconButtonTouchTap={this.handleToggle}
          style={styles}
          title="Universal Drug Codes"
          titleStyle={{ color: 'rgb(242, 101, 50)' }}
>>>>>>> Stashed changes
        />
        {/* menu drawer to toggle */}
        <Menu
          open={this.state.open}
          close={this.handleClose}
          drawerChange={this.handleDrawerChange}
        />
      </div>
    );
  }
}
