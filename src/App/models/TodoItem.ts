import { Record } from 'immutable';

export interface ITodoItemProps {
	id: number;
	text: string;
}

type TodoItem = ReturnType<Record.Factory<ITodoItemProps>>;

const TodoItem = Record<ITodoItemProps>({
	id: null,
	text: null
});

export default TodoItem;
