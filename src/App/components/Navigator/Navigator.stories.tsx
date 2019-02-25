/* tslint:disable:no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import {
    number,
    button
} from '@storybook/addon-knobs/react';
import Navigator from './';
import { getFakeData } from './Navigator.mock';

const stylableApi = `
Stylable API
---
- ::item
`;
/* tslint:disable */
storiesOf('Navigator', module)
    .addParameters({
	info: stylableApi
})
    .add(
        'with 3 links',
        () => {

	button('Generate new data', () => { });

	return (
            <Navigator>
            {Array.from({
	length: number('Items count', 3)
}).map((_, i) => {

	const fakeData = getFakeData();

	return (
                    <a key={i} href={fakeData.pass}>
                        {fakeData.name}
                    </a>
	);
})}
            </Navigator>
	);
});
