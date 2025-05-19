import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.R5X9MCZ1.js","_app/immutable/chunks/vL-1qMx0.js","_app/immutable/chunks/DYu9GLAD.js","_app/immutable/chunks/CI5ynoyp.js","_app/immutable/chunks/BLreOugL.js"];
export const stylesheets = [];
export const fonts = [];
