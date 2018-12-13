import React, {
	FormEvent,
	ChangeEvent,
	PureComponent
} from 'react';
import stylesheet from './TodoItem.st.css';

interface IProps {
	value: string;
	onSubmit?(value: string);
	onDelete?();
}

interface IState {
	value: string;
}

export default class TodoItem extends PureComponent<IProps, IState> {

	static getDerivedStateFromProps(
		{ value }: IProps,
		{ value: prevValue }: IState
	): IState {

		if (prevValue === value) {
			return null;
		}

		return {
			value
		};
	}

	state = {
		value: ''
	};

	constructor(props) {

		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	render() {
		const {
			value
		} = this.state;
		const {
			value: originalValue
		} = this.props;
		const valueWasChanged = value !== originalValue;

		return (
			<form
				onSubmit={this.onSubmit}
				{...stylesheet('root', {}, this.props)}
			>
				<input
					type='text'
					onChange={this.onChange}
					value={value}
				/>
				{valueWasChanged && (
					<button>
						Save
					</button>
				)}
				<button
					type='button'
					onClick={this.onDelete}
				>
					delete
				</button>
			</form>
		);
	}

	onSubmit(event: FormEvent) {

		event.preventDefault();

		const {
			onSubmit
		} = this.props;
		const {
			value
		} = this.state;

		if (typeof onSubmit === 'function') {
			onSubmit(value);
		}
	}

	onDelete() {

		const {
			onDelete
		} = this.props;

		if (typeof onDelete === 'function') {
			onDelete();
		}
	}

	onChange(event: ChangeEvent<HTMLInputElement>) {
		this.setState(() => ({
			value: event.target.value
		}));
	}
}
