/* tslint:disable:no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	array
} from '@storybook/addon-knobs/react';
import {
	getFakeData
} from './TodoList.mock';
import TodoList from './';

const fakeData = getFakeData();

const events = {
	onDelete: action('delete'),
	onSubmitItem: action('submit'),
	onSubmitForm: action('submit')
};

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
			<TodoList
				{...events}
				list={array('List', fakeData.List)}
			/>
		)
	);
