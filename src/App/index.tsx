import React from 'react';
import { render } from 'react-dom';
import { Provider } from '@flexis/redux';
// @ts-ignore
import registerServiceWorker from './sw';
import App from './App';
import createStore from './store';

async function main() {

	registerServiceWorker({ scope: '/' }).then(() => {

		console.log('Success!');

		navigator.serviceWorker.addEventListener('message', (event) => {
			console.log(JSON.stringify(event.data, null, '\t'));
		});
	});

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
