
/**
 * Global typings.
 */

declare module '*.st.css' {
	// tslint:disable-next-line
	const stylesheet: import('@stylable/runtime').RuntimeStylesheet;
	export default stylesheet;
}

declare module '*?tsw' {
    const register: import('service-worker-loader/types').ServiceWorkerRegister;
    const scriptUrl: import('service-worker-loader/types').ScriptUrl;
    const ServiceWorkerNoSupportError: import('service-worker-loader/types').ServiceWorkerNoSupportError;
    export default register;
    export {
        scriptUrl,
        ServiceWorkerNoSupportError
    };
}

interface IPrecacheEntry {
	url: string;
	revision?: string;
}

// tslint:disable-next-line
interface ServiceWorkerGlobalScope {
	__precacheManifest: IPrecacheEntry[];
}
