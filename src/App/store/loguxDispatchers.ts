import { CustomDispatcher } from '@flexis/redux';
import { AnyAction, Dispatch } from 'redux';

interface IMeta {
	reasons?: string[];
}

type ILoguxDispatcher = (action: AnyAction, meta?: IMeta) => void;

interface ILoguxDispatch extends Dispatch {
	local: ILoguxDispatcher;
	crossTab: ILoguxDispatcher;
	sync: ILoguxDispatcher;
}

export function LocalDispatcher(meta?: IMeta) {
	return CustomDispatcher((store, action) => {
		(store.dispatch as ILoguxDispatch).local(action, meta);
	});
}

export function CrossTabDispatcher(meta?: IMeta) {
	return CustomDispatcher((store, action) => {
		(store.dispatch as ILoguxDispatch).crossTab(action, meta);
	});
}

export function SyncDispatcher(meta?: IMeta) {
	return CustomDispatcher((store, action) => {
		(store.dispatch as ILoguxDispatch).sync(action, meta);
	});
}
