/* tslint:disable:no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	button,
	number
} from '@storybook/addon-knobs/react';
import {
	getFakeData
} from './TodoItem/TodoItem.mock';
import TodoList from './';

const events = {
	onAdd: action('add'),
	onChange: action('change'),
	onDelete: action('delete')
};

const stylableApi = `
Stylable API
---
`;

storiesOf('TodoList', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with basic data',
		() => {

			button('Generate new data', () => {});

			return (
				<TodoList
					{...events}
					items={
						Array.from({
							length: number('Items count', 3)
						}).map(() => {

							const fakeItem = getFakeData();

							return {
								id: fakeItem.id,
								text: fakeItem.value
							};
						})
					}
				/>
			);
		}
	);