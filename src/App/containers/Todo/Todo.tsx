import React, {
	PureComponent
} from 'react';
import { Connect } from '@flexis/redux';
import {
	ITodoStateProps,
	State,
	IActions,
	AddTodoPayload,
	EditTodoPayload,
	RemoveTodoPayload
} from '~/store/types';
import { TodoSegment } from '~/store/segments';
import Loading from '~/components/Loading';
import TodoList from '~/components/TodoList';
import TodoItem from '~/models/TodoItem';
import stylesheet from './Todo.st.css';

interface Iprops extends ITodoStateProps {
	add(payload: AddTodoPayload);
	change(payload: EditTodoPayload);
	remove(payload: RemoveTodoPayload);
}

function mapStateToProps({ todo }: State): ITodoStateProps {
	return {
		items: 	todo.items
	};
}

function mapActionsToProps({ todo }: IActions) {
	return {
		add: 	      todo.add,
		change:   todo.edit,
		remove: 	todo.remove
	};
}
export default Connect({
	dependsOn: TodoSegment,
	loading: Loading,
	mapStateToProps,
	mapActionsToProps
})(
class TodoContainer extends PureComponent<Iprops> {

	constructor(props) {
		super(props);
		this.onAdd = this.onAdd.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	render() {

		const {
			items
		} = this.props;

		if (!items) {
			return null;
		}

		return (
			<main
				{...stylesheet('root')}
			>
					<TodoList
							items={items.toJS()}
							onAdd={this.onAdd}
							onChange={this.onChange}
							onDelete={this.onDelete}
							{...stylesheet('mainTodo')}
					/>
			</main>
		);
	}

	onAdd(id: string, text: string) {

		const {
			add
		} = this.props;
		const value = TodoItem({
			id,
			text
		});

		add(value);
	}

	onChange(id: string, text: string) {

		const {
			change
		} = this.props;
		const value = TodoItem({
			id,
			text
		});

		change(value);
	}

	onDelete(id: string) {

		const {
			remove
		} = this.props;

		remove(id);
	}
});
