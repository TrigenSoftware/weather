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
import stylesheet from './Todo.st.css';

interface IProps extends ITodoStateProps {
	add(payload: AddTodoPayload);
	edit(payload: EditTodoPayload);
	remove(payload: RemoveTodoPayload);
}

function mapStateToProps({ todo }: State): ITodoStateProps {
	return {
		items: 	todo.items
	};
}

function mapActionsToProps({ todo }: IActions) {
	return {
		add: todo.add,
		edit: todo.edit,
		remove: todo.remove
	};
}
export default Connect({
	dependsOn: TodoSegment,
	loading: Loading,
	mapStateToProps,
	mapActionsToProps
})(
class TodoContainer extends PureComponent<IProps> {

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
					/>
			</main>
		);
	}

	onAdd(text: string) {

		const {
			add
		} = this.props;
		const id = String(Date.now());

		add({
			id,
			text
		});
	}

	onChange(id: string, text: string) {

		const {
			edit
		} = this.props;

		edit({
			id,
			text
		});
	}

	onDelete(id: string) {

		const {
			remove
		} = this.props;

		remove(id);
	}
});
