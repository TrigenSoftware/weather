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

		this.onSubmit = this.props.onSubmit.bind(this);
	}

	render() {

		const {
			value
		} = this.state;

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
				<button type='submit'>
					add
				</button>
			</form>
		);
	}

	onSubmit(event: FormEvent) {

		event.preventDefault();

		const {
			value
		} = this.state;
		const {
			onSubmit
		} = this.props;

		if (typeof onSubmit === 'function') {
			onSubmit(value);
		}
	}

	onChange(event: ChangeEvent<HTMLInputElement>) {
		this.setState(() => ({
			value: event.target.value
		}));
	}
}
