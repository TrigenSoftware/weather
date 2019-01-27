import React from 'react';
import { render } from 'react-dom';
import { Provider } from '@flexis/redux';
import CrossTabClient from '@logux/client/cross-tab-client';
import App from './App';
import createStore from './store';

async function main() {

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

const logux = new CrossTabClient({
	credentials: 'credentials',
	subprotocol: '1.0.0',
	server: 'ws://127.0.0.1:1337',
	userId: 'userId'
});

logux.start();

logux.on('add', (action, meta, ...args) => {
	console.log('add', action, meta, args);
});

console.log(logux);
