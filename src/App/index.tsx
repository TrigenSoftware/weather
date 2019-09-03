import React from 'react';
import {
	render
} from 'react-dom';
import {
	Provider
} from '@flexis/redux';
import registerServiceWorker from './serviceWorker?tsw';
import App from './App';
import createStore from './store';

async function main() {

	registerServiceWorker({ scope: '/' });

	const root = document.querySelector('#view');
	const store = createStore();

	if (root !== null) {
		render(
			<Provider store={store}>
				<App/>
			</Provider>,
			root
		);
	}
}

main();
