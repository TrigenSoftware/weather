import 'dotenv/config';
import { getCurrentWeather } from '../src/App/api';

describe('API', () => {

	describe('getCurrentWeather', () => {

		it('should get correct weather data', async () => {

			const currentWeather = await getCurrentWeather('Novosibirsk');

			expect(typeof currentWeather.date).toBe('string');
			expect(typeof currentWeather.temp).toBe('number');
			expect(typeof currentWeather.description).toBe('string');
			expect(typeof currentWeather.humidity).toBe('number');
			expect(typeof currentWeather.clouds).toBe('number');
			expect(typeof currentWeather.precipitation).toBe('number');
		});
	});
});
