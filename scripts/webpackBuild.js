import 'dotenv/config';
import webpack from 'webpack';
import {
	notify,
	notifyError
} from './helpers/notify';
import * as webpackConfig from './configs/webpack';

const webpackBuildCompiler = webpack(webpackConfig.build());

webpackBuildCompiler.run((error, stats) => {

	if (error) {
		notifyError(error);
		return;
	}

	if (stats.hasErrors()) {
		notifyError(new Error('Compilation has failed.'));
	} else {
		notify('Compilation was done.');
	}

	process.stdout.write(`${stats.toString({
		chunks:   false,
		children: false,
		modules:  false,
		colors:   true
	})}\n`);
});
