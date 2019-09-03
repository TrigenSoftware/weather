import {
	WeatherState,
	SetCityPayload,
	SetWeatherInfoPayload
} from './Weather.types';
import {
	getCurrentWeather,
	getWeatherForecast
} from '~/services/weather';
import {
	WeatherReducer
} from './Weather.reducer';

export abstract class WeatherActions extends WeatherReducer.Actions<WeatherState> {

	async loadWeatherInfo(city?: string) {

		const targetCity = city || this.state.city;
		const weatherForecast = await getWeatherForecast(targetCity);
		const currentWeather = await getCurrentWeather(targetCity);

		this.setWeatherInfo({
			city: targetCity,
			currentWeather,
			weatherForecast
		});
	}

	abstract setCity(payload: SetCityPayload);
	abstract setWeatherInfo(payload: SetWeatherInfoPayload);
}
