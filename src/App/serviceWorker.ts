import {
	precacheAndRoute,
	getCacheKeyForURL
} from 'workbox-precaching';
import {
	registerNavigationRoute,
	registerRoute
} from 'workbox-routing';
import {
	NetworkFirst,
	StaleWhileRevalidate
} from 'workbox-strategies';

declare var self: ServiceWorkerGlobalScope;

precacheAndRoute(
	self.__precacheManifest.filter(
		({ url }) => !/\/favicons\/.*\.png$/.test(url)
	)
);

registerNavigationRoute(
	getCacheKeyForURL('/index.html')
);

registerRoute(
	/\/favicons\//,
	new StaleWhileRevalidate()
);

registerRoute(
	/^https:\/\/api\.openweathermap\.org/,
	new NetworkFirst({
		cacheName:             'openweathermap',
		networkTimeoutSeconds: 10
	})
);
