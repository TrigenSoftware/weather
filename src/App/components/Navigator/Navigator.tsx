import React, { Children, Component } from 'react';
import Menu from '@flexis/ui/components/Menu';
import { MenuItem } from '@flexis/ui/components/Menu/MenuItem';
import stylesheet from './Navigator.st.css';

export default class Navigator extends Component {

	render() {

		const {
			children
		} = this.props;

		return (
			<Menu {...stylesheet('root', {}, this.props)}>
				{Children.map(children, child => child && (
					<MenuItem
						{...stylesheet('item')}
					>
						{child}
					</MenuItem>
				))}
			</Menu>
		);
	}
}
