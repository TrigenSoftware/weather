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
				{...stylesheet('root', {}, this.props)}
				onSubmit={this.onSubmit}
			>
				<input
					type='text'
					onChange={this.onChange}
					value={value}
				/>
				<button>
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
	}

	onChange(event: ChangeEvent<HTMLInputElement>) {
		this.setState(() => ({
			value: event.target.value
		}));
	}
}
