import React from 'react';

import LegendContent from '../../../static/legend.html';

const Legend = () => (
	<div>
		<div dangerouslySetInnerHTML={{ __html: LegendContent }} />
	</div>
);

export default Legend;
