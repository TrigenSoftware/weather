import { Record } from 'immutable';

export interface ITodoItemDataProps {
	id: string;
	text: number;
}

type TodoItemModel = ReturnType<Record.Factory<ITodoItemDataProps>>;

const TodoItemModel = Record<ITodoItemDataProps>({
	id: null,
	text: null
});

export default TodoItemModel;
