import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export class SearchBar extends PureComponent {
  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Search by generic drug name, universal or WHO code"
          fullWidth
        />
        {/* search submit */}
        <RaisedButton label="Search" primary />
      </div>
    );
  }
}

SearchBar.propTypes = {
  params: React.PropTypes.object,
};
