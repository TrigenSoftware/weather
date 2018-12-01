/* eslint-disable import/unambiguous */
require('@babel/register');
const path = require('path');
const fs = require('fs');
const webpackConfig = require('../configs/webpack');

module.exports = configureStorybook;

function configureStorybook(storybookBaseConfig) {

	const pkg = JSON.parse(
		fs.readFileSync('./package.json', 'utf8')
	);

	process.env.PROJECT_NAME = pkg.name.toUpperCase();
	process.env.PROJECT_HOMEPAGE = pkg.repository.url.replace(/(^git\+)|(\.git$)/g, '');
	process.env.PROJECT_SRC = path.join(process.cwd(), 'src');

	const webpackDevConfig = webpackConfig.dev();

	storybookBaseConfig.resolve.extensions.push(...webpackDevConfig.resolve.extensions);
	Object.assign(storybookBaseConfig.resolve.alias, webpackDevConfig.resolve.alias);

	storybookBaseConfig.module.rules.push(...webpackDevConfig.module.rules);
	storybookBaseConfig.plugins.push(...webpackDevConfig.plugins.filter((plugin) => {

		switch (plugin.constructor.name) {

			case 'HtmlWebpackPlugin':
				return false;

			case 'HotModuleReplacementPlugin':
				return false;

			default:
				return true;
		}
	}));

	return storybookBaseConfig;
}
