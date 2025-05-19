import { E as store_set, F as attr_class, G as stringify, I as store_get, J as slot, K as unsubscribe_stores } from "../../chunks/index.js";
import { l as loading } from "../../chunks/appStore.js";
function _layout($$payload, $$props) {
  var $$store_subs;
  store_set(loading, false);
  $$payload.out += `<div${attr_class(`loading_indicator ${stringify(store_get($$store_subs ??= {}, "$loading", loading))} `)}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _layout as default
};
