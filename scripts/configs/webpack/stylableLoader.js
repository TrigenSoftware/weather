import StylablePlugin from 'stylable-webpack-plugin';
import postcss from 'postcss';
import stylelint from 'stylelint';
import postcssReporter from 'postcss-reporter';
import autoprefixer from 'autoprefixer';
import update from 'immutability-helper';
import findIndex from '../../helpers/findIndex';

const autoprefixProcessor = postcss([
	autoprefixer()
]);
const lintProcessor = postcss([
	stylelint(),
	postcssReporter({
		clearReportedMessages: true
	})
]);

export function base(config) {
	return update(config, {
		module: {
			rules: { $push: [{
				test:    /\.(eot|woff|ttf|jpg|webp|png|gif)$/,
				loader:  'file-loader',
				options: {
					name: '[name].[hash:10].[ext]'
				}
			}] }
		}
	});
}

export function dev(config) {

	const stylablePlugin = new StylablePlugin({
		rootScope:      false,
		transformHooks: {
			postProcessor(stylableResult) {

				const { meta } = stylableResult;

				lintProcessor.process(meta.ast, { from: meta.source })
					.then(() => {})
					.catch((error) => {
						console.error(error.message);
						process.exit(2); // eslint-disable-line
					});
				autoprefixProcessor.process(meta.outputAst).sync();

				return stylableResult;
			}
		}
	});

	return update(config, {
		plugins: { $push: [stylablePlugin] }
	});
}

export function build(config) {

	const stylablePlugin = new StylablePlugin({
		filename:       '[name].[chunkhash].css',
		rootScope:      false,
		outputCSS:      true,
		includeCSSInJS: false,
		transformHooks: {
			postProcessor(stylableResult) {

				const { meta } = stylableResult;

				lintProcessor.process(meta.ast, { from: meta.source })
					.then(() => {})
					.catch((error) => {
						console.error(error.message);
						process.exit(2); // eslint-disable-line
					});
				autoprefixProcessor.process(meta.outputAst).sync();

				return stylableResult;
			}
		},
		optimize: {
			removeUnusedComponents:   true,
			removeComments:           true,
			removeStylableDirectives: true,
			classNameOptimizations:   true,
			shortNamespaces:          true,
			minify:                   true
		}
	});

	return update(config, {
		module: {
			rules: {
				[findIndex('loader', 'file-loader', config.module.rules)]: {
					options: {
						name: { $set: '[name].[hash:10].[ext]' }
					}
				}
			}
		},
		plugins: { $push: [stylablePlugin] }
	});
}
