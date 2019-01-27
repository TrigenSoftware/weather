import Store from '@flexis/redux';
import createLoguxCreator from '@logux/redux/create-logux-creator';
import {
	State,
	IActions
} from './types';
import { registerWeatherSegment } from './Weather/register';
import { registerTodoSegment } from './Todo/register';

const {
	__REDUX_DEVTOOLS_EXTENSION__
} = global as any;

export default function createStore() {

	const createStore = createLoguxCreator({
		credentials: 'credentials',
		subprotocol: '1.0.0',
		server: 'ws://127.0.0.1:1337',
		userId: 'userId'
	});
	const store = new Store<State, IActions>({
		storeCreator: createStore,
		state: State(),
		enhancer: __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
	});

	registerWeatherSegment(store);
	registerTodoSegment(store);

	return store;
}
