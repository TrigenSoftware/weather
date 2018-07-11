import 'dotenv/config';
import { create } from 'browser-sync';
import HttpProxyMiddleware from 'http-proxy-middleware';
import HistoryApiFallbackMiddleware from 'connect-history-api-fallback';
import { notify } from './helpers/notify';
import browserSyncConfigBase from './configs/browserSync';

const server = create();
const middleware = [
	process.env.PROXY_SERVER_URI && HttpProxyMiddleware(process.env.PROXY_SERVER_URI),
	HistoryApiFallbackMiddleware()
].filter(Boolean);
const browserSyncConfig = {
	...browserSyncConfigBase,
	server: 'build',
	middleware
};

server.init(browserSyncConfig, () => {
	notify('Server is working...');
});
