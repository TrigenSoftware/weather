/* eslint-disable no-process-exit */
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
		process.exit(1);
	}

	process.stdout.write(`${stats.toString({
		chunks:   false,
		children: false,
		modules:  false,
		colors:   true
	})}\n`);

	if (stats.hasErrors()) {

		const error = new Error('Compilation has failed.');

		notifyError(error);
		process.exit(1);

	} else {
		notify('Compilation was done.');
	}
});
