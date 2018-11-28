import StylablePlugin from '@stylable/webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import postcss from 'postcss';
import update from 'immutability-helper';
import postcssrc from '../../../.postcssrc';
import findIndex from '../../helpers/findIndex';

const stylesProcessor = postcss(postcssrc);

function postProcessor(stylableResult) {
	stylesProcessor.process(stylableResult.meta.outputAst).sync();
	return stylableResult;
}

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
	return update(config, {
		plugins: { $push: [
			new StylelintPlugin({
				files: 'src/**/*.st.css'
			}),
			new StylablePlugin({
				transformHooks: { postProcessor }
			})
		] }
	});
}

export function build(config) {
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
		plugins: { $push: [
			new StylelintPlugin({
				files:       'src/**/*.st.css',
				failOnError: true
			}),
			new StylablePlugin({
				filename:           '[name].[chunkhash].css',
				createRuntimeChunk: true,
				transformHooks:     { postProcessor },
				optimize:           {
					removeUnusedComponents:   true,
					removeComments:           true,
					removeStylableDirectives: true,
					classNameOptimizations:   true,
					shortNamespaces:          true,
					minify:                   true
				}
			})
		] }
	});
}
