import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

const style = {
  margin: 12,
};

const BackButton = () => ({
  handleBackClick() {
    return browserHistory.push('/all');
  },
  render() {
    return (
      <RaisedButton
        onClick={this.handleBackClick}
        label="Back to Results"
        secondary={true}
        style={style}
      />
    );
  },
});

BackButton.propTypes = {
  showBackButton: React.PropTypes.bool,
};

export default BackButton;
