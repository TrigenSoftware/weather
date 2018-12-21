import React, {
	PureComponent
} from 'react';
import stylesheet from './TodoList.st.css';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

type ItemId = string;

interface IItem {
	id: ItemId;
	text: string;
}

interface IProps {
	items: IItem[];
	onChange?(id: ItemId, text: string);
	onDelete?(id: ItemId);
	onAdd?(id: ItemId, text: string);
}

interface IState {
	value: string;
}

export default class TodoList extends PureComponent<IProps, IState> {

	constructor(props) {

		super(props);

		this.onChange = this.onChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onAdd = this.onAdd.bind(this);
	}

	render() {

		const {
			items
		} = this.props;

		return (
			<div
				{...stylesheet('root', {}, this.props)}
			>
				<TodoForm onSubmit={this.onAdd}/>
				{items.map(({ id, text }) => (
					<TodoItem
						key={id}
						value={text}
						onSubmit={this.onChange(id)}
						onDelete={this.onDelete(id)}
					/>
				))}
			</div>
		);
	}

	onChange(id: ItemId) {
		return (value: string) => {
			this.props.onChange(id, value);
		};
	}

	onDelete(id: ItemId) {
		return () => {
			this.props.onDelete(id) ;
		};
	}

	onAdd() {
		return (value: string) => {
			this.props.onAdd(String(Date.now()), value);
		};
	}

}
