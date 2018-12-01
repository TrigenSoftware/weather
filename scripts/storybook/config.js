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
import pkg from '../../package.json';

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
		name:              pkg.name.toUpperCase(),
		url:               pkg.repository.url.replace(/(^git\+)|(\.git$)/g, ''),
		addonPanelInRight: true
	})
);

const stories = require.context(
	'../../src/',
	true,
	/\.stories\.tsx$/
);

function loadStories() {
	stories.keys().forEach(filename =>
		stories(filename)
	);
}

configure(loadStories, module);
