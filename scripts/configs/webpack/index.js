import path from 'path';
import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import BabelMinifyPlugin from 'babel-minify-webpack-plugin';
import update from 'immutability-helper';
import { decamelize } from 'humps';
import findIndex from '../../helpers/find-index';
import applyReducers from '../../helpers/applyReducers';
import addDevScripts from '../../helpers/addDevScripts';
import babelrc from '../../../.babelrc';
import htmlminConfig from '../htmlmin';
import * as stylableLoader from './stylableLoader';
import * as svgLoader from './svg-loader';
import * as swLoader from './sw-loader';

const cwd = process.cwd();
const loaders = [
	stylableLoader,
	svgLoader,
	swLoader
];
const baseLoaders = loaders.map(_ => _.base);
const devLoaders = loaders.map(_ => _.dev);
const buildLoaders = loaders.map(_ => _.build);
const babelOptions = {
	...babelrc,
	babelrc: false
};

function base({
	envify = {}
}) {
	return applyReducers(baseLoaders, {
		entry:   {
			main: path.join(cwd, 'src/App/index.ts')
		},
		output:  {
			path:             path.join(cwd, 'build', 'app'),
			filename:         '[name].js',
			chunkFilename:    '[name].js',
			hashDigestLength: 10,
			publicPath:       '/app/'
		},
		resolve: {
			alias: {
				'~': path.join(cwd, 'src/App')
			}
		},
		module:  {
			rules: [{
				test:   /\.js$/,
				parser: {
					amd: false
				}
			}, {
				test:    /\.js$/,
				exclude: /node_modules/,
				use:     [
					{
						loader:  'babel-loader',
						options: babelOptions
					},
					'eslint-loader'
				]
			}, {
				test:    /\.tsx?$/,
				exclude: /node_modules/,
				use:     [
					{
						loader:  'awesome-typescript-loader',
						options: {
							forceIsolatedModules: true,
							useCache:             true,
							reportFiles:          [
								'src/**/*.{ts,tsx}',
								'!src/globals.d.ts'
							],
							useBabel:             true,
							babelCore:            '@babel/core',
							babelOptions
						}
					},
					{
						loader:  'tslint-loader',
						options: {
							configFile: './tsconfig.json'
						}
					}
				]
			}]
		},
		plugins: [
			new webpack.EnvironmentPlugin(Object.keys(process.env)),
			new webpack.DefinePlugin(
				Object.entries(envify).reduce((env, [key, value]) => ({
					...env,
					[`process.env.${decamelize(key).toUpperCase()}`]: JSON.stringify(value)
				}), {})
			)
		]
	});
}

export function dev(params) {

	const config = base(params);
	const { rules } = config.module;
	const devScripts = [
		'webpack-hot-middleware/client?http://localhost:3000/&reload=true'
	];

	return applyReducers(devLoaders, update(config, {
		entry:   { $apply: entry => addDevScripts(entry, devScripts) },
		mode:    { $set: 'development' },
		module:  {
			rules: {
				[findIndex('test', '/\\.js$/', rules)]: {
					use: { 0: {
						options: {
							plugins: { $push: [
								'react-hot-loader/babel'
							] }
						}
					} }
				},
				[findIndex('test', '/\\.tsx?$/', rules)]: {
					use: { 0: {
						options: { babelOptions: {
							plugins: { $push: [
								'react-hot-loader/babel'
							] }
						} }
					} }
				}
			}
		},
		optimization: { $set: {
			noEmitOnErrors: true
		} },
		plugins: { $push: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlPlugin({
				template: 'src/index.html',
				inject:   'head'
			})
		] }
	}));
}

export function build(params) {

	const config = base(params);

	return applyReducers(buildLoaders, update(config, {
		output:       {
			filename:      { $set: '[name].[chunkhash].js' },
			chunkFilename: { $set: '[name].[chunkhash].js' }
		},
		mode:         { $set: 'production' },
		optimization: { $set: {
			runtimeChunk: 'single',
			splitChunks:  {
				name:        true,
				cacheGroups: {
					vendor: {
						priority: -10,
						test(chunk) {

							// if (module.resource && !/\.js$/.test(module.resource)) {
							// 	return false;
							// }

							// return module.context
							// 	&& module.context.includes('node_modules')
							// 	&& !module.context.includes('@flexis/ui/components'); // sad hack

							console.log(chunk);
							return true;
						}
					},
					default: {
						priority:           -20,
						minChunks:          2,
						reuseExistingChunk: true
					}
				}
			}
		} },
		plugins:      { $push: [
			new webpack.HashedModuleIdsPlugin(),
			new BabelMinifyPlugin(),
			new HtmlPlugin({
				template: 'src/index.html',
				inject:   'head',
				minify:   htmlminConfig
			})
		] }
	}));
}
