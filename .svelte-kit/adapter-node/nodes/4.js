import * as universal from '../entries/pages/protected/data/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/data/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/protected/data/+page.js";
export const imports = ["_app/immutable/nodes/4.DmBK-5dT.js","_app/immutable/chunks/vL-1qMx0.js","_app/immutable/chunks/DYu9GLAD.js","_app/immutable/chunks/CI5ynoyp.js","_app/immutable/chunks/DVmlRn4z.js","_app/immutable/chunks/BLreOugL.js","_app/immutable/chunks/DvdIg-y8.js","_app/immutable/chunks/fqB-mGJD.js","_app/immutable/chunks/qO67i_YB.js","_app/immutable/chunks/BC6Ym9Rr.js","_app/immutable/chunks/D1xk_xD_.js","_app/immutable/chunks/Bba74OzR.js","_app/immutable/chunks/Crd1xHPf.js","_app/immutable/chunks/D1PfkB7a.js"];
export const stylesheets = ["_app/immutable/assets/stopTyping.B3eafJ2o.css","_app/immutable/assets/4.D7ir0QiP.css"];
export const fonts = [];
