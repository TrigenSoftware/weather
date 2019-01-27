import {
	CrossTabDispatcher
} from '~/store/loguxDispatchers';
import {
	AddTodoPayload,
	EditTodoPayload,
	RemoveTodoPayload
} from './Todo.types';
import { TodoReducer } from './Todo.reducer';

export abstract class TodoActions extends TodoReducer.Actions {

	@CrossTabDispatcher()
	add(payload: AddTodoPayload) {}

	@CrossTabDispatcher()
	edit(payload: EditTodoPayload) {}

	@CrossTabDispatcher()
	remove(payload: RemoveTodoPayload) {}
}
