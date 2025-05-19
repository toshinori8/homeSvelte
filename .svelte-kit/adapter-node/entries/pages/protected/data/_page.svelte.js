import { M as getContext, E as store_set, I as store_get, V as copy_payload, W as assign_payload, K as unsubscribe_stores, D as pop, A as push, Y as attr } from "../../../../chunks/index.js";
import { m as menuVisible } from "../../../../chunks/appStore.js";
import { L as Loading } from "../../../../chunks/pl.js";
import "../../../../chunks/client.js";
import "clsx";
import "deepmerge";
import dayjs from "dayjs";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const addLocation = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2028.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Warstwa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%2021.2%2019.6'%20style='enable-background:new%200%200%2021.2%2019.6;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%2360CF5E;}%20.st1{fill:%231F2837;}%20%3c/style%3e%3cpath%20class='st0'%20d='M15,0.5c-3.1,0-5.7,2.6-5.7,5.7s2.6,5.7,5.7,5.7s5.7-2.6,5.7-5.7S18.1,0.5,15,0.5z%20M17.6,6.9h-1.9v1.8%20c0,0.4-0.4,0.7-0.7,0.7c-0.4,0-0.6-0.4-0.6-0.7V6.9h-1.9c-0.4,0-0.7-0.4-0.7-0.7s0.4-0.7,0.7-0.7h1.9V3.8c0-0.4,0.4-0.7,0.7-0.7%20c0.4,0,0.7,0.4,0.7,0.7v1.9h1.9c0.4,0,0.7,0.4,0.7,0.7C18.1,6.8,17.9,6.9,17.6,6.9z'/%3e%3cpath%20class='st1'%20d='M15.9,13.3V18c0,0.2-0.2,0.4-0.4,0.4H12V14c0-0.9-0.7-1.6-1.6-1.6h-2c-0.9,0-1.6,0.7-1.6,1.6v4.4H3.4%20C3.2,18.4,3,18.2,3,18V8.2l6.4-6.4l0,0c0.2-0.3,0.5-0.6,0.8-0.9L9.9,0.6c-0.2-0.2-0.6-0.2-0.8,0l-7,7l-2,2c-0.2,0.2-0.2,0.6,0,0.8%20s0.6,0.2,0.8,0l1-1V18c0,0.9,0.7,1.6,1.6,1.6h4c0.3,0,0.6-0.3,0.6-0.6v-5c0-0.2,0.2-0.4,0.4-0.4h2c0.2,0,0.4,0.2,0.4,0.4v5%20c0,0.3,0.3,0.6,0.6,0.6h4c0.9,0,1.6-0.7,1.6-1.6v-5C16.7,13.1,16.3,13.2,15.9,13.3z'/%3e%3c/svg%3e";
const settings = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20id='Warstwa_1'%20data-name='Warstwa%201'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20473.5%20376'%3e%3cdefs%3e%3cstyle%3e%20.cls-1,%20.cls-2%20{%20stroke:%20%23000;%20stroke-linecap:%20round;%20stroke-miterlimit:%2010;%20stroke-width:%2025px;%20}%20.cls-2%20{%20fill:%20none;%20}%20.cls-3,%20.cls-4%20{%20stroke-width:%200px;%20}%20.cls-4%20{%20fill:%20%23fff;%20}%20%3c/style%3e%3c/defs%3e%3cg%3e%3cline%20class='cls-1'%20x1='16.84'%20y1='60.86'%20x2='461'%20y2='60.86'/%3e%3cg%3e%3ccircle%20class='cls-4'%20cx='297'%20cy='61'%20r='50.5'/%3e%3cpath%20class='cls-3'%20d='m297,21c22.06,0,40,17.94,40,40s-17.94,40-40,40-40-17.94-40-40,17.94-40,40-40m0-21c-33.69,0-61,27.31-61,61s27.31,61,61,61,61-27.31,61-61S330.69,0,297,0h0Z'/%3e%3c/g%3e%3c/g%3e%3cg%3e%3cline%20class='cls-1'%20x1='461'%20y1='315.14'%20x2='16.84'%20y2='315.14'/%3e%3cg%3e%3ccircle%20class='cls-4'%20cx='348'%20cy='315'%20r='50.5'/%3e%3cpath%20class='cls-3'%20d='m348,275c22.06,0,40,17.94,40,40s-17.94,40-40,40-40-17.94-40-40,17.94-40,40-40m0-21c-33.69,0-61,27.31-61,61s27.31,61,61,61,61-27.31,61-61-27.31-61-61-61h0Z'/%3e%3c/g%3e%3c/g%3e%3cpath%20class='cls-2'%20d='m12.5,187.5h65.98s3.71-21.46,13.52-32.5c8-9,21.96-18,36-18s28.71,2.95,42,20c6.65,8.52,9.9,19.52,10.11,30.27.21,10.74-2.61,21.23-8.11,28.73-11,15-24.7,24.59-47,23-14-1-23-8-23-8'/%3e%3cline%20class='cls-2'%20x1='461'%20y1='188.09'%20x2='180.11'%20y2='188.09'/%3e%3c/svg%3e";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  dayjs.locale("pl");
  store_set(menuVisible, false);
  store_get($$store_subs ??= {}, "$page", page).url.pathname;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="header"><div class="relative overflow-x-auto shadow-md sm:rounded-lg flex _flex"><div class="p-4"><label for="table-search" class="sr-only">Search</label> <div class="relative mt-1"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg></div> <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wpisz fraze wyszukiwania"></div></div> <div class="p-4"><button class="w-6 h-6 text-gray-500 dark:text-gray-400 buttonTable"><img${attr("src", addLocation)} alt="addLocation"></button> <button class="w-6 h-6 text-gray-500 dark:text-gray-400 buttonTable"><img${attr("src", settings)} alt="ustawienia"></button></div></div></div> `;
    {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="center">`;
      Loading($$payload2);
      $$payload2.out += `<!----></div>`;
    }
    $$payload2.out += `<!--]--> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
