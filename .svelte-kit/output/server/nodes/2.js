import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.bZxVXT8C.js","_app/immutable/chunks/DOZOIc5p.js","_app/immutable/chunks/2tJFOeL8.js","_app/immutable/chunks/Bdf7bt7S.js","_app/immutable/chunks/WevpbRh2.js","_app/immutable/chunks/UZA6mQAV.js","_app/immutable/chunks/CqFf3_ZX.js"];
export const stylesheets = ["_app/immutable/assets/2.BjoBygCj.css"];
export const fonts = [];
