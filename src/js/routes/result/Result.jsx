import React from 'react';

import BackButton from '../../components/BackButton.jsx';

const Result = (props) => (
    <div>
      <div>
        <b>Drug Name:</b> {props.params.name}<br />
        <b>Drug Code:</b> {props.params.code}
      </div>
      <br />
      <BackButton {...props} />
    </div>
);

Result.propTypes = {
  params: React.PropTypes.object,
};

export default Result;
