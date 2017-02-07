import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';

export class SearchBar extends PureComponent {
  render() {
    return (
      <TextField
        floatingLabelText="Search by generic drug name, universal or WHO code"
        fullWidth
      />
    );
  }
}

SearchBar.propTypes = {
  params: React.PropTypes.object,
};
