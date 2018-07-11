import { utc as Utc } from 'moment';
import axios from '../axios';

export interface IWeatherData {
	date: string;
	temp: number;
	description: string;
	humidity: number;
	clouds: number;
	precipitation: number;
}

function weatherDataFromResponseData(responseData): IWeatherData {
	return {
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
	};
}

export async function getCurrentWeather(city: string): Promise<IWeatherData> {

	const { data: allWeatherData } = await axios.get('/weather', {
		params: {
			q: city
		}
	});

	return weatherDataFromResponseData(allWeatherData);
}

export async function getWeatherForecast(city: string) {

	const { data: allWeatherForecast } = await axios.get('/forecast', {
		params: {
			q: city
		}
	});
	const forecast: IWeatherData[] = [];
	const datesCache: string[] = [];

	allWeatherForecast.list.forEach((item) => {

		const [dateId] = item.dt_txt.split(' ');

		if (datesCache.includes(dateId)) {
			return;
		}

		datesCache.push(dateId);
		forecast.push(weatherDataFromResponseData(item));
	});

	return forecast;
}
