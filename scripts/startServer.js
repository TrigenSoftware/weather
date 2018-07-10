import 'dotenv/config';
import { create } from 'browser-sync';
import HttpProxyMiddleware from 'http-proxy-middleware';
import HistoryApiFallbackMiddleware from 'connect-history-api-fallback';
import notify from './helpers/notify';
import paths from './configs/paths';
import browserSyncConfigBase from './configs/browserSync';

const server = create();
const middleware = [
	process.env.PROXY_SERVER_URI && HttpProxyMiddleware(process.env.PROXY_SERVER_URI),
	HistoryApiFallbackMiddleware()
].filter(Boolean);
const browserSyncConfig = {
	...browserSyncConfigBase,
	server: paths.build.rootDir,
	middleware
};

server.init(browserSyncConfig, () => {
	notify('Server is working...', true);
});
