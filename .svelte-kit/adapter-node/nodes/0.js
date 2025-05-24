import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.8LPwSIi0.js","_app/immutable/chunks/DOZOIc5p.js","_app/immutable/chunks/2tJFOeL8.js","_app/immutable/chunks/B_lgffSc.js","_app/immutable/chunks/WevpbRh2.js"];
export const stylesheets = ["_app/immutable/assets/0.DvFPR8jV.css"];
export const fonts = [];
