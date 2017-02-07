import React, { PureComponent } from 'react';

// import BackButton from '../../components/BackButton.jsx';

export class Result extends PureComponent {
  render() {
    return (
      <div>
        <div>
          <b>Drug Name:</b> {this.props.params.name}<br />
          <b>Drug Code:</b> {this.props.params.code}
        </div>
        {/* <BackButton {...props} /> */}
      </div>
    );
  }
}

Result.propTypes = {
  params: React.PropTypes.object,
};
