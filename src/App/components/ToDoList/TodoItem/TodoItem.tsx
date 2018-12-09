import React, { PureComponent } from 'react';
import stylesheet from './TodoItem.st.css';

interface INote {
	name: string;
}

interface IProps {
	note: INote;
}

interface IState {
	text: string;
	changed: boolean;
}

export default class TodoItem extends PureComponent<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.note.name,
			changed: false
		};
	}

	handleChangeText = (event) => {
		this.setState({
			text: event.target.value,
			changed: true
		});
	}

	onSubmit = () => {
		// action save
	}

	onDelete = () => {
		// action delete
	}

	render() {
		// @ts-ignore
		return (
			<form
				onSubmit={this.onSubmit}
				{...stylesheet('root', {}, this.props)}
			>
				<input type='text' value={this.state.text} onChange={this.handleChangeText}/>
				{this.state.changed && <input type='submit' value='Save'/>}
				<input type='button' value='del' onClick={this.onDelete}/>
			</form>
		);
	}
}
