import {
	Record,
	List
} from 'immutable';
import TodoItem from '~/models/TodoItem';

/**
 * Weather state.
 */

export interface ITodoStateProps {
	todos: List<TodoItem>;
}

type TodoState = ReturnType<Record.Factory<ITodoStateProps>>;

const TodoState = Record<ITodoStateProps>({
	todos: List()
});

export { TodoState };

/**
 * AddTodo action.
 */

export type AddTodoPayload = TodoItem;

export interface IAddTodoAction {
	payload: AddTodoPayload;
}

/**
 * EditTodo action.
 */

interface IEditTodoPayload {
	id: number;
	text: string;
}

export type EditTodoPayload = IEditTodoPayload;

export interface IEditTodoAction {
	payload: EditTodoPayload;
}

/**
 * RemoveTodo action.
 */

export type RemoveTodoPayload = number;

export interface IRemoveTodoAction {
	payload: RemoveTodoPayload;
}
