import { c as create_ssr_component, a as subscribe, b as set_store_value, e as escape } from "../../chunks/ssr.js";
import { l as loading } from "../../chunks/appStore.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $loading, $$unsubscribe_loading;
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  set_store_value(loading, $loading = false, $loading);
  $$unsubscribe_loading();
  return `<div class="${"loading_indicator " + escape($loading, true)}">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
