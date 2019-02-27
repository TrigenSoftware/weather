import React, { PureComponent, ReactElement, Children } from 'react';
import Menu, { MenuItem } from '@flexis/ui/components/Menu';
import stylesheet from './Navigator.st.css';

interface IProps {
	children: ReactElement<any>[];
}

export default class Navigator extends PureComponent<IProps> {

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<Menu
				{...stylesheet('root', {}, props)}
			>
				{Children
					.toArray(children)
					.filter(Boolean)
					.map((link, i) => (
						<MenuItem key={i}>
						{link}
						</MenuItem>
					))}
			</Menu>
		);
	}
}
