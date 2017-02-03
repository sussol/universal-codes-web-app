import React from 'react';

import ApiContent from '../../../static/api.html';

const Api = () => (
	<div>
		<div dangerouslySetInnerHTML={{ __html: ApiContent }} />
	</div>
);

export default Api;
