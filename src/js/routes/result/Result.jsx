import React from 'react';

const Result = (props) => (
    <div>
        <b>Drug Name:</b> {props.params.name}<br />
        <b>Drug Code:</b> {props.params.code}
    </div>
);

Result.propTypes = {
  params: React.PropTypes.object,
};

export default Result;
