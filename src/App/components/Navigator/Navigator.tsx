import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stylesheet from './Navigator.st.css';

class Navigator extends Component {
	render() {
		return (
			<ul {...stylesheet('root', {}, this.props)}>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/weather'>Weather</Link></li>
				<li><Link to='/todo'>Todo</Link></li>
			</ul>
		);
	}
}

export default Navigator;
