import Store from '@flexis/redux';
import {
	IActions
} from '../types';
import CITIES from '../cities';

export const WeatherSegment = Symbol('weather');

async function loadWeatherSegmentConfig() {

	const {
		WeatherReducer,
		WeatherActions
	} = await import('./');

	return {
		reducer: WeatherReducer,
		actions: WeatherActions
	};
}

async function loadInitialWeatherData(store: Store<any, IActions>) {

	const {
		setCity,
		loadWeatherInfo
	} = store.actions.weather;

	setCity(CITIES[0]);
	await loadWeatherInfo();
}

export function registerWeatherSegment(store: Store) {
	store.registerSegment(
		WeatherSegment,
		loadWeatherSegmentConfig,
		loadInitialWeatherData
	);
}
