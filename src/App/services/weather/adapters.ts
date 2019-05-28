import {
	utc as Utc
} from 'moment';
import WeatherData from '~/models/WeatherData';

export function weatherDataFromResponseData(responseData) {
	return WeatherData({
		date:          Utc(responseData.dt_txt).format('DD.MM.YYYY'),
		temp:          Math.round(responseData.main.temp),
		description:   responseData.weather[0].description,
		humidity:      responseData.main.humidity,
		clouds:        responseData.clouds
			? responseData.clouds.all
			: 0,
		precipitation: responseData.rain && responseData.rain['3h']
			? responseData.rain['3h']
			: (responseData.snow && responseData.snow['3h']
				? responseData.snow['3h']
				: 0)
	});
}
