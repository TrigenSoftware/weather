import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import update from 'immutability-helper';
import { decamelize } from 'humps';
import findIndex from '../../helpers/findIndex';
import applyReducers from '../../helpers/applyReducers';
import addDevScripts from '../../helpers/addDevScripts';
import htmlminConfig from '../htmlmin';
import * as stylableLoader from './stylableLoader';
import * as svgLoader from './svgLoader';
import * as swLoader from './swLoader';

const cwd = process.cwd();
const babelrc = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));
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
} = {}) {
	return applyReducers(baseLoaders, {
		entry:   {
			index: path.join(cwd, 'src/App/index.tsx')
		},
		output:  {
			path:             path.join(cwd, 'build'),
			filename:         '[name].js',
			chunkFilename:    '[name].js',
			hashDigestLength: 10,
			publicPath:       './'
		},
		resolve: {
			extensions: [
				'.js',
				'.jsx',
				'.json',
				'.ts',
				'.tsx'
			],
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
				test:    /\.jsx?$/,
				exclude: /node_modules/,
				use:     [
					{
						loader:  'babel-loader',
						options: babelOptions
					},
					{
						loader:  'eslint-loader',
						options: {
							emitError: true
						}
					}
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
								'!globals.d.ts'
							],
							useBabel:             false,
							babelCore:            '@babel/core',
							babelOptions
						}
					},
					{
						loader:  'tslint-loader',
						options: {
							emitErrors: true,
							typeCheck:  true
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
				[findIndex('test', '/\\.jsx?$/', rules)]: {
					use: {
						0: {
							options: {
								plugins: { $push: [
									'react-hot-loader/babel'
								] }
							}
						}
					}
				},
				[findIndex('test', '/\\.tsx?$/', rules)]: {
					use: {
						0: {
							options: { babelOptions: {
								plugins: { $push: [
									'react-hot-loader/babel'
								] }
							} }
						}
					}
				}
			}
		},
		optimization: { $set: {
			noEmitOnErrors: true
		} },
		plugins: { $push: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlPlugin({
				template: 'src/index.html'
			})
		] }
	}));
}

export function build(params) {

	const config = base(params);
	const { rules } = config.module;

	return applyReducers(buildLoaders, update(config, {
		output:       {
			filename:      { $set: '[name].[chunkhash].js' },
			chunkFilename: { $set: '[name].[chunkhash].js' }
		},
		mode:         { $set: 'production' },
		module:  {
			rules: {
				[findIndex('test', '/\\.jsx?$/', rules)]: {
					use: {
						1: {
							options: {
								failOnError: { $set: true }
							}
						}
					}
				},
				[findIndex('test', '/\\.tsx?$/', rules)]: {
					use: {
						1: {
							options: {
								failOnHint: { $set: true }
							}
						}
					}
				}
			}
		},
		optimization: { $set: {
			runtimeChunk: 'single',
			splitChunks:  {
				name:        true,
				cacheGroups: {
					default: {
						chunks:     'initial',
						minChunks:  2
					},
					vendor: {
						name:     'vendor',
						chunks:   'initial',
						priority: 10,
						enforce:  true,
						test(module) {

							if (module.resource && !/\.(j|t)sx?$/.test(module.resource)) {
								return false;
							}

							return module.context
								&& module.context.includes('node_modules')
								&& !module.context.includes('@flexis/ui/components'); // sad hack
						}
					}
				}
			}
		} },
		plugins:      { $push: [
			new CleanPlugin('build', { root: cwd }),
			new webpack.HashedModuleIdsPlugin(),
			new HtmlPlugin({
				template: 'src/index.html',
				minify:   htmlminConfig
			})
		] }
	}));
}
