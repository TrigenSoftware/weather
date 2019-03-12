/* tslint:disable:no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Link, MemoryRouter } from 'react-router-dom';
import Navigator from './';

const stylableApi = `
Stylable API
---
`;

storiesOf('Navigator', module)
	.addParameters({
		info: stylableApi
	})
	.addDecorator(story => (
		<MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
	))
	.add(
		'default navigation',
		() => (
			<Navigator>
				<Link to='/'>Home</Link>
				<Link to='/weather'>Weather</Link>
				<Link to='/todo'>Todo</Link>
			</Navigator>
		)
	);
