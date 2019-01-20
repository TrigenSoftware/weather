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
		const { todos } = state;
		const index = todos.findIndex(_ => _.id === id);
		const nexItem = todos.get(index).set('text', text);

		return state.set(
			'todos',
			todos.set(index, nexItem)
		);
	}

	remove(state: TodoState, { payload }: IRemoveTodoAction) {
		return state.set(
			'todos',
			state.todos.remove(payload)
		);
	}
}
