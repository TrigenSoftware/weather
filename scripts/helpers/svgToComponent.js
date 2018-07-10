import path from 'path';
import {
	stringifySymbol,
	stringify,
	generateImport,
	generateExport
} from 'svg-sprite-loader/lib/utils';
import { stringifyRequest } from 'loader-utils';
import { pascalize } from 'humps';

module.exports = runtimeGenerator;

function runtimeGenerator({
	symbol, config,
	context, loaderContext
}) {

	const {
		spriteModule,
		symbolModule,
		runtimeOptions,
		esModule
	} = config;
	const compilerContext = loaderContext._compiler.context;
	const iconModulePath = path.resolve(compilerContext, runtimeOptions.iconModule);
	const iconModuleRequest = stringify(
		path.relative(path.dirname(symbol.request.file), iconModulePath)
	);
	const spriteRequest = stringifyRequest({ context }, spriteModule);
	const symbolRequest = stringifyRequest({ context }, symbolModule);
	const displayName = `Icon${pascalize(symbol.id)}`;

	return `
		${generateImport('React', 'react', esModule)}
		${generateImport('SpriteSymbol', symbolRequest, esModule)}
		${generateImport('sprite', spriteRequest, esModule)}
		${generateImport(esModule ? 'Icon' : '{ default: Icon }', iconModuleRequest, esModule)}

		var symbol = new SpriteSymbol(${stringifySymbol(symbol)});
		sprite.add(symbol);

		function ${displayName}() {
			Reflect.apply(Icon, this, arguments);
		}

		${displayName}.prototype = Object.create(Icon.prototype);

		${displayName}.defaultProps = Object.assign(
			{},
			Icon.defaultProps,
			{ glyph: '${symbol.id}' }
		);

		${generateExport(displayName, esModule)}
	`;
}
