import React, {
	PureComponent
} from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import stylesheet from '~/components/ToDoList/TodoList.st.css';

interface IProps {
	list: string[];
	onSubmitItem?(value: string);
	onDeleteItem?();
	onSubmitForm?(value: string);
}

export default class TodoList extends PureComponent<IProps> {

	render() {

		const {
			list,
			onSubmitItem,
			onDeleteItem,
			onSubmitForm
		} = this.props;

		return (
			<div
				{...stylesheet('root', {}, this.props)}
			>
				<TodoForm onSubmit={onSubmitForm}/>
				{list.map((value, i) => (
					<TodoItem
						key={i}
						value={value}
						onSubmit={onSubmitItem}
						onDelete={onDeleteItem}
					/>
				))}
			</div>
		);
	}
}
