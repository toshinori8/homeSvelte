
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const AUTH_TRUST_HOST: string;
	export const ORIGIN: string;
	export const AUTH_SECRET: string;
	export const NVM_INC: string;
	export const npm_package_devDependencies__fontsource_fira_mono: string;
	export const npm_package_devDependencies_prettier: string;
	export const TERM_PROGRAM: string;
	export const npm_package_devDependencies_typescript_eslint: string;
	export const npm_package_devDependencies_leaflet: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const NODE: string;
	export const npm_package_dependencies_svelte_persisted_store: string;
	export const INIT_CWD: string;
	export const _P9K_TTY: string;
	export const NVM_CD_FLAGS: string;
	export const npm_package_dependencies_axios: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_config_version_git_tag: string;
	export const TERM: string;
	export const SHELL: string;
	export const npm_package_dependencies_svelte_range_slider_pips: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const npm_package_dependencies_svelte_check: string;
	export const npm_package_dependencies__sveltejs_kit: string;
	export const npm_package_scripts_lint: string;
	export const npm_config_init_license: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_devDependencies_flowbite: string;
	export const npm_package_scripts_dev: string;
	export const ZPFX: string;
	export const VOLTA_HOME: string;
	export const ZDOTDIR: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const MallocNanoZone: string;
	export const npm_package_devDependencies_leaflet_markercluster: string;
	export const npm_config_registry: string;
	export const PMSPEC: string;
	export const npm_package_readmeFilename: string;
	export const npm_package_dependencies_svelte_time: string;
	export const npm_package_devDependencies_globals: string;
	export const NVM_DIR: string;
	export const USER: string;
	export const npm_package_description: string;
	export const npm_package_scripts_check_watch: string;
	export const COMMAND_MODE: string;
	export const npm_package_dependencies_flowbite_svelte: string;
	export const npm_package_dependencies__turf_turf: string;
	export const SSH_AUTH_SOCK: string;
	export const npm_package_devDependencies__maptiler_sdk: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_execpath: string;
	export const npm_package_dependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_devDependencies_mezr: string;
	export const PATH: string;
	export const npm_config_argv: string;
	export const npm_package_devDependencies_uuid: string;
	export const _: string;
	export const npm_package_dependencies__sveltejs_adapter_node: string;
	export const npm_package_devDependencies__neoconfetti_svelte: string;
	export const npm_config_engine_strict: string;
	export const USER_ZDOTDIR: string;
	export const __CFBundleIdentifier: string;
	export const PWD: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_package_devDependencies_osmtogeojson: string;
	export const VSCODE_NONCE: string;
	export const P9K_SSH: string;
	export const npm_lifecycle_event: string;
	export const npm_package_dependencies__tailwindcss_postcss: string;
	export const P9K_TTY: string;
	export const LANG: string;
	export const npm_package_name: string;
	export const npm_package_devDependencies_sass: string;
	export const npm_package_scripts_start: string;
	export const npm_package_scripts_build: string;
	export const npm_config_version_commit_hooks: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const XPC_FLAGS: string;
	export const npm_package_dependencies_svelte_input_mask: string;
	export const npm_config_bin_links: string;
	export const npm_package_engines_node: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_version: string;
	export const VSCODE_INJECTION: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const SHLVL: string;
	export const HOME: string;
	export const npm_package_type: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const npm_config_save_prefix: string;
	export const npm_config_strict_ssl: string;
	export const ZSH_CACHE_DIR: string;
	export const HOMEBREW_PREFIX: string;
	export const npm_config_version_git_message: string;
	export const npm_package_dependencies_d3: string;
	export const LOGNAME: string;
	export const YARN_WRAP_OUTPUT: string;
	export const npm_package_dependencies_vite: string;
	export const npm_package_scripts_format: string;
	export const PREFIX: string;
	export const npm_lifecycle_script: string;
	export const npm_package_devDependencies_textures: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const npm_package_devDependencies_prettier_plugin_tailwindcss: string;
	export const npm_package_devDependencies_query_overpass: string;
	export const NVM_BIN: string;
	export const npm_package_devDependencies_pnpm: string;
	export const npm_config_version_git_sign: string;
	export const npm_config_ignore_scripts: string;
	export const npm_config_user_agent: string;
	export const INFOPATH: string;
	export const HOMEBREW_CELLAR: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const GIT_ASKPASS: string;
	export const _P9K_SSH_TTY: string;
	export const npm_package_dependencies_d3_interpolate: string;
	export const npm_package_devDependencies__types_eslint: string;
	export const npm_package_dependencies_svelte_select: string;
	export const npm_package_dependencies_flowbite_svelte_icons: string;
	export const npm_config_init_version: string;
	export const npm_config_ignore_optional: string;
	export const npm_package_devDependencies_geojson_vt: string;
	export const npm_package_scripts_check: string;
	export const COLORTERM: string;
	export const npm_node_execpath: string;
	export const npm_config_version_tag_prefix: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	export const PUBLIC_API_OPENROUTE: string;
	export const PUBLIC_API_OPENROUTE2: string;
	export const PUBLIC_GAPI: string;
	export const PUBLIC_API_MAPTILER: string;
	export const PUBLIC_GOOGLE_CLIENT_ID: string;
	export const PUBLIC_GOOGLE_CLIENT_SECRET: string;
	export const PUBLIC_AUTH_TRUST_HOST: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		AUTH_TRUST_HOST: string;
		ORIGIN: string;
		AUTH_SECRET: string;
		NVM_INC: string;
		npm_package_devDependencies__fontsource_fira_mono: string;
		npm_package_devDependencies_prettier: string;
		TERM_PROGRAM: string;
		npm_package_devDependencies_typescript_eslint: string;
		npm_package_devDependencies_leaflet: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		NODE: string;
		npm_package_dependencies_svelte_persisted_store: string;
		INIT_CWD: string;
		_P9K_TTY: string;
		NVM_CD_FLAGS: string;
		npm_package_dependencies_axios: string;
		npm_package_devDependencies_typescript: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_config_version_git_tag: string;
		TERM: string;
		SHELL: string;
		npm_package_dependencies_svelte_range_slider_pips: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		npm_package_dependencies_svelte_check: string;
		npm_package_dependencies__sveltejs_kit: string;
		npm_package_scripts_lint: string;
		npm_config_init_license: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_devDependencies_flowbite: string;
		npm_package_scripts_dev: string;
		ZPFX: string;
		VOLTA_HOME: string;
		ZDOTDIR: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		MallocNanoZone: string;
		npm_package_devDependencies_leaflet_markercluster: string;
		npm_config_registry: string;
		PMSPEC: string;
		npm_package_readmeFilename: string;
		npm_package_dependencies_svelte_time: string;
		npm_package_devDependencies_globals: string;
		NVM_DIR: string;
		USER: string;
		npm_package_description: string;
		npm_package_scripts_check_watch: string;
		COMMAND_MODE: string;
		npm_package_dependencies_flowbite_svelte: string;
		npm_package_dependencies__turf_turf: string;
		SSH_AUTH_SOCK: string;
		npm_package_devDependencies__maptiler_sdk: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies_eslint: string;
		npm_execpath: string;
		npm_package_dependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_devDependencies_svelte: string;
		npm_package_devDependencies_mezr: string;
		PATH: string;
		npm_config_argv: string;
		npm_package_devDependencies_uuid: string;
		_: string;
		npm_package_dependencies__sveltejs_adapter_node: string;
		npm_package_devDependencies__neoconfetti_svelte: string;
		npm_config_engine_strict: string;
		USER_ZDOTDIR: string;
		__CFBundleIdentifier: string;
		PWD: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_package_devDependencies_osmtogeojson: string;
		VSCODE_NONCE: string;
		P9K_SSH: string;
		npm_lifecycle_event: string;
		npm_package_dependencies__tailwindcss_postcss: string;
		P9K_TTY: string;
		LANG: string;
		npm_package_name: string;
		npm_package_devDependencies_sass: string;
		npm_package_scripts_start: string;
		npm_package_scripts_build: string;
		npm_config_version_commit_hooks: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		XPC_FLAGS: string;
		npm_package_dependencies_svelte_input_mask: string;
		npm_config_bin_links: string;
		npm_package_engines_node: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		XPC_SERVICE_NAME: string;
		npm_package_version: string;
		VSCODE_INJECTION: string;
		npm_package_devDependencies_autoprefixer: string;
		SHLVL: string;
		HOME: string;
		npm_package_type: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		npm_config_save_prefix: string;
		npm_config_strict_ssl: string;
		ZSH_CACHE_DIR: string;
		HOMEBREW_PREFIX: string;
		npm_config_version_git_message: string;
		npm_package_dependencies_d3: string;
		LOGNAME: string;
		YARN_WRAP_OUTPUT: string;
		npm_package_dependencies_vite: string;
		npm_package_scripts_format: string;
		PREFIX: string;
		npm_lifecycle_script: string;
		npm_package_devDependencies_textures: string;
		VSCODE_GIT_IPC_HANDLE: string;
		npm_package_devDependencies_prettier_plugin_tailwindcss: string;
		npm_package_devDependencies_query_overpass: string;
		NVM_BIN: string;
		npm_package_devDependencies_pnpm: string;
		npm_config_version_git_sign: string;
		npm_config_ignore_scripts: string;
		npm_config_user_agent: string;
		INFOPATH: string;
		HOMEBREW_CELLAR: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		GIT_ASKPASS: string;
		_P9K_SSH_TTY: string;
		npm_package_dependencies_d3_interpolate: string;
		npm_package_devDependencies__types_eslint: string;
		npm_package_dependencies_svelte_select: string;
		npm_package_dependencies_flowbite_svelte_icons: string;
		npm_config_init_version: string;
		npm_config_ignore_optional: string;
		npm_package_devDependencies_geojson_vt: string;
		npm_package_scripts_check: string;
		COLORTERM: string;
		npm_node_execpath: string;
		npm_config_version_tag_prefix: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_API_OPENROUTE: string;
		PUBLIC_API_OPENROUTE2: string;
		PUBLIC_GAPI: string;
		PUBLIC_API_MAPTILER: string;
		PUBLIC_GOOGLE_CLIENT_ID: string;
		PUBLIC_GOOGLE_CLIENT_SECRET: string;
		PUBLIC_AUTH_TRUST_HOST: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
