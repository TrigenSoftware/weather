import React, { Children, Component } from 'react';
import Menu from '@flexis/ui/components/Menu';
import { MenuItem } from '@flexis/ui/components/Menu/MenuItem';

class Navigator extends Component {

	render() {

		const { children } = this.props;

		return (
			<Menu>
				{children && Children.map(children, (child, i) =>
				(
					<MenuItem key={i}>
						{child}
					</MenuItem>)
				)}
			</Menu>
		);
	}
}

export default Navigator;
