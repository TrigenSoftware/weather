import React, {
	FormEvent,
	PureComponent
} from 'react';
import stylesheet from './TodoListItem.st.css';
import Button from '~/components/Button';
import Input from '~/components/Input';

interface IProps {
	id: string;
	value: string;
}

interface IPrivateProps extends IProps {
	onSubmit?(id: string, value: string);
	onDelete?(id: string);
}

interface IState {
	originalValue: string;
	value: string;
}

export class PrivateTodoListItem<TProps extends IPrivateProps> extends PureComponent<TProps, IState> {

	static getDerivedStateFromProps(
		{ value }: IProps,
		{ originalValue: prevOriginalValue }: IState
	) {

		if (value !== prevOriginalValue) {
			return {
				originalValue: value,
				value
			};
		}

		return null;
	}

	constructor(props) {

		super(props);

		const value = this.props.value || '';

		this.state = {
			originalValue: value,
			value
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	render() {

		const {
			originalValue,
			value
		} = this.state;
		const valueWasChanged = value !== originalValue;

		return (
			<form
				onSubmit={this.onSubmit}
				{...stylesheet('root', {}, this.props)}
			>
				<Input
					{...stylesheet('input')}
					type='text'
					onChange={this.onChange}
					value={value}
				/>
				{valueWasChanged && (
					<Button
						{...stylesheet('button')}
					>
						Save
					</Button>
				)}
				<Button
					{...stylesheet('button')}
					type='button'
					onClick={this.onDelete}
				>
					Delete
				</Button>
			</form>
		);
	}

	private onSubmit(event: FormEvent) {

		event.preventDefault();

		const {
			onSubmit,
			id
		} = this.props;
		const {
			value
		} = this.state;

		if (typeof onSubmit === 'function') {
			onSubmit(id, value);
		}
	}

	private onDelete() {

		const {
			onDelete,
			id
		} = this.props;

		if (typeof onDelete === 'function') {
			onDelete(id);
		}
	}

	private onChange(value: string) {

		this.setState(() => ({
			value
		}));
	}
}

type TodoListItem = PrivateTodoListItem<IProps>;

const TodoListItem = PrivateTodoListItem;

export default TodoListItem;
