/* tslint:disable:no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	text
} from '@storybook/addon-knobs/react';
import {
	getFakeData
} from './TodoItem.mock';
import TodoItem from './';

const fakeData = getFakeData();

// @ts-ignore
const events = action({
	onSubmit: 'submit',
	onDelete: 'delete'
});

const stylableApi = `
Stylable API
---
`;

storiesOf('TodoItem', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with basic data',
		() => (
			<TodoItem
				{...events}
				value={text('Value', fakeData.value)}
			/>
		)
	);
