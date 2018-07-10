import {
	AllHTMLAttributes,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';

interface ISelfProps {
    glyph?: boolean;
	width?: number;
	height?: number;
}

export declare type IProps = ISelfProps & AllHTMLAttributes<SVGElement>;

export declare function setIconClassName(className: string);

export default class Icon extends PureComponent<IProps> {

    static propTypes: {
        glyph: PropTypes.Requireable<any>;
        width: PropTypes.Requireable<any>;
        height: PropTypes.Requireable<any>;
	};

    static defaultProps: {
        glyph: boolean;
		width: number;
		height: number;
	};

    render(): JSX.Element;
}
