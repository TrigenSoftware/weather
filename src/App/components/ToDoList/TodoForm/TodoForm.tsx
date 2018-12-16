import React, {
	FormEvent,
	ChangeEvent,
	PureComponent
 } from 'react';
import stylesheet from './TodoForm.st.css';

interface IState {
	value: string;
}

interface IProps {
	onSubmit?();
}

export default class TodoForm extends PureComponent<IProps, IState> {
	

	state = {
		value: ''
	};

	constructor(props) {
		super(props);
		this.onSubmit = this.props.onSubmit.bind(this)
	}

	render() {
	
		return (
			<form
				{...stylesheet('root', {}, this.props)}
			>
				<input 
					type='text'
					value={this.state.value}
					onChange={this.onChange}
				/>
				<button 
				type='button'
				onClick={this.onSubmit}
				>
					add
				</button>
			</form>
		);
	}

	onSubmit(event: FormEvent){

		event.preventDefault();

		const {
			onSubmit
		} = this.props;

		if (typeof onSubmit === 'function'){
			onSubmit();
		}
	}

	onChange(event: ChangeEvent<HTMLInputElement>) {
		this.setState(() => ({
			value: event.target.value
		}));
	}
}
