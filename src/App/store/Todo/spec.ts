import createStore from '../';
import { TodoSegment } from './register';
import TodoItem from '~/models/TodoItem';

describe('Store', () => {

	describe('Todo Segment', () => {

		const store = createStore();

		beforeAll(() => {
			return store.loadSegment(TodoSegment, true);
		});

		it('should add item', () => {

			expect(store.state.todo.todos.toJS()).toEqual([]);

			const value = TodoItem({
				id: '123',
				text: 'test text'
			});

			store.actions.todo.add(value);

			expect(store.state.todo.todos.toJS()).toEqual([
				value.toJS()
			]);

		});

		it('should edit item', () => {

			store.actions.todo.edit({
				id: '123',
				text: 'edit text'
			});

			expect(store.state.todo.todos.toJS()).toEqual([
				{
					id: '123',
					text: 'edit text'
				}
			]);
		});

		it('remove todo', () => {

			store.actions.todo.remove(0);

			expect(store.state.todo.todos.toJS()).toEqual([]);
		});
	});
});
