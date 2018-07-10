
export default function addDevScripts(entries, devScripts) {
	return Object.entries(entries).reduce((entry, [name, src]) => ({
		...entry,
		[name]: Array.isArray(src)
			? [...devScripts, ...src]
			: [...devScripts, src]
	}), {});
}
