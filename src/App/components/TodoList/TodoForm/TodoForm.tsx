import React, {
	FormEvent,
	ChangeEvent,
	PureComponent
 } from 'react';
import stylesheet from './TodoForm.st.css';

interface IProps {
	onSubmit?(value: string);
}

interface IState {
	value: string;
}

export default class TodoForm extends PureComponent<IProps, IState> {

	state = {
		value: ''
	};

	constructor(props) {

		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	render() {

		const {
			value
		} = this.state;

		return (
			<form
				{...stylesheet('root', {}, this.props)}
				onSubmit={this.onSubmit}
			>
				<input
					{...stylesheet('input')}
					type='text'
					onChange={this.onChange}
					value={value}
				/>
				<button
					{...stylesheet('button')}
				>
					add
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

		this.setState(() => ({
			value: ''
		}));
	}

	onChange(event: ChangeEvent<HTMLInputElement>) {

		const {
			value: nextValue
		} = event.target;

		this.setState(() => ({
			value: nextValue
		}));
	}
}
