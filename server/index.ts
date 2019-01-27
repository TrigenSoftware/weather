import { Server } from '@logux/server';

const app = new Server(
	Server.loadOptions(process, {
		subprotocol: '1.0.0',
		supports: '1.x',
		root: __dirname
	})
);

app.auth((userId, token) => {

	console.log('Auth', userId, token);

	return Promise.resolve(true);
});

app.type('todo/add', {

	access(action, meta, creator) {

		console.log('Access todo/add', action, meta, creator);

		return true;
	},

	process(action, meta, creator) {

		console.log('Process todo/add', action, meta, creator);

		return true;
	}
});

app.listen();
