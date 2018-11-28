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
			'todos',
			state.todos.push(payload)
		);
	}

	edit(state: TodoState, { payload }: IEditTodoAction) {

		const {
			id,
			text
		} = payload;

		return state.set(
			'todos',
			state.todos.set(id, text)
		);
	}

	remove(state: TodoState, { payload }: IRemoveTodoAction) {
		return state.set(
			'todos',
			state.todos.remove(payload)
		);
	}
}
