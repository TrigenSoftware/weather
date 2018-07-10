import path from 'path';
import update from 'immutability-helper';
import findIndex from '../../helpers/findIndex';

const cwd = process.cwd();

export function base(config) {
	return update(config, {
		module: {
			rules: { $push: [{
				test:    /\/sw\.js$/,
				exclude: /node_modules/,
				loader:  'service-worker-loader',
				options: {
					filename:   '[name].js',
					outputPath: path.join(cwd, 'build')
				}
			}] }
		}
	});
}

export function dev(config) {
	return config;
}

export function build(config) {
	return update(config, {
		module: {
			rules: {
				[findIndex('loader', 'service-worker-loader', config.module.rules)]: {
					options: {
						filename: { $set: '[name].[chunkhash].js' }
					}
				}
			}
		}
	});
}
