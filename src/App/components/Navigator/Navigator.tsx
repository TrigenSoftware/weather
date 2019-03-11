import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stylesheet from './Navigator.st.css';

class Navigator extends Component {
	render() {
		return (
			<div {...stylesheet('root', {}, this.props)}>
				<Link to='/'>
					Home
                </Link>
				<Link to='/weather'>
					Weather
                </Link>
				<Link to='/todo'>
					Todo
                </Link>
			</div>
		);
	}
}

export default Navigator;
