import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [sveltekit(),devtoolsJson()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "${path.resolve(__dirname, 'src/variables.scss').replace(/\\/g, '/')}" as *;`,
				api: 'modern-compiler' // or "modern"
			}
		}
	}
});
