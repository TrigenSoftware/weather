import React from 'react';
import {
	configure,
	addDecorator
} from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withOptions } from '@storybook/addon-options';
import { checkA11y } from '@storybook/addon-a11y';
import stylesheet from '@flexis/ui/reboot.st.css';

addDecorator(story => (
	<div
		{...stylesheet('root')}
		style={{ padding: '12px' }}
	>
		{story()}
	</div>
));
addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(checkA11y);
addDecorator(
	withOptions({
		name:              process.env.PROJECT_NAME,
		url:               process.env.PROJECT_HOMEPAGE,
		addonPanelInRight: true
	})
);

const stories = require.context(
	process.env.PROJECT_SRC,
	true,
	/\.stories\.tsx$/
);

function loadStories() {
	stories.keys().forEach(filename =>
		stories(filename)
	);
}

configure(loadStories, module);
