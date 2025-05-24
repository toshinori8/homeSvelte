import * as universal from '../entries/pages/protected/data/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/data/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/protected/data/+page.js";
export const imports = ["_app/immutable/nodes/4.gYWALqyB.js","_app/immutable/chunks/DOZOIc5p.js","_app/immutable/chunks/2tJFOeL8.js","_app/immutable/chunks/CQroIqg9.js","_app/immutable/chunks/B_lgffSc.js","_app/immutable/chunks/WevpbRh2.js","_app/immutable/chunks/CqFf3_ZX.js","_app/immutable/chunks/UZA6mQAV.js","_app/immutable/chunks/Bdf7bt7S.js"];
export const stylesheets = ["_app/immutable/assets/stopTyping.Xv3gKcXE.css","_app/immutable/assets/4.c_XkoExP.css"];
export const fonts = [];
