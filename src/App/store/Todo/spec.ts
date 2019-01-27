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

			expect(store.state.todo.items.toJS()).toEqual([]);

			const value = TodoItem({
				id: '123',
				text: 'test text'
			});

			store.actions.todo.add(value);

			expect(store.state.todo.items.toJS()).toEqual([
				value.toJS()
			]);

		});

		it('should edit item', () => {

			const value = TodoItem({
				id: '123',
				text: 'test text'
			});

			store.actions.todo.edit(value);

			expect(store.state.todo.items.toJS()).toEqual([
				value.toJS()
			]);
		});

		it('should remove item', () => {

			store.actions.todo.remove('123');

			expect(store.state.todo.items.toJS()).toEqual([]);
		});
	});
});
