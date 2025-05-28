import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), preprocess()],
	kit: {
		adapter: adapter({
			precompress: false,
			env: {
				port: 'PORT',
				host: 'HOST'
			}
		}),
		prerender: {
			handleHttpError: 'ignore'
		}
	}
};

export default config;