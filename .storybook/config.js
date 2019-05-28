import '@trigen/scripts/storybook/config';
import React from 'react';
import {
	loadStories
} from '@trigen/scripts/storybook/config';
import {
	addDecorator,
	configure
} from '@storybook/react';
import stylesheet from '@flexis/ui/reboot.st.css';

addDecorator(story => (
	<div {...stylesheet('root')}>
		{story()}
	</div>
));

configure(loadStories, module);
