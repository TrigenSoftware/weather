/* tslint:disable:no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TodoForm from './';

const events = {
	onSubmit: action('submit')
};

const stylableApi = `
Stylable API
---
`;

storiesOf('TodoForm', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with basic data',
		() => (
			<TodoForm
				{...events}
			/>
		)
	);
