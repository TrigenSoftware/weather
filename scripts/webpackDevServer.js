import 'dotenv/config';
import webpack from 'webpack';
import { create } from 'browser-sync';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import HttpProxyMiddleware from 'http-proxy-middleware';
import HistoryApiFallbackMiddleware from 'connect-history-api-fallback';
import { notify } from './helpers/notify';
import browserSyncConfigBase from './configs/browserSync';
import * as webpackConfig from './configs/webpack';

const server = create();
const webpackDevCompiler = webpack(webpackConfig.dev());

webpackDevCompiler.plugin('done', () => {
	notify('Recompilation was done.');
});

// Listen Error

const middleware = [
	WebpackDevMiddleware(webpackDevCompiler, {
		publicPath: webpackDevCompiler.options.output.publicPath,
		stats:      {
			chunks:   false,
			children: false,
			modules:  false,
			colors:   true
		}
	}),
	WebpackHotMiddleware(webpackDevCompiler, {
		reload: true
	}),
	process.env.PROXY_API_URI && HttpProxyMiddleware(process.env.PROXY_API_URI),
	HistoryApiFallbackMiddleware()
].filter(Boolean);
const browserSyncWebpackOptions = {
	...browserSyncConfigBase,
	middleware
};

server.init(browserSyncWebpackOptions, () => {
	notify('Webpack dev server is working...');
});
