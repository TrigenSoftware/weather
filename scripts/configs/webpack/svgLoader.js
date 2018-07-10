import path from 'path';
import update from 'immutability-helper';
import findIndex from '../../helpers/findIndex';

const cwd = process.cwd();

export function base(config) {
	return update(config, {
		module: {
			rules: { $push: [{
				test: /\.svg$/,
				use:  [{
					loader:  'svg-sprite-loader',
					options: {
						runtimeGenerator: path.join(cwd, 'scripts/helpers/svgToComponent.js'),
						runtimeOptions:   {
							iconModule: path.join(cwd, 'scripts/helpers/IconComponent.js')
						}
					}
				}]
			}] }
		}
	});
}

export function dev(config) {
	return config;
}

export function build(config) {

	const { rules } = config.module;

	return update(config, {
		module:  {
			rules: {
				[findIndex('test', '/\\.svg$/', rules)]: {
					use: { $push: ['svgo-loader'] }
				}
			}
		}
	});
}
