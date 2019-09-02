import React from 'react';
import {
	configure
} from '@trigen/scripts-preset-react-app/storybook/config';
import {
	addDecorator
} from '@storybook/react';
import '@flexis/ui/reboot.st.css';

addDecorator(story => (
	<div>
		{story()}
	</div>
));

configure(module);
