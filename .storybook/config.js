import '@trigen/scripts/storybook/config';
import React from 'react';
import {
	addDecorator
} from '@storybook/react';
import stylesheet from '@flexis/ui/reboot.st.css';

addDecorator(story => (
	<div {...stylesheet('root')}>
		{story()}
	</div>
));
