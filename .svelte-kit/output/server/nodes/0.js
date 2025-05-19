import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DgEwOnX3.js","_app/immutable/chunks/vL-1qMx0.js","_app/immutable/chunks/DYu9GLAD.js","_app/immutable/chunks/CI5ynoyp.js","_app/immutable/chunks/D1xk_xD_.js","_app/immutable/chunks/qO67i_YB.js","_app/immutable/chunks/fqB-mGJD.js"];
export const stylesheets = ["_app/immutable/assets/0.8_a05PJa.css"];
export const fonts = [];
