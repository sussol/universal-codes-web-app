import React from 'react';

import AboutContent from '../../../static/about.html';

const About = () => (
	<div>
		<div dangerouslySetInnerHTML={{ __html: AboutContent }} />
	</div>
);

export default About;
