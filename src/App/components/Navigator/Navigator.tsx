import React, { Children, Component } from 'react';
import Menu from '@flexis/ui/components/Menu';
import { MenuItem } from '@flexis/ui/components/Menu/MenuItem';

class Navigator extends Component {

	render() {

		const {
			children
		} = this.props;

		return (
			<Menu>
				{children && Children.map(this.props.children, (child, i) => {
					if (!children[i].props.children) {
						return null;
					}
					return (
						<MenuItem key={i}>
							{child}
						</MenuItem>);
				})}
			</Menu>
		);
	}
}

export default Navigator;
