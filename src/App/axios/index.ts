import Axios, { CancelTokenSource } from 'axios';
import Qs from 'qs';

const { CancelToken } = Axios;

export default Axios.create({
	baseURL:          'https://api.openweathermap.org/data/2.5/',
	responseType:     'json',
	paramsSerializer: params => Qs.stringify({
		APPID: process.env.OPENWEATHER_APPID,
		lang:  'en',
		units: 'metric',
		mode:  'json',
		...params
	}, { indices: false })
});

const cancelTokens = new Map<any, CancelTokenSource>();

export function getCancelToken(key: any) {

	if (cancelTokens.has(key)) {
		cancelTokens.get(key).cancel();
	}

	const source = CancelToken.source();

	cancelTokens.set(key, source);

	return source.token;
}
