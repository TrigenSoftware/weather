/* tslint:disable:no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import {
	object
} from '@storybook/addon-knobs/react';
import {
	getFakeData
} from './TodoItem.mock';
import TodoItem from './';

const fakeData = getFakeData();

const stylableApi = `
Stylable API
---
- :smSize
- ::date
- ::temp
- ::description
- ::params
- ::param
`;

storiesOf('TodoItem', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with basic data',
		() => <TodoItem note={object('note', fakeData)}/>
	);
