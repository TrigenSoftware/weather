import { Reducer } from '@flexis/redux';
import {
	TodoState,
	IAddTodoAction,
	IEditTodoAction,
	IRemoveTodoAction
} from './Todo.types';

export class TodoReducer extends Reducer {

	static namespace = 'todo';

	add(state: TodoState, { payload }: IAddTodoAction) {
		return state.set(
			'items',
			state.items.push(payload)
		);
	}

	edit(state: TodoState, { payload }: IEditTodoAction) {

		const {
			id,
			text
		} = payload;
		const { items } = state;
		const index = items.findIndex(_ => _.id === id);
		const nextItem = items.get(index).set('text', text);

		return state.set(
			'items',
			items.set(index, nextItem)
		);
	}

	remove(state: TodoState, { payload }: IRemoveTodoAction) {

		const id = payload;
		const { items } = state;
		const index = items.findIndex(_ => _.id === id);

		return state.set(
			'items',
			items.remove(index)
		);
	}
}
