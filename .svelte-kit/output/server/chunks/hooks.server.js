import { parse } from "set-cookie-parser";
import { B as BROWSER } from "./false.js";
import { l as building, m as private_env, b as base } from "./internal.js";
import { Auth, setEnvDefaults as setEnvDefaults$1 } from "@auth/core";
import { b as PUBLIC_GOOGLE_CLIENT_SECRET, c as PUBLIC_GOOGLE_CLIENT_ID } from "./public.js";
import Google from "@auth/core/providers/google";
const dev = BROWSER;
async function auth(event, config) {
  setEnvDefaults(config);
  config.trustHost ??= true;
  const { request: req } = event;
  const basePath = config.basePath ?? `${base}/auth`;
  const url = new URL(basePath + "/session", req.url);
  const request = new Request(url, {
    headers: { cookie: req.headers.get("cookie") ?? "" }
  });
  const response = await Auth(request, config);
  const authCookies = parse(response.headers.getSetCookie());
  for (const cookie of authCookies) {
    const { name, value, ...options } = cookie;
    event.cookies.set(name, value, { path: "/", ...options });
  }
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function SvelteKitAuth(config) {
  return async function({ event, resolve }) {
    const _config = typeof config === "object" ? config : await config(event);
    setEnvDefaults(_config);
    const { url, request } = event;
    event.locals.auth ??= () => auth(event, _config);
    event.locals.getSession ??= event.locals.auth;
    const action = url.pathname.slice(
      // @ts-expect-error - basePath is defined in setEnvDefaults
      _config.basePath.length + 1
    ).split("/")[0];
    if (isAction(action) && url.pathname.startsWith(_config.basePath + "/")) {
      return Auth(request, _config);
    }
    return resolve(event);
  };
}
function isAction(action) {
  return actions.includes(action);
}
function setEnvDefaults(config) {
  if (building)
    return;
  setEnvDefaults$1(private_env, config);
  config.trustHost ??= dev;
  config.basePath = `${base}/auth`;
}
const handle = SvelteKitAuth({
  providers: [Google({
    clientId: PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: PUBLIC_GOOGLE_CLIENT_SECRET
  })],
  trustHost: true
});
const handles = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith(
    "/.well-known/appspecific/com.chrome.devtools"
  )) {
    return new Response(null, { status: 204 });
  }
  return await resolve(event);
};
export {
  handle,
  handles
};
