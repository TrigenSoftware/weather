import React from 'react';
import stylesheet from './Navigator.st.css';

class Navigator extends React.Component {

	render() {
		const children = this.props.children;
		return (
			<ul {...stylesheet('root', {}, this.props)}>
				{React.Children.map(children, (child, i) => <li key={i}>{child}</li>)}
			</ul>
		);
	}
}

export default Navigator;
