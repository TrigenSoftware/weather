import React, {
	PureComponent,
	ChangeEvent
} from 'react';
import { hot } from 'react-hot-loader';
import {
	IWeatherData,
	getCurrentWeather,
	getWeatherForecast
} from '~/api';
import Weather from '~/components/Weather';
import WeatherList from '~/components/WeatherList';
import stylesheet from './App.st.css';

interface IState {
	city: string;
	currentWeather: IWeatherData;
	weatherForecast: IWeatherData[];
}

const UPDATE_INTERVAL = 10000;
const CITIES = [
	'Novosibirsk',
	'Novokuznetsk'
];

@hot(module)
export default class App extends PureComponent<{}, IState> {

	state = {
		city:            null,
		currentWeather:  null,
		weatherForecast: []
	};

	constructor(props) {
		super(props);
		this.onCityChange = this.onCityChange.bind(this);
	}

	render() {

		const {
			currentWeather,
			weatherForecast
		} = this.state;

		if (!currentWeather) {
			return null;
		}

		return (
			<main
				{...stylesheet('root', {}, this.props)}
			>
				{this.citySelect()}
				<Weather
					{...stylesheet('mainWeather')}
					{...currentWeather}
				/>
				<WeatherList
					{...stylesheet('mainList')}
				>
					{weatherForecast.map((weatherInfo, i) => (
						<Weather
							key={i}
							{...weatherInfo}
						/>
					))}
				</WeatherList>
			</main>
		);
	}

	citySelect() {
		return (
			<div
				{...stylesheet('citySelectContainer')}
			>
				<select
					{...stylesheet('citySelect')}
					defaultValue={CITIES[0]}
					onChange={this.onCityChange}
				>
					{CITIES.map(city => (
						<option key={city}>{city}</option>
					))}
				</select>
			</div>
		);
	}

	componentDidMount() {

		this.loadWeatherInfo(CITIES[0]);

		setInterval(() => {

			const { city } = this.state;

			this.loadWeatherInfo(city);

		}, UPDATE_INTERVAL);
	}

	private onCityChange({ currentTarget: { value } }: ChangeEvent<HTMLSelectElement>) {
		this.loadWeatherInfo(value);
	}

	private async loadWeatherInfo(city: string) {

		const weatherForecast = await getWeatherForecast(city);
		const currentWeather = await getCurrentWeather(city);

		this.setState(() => ({
			city,
			currentWeather,
			weatherForecast
		}));
	}
}
