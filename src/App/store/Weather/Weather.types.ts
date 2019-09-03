import {
	Record,
	List
} from 'immutable';
import WeatherData from '~/models/WeatherData';

/**
 * Weather state.
 */

export interface IWeatherStateProps {
	city: string;
	currentWeather: WeatherData;
	weatherForecast: List<WeatherData>;
}

type WeatherState = ReturnType<Record.Factory<IWeatherStateProps>>;

const WeatherState = Record<IWeatherStateProps>({
	city:            null,
	currentWeather:  null,
	weatherForecast: List()
});

export {
	WeatherState
};

/**
 * SetCity action.
 */

export type SetCityPayload = string;

export interface ISetCityAction {
	payload: SetCityPayload;
}

/**
 * SetWeatherInfo action.
 */

export type SetWeatherInfoPayload = IWeatherStateProps;

export interface ISetWeatherInfoAction {
	payload: SetWeatherInfoPayload;
}
