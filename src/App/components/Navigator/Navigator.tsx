import React, { PureComponent, ReactElement } from 'react';
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
   <div
    {...stylesheet('root', {}, props)}
   >
    <Menu>
        {children.map((link, i) => <MenuItem key={i}>{link}</MenuItem>)}
    </Menu>
   </div>
		);
	}
}
