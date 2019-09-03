import {
	Reducer
} from '@flexis/redux';
import {
	WeatherState,
	ISetCityAction,
	ISetWeatherInfoAction
} from './Weather.types';

export class WeatherReducer extends Reducer {

	static namespace = 'weather';

	setCity(state: WeatherState, { payload }: ISetCityAction) {
		return state.set('city', payload);
	}

	setWeatherInfo(state: WeatherState, { payload }: ISetWeatherInfoAction) {
		return state.merge(WeatherState(payload));
	}
}
