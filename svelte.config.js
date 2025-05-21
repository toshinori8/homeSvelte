import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(
			{
				// default options are shown. On some platforms
				// these options are set automatically — see below
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: false,
				strict: true,
				inlineDynamicImports: false,
				build: {
					rollupOptions: {
						output:{
							manualChunks(id) {
								if (id.includes('node_modules')) {
									return id.toString().split('node_modules/')[1].split('/')[0].toString();
								}
							}
						}
					}
				}
			}
		),
		prerender: {
			handleHttpError: 'ignore' 
		},
	},preprocess: [vitePreprocess({}),preprocess()],
};

export default config;

