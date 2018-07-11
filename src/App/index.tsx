import React from 'react';
import { render } from 'react-dom';
import App from './App';

const root = document.querySelector('#view');

if (root !== null) {
	render(
		<App/>,
		root
	);
}
