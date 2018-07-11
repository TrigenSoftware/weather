import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const headBase = typeof document != 'undefined'
	? document.querySelector('head > base')
	: null;
const shoudlPrepandPathname = headBase && headBase.hasAttribute('href');
let iconClassName = null;

export function setIconClassName(className) {
	iconClassName = className;
}

export default class Icon extends PureComponent {

	static propTypes = {
		className: PropTypes.string,
		glyph:     PropTypes.string,
		width:     PropTypes.number,
		height:    PropTypes.number
	};

	static defaultProps = {
		className: undefined,
		glyph:     '',
		width:     undefined,
		height:    undefined
	};

	hrefListenerRemover = null;

	render() {

		const {
			className,
			glyph,
			width,
			height,
			...props
		} = this.props;

		return (
			<svg
				{...props}
				className={[className, iconClassName].filter(Boolean).join(' ')}
				style={{
					width,
					height
				}}
				data-glyph={glyph}
			>
				<use xlinkHref={`${this.getPathname()}#${glyph}`}/>
			</svg>
		);
	}

	componentDidMount() {

		if (shoudlPrepandPathname) {
			this.hrefListenerRemover = addHrefListener(() => {
				this.forceUpdate();
			});
		}
	}

	componentWillUnmount() {

		const { hrefListenerRemover } = this;

		if (shoudlPrepandPathname
			&& typeof hrefListenerRemover == 'function'
		) {
			hrefListenerRemover();
		}
	}

	// https://gist.github.com/leonderijke/c5cf7c5b2e424c0061d2
	getPathname() {

		if (shoudlPrepandPathname) {
			return `${location.pathname}${location.search}`;
		}

		return '';
	}
}

const hrefListeners = [];

function addHrefListener(listener) {
	hrefListeners.push(listener);
	return hrefListeners.splice.bind(
		hrefListeners,
		hrefListeners.indexOf(listener),
		1
	);
}

const hrefListenerTimeout = 1500;
let prevHref = location.href;

setInterval(() => {

	if (prevHref != location.href) {
		prevHref = location.href;
		hrefListeners.forEach((listener) => {
			listener();
		});
	}

}, hrefListenerTimeout);
