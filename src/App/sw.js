/* eslint-env serviceworker */
/* eslint-disable */
// import precaching from 'workbox-precaching';

// interface IGlobalScope extends ServiceWorkerGlobalScope {
// 	__precacheManifest: any;
// }

// declare var self: IGlobalScope;

const INTERVAL = 2000;

// precaching.precacheAndRoute(self.__precacheManifest);

setInterval(() => {
	postMessageToAll({
		action:  'ping',
		payload: self.__precacheManifest
	});
}, INTERVAL);

self.addEventListener('install', () => {
	postMessageToAll({
		action: 'install'
	});
});

self.addEventListener('activate', () => {
	postMessageToAll({
		action:  'activate',
		payload: self.__precacheManifest
	});
});

self.addEventListener('fetch', (event) => {
	postMessageToAll({
		action:  'fetch',
		payload: event.request.url
	});
});

async function postMessageToAll(message) {

	const clients = await self.clients.matchAll();

	clients.forEach((client) => {
		client.postMessage(message);
	});
}
