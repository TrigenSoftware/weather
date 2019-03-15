import React, {
	FormEvent,
	PureComponent
 } from 'react';
import stylesheet from './TodoListForm.st.css';
import Button from '~/components/Button';
import Input from '~/components/Input';

interface IProps {
	onSubmit?(value: string);
}

interface IState {
	value: string;
}

export default class TodoListForm extends PureComponent<IProps, IState> {

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
				<Input
					{...stylesheet('input')}
					type='text'
					onChange={this.onChange}
					value={value}
				/>
				<Button
					{...stylesheet('button')}
				>
					Add
				</Button>
			</form>
		);
	}

	private onSubmit(event: FormEvent) {

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

	private onChange(value: string) {

		this.setState(() => ({
			value
		}));
	}
}
