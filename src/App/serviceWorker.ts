import {
	precacheAndRoute
} from 'workbox-precaching';
import {
	registerRoute
} from 'workbox-routing';
import {
	NetworkFirst
} from 'workbox-strategies';
import {
	RoutesList
} from './routes';

declare var self: ServiceWorkerGlobalScope;

self.__precacheManifest.push(
	...RoutesList
);

precacheAndRoute(self.__precacheManifest);

registerRoute(
	/^https:\/\/api\.openweathermap\.org/,
	new NetworkFirst({
		cacheName:             'openweathermap',
		networkTimeoutSeconds: 10
	})
);
