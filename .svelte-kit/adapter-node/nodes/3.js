import * as universal from '../entries/pages/protected/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/protected/+page.js";
export const imports = ["_app/immutable/nodes/3.Dtr5OtTO.js","_app/immutable/chunks/DOZOIc5p.js","_app/immutable/chunks/2tJFOeL8.js","_app/immutable/chunks/CqFf3_ZX.js","_app/immutable/chunks/B_lgffSc.js","_app/immutable/chunks/WevpbRh2.js","_app/immutable/chunks/CQroIqg9.js","_app/immutable/chunks/UZA6mQAV.js","_app/immutable/chunks/Bdf7bt7S.js","_app/immutable/chunks/C1FmrZbK.js"];
export const stylesheets = ["_app/immutable/assets/stopTyping.Xv3gKcXE.css","_app/immutable/assets/3.BQ_iL66H.css"];
export const fonts = [];
