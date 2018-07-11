import React, {
	ReactElement,
	PureComponent,
	Children,
	cloneElement
} from 'react';
import stylesheet from './WeatherList.st.css';

interface IProps {
	children: ReactElement<any>[];
}

export default class WeatherList extends PureComponent<IProps> {

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<ul
				{...stylesheet('root', {}, props)}
			>
				{Children.map(children, (child: ReactElement<any>, i) => (
					<li
						key={i}
						{...stylesheet('item')}
					>
						{cloneElement(child, {
							size: 'sm'
						})}
					</li>
				))}
			</ul>
		);
	}
}
