import React, {
	PureComponent,
	ChangeEvent
} from 'react';
import { Connect } from '@flexis/redux';
// import { hot } from 'react-hot-loader';
import {
	IWeatherStateProps,
	State,
	IActions
} from '~/store/types';
import { WeatherSegment } from '~/store/segments';
import CITIES from '~/store/cities';
import Loading from '~/components/Loading';
import Weather from '~/components/Weather';
import WeatherList from '~/components/WeatherList';
import stylesheet from './Weather.st.css';

interface IProps extends IWeatherStateProps {
	loadWeatherInfo(city: string);
}

const UPDATE_INTERVAL = 10000;

function mapStateToProps({ weather }: State): IWeatherStateProps {
	return {
		city:            weather.city,
		currentWeather:  weather.currentWeather,
		weatherForecast: weather.weatherForecast
	};
}

function mapActionsToProps({ weather }: IActions) {
	return {
		loadWeatherInfo: weather.loadWeatherInfo
	};
}

export default Connect({
	dependsOn: WeatherSegment,
	loading:   Loading,
	mapStateToProps,
	mapActionsToProps
})(
class WatherContainer extends PureComponent<IProps> {

	updateIntervalId: any = null;

	constructor(props) {

		super(props);

		this.onCityChange = this.onCityChange.bind(this);
	}

	render() {

		const {
			currentWeather,
			weatherForecast
		} = this.props;

		if (!currentWeather) {
			return null;
		}

		return (
			<main
				{...stylesheet('root')}
			>
				{this.citySelect()}
				<Weather
					{...stylesheet('mainWeather')}
					{...currentWeather.toJS()}
				/>
				<WeatherList
					{...stylesheet('mainList')}
				>
					{weatherForecast.map((weatherInfo, i) => (
						<Weather
							key={i}
							{...weatherInfo.toJS()}
						/>
					)).toJS()}
				</WeatherList>
			</main>
		);
	}

	private citySelect() {
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
						<option key={city}>
							{city}
						</option>
					))}
				</select>
			</div>
		);
	}

	componentDidMount() {

		this.updateIntervalId = setInterval(() => {

			const { city } = this.props;

			this.props.loadWeatherInfo(city);

		}, UPDATE_INTERVAL);
	}

	componentWillUnmount() {
		clearInterval(this.updateIntervalId);
	}

	private onCityChange({ currentTarget: { value } }: ChangeEvent<HTMLSelectElement>) {
		this.props.loadWeatherInfo(value);
	}
});
