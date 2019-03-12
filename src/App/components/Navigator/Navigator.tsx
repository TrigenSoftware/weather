import React, {
	Children,
	Component
} from 'react';
import Menu, {
	MenuItem
} from '@flexis/ui/components/Menu';
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
