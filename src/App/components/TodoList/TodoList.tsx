import React, {
	PureComponent
} from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import stylesheet from './TodoList.st.css';

type ItemId = string;

interface IItem {
	id: ItemId;
	text: string;
}

interface IProps {
	items: IItem[];
	onAdd?(id: ItemId, text: string);
	onChange?(id: ItemId, text: string);
	onDelete?(id: ItemId);
}

interface IState {
	value: string;
}

export default class TodoList extends PureComponent<IProps, IState> {

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

		return (
			<div
				{...stylesheet('root', {}, this.props)}
			>
				<TodoForm
					onSubmit={this.onAdd}
				/>
				{items.map(({
					id,
					text
				}) => (
					<TodoItem
						key={id}
						onSubmit={this.onChange(id)}
						onDelete={this.onDelete(id)}
						value={text}
					/>
				))}
			</div>
		);
	}

	onAdd(value: string) {

		const {
			onAdd
		} = this.props;

		if (typeof onAdd === 'function') {

			const itemId = String(Date.now());

			onAdd(itemId, value);
		}
	}

	onChange(id: ItemId) {
		return (value: string) => {

			const {
				onChange
			} = this.props;

			if (typeof onChange === 'function') {
				onChange(id, value);
			}
		};
	}

	onDelete(id: ItemId) {
		return () => {

			const {
				onDelete
			} = this.props;

			if (typeof onDelete === 'function') {
				onDelete(id);
			}
		};
	}
}