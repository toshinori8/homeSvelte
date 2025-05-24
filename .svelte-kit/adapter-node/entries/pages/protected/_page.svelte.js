import { n as noop, c as create_ssr_component, d as compute_rest_props, g as getContext, f as spread, e as escape, h as escape_attribute_value, i as escape_object, v as validate_component, j as add_attribute, k as assign, l as identity, a as subscribe, b as set_store_value, o as onDestroy, p as get_store_value, q as createEventDispatcher, r as each, t as add_styles, u as add_classes } from "../../../chunks/ssr.js";
import { a as location, m as menuVisible, p as poiReady, b as allDocuments, n as newLocation, o as options, c as nearLocationsPoints, l as loading } from "../../../chunks/appStore.js";
import { L as Loading, c as convData2Geo, g as getBounds } from "../../../chunks/pl.js";
import { twMerge } from "tailwind-merge";
import { p as page } from "../../../chunks/stores.js";
import { P as PUBLIC_API_MAPTILER, a as PUBLIC_GAPI } from "../../../chunks/public.js";
import { w as writable } from "../../../chunks/index2.js";
import { config, Map, Marker, MapStyle } from "@maptiler/sdk";
import { defaults, createInput } from "input-core";
import dayjs from "dayjs";
import * as d3 from "d3";
import "osmtogeojson";
import "@mapbox/geojson-rewind";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function sineIn(t) {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;
  else return 1 - v;
}
const ToolbarButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "name", "ariaLabel", "size", "href"]);
  const background = getContext("background");
  let { color = "default" } = $$props;
  let { name = void 0 } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { size = "md" } = $$props;
  let { href = void 0 } = $$props;
  const colors = {
    dark: "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
    gray: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",
    red: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",
    yellow: "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",
    green: "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",
    indigo: "text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",
    purple: "text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",
    pink: "text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",
    blue: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",
    primary: "text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",
    default: "focus:ring-gray-400"
  };
  const sizing = {
    xs: "m-0.5 rounded-sm focus:ring-1 p-0.5",
    sm: "m-0.5 rounded focus:ring-1 p-0.5",
    md: "m-0.5 rounded-lg focus:ring-2 p-1.5",
    lg: "m-0.5 rounded-lg focus:ring-2 p-2.5"
  };
  let buttonClass;
  const svgSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-5 h-5"
  };
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  buttonClass = twMerge(
    "focus:outline-none whitespace-normal",
    sizing[size],
    colors[color],
    color === "default" && (background ? "hover:bg-gray-100 dark:hover:bg-gray-600" : "hover:bg-gray-100 dark:hover:bg-gray-700"),
    $$props.class
  );
  return `${href ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      {
        "aria-label": escape_attribute_value(ariaLabel ?? name)
      }
    ],
    {}
  )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</a>` : `<button${spread(
    [
      { type: "button" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      {
        "aria-label": escape_attribute_value(ariaLabel ?? name)
      }
    ],
    {}
  )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</button>`} `;
});
const CloseButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name"]);
  let { name = "Close" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name }, $$restProps, { class: twMerge("ms-auto", $$props.class) }), {}, {
    default: ({ svgSize }) => {
      return `<svg${add_attribute("class", svgSize, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
    }
  })} `;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["pill", "outline", "size", "href", "type", "color", "shadow", "tag", "checked"]);
  const group = getContext("group");
  let { pill = false } = $$props;
  let { outline = false } = $$props;
  let { size = group ? "sm" : "md" } = $$props;
  let { href = void 0 } = $$props;
  let { type = "button" } = $$props;
  let { color = group ? outline ? "dark" : "alternative" : "primary" } = $$props;
  let { shadow = false } = $$props;
  let { tag = "button" } = $$props;
  let { checked = void 0 } = $$props;
  const colorClasses = {
    alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white dark:hover:bg-gray-700",
    blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
    dark: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
    green: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
    light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
    primary: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
    purple: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
    red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
    yellow: "text-white bg-yellow-400 hover:bg-yellow-500 ",
    none: ""
  };
  const colorCheckedClasses = {
    alternative: "text-primary-700 border dark:text-primary-500 bg-gray-100 dark:bg-gray-700 border-gray-300 shadow-gray-300 dark:shadow-gray-800 shadow-inner",
    blue: "text-blue-900 bg-blue-400 dark:bg-blue-500 shadow-blue-700 dark:shadow-blue-800 shadow-inner",
    dark: "text-white bg-gray-500 dark:bg-gray-600 shadow-gray-800 dark:shadow-gray-900 shadow-inner",
    green: "text-green-900 bg-green-400 dark:bg-green-500 shadow-green-700 dark:shadow-green-800 shadow-inner",
    light: "text-gray-900 bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:text-gray-900 dark:border-gray-700 shadow-gray-300 dark:shadow-gray-700 shadow-inner",
    primary: "text-primary-900 bg-primary-400 dark:bg-primary-500 shadow-primary-700 dark:shadow-primary-800 shadow-inner",
    purple: "text-purple-900 bg-purple-400 dark:bg-purple-500 shadow-purple-700 dark:shadow-purple-800 shadow-inner",
    red: "text-red-900 bg-red-400 dark:bg-red-500 shadow-red-700 dark:shadow-red-800 shadow-inner",
    yellow: "text-yellow-900 bg-yellow-300 dark:bg-yellow-400 shadow-yellow-500 dark:shadow-yellow-700 shadow-inner",
    none: ""
  };
  const coloredFocusClasses = {
    alternative: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
    blue: "focus-within:ring-blue-300 dark:focus-within:ring-blue-800",
    dark: "focus-within:ring-gray-300 dark:focus-within:ring-gray-700",
    green: "focus-within:ring-green-300 dark:focus-within:ring-green-800",
    light: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
    primary: "focus-within:ring-primary-300 dark:focus-within:ring-primary-800",
    purple: "focus-within:ring-purple-300 dark:focus-within:ring-purple-900",
    red: "focus-within:ring-red-300 dark:focus-within:ring-red-900",
    yellow: "focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900",
    none: ""
  };
  const coloredShadowClasses = {
    alternative: "shadow-gray-500/50 dark:shadow-gray-800/80",
    blue: "shadow-blue-500/50 dark:shadow-blue-800/80",
    dark: "shadow-gray-500/50 dark:shadow-gray-800/80",
    green: "shadow-green-500/50 dark:shadow-green-800/80",
    light: "shadow-gray-500/50 dark:shadow-gray-800/80",
    primary: "shadow-primary-500/50 dark:shadow-primary-800/80",
    purple: "shadow-purple-500/50 dark:shadow-purple-800/80",
    red: "shadow-red-500/50 dark:shadow-red-800/80 ",
    yellow: "shadow-yellow-500/50 dark:shadow-yellow-800/80 ",
    none: ""
  };
  const outlineClasses = {
    alternative: "text-gray-900 dark:text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white focus-within:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus-within:ring-gray-800",
    blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600",
    dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600",
    green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600",
    light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600",
    primary: "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600",
    purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500",
    red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600",
    yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400",
    none: ""
  };
  const sizeClasses = {
    xs: "px-3 py-2 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-base"
  };
  const hasBorder = () => outline || color === "alternative" || color === "light";
  let buttonClass;
  if ($$props.pill === void 0 && $$bindings.pill && pill !== void 0) $$bindings.pill(pill);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0) $$bindings.outline(outline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0) $$bindings.shadow(shadow);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  buttonClass = twMerge(
    "text-center font-medium",
    group ? "focus-within:ring-2" : "focus-within:ring-4",
    group && "focus-within:z-10",
    group || "focus-within:outline-none",
    "inline-flex items-center justify-center " + sizeClasses[size],
    outline && checked && "border dark:border-gray-900",
    outline && checked && colorCheckedClasses[color],
    outline && !checked && outlineClasses[color],
    !outline && checked && colorCheckedClasses[color],
    !outline && !checked && colorClasses[color],
    color === "alternative" && (group && !checked ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-600 dark:hover:border-gray-600"),
    outline && color === "dark" && (group ? checked ? "bg-gray-900 border-gray-800 dark:border-white dark:bg-gray-600" : "dark:text-white border-gray-800 dark:border-white" : "dark:text-gray-400 dark:border-gray-700"),
    coloredFocusClasses[color],
    hasBorder() && group && "border-s-0 first:border-s",
    group ? pill && "first:rounded-s-full last:rounded-e-full" || "first:rounded-s-lg last:rounded-e-lg" : pill && "rounded-full" || "rounded-lg",
    shadow && "shadow-lg",
    shadow && coloredShadowClasses[color],
    $$props.disabled && "cursor-not-allowed opacity-50",
    $$props.class
  );
  return `${href ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      { role: "button" }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a>` : `${tag === "button" ? `<button${spread(
    [
      { type: escape_attribute_value(type) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>` : `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        escape_object($$restProps),
        {
          class: escape_attribute_value(buttonClass)
        }
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`}`} `;
});
const Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activateClickOutside",
    "hidden",
    "position",
    "leftOffset",
    "rightOffset",
    "topOffset",
    "bottomOffset",
    "width",
    "backdrop",
    "bgColor",
    "bgOpacity",
    "placement",
    "id",
    "divClass",
    "transitionParams",
    "transitionType"
  ]);
  let { activateClickOutside = true } = $$props;
  let { hidden = true } = $$props;
  let { position = "fixed" } = $$props;
  let { leftOffset = "inset-y-0 start-0" } = $$props;
  let { rightOffset = "inset-y-0 end-0" } = $$props;
  let { topOffset = "inset-x-0 top-0" } = $$props;
  let { bottomOffset = "inset-x-0 bottom-0" } = $$props;
  let { width = "w-80" } = $$props;
  let { backdrop = true } = $$props;
  let { bgColor = "bg-gray-900" } = $$props;
  let { bgOpacity = "bg-opacity-75" } = $$props;
  let { placement = "left" } = $$props;
  let { id = "drawer-example" } = $$props;
  let { divClass = "overflow-y-auto z-50 p-4 bg-white dark:bg-gray-800" } = $$props;
  let { transitionParams = {} } = $$props;
  let { transitionType = "fly" } = $$props;
  const placements = {
    left: leftOffset,
    right: rightOffset,
    top: topOffset,
    bottom: bottomOffset
  };
  let backdropDivClass = twMerge("fixed top-0 start-0 z-50 w-full h-full", backdrop && bgColor, backdrop && bgOpacity);
  if ($$props.activateClickOutside === void 0 && $$bindings.activateClickOutside && activateClickOutside !== void 0) $$bindings.activateClickOutside(activateClickOutside);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.leftOffset === void 0 && $$bindings.leftOffset && leftOffset !== void 0) $$bindings.leftOffset(leftOffset);
  if ($$props.rightOffset === void 0 && $$bindings.rightOffset && rightOffset !== void 0) $$bindings.rightOffset(rightOffset);
  if ($$props.topOffset === void 0 && $$bindings.topOffset && topOffset !== void 0) $$bindings.topOffset(topOffset);
  if ($$props.bottomOffset === void 0 && $$bindings.bottomOffset && bottomOffset !== void 0) $$bindings.bottomOffset(bottomOffset);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.backdrop === void 0 && $$bindings.backdrop && backdrop !== void 0) $$bindings.backdrop(backdrop);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0) $$bindings.bgColor(bgColor);
  if ($$props.bgOpacity === void 0 && $$bindings.bgOpacity && bgOpacity !== void 0) $$bindings.bgOpacity(bgOpacity);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0) $$bindings.placement(placement);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
  if ($$props.transitionParams === void 0 && $$bindings.transitionParams && transitionParams !== void 0) $$bindings.transitionParams(transitionParams);
  if ($$props.transitionType === void 0 && $$bindings.transitionType && transitionType !== void 0) $$bindings.transitionType(transitionType);
  return `${!hidden ? `${backdrop && activateClickOutside ? `<div role="presentation"${add_attribute("class", backdropDivClass, 0)}></div>` : `${backdrop && !activateClickOutside ? `<div role="presentation"${add_attribute("class", backdropDivClass, 0)}></div>` : ``}`} <div${spread(
    [
      { id: escape_attribute_value(id) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(divClass, width, position, placements[placement], $$props.class))
      },
      { tabindex: "-1" },
      {
        "aria-controls": escape_attribute_value(id)
      },
      {
        "aria-labelledby": escape_attribute_value(id)
      }
    ],
    {}
  )}>${slots.default ? slots.default({ hidden }) : ``}</div>` : ``} `;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i])
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token) fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults2 = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults2), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start) return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function") duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const PageFront = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  set_store_value(location, $location = {}, $location);
  $$unsubscribe_location();
  return `<div class="frontcover noselect page_01"><div class="containerFlex noselect"><img src="/images/firstPage.png" class="frontImage noselect" alt="logo"> ${!$location.params ? `<div class="center">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>` : ``}  <div class="btn btn-primary frontButton noselect" data-svelte-h="svelte-yppzl0">Wycena wartości nieruchomości</div></div></div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $menuVisible, $$unsubscribe_menuVisible;
  $$unsubscribe_menuVisible = subscribe(menuVisible, (value) => $menuVisible = value);
  onDestroy(() => {
    set_store_value(menuVisible, $menuVisible = true, $menuVisible);
  });
  $$unsubscribe_menuVisible();
  return `<header aria-hidden="true" data-svelte-h="svelte-3exnnz"><p class="p_header noselect">WYCENA WARTOŚCI nieruchomości</p> <img class="logotyp_header noselect" src="/images/logoPropValue.png" alt="logotyp"></header>`;
});
const Lines = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg id="Tryb_izolacji" data-name="Tryb izolacji" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.39 562.02"><defs><style>.cls-ad {
        stroke: #2181b3;
        stroke-miterlimit: 5;
      }</style></defs><line class="cls-ad" y1="196.86" x2="453.39" y2="196.86"></line><line class="cls-ad" y1="224.91" x2="453.39" y2="224.91"></line><line class="cls-ad" y1="168.81" x2="453.39" y2="168.81"></line><line class="cls-ad" y1="533.47" x2="453.39" y2="533.47"></line><line class="cls-ad" y1="561.52" x2="453.39" y2="561.52"></line><line class="cls-ad" y1="505.42" x2="453.39" y2="505.42"></line><line class="cls-ad" y1="281.01" x2="453.39" y2="281.01"></line><line class="cls-ad" y1="309.06" x2="453.39" y2="309.06"></line><line class="cls-ad" y1="252.96" x2="453.39" y2="252.96"></line><line class="cls-ad" y1="449.32" x2="453.39" y2="449.32"></line><line class="cls-ad" y1="477.37" x2="453.39" y2="477.37"></line><line class="cls-ad" y1="421.27" x2="453.39" y2="421.27"></line><line class="cls-ad" y1="365.16" x2="453.39" y2="365.16"></line><line class="cls-ad" y1="393.21" x2="453.39" y2="393.21"></line><line class="cls-ad" y1="337.11" x2="453.39" y2="337.11"></line><line class="cls-ad" y1="112.7" x2="453.39" y2="112.7"></line><line class="cls-ad" y1="140.76" x2="453.39" y2="140.76"></line><line class="cls-ad" y1="84.65" x2="453.39" y2="84.65"></line><line class="cls-ad" y1="28.55" x2="453.39" y2="28.55"></line><line class="cls-ad" y1="56.6" x2="453.39" y2="56.6"></line><line class="cls-ad" y1=".5" x2="453.39" y2=".5"></line></svg>`;
});
const css$h = {
  code: ".bacground-svg.svelte-1rrvghv{width:672px;position:absolute;margin-top:84px;pointer-events:none}",
  map: `{"version":3,"file":"page00.svelte","sources":["page00.svelte"],"sourcesContent":["<script>\\n\\timport Header from '$lib/components/header.svelte';\\n\\timport Loading from '$lib/components/loading.svelte';\\n\\timport Lines from '$lib/components/lines.svelte';\\n\\timport { location } from '$lib/stores/appStore';\\n<\/script>\\n\\n<div class=\\"content-block section page_00 noselect\\">\\n\\t<Header />\\n<!-- {$location.adres} -->\\n\\t<!-- {#if !$location.params}\\n\\t\\t<div class=\\"center\\"><Loading /></div>\\n\\t{/if} -->\\n\\n\\t<div class=\\"page_content\\">\\n\\t\\t{#if $location.params}\\n\\t\\t\\t<h3 class=\\"noselect\\">Notatki</h3>\\n\\n\\t\\t\\t{#if $location.params}\\n\\t\\t\\t<div class=\\"bacground-svg\\">\\n\\t\\t\\t\\t<Lines/>\\n\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"editable_text_container\\" contenteditable=\\"true\\">\\n\\t\\t\\t\\t\\t<p>{$location.params.notes}</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t\\t<div id=\\"pageFooter\\" />\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n<style>\\n.bacground-svg{\\n    width: 672px;\\n    position: absolute;\\n    margin-top: 84px;\\n    pointer-events: none;\\n\\n}\\n\\n</style>\\n"],"names":[],"mappings":"AAgCA,6BAAc,CACV,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,CAChB,cAAc,CAAE,IAEpB"}`
};
const Page00 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$result.css.add(css$h);
  $$unsubscribe_location();
  return `<div class="content-block section page_00 noselect">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}   <div class="page_content">${$location.params ? `<h3 class="noselect" data-svelte-h="svelte-ii174a">Notatki</h3> ${$location.params ? `<div class="bacground-svg svelte-1rrvghv">${validate_component(Lines, "Lines").$$render($$result, {}, {}, {})}</div> <div class="editable_text_container" contenteditable="true"><p>${escape($location.params.notes)}</p></div>` : ``} <div id="pageFooter"></div>` : ``}</div> </div>`;
});
const css$g = {
  code: ".svelte-220ue6.svelte-220ue6,.svelte-220ue6.svelte-220ue6::before,.svelte-220ue6.svelte-220ue6::after{margin:0;padding:0;box-sizing:border-box}.cont__main.svelte-220ue6.svelte-220ue6{position:relative;width:100%;margin:0 auto}select.svelte-220ue6.svelte-220ue6{position:absolute;top:0;left:0;width:100%;height:2rem}select.svelte-220ue6.svelte-220ue6:focus,select.svelte-220ue6.svelte-220ue6:active{outline:none}input.svelte-220ue6.svelte-220ue6{position:relative;z-index:2;width:calc(100% - 28px);height:2rem;background:white}input.svelte-220ue6.svelte-220ue6:disabled{color:black}i.svelte-220ue6.svelte-220ue6{position:absolute;top:0;right:30px;z-index:3;height:100%;aspect-ratio:1;display:flex;justify-content:center;place-items:center;transform:rotate(40deg);opacity:0;transition:opacity .1s linear}input.svelte-220ue6:not(:disabled)~i.svelte-220ue6{opacity:1}input.svelte-220ue6:not(:disabled)~i.svelte-220ue6::before,input.svelte-220ue6:not(:disabled)~i.svelte-220ue6::after{content:'';position:absolute;width:0;border-style:solid}input.svelte-220ue6:not(:disabled)~i.svelte-220ue6::before{height:60%;border-width:0 3px;border-color:rgba(20, 20, 20, .4);border-radius:4px 4px 0 0}input.svelte-220ue6:not(:disabled)~i.svelte-220ue6::after{height:0;top:80%;border-width:6px 3px 0;border-color:rgba(20, 20, 20, .4) transparent transparent transparent;border-style:solid}",
  map: `{"version":3,"file":"editableSelect.svelte","sources":["editableSelect.svelte"],"sourcesContent":["<script>\\n\\timport { onMount, onDestroy } from 'svelte';\\n\\t\\n\\texport let selectedValue = null;\\n\\t// for editable option value to remain consistent, use textContent\\n\\texport let editValue = false;\\n\\texport let customValue = '';\\n\\t\\n\\tlet inputEl, selectEl, editOptionHandler, focusHandler;\\n\\tonMount(() => selectChangedHandler());\\n\\tonDestroy(() => {\\n\\t\\tinputEl.removeEventListener('input', editOptionHandler);\\n\\t\\tinputEl.removeEventListener('focus', focusHandler);\\n\\t})\\n\\t\\n\\tfunction selectChangedHandler() {\\n\\t\\tconst selected = selectEl.selectedOptions[0];\\n\\t\\tselectedValue = selected.value;\\n\\t\\tinputEl.value = selected.textContent;\\n\\t\\tinputEl.disabled = selected.contentEditable === 'true' ? false : true;\\n\\t\\t\\n\\t\\teditOptionHandler = () => editOptionEl(selected);\\n\\t\\tfocusHandler = () => inputEl.select();\\n\\t\\t\\n\\t\\tif(!inputEl.disabled) {\\n\\t\\t\\tinputEl.addEventListener('input', editOptionHandler);\\n\\t\\t\\tinputEl.addEventListener('focus', focusHandler);\\n\\t\\t} else {\\n\\t\\t\\tinputEl.removeEventListener('input', editOptionHandler);\\n\\t\\t\\tinputEl.removeEventListener('focus', focusHandler);\\n\\t\\t}\\n\\t}\\n\\t\\n\\tfunction editOptionEl(selected) {\\n\\t\\tcustomValue = inputEl.value;\\n\\t\\tselected.textContent = inputEl.value;\\n\\t\\tif(editValue) selectedValue = selected.value = customValue;\\n\\t}\\n<\/script>\\n\\n<div class='cont__main'>\\n\\t<select  bind:this={selectEl} on:change={selectChangedHandler}>\\n\\t\\t<slot />\\n\\t</select> \\n\\t<input type=\\"text\\" bind:this={inputEl} />\\n\\t<!-- svelte-ignore a11y-positive-tabindex -->\\n\\t<i on:click={() => inputEl.focus()} on:keypress={()=>{}} role=\\"button\\" tabindex=1/>\\n</div>\\n\\n<style>\\n\\t*, *::before, *::after {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\t\\n\\t.cont__main {\\n\\t\\tposition: relative;\\n\\t\\twidth: 100%;\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\t\\n\\tselect {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0; left: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 2rem;\\n\\t}\\n\\t\\n\\tselect:focus, select:active {\\n\\t\\toutline: none;\\n\\t}\\n\\t\\n\\tinput {\\n\\t\\tposition: relative;\\n\\t\\tz-index: 2;\\n\\t\\twidth: calc(100% - 28px);\\n\\t\\theight: 2rem;\\n\\t\\tbackground: white;\\n\\t}\\n\\t\\n\\tinput:disabled {\\n\\t\\tcolor: black;\\n\\t}\\n\\t\\n\\ti {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tright: 30px;\\n\\t\\tz-index: 3;\\n\\t\\theight: 100%;\\n\\t\\taspect-ratio: 1;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\tplace-items: center;\\n\\t\\ttransform: rotate(40deg);\\n\\t\\topacity: 0;\\n\\t\\ttransition: opacity .1s linear;\\n\\t}\\n\\t\\n/* \\tinput:disabled ~ i { opacity: 0; } */\\n\\tinput:not(:disabled) ~ i { opacity: 1; }\\n\\t\\n\\tinput:not(:disabled) ~ i::before,\\n\\tinput:not(:disabled) ~ i::after {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\twidth: 0;\\n\\t\\tborder-style: solid;\\n\\t}\\n\\t\\n\\tinput:not(:disabled) ~ i::before {\\n\\t\\theight: 60%;\\n\\t\\tborder-width: 0 3px;\\n\\t\\tborder-color: rgba(20, 20, 20, .4);\\n\\t\\tborder-radius: 4px 4px 0 0;\\n\\t}\\n\\t\\n\\tinput:not(:disabled) ~ i::after {\\n\\t\\theight: 0;\\n\\t\\ttop: 80%;\\n\\t\\tborder-width: 6px 3px 0;\\n\\t\\tborder-color: rgba(20, 20, 20, .4) transparent transparent transparent;\\n\\t\\tborder-style: solid;\\n\\t}\\n</style>\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n"],"names":[],"mappings":"AAkDC,4BAAC,CAAE,4BAAC,QAAQ,CAAE,4BAAC,OAAQ,CACtB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UACb,CAEA,uCAAY,CACX,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,CAAC,CAAC,IACX,CAEA,kCAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CAAE,IAAI,CAAE,CAAC,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACT,CAEA,kCAAM,MAAM,CAAE,kCAAM,OAAQ,CAC3B,OAAO,CAAE,IACV,CAEA,iCAAM,CACL,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACxB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KACb,CAEA,iCAAK,SAAU,CACd,KAAK,CAAE,KACR,CAEA,6BAAE,CACD,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,CAAC,CACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,OAAO,KAAK,CAAC,CACxB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,GAAG,CAAC,MACzB,CAGA,mBAAK,KAAK,SAAS,CAAC,CAAG,eAAE,CAAE,OAAO,CAAE,CAAG,CAEvC,mBAAK,KAAK,SAAS,CAAC,CAAG,eAAC,QAAQ,CAChC,mBAAK,KAAK,SAAS,CAAC,CAAG,eAAC,OAAQ,CAC/B,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,YAAY,CAAE,KACf,CAEA,mBAAK,KAAK,SAAS,CAAC,CAAG,eAAC,QAAS,CAChC,MAAM,CAAE,GAAG,CACX,YAAY,CAAE,CAAC,CAAC,GAAG,CACnB,YAAY,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAClC,aAAa,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAC1B,CAEA,mBAAK,KAAK,SAAS,CAAC,CAAG,eAAC,OAAQ,CAC/B,MAAM,CAAE,CAAC,CACT,GAAG,CAAE,GAAG,CACR,YAAY,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CACvB,YAAY,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,WAAW,CAAC,WAAW,CAAC,WAAW,CACtE,YAAY,CAAE,KACf"}`
};
const EditableSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedValue = null } = $$props;
  let { editValue = false } = $$props;
  let { customValue = "" } = $$props;
  let inputEl, selectEl, editOptionHandler, focusHandler;
  onDestroy(() => {
    inputEl.removeEventListener("input", editOptionHandler);
    inputEl.removeEventListener("focus", focusHandler);
  });
  if ($$props.selectedValue === void 0 && $$bindings.selectedValue && selectedValue !== void 0) $$bindings.selectedValue(selectedValue);
  if ($$props.editValue === void 0 && $$bindings.editValue && editValue !== void 0) $$bindings.editValue(editValue);
  if ($$props.customValue === void 0 && $$bindings.customValue && customValue !== void 0) $$bindings.customValue(customValue);
  $$result.css.add(css$g);
  return `<div class="cont__main svelte-220ue6"><select class="svelte-220ue6"${add_attribute("this", selectEl, 0)}>${slots.default ? slots.default({}) : ``}</select> <input type="text" class="svelte-220ue6"${add_attribute("this", inputEl, 0)}>  <i role="button" tabindex="1" class="svelte-220ue6"></i> </div>`;
});
const elements = writable([]);
const globalOptions = writable({
  offset: 0,
  duration: 500,
  passive: false,
  easing: cubicInOut,
  onStart: () => {
  },
  onDone: () => {
  }
});
get_store_value(globalOptions);
get_store_value(elements);
const MaskInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "value",
    "defaultValue",
    "reformat",
    "maskString",
    "maskChar",
    "mask",
    "maskFormat",
    "alwaysShowMask",
    "showMask"
  ]);
  let { value = "" } = $$props;
  let { defaultValue = void 0 } = $$props;
  let { reformat = void 0 } = $$props;
  let { maskString = void 0 } = $$props;
  let { maskChar = defaults.maskChar } = $$props;
  let { mask = defaults.mask } = $$props;
  let { maskFormat = defaults.maskFormat } = $$props;
  let { alwaysShowMask = false } = $$props;
  let { showMask = false } = $$props;
  const dispatch = createEventDispatcher();
  const input = createInput({
    value: value || defaultValue || "",
    reformat,
    maskString,
    maskChar,
    mask,
    maskFormat
  });
  let shouldShowMask = alwaysShowMask || showMask;
  onDestroy(() => {
    input.unsubscribe(applyValue);
  });
  let inputValue = setupInputValue(input.getState());
  let inputEl;
  function setupInputValue({ maskedValue, visibleValue }) {
    if (shouldShowMask && alwaysShowMask) {
      return maskedValue;
    }
    return visibleValue;
  }
  function applyValue({ maskedValue, visibleValue, selection, value: value2 }) {
    inputValue = setupInputValue({ maskedValue, visibleValue });
    setSelection(selection);
    dispatchChangeEvent({
      unmasked: reformat ? value2 : value2.filter((item) => item.type === 1).map((item) => item.char).join(""),
      maskedValue,
      visibleValue
    });
  }
  async function setSelection({ start, end }) {
    {
      return;
    }
  }
  function dispatchChangeEvent({ unmasked, maskedValue, visibleValue }) {
    dispatch("change", {
      element: inputEl,
      inputState: {
        unmaskedValue: unmasked,
        maskedValue,
        visibleValue
      }
    });
  }
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.defaultValue === void 0 && $$bindings.defaultValue && defaultValue !== void 0) $$bindings.defaultValue(defaultValue);
  if ($$props.reformat === void 0 && $$bindings.reformat && reformat !== void 0) $$bindings.reformat(reformat);
  if ($$props.maskString === void 0 && $$bindings.maskString && maskString !== void 0) $$bindings.maskString(maskString);
  if ($$props.maskChar === void 0 && $$bindings.maskChar && maskChar !== void 0) $$bindings.maskChar(maskChar);
  if ($$props.mask === void 0 && $$bindings.mask && mask !== void 0) $$bindings.mask(mask);
  if ($$props.maskFormat === void 0 && $$bindings.maskFormat && maskFormat !== void 0) $$bindings.maskFormat(maskFormat);
  if ($$props.alwaysShowMask === void 0 && $$bindings.alwaysShowMask && alwaysShowMask !== void 0) $$bindings.alwaysShowMask(alwaysShowMask);
  if ($$props.showMask === void 0 && $$bindings.showMask && showMask !== void 0) $$bindings.showMask(showMask);
  shouldShowMask = alwaysShowMask || showMask;
  {
    input.setReformat(reformat);
  }
  {
    input.setMaskFormat(maskFormat);
  }
  {
    input.setMask(mask);
  }
  {
    input.setMaskString(maskString);
  }
  {
    input.setMaskChar(maskChar);
  }
  value !== void 0 && input.setValue(value);
  return `<input${spread(
    [
      escape_object($$restProps),
      {
        value: escape_attribute_value(inputValue)
      }
    ],
    {}
  )}${add_attribute("this", inputEl, 0)}>`;
});
let m2 = "&#13217;";
const Page01 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  let $poiReady, $$unsubscribe_poiReady;
  let $$unsubscribe_allDocuments;
  let $$unsubscribe_newLocation;
  let $options, $$unsubscribe_options;
  let $nearLocationsPoints, $$unsubscribe_nearLocationsPoints;
  let $$unsubscribe_page;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_poiReady = subscribe(poiReady, (value) => $poiReady = value);
  $$unsubscribe_allDocuments = subscribe(allDocuments, (value) => value);
  $$unsubscribe_newLocation = subscribe(newLocation, (value) => value);
  $$unsubscribe_options = subscribe(options, (value) => $options = value);
  $$unsubscribe_nearLocationsPoints = subscribe(nearLocationsPoints, (value) => $nearLocationsPoints = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  let srcGoogle = "https://maps.googleapis.com/maps/api/js?key=" + PUBLIC_GAPI;
  config.apiKey = PUBLIC_API_MAPTILER;
  Map.workerCount = 10;
  dayjs.locale("pl");
  set_store_value(poiReady, $poiReady = false, $poiReady);
  let map, mapContainer;
  let otherAdressMarkers = [], ready = false;
  nearLocationsPoints.set([]);
  function runM2_PRICE() {
    set_store_value(location, $location.params.M2_PRICE = Number($location.params.price / $location.params.POW).toFixed(2), $location);
  }
  function printOtherlocationPoints(tablePoints) {
    if (tablePoints.length > 0) {
      otherAdressMarkers.forEach((marker) => marker.remove());
      tablePoints.forEach((point) => {
        const marker = new Marker({ element: document.createElement("img") }).setLngLat([parseFloat(point.params.lon), parseFloat(point.params.lat)]).addTo(
          map
        );
        marker.getElement().src = "/images/POI/locationsDot.svg";
        marker.getElement().style.width = "15px";
        marker.getElement().style.height = "15px";
        otherAdressMarkers.push(marker);
      });
      let geo = convData2Geo(tablePoints);
      getBounds($location.params.poiGeodata.features.concat(geo.features), $location.params).then((dataCoor) => {
        dataCoor = [[dataCoor[0][0], dataCoor[0][1]], [dataCoor[1][0], dataCoor[1][1]]];
        window.dataCoor = dataCoor;
        map.fitBounds([[dataCoor[0][0], dataCoor[0][1]], [dataCoor[1][0], dataCoor[1][1]]], { padding: 80 });
      });
    }
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if ($location && $location.params && $location.params.POW) {
          runM2_PRICE();
        }
        if ($nearLocationsPoints && $nearLocationsPoints[0] && $nearLocationsPoints.length > 0) {
          printOtherlocationPoints($nearLocationsPoints);
          set_store_value(location, $location.params.page01.nearPoints = $nearLocationsPoints, $location);
        }
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-5hzu5h_START --><script${add_attribute("src", srcGoogle, 0)} async><\/script><!-- HEAD_svelte-5hzu5h_END -->`, ""}   <div class="content-block section page_01">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}  <div class="page_content">${!$location.adres ? `<div class="center">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>` : ``} ${$location.adres && ready == true ? `<div class="grid_content noselect"><h2 class="title_medium noselect" data-svelte-h="svelte-e9nt6g"><span class="number_type noselect">1</span> Lokalizacja</h2> <textarea class="lokalization_name" type="text" rows="auto">${escape($location.adres, false)}</textarea> ${``}</div> <div class="grid_content"><div class="backgr_rounded"><h2 class="title_medium noselect" data-svelte-h="svelte-1exs96m"><span class="number_type noselect">3</span>Wycena posiadłości</h2> ${validate_component(MaskInput, "MaskInput").$$render(
      $$result,
      {
        alwaysShowMask: true,
        mask: "000 000",
        class: "lokalization_price",
        value: $location.params.price.toString()
      },
      {},
      {}
    )} <span class="symbol" data-svelte-h="svelte-aeqywh">zł</span> <p class="noselect opis" data-svelte-h="svelte-hasn52">Ogólna wartość lokalu</p></div></div> <div class="grid_content"><h2 class="title_medium noselect" data-svelte-h="svelte-obc2s6"><span class="number_type noselect">2</span>Charakterystyka lokum</h2> <ul class="place_params"><li class="place_ noselect">Powierzchnia
						<input type="number" class="value m2class" style="right: 66px;"${add_attribute("value", $location.params.POW, 0)}> <span class="val_symbol"><!-- HTML_TAG_START -->${m2}<!-- HTML_TAG_END --></span></li> <li class="place_ noselect">Standard mieszkania

						${validate_component(EditableSelect, "EditableSelect").$$render(
      $$result,
      {
        editValue: true,
        selectedValue: $location.params.STANDARD,
        customValue: $location.params.STANDARD
      },
      {
        selectedValue: ($$value) => {
          $location.params.STANDARD = $$value;
          $$settled = false;
        },
        customValue: ($$value) => {
          $location.params.STANDARD = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${each(Object.entries($options.answers.STANDARD), ([val, name]) => {
            return `${$location.params.STANDARD == val ? `<option contenteditable="true"${add_attribute("value", val, 0)} ${$location.params.STANDARD == val ? "selected" : ""}>${escape(name)}</option>` : `<option contenteditable="true"${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
          })}`;
        }
      }
    )} </li> <li class="place_ noselect">Pokoje<input type="number" class="value"${add_attribute("value", $location.params.POKOJE, 0)}></li> <li class="place_ noselect"><p data-svelte-h="svelte-15e43kz">Dostępność jasnej, osobnej kuchni</p> <span><select>${each(Object.entries($options.answers.bool), ([val, name]) => {
      return `${$location.params.KUCHNIA == val ? `=
										<option${add_attribute("value", val, 0)} ${$location.params.KUCHNIA == val ? "selected" : ""}>${escape(name)}</option>` : `<option${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
    })}</select></span></li> <li class="place_ noselect"><p data-svelte-h="svelte-1xt9i3r">Balkon lub taras</p> <span><select>${each(Object.entries($options.answers.bool), ([val, name]) => {
      return `${$location.params.BALKON_TARAS == val ? `<option${add_attribute("value", val, 0)} ${$location.params.BALKON_TARAS == val ? "selected" : ""}>${escape(name)}</option>` : `<option${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
    })}</select></span></li> <li class="place_ noselect"><p data-svelte-h="svelte-10tmi09">Dostep do windy</p> <span><select>${each(Object.entries($options.answers.bool), ([val, name]) => {
      return `${$location.params.WINDA == val ? `=
										<option${add_attribute("value", val, 0)} ${$location.params.WINDA == val ? "selected" : ""}>${escape(name)}</option>` : `<option${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
    })}</select></span></li> <li class="place_ noselect"><p data-svelte-h="svelte-1gnjihv">Piwnica lub komórka lokatorska</p> <span><select>${each(Object.entries($options.answers.bool), ([val, name]) => {
      return `${$location.params.PIWNICA == val ? `=
										<option${add_attribute("value", val, 0)} ${$location.params.PIWNICA == val ? "selected" : ""}>${escape(name)}</option>` : `<option${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
    })}</select></span></li> <li class="place_ noselect"><p data-svelte-h="svelte-1t3kegi">Miejsce postojowe</p> <span><select>${each(Object.entries($options.answers.PARKING), ([val, name]) => {
      return `${$location.params.PARKING == val ? `=
										<option${add_attribute("value", val, 0)} ${$location.params.PARKING == val ? "selected" : ""}>${escape(name)}</option>` : `<option${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
    })}</select></span></li> <li class="place_ noselect"><p data-svelte-h="svelte-9nhi5f">Księga wieczysta</p> ${validate_component(EditableSelect, "EditableSelect").$$render(
      $$result,
      {
        editValue: true,
        selectedValue: $location.params.KSIEGA,
        customValue: $location.params.KSIEGA
      },
      {
        selectedValue: ($$value) => {
          $location.params.KSIEGA = $$value;
          $$settled = false;
        },
        customValue: ($$value) => {
          $location.params.KSIEGA = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${each(Object.entries($options.answers.KSIEGA), ([val, name]) => {
            return `${$location.params.KSIEGA == val ? `<option contenteditable="true"${add_attribute("value", val, 0)} ${$location.params.KSIEGA == val ? "selected" : ""}>${escape(name)}</option>` : `<option contenteditable="true"${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
          })}`;
        }
      }
    )}</li> <li class="place_ noselect"><p data-svelte-h="svelte-omu0cm">Rodzaj budynku</p> <span><select>${each(Object.entries($options.answers.RODZAJ), ([val, name]) => {
      return `${$location.params.RODZAJ == val ? `=
										<option${add_attribute("value", val, 0)} ${$location.params.RODZAJ == val ? "selected" : ""}>${escape(name)}</option>` : `<option${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
    })}</select></span></li> <li class="place_ noselect"><p data-svelte-h="svelte-vwy4x4">Rok powstania</p> ${validate_component(EditableSelect, "EditableSelect").$$render(
      $$result,
      {
        editValue: true,
        selectedValue: $location.params.ROK_POWSTANIA,
        customValue: $location.params.ROK_POWSTANIA
      },
      {
        selectedValue: ($$value) => {
          $location.params.ROK_POWSTANIA = $$value;
          $$settled = false;
        },
        customValue: ($$value) => {
          $location.params.ROK_POWSTANIA = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${each(Object.entries($options.answers.ROK_POWSTANIA), ([val, name]) => {
            return `${$location.params.ROK_POWSTANIA == val ? `<option contenteditable="true"${add_attribute("value", val, 0)} ${$location.params.ROK_POWSTANIA == val ? "selected" : ""}>${escape(name)}</option>` : `<option contenteditable="true"${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
          })}`;
        }
      }
    )}</li> <li class="place_ noselect">Liczba kondygnacji<input type="number" class="value"${add_attribute("value", $location.params.LICZBAKOND, 0)}></li> <li class="place_ noselect"><p data-svelte-h="svelte-1l1hnqd">Rynek</p> <span><select>${each(Object.entries($options.answers.RYNEK), ([val, name]) => {
      return `${$location.params.RYNEK == val ? `=
										<option${add_attribute("value", val, 0)} ${$location.params.RYNEK == val ? "selected" : ""}>${escape(name)}</option>` : `<option${add_attribute("value", val, 0)}>${escape(name)}</option>`}`;
    })}</select></span></li></ul></div> <div class="grid_content"><div class="podsumowanie"><p class="noselect opis1" contenteditable="true">${escape($location.params.M2_PRICE)} <span class="sign">zł/<!-- HTML_TAG_START -->${m2}<!-- HTML_TAG_END --></span></p> <p class="noselect opis2">Cena za <!-- HTML_TAG_START -->${m2}<!-- HTML_TAG_END --> mieszkania</p> <p class="noselect opis1">
						od
						<span class="from_price">${escape($location.params.FROM_PRICE)}</span>
						do
						<span class="to_price">${escape($location.params.TO_PRICE)}</span> <span class="sign">zł/<!-- HTML_TAG_START -->${m2}<!-- HTML_TAG_END --></span></p> <p class="noselect opis2" data-svelte-h="svelte-dwzpa2">Ogólna wartość lokalu</p></div> <div class="wniosek"><h2 class="title_medium noselect" data-svelte-h="svelte-4iu2q6"><span class="number_type noselect">4</span>Ogólny wniosek</h2> <p class="text" contenteditable="true">${escape($location.params.WNIOSEK)}</p></div></div>` : ``}</div> <div class="map-wrap"><div class="map" id="map"${add_attribute("this", mapContainer, 0)}></div></div> <div class="pageNumber" data-svelte-h="svelte-17t5swy">1</div></div> ${``} ${``} ${``}`;
  } while (!$$settled);
  $$unsubscribe_location();
  $$unsubscribe_poiReady();
  $$unsubscribe_allDocuments();
  $$unsubscribe_newLocation();
  $$unsubscribe_options();
  $$unsubscribe_nearLocationsPoints();
  $$unsubscribe_page();
  return $$rendered;
});
const Page02 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => value);
  $$unsubscribe_location();
  return `<div class="content-block section page_02">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${`<div class="center">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>`} <div class="pageNumber" data-svelte-h="svelte-1mzqszp">2</div> </div>`;
});
const DonutMultipleJ = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "" } = $$props;
  let { data = [] } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-15xdofe_START --><link rel="stylesheet" href="/css/donutMultiple.scss"><script src="http://d3js.org/d3.v6.min.js" charset="utf-8" data-svelte-h="svelte-snoie7"><\/script><!-- HEAD_svelte-15xdofe_END -->`, ""} <div class="bigWrapper"><div class="donutWrapper" aria-hidden><div class="donutTarget"${add_attribute("id", id, 0)}></div></div> ${``} </div>`;
});
const css$f = {
  code: ".opisText{transform-box:fill-box;transform-origin:center;dominant-baseline:central;transform:rotate(270deg);translate:0px -15px}#num.svelte-2dfg74{position:relative;border-radius:0px 0px 0 20px}#uniqueSvgId.svelte-2dfg74{margin-left:-30px;width:710px}.options.svelte-2dfg74{background-color:rgba(10, 10, 10, 0.02);width:50%;text-align:left;border-radius:0px 0px 20px 20px}",
  map: `{"version":3,"file":"Wykres.svelte","sources":["Wykres.svelte"],"sourcesContent":["<script>\\n\\timport { location } from '$lib/stores/appStore';\\n\\timport { onMount } from 'svelte';\\n\\timport Loading from '$lib/components/loading.svelte';\\n\\timport { dayjs } from 'svelte-time';\\n\\timport * as d3 from 'd3';\\n\\t// import { tick } from 'svelte';\\n\\n\\tlet margin = { top: 10, right: 0, bottom: 50, left: 60 },\\n\\t\\twidth = 800 - margin.left - margin.right,\\n\\t\\theight = 510 - margin.top - margin.bottom;\\n\\tlet mode;\\n\\tlet ready = false;\\n\\tlet datax = [];\\n\\tlet quarterRoman;\\n\\tlet qartals = [];\\n\\tlet newQuartals;\\n\\n\\tlet generateWykres = (datax) => {\\n\\t\\tlet m2P = $location.params.M2_PRICE;\\n\\t\\tfunction roundV(n, number) {\\n\\t\\t\\treturn Math.floor(Math.round(n / number) * number);\\n\\t\\t}\\n\\n\\t\\tvar svg = d3.select('#uniqueSvgId');\\n\\n\\t\\tif (svg.empty()) {\\n\\t\\t\\treturn false;\\n\\t\\t}\\n\\n\\t\\t(margin = { top: 20, right: 20, bottom: 30, left: 50 }),\\n\\t\\t\\t(width = +svg.attr('width') - margin.left - margin.right),\\n\\t\\t\\t(height = +svg.attr('height') - margin.top - margin.bottom);\\n\\n\\t\\tvar x = d3.scaleBand().range([0, width]).padding(0.1);\\n\\t\\tvar y = d3.scaleLinear().rangeRound([height, 0]).nice();\\n\\n\\t\\tlet m2PriceY = y(m2P);\\n\\n\\t\\tvar yAxis = d3\\n\\t\\t\\t.axisLeft(y)\\n\\t\\t\\t.tickFormat((d) => \`\${d} zł.\`)\\n\\t\\t\\t.ticks(10);\\n\\n\\t\\tvar xAxis = d3.axisBottom(x);\\n\\n\\t\\tvar line = d3\\n\\t\\t\\t.line()\\n\\t\\t\\t.x(function (d) {\\n\\t\\t\\t\\treturn x(d.timeLabel) + x.bandwidth() / 2;\\n\\t\\t\\t})\\n\\t\\t\\t.y(function (d) {\\n\\t\\t\\t\\treturn y(d.value);\\n\\t\\t\\t});\\n\\n\\t\\tvar labels = datax.map(function (d) {\\n\\t\\t\\treturn d.timeLabel;\\n\\t\\t});\\n\\n\\t\\tsvg.selectAll('*').remove(); // Usunięcie poprzednich elementów\\n\\n\\t\\tvar g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');\\n\\n\\t\\tx.domain(labels);\\n\\n\\t\\tlet actualValue = $location.params.M2_PRICE;\\n\\t\\tlet dataY = datax.slice();\\n\\t\\tlet isActualPresent = dataY.some(function (d) {\\n\\t\\t\\treturn d.timeLabel === 'actual';\\n\\t\\t});\\n\\t\\tif (!isActualPresent) {\\n\\t\\t\\tlet tempo = {\\n\\t\\t\\t\\ttimeLabel: 'actual',\\n\\t\\t\\t\\tvalue: actualValue // Ustaw aktualną wartość\\n\\t\\t\\t};\\n\\t\\t\\tdataY.push(tempo);\\n\\t\\t}\\n\\t\\tlet maxValue = d3.max(dataY, function (d) {\\n\\t\\t\\treturn d.timeLabel !== 'actual' ? d.value : null;\\n\\t\\t});\\n\\t\\tif (actualValue > maxValue) {\\n\\t\\t\\tmaxValue = actualValue;\\n\\t\\t}\\n\\n\\t\\ty.domain([0, maxValue]);\\n\\n\\t\\t// y.domain([\\n\\t\\t// \\t0,\\n\\t\\t// \\td3.max(datax, function (d) {\\n\\n\\t\\t// \\t\\treturn d.value;\\n\\t\\t// \\t})\\n\\t\\t// ]);\\n\\n\\t\\tg.append('g')\\n\\t\\t\\t.attr('class', 'axis axis--x')\\n\\t\\t\\t.attr('transform', 'translate(0,' + height + ')')\\n\\t\\t\\t.call(xAxis);\\n\\n\\t\\tg.append('g').attr('class', 'axis axis--y').call(yAxis);\\n\\n\\t\\t// LINIA ŁACZACA PUNKTY\\n\\n\\t\\tg.append('path')\\n\\t\\t\\t.datum(datax)\\n\\t\\t\\t.attr('class', 'line')\\n\\t\\t\\t.attr('fill', 'none')\\n\\t\\t\\t.attr('stroke', 'var(--brand-green)')\\n\\t\\t\\t.attr('stroke-width', 3)\\n\\t\\t\\t.attr('d', line);\\n\\n\\t\\t// PUNKTY NA WYKRESIE\\n\\n\\t\\tg.selectAll('.dot')\\n\\t\\t\\t.data(datax)\\n\\t\\t\\t.enter()\\n\\t\\t\\t.append('circle')\\n\\t\\t\\t.attr('class', ['dot_wk'])\\n\\t\\t\\t.attr('id', (d, i) => 'dot_wk_' + i) // Dodaj unikalne ID do punktów\\n\\t\\t\\t.attr('r', 5)\\n\\t\\t\\t.attr('cx', function (d) {\\n\\t\\t\\t\\treturn x(d.timeLabel) + x.bandwidth() / 2;\\n\\t\\t\\t})\\n\\t\\t\\t.attr('cy', function (d) {\\n\\t\\t\\t\\treturn y(d.value);\\n\\t\\t\\t})\\n\\t\\t\\t.style('fill', 'white')\\n\\t\\t\\t.style('stroke-width', 2)\\n\\t\\t\\t.style('stroke', 'var(--brand-green)')\\n\\t\\t\\t.style('cursor', 'pointer')\\n\\t\\t\\t.call(d3.drag().on('drag', dragg));\\n\\n\\t\\tg.selectAll('.dot')\\n\\t\\t\\t.data(datax)\\n\\t\\t\\t.enter()\\n\\t\\t\\t.append('text')\\n\\t\\t\\t.attr('class', 'dot-label')\\n\\t\\t\\t.attr('id', (d, i) => 'dot-label_' + i) // Dodaj unikalne ID do opisów\\n\\t\\t\\t.attr('x', function (d) {\\n\\t\\t\\t\\treturn x(d.timeLabel) + x.bandwidth() / 2;\\n\\t\\t\\t})\\n\\n\\t\\t\\t.attr('y', function (d, i) {\\n\\t\\t\\t\\tconst dot = d3.select('#dot_wk_' + i);\\n\\t\\t\\t\\tconst isCloseToXAxis = y(d.value) < 60; // Dostosuj tę wartość do swoich potrzeb\\n\\n\\t\\t\\t\\tif (isCloseToXAxis) {\\n\\t\\t\\t\\t\\tconsole.log(isCloseToXAxis);\\n\\t\\t\\t\\t\\treturn y(d.value) + 45;\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\treturn y(d.value) - 30;\\n\\t\\t\\t\\t}\\n\\t\\t\\t})\\n\\t\\t\\t.text(function (d) {\\n\\t\\t\\t\\tconst numericValue = parseFloat(d.value);\\n\\t\\t\\t\\treturn isNaN(numericValue) ? d.value : numericValue.toFixed(2);\\n\\t\\t\\t})\\n\\t\\t\\t.style('text-anchor', 'middle')\\n\\t\\t\\t.style('font-size', '12px')\\n\\t\\t\\t.classed('opisText', true);\\n\\n\\t\\tlet lastDotX = parseFloat(d3.select('.dot_wk:last-of-type').attr('cx')) + 19.5;\\n\\n\\t\\tsvg\\n\\t\\t\\t.append('line')\\n\\t\\t\\t.classed('dashed-line', true)\\n\\t\\t\\t.attr('x1', 70)\\n\\t\\t\\t.attr('y1', y(m2P) + 20)\\n\\t\\t\\t.attr('y2', y(m2P) + 20)\\n\\n\\t\\t\\t.attr('x2', width - 14)\\n\\t\\t\\t.style('stroke', '#0399a6')\\n\\t\\t\\t.style('stroke-dasharray', '8,5');\\n\\n\\t\\tg.append('circle')\\n\\t\\t\\t.attr('class', 'dot_wk_current')\\n\\t\\t\\t.attr('cx', lastDotX - 20) // Ustaw punkt na końcu osi X\\n\\t\\t\\t.attr('cy', y(m2P)) // Ustaw punkt na wysokości linii kropkowanej\\n\\t\\t\\t.attr('r', 5)\\n\\t\\t\\t.style('fill', '#0399a6')\\n\\t\\t\\t.style('stroke-width', 2)\\n\\t\\t\\t.style('stroke', '#0399a6')\\n\\t\\t\\t.raise();\\n\\n\\t\\tg.append('text')\\n\\t\\t\\t.attr('x', lastDotX - 10)\\n\\t\\t\\t.attr('y', y(m2P))\\n\\t\\t\\t.text('TO MIESZKANIE')\\n\\t\\t\\t.style('fill', '#0399a6')\\n\\t\\t\\t.style('font-size', '9px'); // Kolor tekstu\\n\\n\\t\\tg.append('text')\\n\\t\\t\\t.attr('x', lastDotX - 10)\\n\\t\\t\\t.attr('y', y(m2P) + 20) // Dostosuj pozycję tekstu\\n\\t\\t\\t.text(m2P)\\n\\t\\t\\t.style('fill', '#0399a6')\\n\\t\\t\\t.style('font-size', '10px'); // Kolor tekstu\\n\\n\\t\\tfunction dragg(event) {\\n\\t\\t\\t\\n\\n\\t\\t\\tif (event.dy) {\\n\\t\\t\\t\\tlet svg = document.getElementById('uniqueSvgId');\\n\\t\\t\\t\\tlet svgPoint = svg.createSVGPoint();\\n\\t\\t\\t\\tsvgPoint.x = event.x;\\n\\t\\t\\t\\tsvgPoint.y = event.y;\\n\\n\\t\\t\\t\\tlet screenCTM = svg.getScreenCTM();\\n\\t\\t\\t\\tlet invertedSVGPoint = svgPoint.matrixTransform(screenCTM.inverse());\\n\\n\\t\\t\\t\\tlet newValue = y.invert(invertedSVGPoint.y);\\n\\n\\t\\t\\t\\tif (newValue >= 0) {\\n\\t\\t\\t\\t\\tevent.subject.value = roundV(newValue, 50);\\n\\t\\t\\t\\t\\tupdateDataValue(event.subject);\\n\\t\\t\\t\\t\\tgenerateWykres(datax);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\tfunction updateDataValue(point) {\\n\\t\\t\\tvar index = datax.findIndex(function (d) {\\n\\t\\t\\t\\treturn d === point;\\n\\t\\t\\t});\\n\\n\\t\\t\\t// console.log(\\"updateDataValue\\",index,point );\\n\\n\\t\\t\\tif (index !== -1) {\\n\\t\\t\\t\\tdatax[index].value = point.value;\\n\\t\\t\\t\\t// console.log('update data value: ' + point.value);\\n\\t\\t\\t\\t$location.params.page03.wykresData = datax;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn true;\\n\\t};\\n\\n\\tconst getRomanNumeral = (num) => {\\n\\t\\tconst romanNumerals = ['I', 'II', 'III', 'IV'];\\n\\t\\treturn romanNumerals[num - 1] || num.toString();\\n\\t};\\n\\n\\tasync function updateWykres() {\\n\\t\\tif ($location.params && $location.params.M2_PRICE > 0 && $location.params.page03.numOfQ) {\\n\\t\\t\\tif ($location.params.page03.wykresData[1]) {\\n\\t\\t\\t\\tdatax = $location.params.page03.wykresData;\\n\\t\\t\\t\\tmode = 'edit';\\n\\t\\t\\t\\tready = true;\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tmode = 'create';\\n\\t\\t\\t\\tready = true;\\n\\t\\t\\t\\tcalculateQuart($location.params.page03.numOfQ);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n\\n\\tfunction calculateQuart(nOfQuart) {\\n\\t\\tqartals = [];\\n\\n\\t\\tfor (let i = 0; i < nOfQuart; i++) {\\n\\t\\t\\tlet date = dayjs().subtract(i * 3, 'month');\\n\\t\\t\\tlet quarter = Math.floor(date.month() / 3) + 1;\\n\\t\\t\\tlet year = date.year();\\n\\t\\t\\tquarterRoman = getRomanNumeral(quarter);\\n\\t\\t\\tlet quarterLabel = \`\${quarterRoman} kw. \${year}\`;\\n\\t\\t\\tqartals.push({ timeLabel: quarterLabel, value: 5500 });\\n\\t\\t}\\n\\n\\t\\tqartals = qartals.reverse();\\n\\n\\t\\tif (datax) {\\n\\t\\t\\tdatax.forEach((d) => {\\n\\t\\t\\t\\tconst index = qartals.findIndex((element) => element.timeLabel === d.timeLabel);\\n\\n\\t\\t\\t\\tif (index !== -1) {\\n\\t\\t\\t\\t\\tqartals[index].value = parseFloat(d.value).toFixed(2);\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\t\\t}\\n\\t\\tdatax = qartals; // Zwróć tablicę na zewnątrz funkcji\\n\\t\\tgenerateWykres(datax);\\n\\t}\\n\\n\\tonMount(async () => {\\n\\t\\tupdateWykres();\\n\\t});\\n\\n\\t$: {\\n\\t\\tif ($location && $location.params && ready == false) {\\n\\t\\t\\tupdateWykres();\\n\\t\\t}\\n\\t}\\n\\n<\/script>\\n\\n{#if ready == false}\\n\\t<Loading />\\n{:else if ready == true}\\n\\t<svg id=\\"uniqueSvgId\\" width=\\"700\\" height=\\"340\\" />\\n\\n\\t<div class=\\"options\\">\\n\\t\\t<input\\n\\t\\t\\tid=\\"num\\"\\n\\t\\t\\ttype=\\"number\\"\\n\\t\\t\\tmin=\\"1\\"\\n\\t\\t\\tmax=\\"20\\"\\n\\t\\t\\tstep=\\"1\\"\\n\\t\\t\\tbind:value={$location.params.page03.numOfQ}\\n\\t\\t\\ton:change={() => calculateQuart($location.params.page03.numOfQ)} />\\n\\t\\t<!-- <button id=\\"akt\\" on:click={() => calculateQuart($location.params.page03.numOfQ)}\\n\\t\\t\\t>Uaktualnij kwartały</button\\n\\t\\t> -->\\n\\t\\t<!-- <button id=\\"updateWyk\\" on:click={() => updateWykres()}\\n\\t\\t\\t>Uaktualnij wykres</button\\n\\t\\t> -->\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t:global(.opisText) {\\n\\t\\ttransform-box: fill-box;\\n\\t\\ttransform-origin: center;\\n\\t\\tdominant-baseline: central;\\n\\t\\ttransform: rotate(270deg);\\n\\t\\ttranslate: 0px -15px;\\n\\t}\\n\\t.options button {\\n\\t\\tborder-radius: 12px;\\n\\t\\ttransition: all 0.2s ease-out;\\n\\t\\tfont-size: 12px;\\n\\t\\tpadding: 10px;\\n\\t}\\n\\t#num {\\n\\t\\tposition: relative;\\n\\t\\tborder-radius: 0px 0px 0 20px;\\n\\t}\\n\\tbutton:hover {\\n\\t\\tcolor: white !important;\\n\\t\\tbackground-color: rgba(10, 10, 10, 0.2);\\n\\t}\\n\\t#uniqueSvgId {\\n\\t\\t/* background-color: rgba(10, 10, 10, 0.02); */\\n\\t\\t/* border-radius: 20px 20px 20px 0px; */\\n\\t\\tmargin-left: -30px;\\n    width: 710px;\\n\\t}\\n\\n\\t.options {\\n\\t\\tbackground-color: rgba(10, 10, 10, 0.02);\\n\\t\\twidth: 50%;\\n\\t\\ttext-align: left;\\n\\t\\tborder-radius: 0px 0px 20px 20px;\\n\\t}\\n\\t:global(text.dot-label) {\\n\\t}\\n\\n</style>\\n"],"names":[],"mappings":"AA8TS,SAAW,CAClB,aAAa,CAAE,QAAQ,CACvB,gBAAgB,CAAE,MAAM,CACxB,iBAAiB,CAAE,OAAO,CAC1B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,SAAS,CAAE,GAAG,CAAC,KAChB,CAOA,kBAAK,CACJ,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAC1B,CAKA,0BAAa,CAGZ,WAAW,CAAE,KAAK,CAChB,KAAK,CAAE,KACV,CAEA,sBAAS,CACR,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CACxC,KAAK,CAAE,GAAG,CACV,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,IAC7B"}`
};
const Wykres = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  let margin = { top: 10, right: 0, bottom: 50, left: 60 }, width = 800 - margin.left - margin.right, height = 510 - margin.top - margin.bottom;
  let ready = false;
  let datax = [];
  let quarterRoman;
  let qartals = [];
  let generateWykres = (datax2) => {
    let m2P = $location.params.M2_PRICE;
    function roundV(n, number) {
      return Math.floor(Math.round(n / number) * number);
    }
    var svg = d3.select("#uniqueSvgId");
    if (svg.empty()) {
      return false;
    }
    margin = { top: 20, right: 20, bottom: 30, left: 50 }, width = +svg.attr("width") - margin.left - margin.right, height = +svg.attr("height") - margin.top - margin.bottom;
    var x = d3.scaleBand().range([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]).nice();
    y(m2P);
    var yAxis = d3.axisLeft(y).tickFormat((d) => `${d} zł.`).ticks(10);
    var xAxis = d3.axisBottom(x);
    var line = d3.line().x(function(d) {
      return x(d.timeLabel) + x.bandwidth() / 2;
    }).y(function(d) {
      return y(d.value);
    });
    var labels = datax2.map(function(d) {
      return d.timeLabel;
    });
    svg.selectAll("*").remove();
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(labels);
    let actualValue = $location.params.M2_PRICE;
    let dataY = datax2.slice();
    let isActualPresent = dataY.some(function(d) {
      return d.timeLabel === "actual";
    });
    if (!isActualPresent) {
      let tempo = {
        timeLabel: "actual",
        value: actualValue
        // Ustaw aktualną wartość
      };
      dataY.push(tempo);
    }
    let maxValue = d3.max(dataY, function(d) {
      return d.timeLabel !== "actual" ? d.value : null;
    });
    if (actualValue > maxValue) {
      maxValue = actualValue;
    }
    y.domain([0, maxValue]);
    g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(xAxis);
    g.append("g").attr("class", "axis axis--y").call(yAxis);
    g.append("path").datum(datax2).attr("class", "line").attr("fill", "none").attr("stroke", "var(--brand-green)").attr("stroke-width", 3).attr("d", line);
    g.selectAll(".dot").data(datax2).enter().append("circle").attr("class", ["dot_wk"]).attr("id", (d, i) => "dot_wk_" + i).attr(
      "r",
      5
    ).attr("cx", function(d) {
      return x(d.timeLabel) + x.bandwidth() / 2;
    }).attr("cy", function(d) {
      return y(d.value);
    }).style("fill", "white").style("stroke-width", 2).style("stroke", "var(--brand-green)").style("cursor", "pointer").call(d3.drag().on("drag", dragg));
    g.selectAll(".dot").data(datax2).enter().append("text").attr("class", "dot-label").attr("id", (d, i) => "dot-label_" + i).attr(
      "x",
      function(d) {
        return x(d.timeLabel) + x.bandwidth() / 2;
      }
    ).attr("y", function(d, i) {
      d3.select("#dot_wk_" + i);
      const isCloseToXAxis = y(d.value) < 60;
      if (isCloseToXAxis) {
        console.log(isCloseToXAxis);
        return y(d.value) + 45;
      } else {
        return y(d.value) - 30;
      }
    }).text(function(d) {
      const numericValue = parseFloat(d.value);
      return isNaN(numericValue) ? d.value : numericValue.toFixed(2);
    }).style("text-anchor", "middle").style("font-size", "12px").classed("opisText", true);
    let lastDotX = parseFloat(d3.select(".dot_wk:last-of-type").attr("cx")) + 19.5;
    svg.append("line").classed("dashed-line", true).attr("x1", 70).attr("y1", y(m2P) + 20).attr("y2", y(m2P) + 20).attr("x2", width - 14).style("stroke", "#0399a6").style("stroke-dasharray", "8,5");
    g.append("circle").attr("class", "dot_wk_current").attr("cx", lastDotX - 20).attr(
      "cy",
      y(m2P)
      // Ustaw punkt na wysokości linii kropkowanej
    ).attr("r", 5).style("fill", "#0399a6").style("stroke-width", 2).style("stroke", "#0399a6").raise();
    g.append("text").attr("x", lastDotX - 10).attr("y", y(m2P)).text("TO MIESZKANIE").style("fill", "#0399a6").style("font-size", "9px");
    g.append("text").attr("x", lastDotX - 10).attr("y", y(m2P) + 20).text(
      m2P
    ).style("fill", "#0399a6").style("font-size", "10px");
    function dragg(event) {
      if (event.dy) {
        let svg2 = document.getElementById("uniqueSvgId");
        let svgPoint = svg2.createSVGPoint();
        svgPoint.x = event.x;
        svgPoint.y = event.y;
        let screenCTM = svg2.getScreenCTM();
        let invertedSVGPoint = svgPoint.matrixTransform(screenCTM.inverse());
        let newValue = y.invert(invertedSVGPoint.y);
        if (newValue >= 0) {
          event.subject.value = roundV(newValue, 50);
          updateDataValue(event.subject);
          generateWykres(datax2);
        }
      }
    }
    function updateDataValue(point) {
      var index = datax2.findIndex(function(d) {
        return d === point;
      });
      if (index !== -1) {
        datax2[index].value = point.value;
        set_store_value(location, $location.params.page03.wykresData = datax2, $location);
      }
    }
    return true;
  };
  const getRomanNumeral = (num) => {
    const romanNumerals = ["I", "II", "III", "IV"];
    return romanNumerals[num - 1] || num.toString();
  };
  async function updateWykres() {
    if ($location.params && $location.params.M2_PRICE > 0 && $location.params.page03.numOfQ) {
      if ($location.params.page03.wykresData[1]) {
        datax = $location.params.page03.wykresData;
        ready = true;
      } else {
        ready = true;
        calculateQuart($location.params.page03.numOfQ);
      }
    }
  }
  function calculateQuart(nOfQuart) {
    qartals = [];
    for (let i = 0; i < nOfQuart; i++) {
      let date = dayjs().subtract(i * 3, "month");
      let quarter = Math.floor(date.month() / 3) + 1;
      let year = date.year();
      quarterRoman = getRomanNumeral(quarter);
      let quarterLabel = `${quarterRoman} kw. ${year}`;
      qartals.push({ timeLabel: quarterLabel, value: 5500 });
    }
    qartals = qartals.reverse();
    if (datax) {
      datax.forEach((d) => {
        const index = qartals.findIndex((element) => element.timeLabel === d.timeLabel);
        if (index !== -1) {
          qartals[index].value = parseFloat(d.value).toFixed(2);
        }
      });
    }
    datax = qartals;
    generateWykres(datax);
  }
  $$result.css.add(css$f);
  {
    {
      if ($location && $location.params && ready == false) {
        updateWykres();
      }
    }
  }
  $$unsubscribe_location();
  return `${ready == false ? `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}` : `${ready == true ? `<svg id="uniqueSvgId" width="700" height="340" class="svelte-2dfg74"></svg> <div class="options svelte-2dfg74"><input id="num" type="number" min="1" max="20" step="1" class="svelte-2dfg74"${add_attribute("value", $location.params.page03.numOfQ, 0)}>  </div>` : ``}`}`;
});
const css$e = {
  code: ".pageNumber.svelte-167dqpw{background-color:transparent;margin-top:-64px;margin-left:-543px}",
  map: `{"version":3,"file":"page03.svelte","sources":["page03.svelte"],"sourcesContent":["<script>\\n\\timport Header from '$lib/components/header.svelte';\\n\\timport Loading from '$lib/components/loading.svelte';\\n\\timport { location, data, newLocation } from '$lib/stores/appStore';\\n\\timport DonutMultiple from '$lib/components/DonutMultipleJ.svelte';\\n\\timport Wykres from '$lib/components/Wykres.svelte';\\n\\n\\n\\n\\n\\n<\/script>\\n\\n<div class=\\"content-block section page_03\\">\\n\\t<Header />\\n\\n\\t{#if !$location.params}\\n\\t\\t<div class=\\"center\\"><Loading /></div>\\n\\t{/if}\\n\\n\\t{#if $location.adres}\\n\\t\\t<div class=\\"page_content\\">\\n\\t\\t\\t<div class=\\"grid_content noselect full\\">\\n\\t\\t\\t\\t<h2 class=\\"title_medium noselect\\">\\n\\t\\t\\t\\t\\t<span class=\\"number_type noselect\\">8</span> Wykaz średnich cen sprzedaży nieruchomości w\\n\\t\\t\\t\\t\\todniesieniu do miasta\\n\\t\\t\\t\\t\\t<span\\n\\t\\t\\t\\t\\t\\tstyle=\\"    color: var(--brand-green);\\n\\t\\t\\t\\tfont-size: 1.2em;\\">{$location.adres} - {$location.params.price}</span\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t</h2>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t{#if !$location.params.M2_price && $location.params.M2_PRICE == 0}\\n\\t\\t\\t\\t<div class=\\"center\\">\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t<Loading />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\n\\t\\t\\t\\t<Wykres />\\n\\t\\t\\t{/if}\\n\\n\\t\\t\\t<div />\\n\\n\\t\\t\\t<div class=\\"grid_content noselect centered full\\" />\\n\\n\\t\\t\\t<br>\\n\\t\\t\\t<h2 class=\\"title_medium noselect\\">\\n\\t\\t\\t\\t<span class=\\"number_type noselect\\">9</span>\\n\\t\\t\\t\\tPrezentacja cen sprzedaży nieruchomości w mieście\\n\\t\\t\\t\\t<span style=\\"    color: var(--brand-green);\\">{$location.adres}</span>\\n\\t\\t\\t</h2>\\n\\n\\t\\t\\t<div class=\\"grid_content noselect centered full\\">\\n\\t\\t\\t\\t<DonutMultiple data={$location.params.page03.data1} id={'id1'} />\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<h2 class=\\"title_medium noselect\\">\\n\\t\\t\\t\\t<span class=\\"number_type noselect\\">10</span>\\n\\t\\t\\t\\tZestawienie sprzedawanych mieszkań w mieście\\n\\t\\t\\t\\t<span style=\\"    color: var(--brand-green);\\">{$location.adres}</span><br />z podziałem na\\n\\t\\t\\t\\tpowierzchnie\\n\\t\\t\\t</h2>\\n\\n\\t\\t\\t<div class=\\"grid_content noselect centered full\\">\\n\\t\\t\\t\\t<DonutMultiple data={$location.params.page03.data2} id={'id2'} />\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<div class=\\"pageNumber\\">3</div>\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n\\n<svelte:head>\\n\\t<link rel=\\"stylesheet\\" href=\\"/css/donut.scss\\" />\\n</svelte:head>\\n\\n<style type=\\"scss\\">\\n\\t.pageNumber {\\n\\t\\tbackground-color: transparent;\\n\\t\\tmargin-top: -64px;\\n\\t\\tmargin-left: -543px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+EC,0BAAY,CACX,gBAAgB,CAAE,WAAW,CAC7B,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,MACd"}`
};
const Page03 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$result.css.add(css$e);
  $$unsubscribe_location();
  return `<div class="content-block section page_03">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${!$location.params ? `<div class="center">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>` : ``} ${$location.adres ? `<div class="page_content"><div class="grid_content noselect full"><h2 class="title_medium noselect"><span class="number_type noselect" data-svelte-h="svelte-1utsf6q">8</span> Wykaz średnich cen sprzedaży nieruchomości w
					odniesieniu do miasta
					<span style="color: var(--brand-green); font-size: 1.2em;">${escape($location.adres)} - ${escape($location.params.price)}</span></h2></div> ${!$location.params.M2_price && $location.params.M2_PRICE == 0 ? `<div class="center">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>` : `${validate_component(Wykres, "Wykres").$$render($$result, {}, {}, {})}`} <div></div> <div class="grid_content noselect centered full"></div> <br> <h2 class="title_medium noselect"><span class="number_type noselect" data-svelte-h="svelte-yo6vjx">9</span>
				Prezentacja cen sprzedaży nieruchomości w mieście
				<span style="color: var(--brand-green);">${escape($location.adres)}</span></h2> <div class="grid_content noselect centered full">${validate_component(DonutMultipleJ, "DonutMultiple").$$render(
    $$result,
    {
      data: $location.params.page03.data1,
      id: "id1"
    },
    {},
    {}
  )}</div> <h2 class="title_medium noselect"><span class="number_type noselect" data-svelte-h="svelte-1i149h9">10</span>
				Zestawienie sprzedawanych mieszkań w mieście
				<span style="color: var(--brand-green);">${escape($location.adres)}</span><br>z podziałem na
				powierzchnie</h2> <div class="grid_content noselect centered full">${validate_component(DonutMultipleJ, "DonutMultiple").$$render(
    $$result,
    {
      data: $location.params.page03.data2,
      id: "id2"
    },
    {},
    {}
  )}</div> <div class="pageNumber svelte-167dqpw" data-svelte-h="svelte-5zxgt4">3</div></div>` : ``}</div> ${$$result.head += `<!-- HEAD_svelte-fhg3d3_START --><link rel="stylesheet" href="/css/donut.scss"><!-- HEAD_svelte-fhg3d3_END -->`, ""}`;
});
const css$d = {
  code: ".svg-itema .car, .svg-itema .bus, .svg-itema .bike{transform:matrix(1, 0, 0, 1, 0, 11)}.POIelement .svg-itema svg{width:305px;height:146px !important;position:relative;display:block}@keyframes svelte-kschxs-donut1{0%{opacity:0}100%{opacity:1}}",
  map: `{"version":3,"file":"DistanceElement.svelte","sources":["DistanceElement.svelte"],"sourcesContent":["<script>\\n\\timport { draw } from 'svelte/transition';\\n\\timport { quintOut } from 'svelte/easing';\\n\\n\\texport let poiName = 'Galeria Reszowska';\\n\\texport let poiCity = 'Rzeszów';\\n\\texport let poiDistanceCar, poiDistanceBus, poiDistanceBike;\\n\\texport let color = '#2181b3';\\n\\t\\n\\n\\tconsole.log ('color',color);\\n\\n\\n\\n<\/script>\\n\\n<svelte:head />\\n\\n<div class=\\"svg-itema\\">\\n\\t<svg\\n\\t\\tversion=\\"1.1\\"\\n\\t\\tid=\\"Warstwa_1\\"\\n\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\txmlns:xlink=\\"http://www.w3.org/1999/xlink\\"\\n\\t\\tx=\\"120px\\"\\n\\t\\ty=\\"0px\\"\\n\\t\\twidth=\\"220px\\"\\n\\t\\theight=\\"90px\\"\\n\\t\\tviewBox=\\"-20 0 213 79.8\\"\\n\\t\\tstyle=\\"enable-background:new 0 0 220 90;\\"\\n\\t\\txml:space=\\"preserve\\"\\n\\t>\\n\\t\\t<g>\\n\\t\\t\\t<polygon\\n\\t\\t\\t\\tfill=\\"#2181b3\\" \\n\\t\\t\\t\\tpoints=\\"46.2,63.1 -20,63.1 -20,28.3 -19.2,28.3 -19.2,62.3 46.2,62.3 \\"\\n\\t\\t\\t/>\\n\\t\\t</g>\\n\\n\\t\\t<!-- BUS  -->\\n\\t\\t{#if poiDistanceBus}\\n\\t\\t\\t<g class=\\"bus\\">\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#084A96\\"\\n\\t\\t\\t\\t\\t\\td=\\"M98.7,36.2v-1.7c0-0.6-0.5-1.2-1.2-1.2H86.2c-0.2,0-0.3,0.1-0.3,0.3v2.6c0,0.2,0.1,0.3,0.3,0.3h12.1\\n\\t\\t\\t\\tC98.5,36.6,98.7,36.4,98.7,36.2 M88.7,35.9h-2.2V34h2.2V35.9z M92.8,35.9h-3.5V34h3.5V35.9z M98,35.9h-4.5V34h4\\n\\t\\t\\t\\tc0.3,0,0.5,0.2,0.5,0.5V35.9z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#084A96\\"\\n\\t\\t\\t\\t\\t\\td=\\"M101.7,35.5l-1.1-0.9c-0.1-1.6-1.4-2.9-3-2.9H84.4c-0.2,0-0.3,0.1-0.3,0.3v8.6c0,0.2,0.1,0.3,0.3,0.3h1.6\\n\\t\\t\\t\\tc0.2,0.8,0.9,1.4,1.7,1.4c0.8,0,1.5-0.6,1.7-1.4h3.6c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-3.6c-0.2-0.8-0.9-1.4-1.7-1.4\\n\\t\\t\\t\\tc-0.8,0-1.5,0.6-1.7,1.4h-1.2v-2.1h3.8c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-3.8v-5.1h12.8c1.3,0,2.4,1.1,2.4,2.4\\n\\t\\t\\t\\tc0,0.1,0,0.2,0.1,0.3l1.1,0.9v1.6h-9.4c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h9.4v2.1h-2.8c-0.2-0.8-0.9-1.4-1.7-1.4\\n\\t\\t\\t\\tc-0.8,0-1.5,0.6-1.7,1.4h-0.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3H95c0.2,0.8,0.9,1.4,1.7,1.4c0.8,0,1.5-0.6,1.7-1.4\\n\\t\\t\\t\\th3.1c0.2,0,0.3-0.1,0.3-0.3v-4.8C101.8,35.7,101.7,35.6,101.7,35.5 M86.6,40.6c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1\\n\\t\\t\\t\\tc0,0.6-0.5,1.1-1.1,1.1C87,41.6,86.6,41.2,86.6,40.6C86.6,40.6,86.6,40.6,86.6,40.6z M96.7,41.6c-0.6,0-1.1-0.5-1.1-1.1\\n\\t\\t\\t\\tc0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C97.7,41.2,97.2,41.6,96.7,41.6z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#084A96\\"\\n\\t\\t\\t\\t\\t\\td=\\"M89.7,37.5c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h0.9c0.2,0,0.3-0.1,0.3-0.3\\n\\t\\t\\t\\tc0-0.2-0.1-0.3-0.3-0.3H89.7z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#084A96\\"\\n\\t\\t\\t\\t\\t\\td=\\"M87.6,40.9c0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2-0.1-0.2c-0.1-0.1-0.1-0.1-0.2-0.1\\n\\t\\t\\t\\tc-0.1,0-0.2,0-0.2,0.1c-0.1,0.1-0.1,0.1-0.1,0.2c0,0.1,0,0.2,0.1,0.2C87.5,40.9,87.5,40.9,87.6,40.9\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#084A96\\"\\n\\t\\t\\t\\t\\t\\td=\\"M96.7,40.2c-0.1,0-0.2,0-0.2,0.1c-0.1,0.1-0.1,0.1-0.1,0.2c0,0.1,0,0.2,0.1,0.2c0.1,0.1,0.1,0.1,0.2,0.1\\n\\t\\t\\t\\tc0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2-0.1-0.2C96.8,40.3,96.7,40.2,96.7,40.2\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#FFFFFF\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M95.6,47.6l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.7,1,2.6,2.7,2.6,4.5h0v11.1c0,2.1-1.3,3.9-3.1,4.8\\n\\t\\t\\t\\t\\tl-4.4,2.5l0,0l-4.8,2.8c-1.7,1-3.7,0.9-5.3,0L85.5,76c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.7-1-2.6-2.7-2.6-4.5h0V57.6\\n\\t\\t\\t\\t\\tc0-2.1,1.3-3.9,3.1-4.8l4.4-2.5l0,0l4.8-2.8C92,46.5,94,46.6,95.6,47.6z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#00336E\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M92.9,79.8c-1,0-1.9-0.3-2.8-0.8l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.6-0.9-2.6-2.6-2.7-4.5h0\\n\\t\\t\\t\\t\\tl0-0.3V57.6c0-2.2,1.3-4.1,3.2-5l9.2-5.3c1.7-1,3.9-1,5.6,0l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.6,0.9,2.6,2.6,2.7,4.5h0\\n\\t\\t\\t\\t\\tl0,0.3v11.1c0,2.2-1.3,4.1-3.2,5L95.7,79C94.8,79.5,93.9,79.8,92.9,79.8z M78.3,68.4l0,0.3c0,1.8,0.9,3.4,2.5,4.3l4.5,2.6\\n\\t\\t\\t\\t\\tc0.1,0.1,0.2,0.1,0.3,0.2l4.8,2.7c1.5,0.9,3.5,0.9,5,0l9.2-5.3c1.8-0.8,2.9-2.6,2.9-4.5l0-11.1c0-1.8-0.9-3.4-2.5-4.3l-4.5-2.6\\n\\t\\t\\t\\t\\tc-0.1-0.1-0.2-0.1-0.3-0.2l-4.8-2.7c-1.5-0.9-3.5-0.9-5,0l-9.2,5.3c-1.8,0.8-2.9,2.6-2.9,4.5V68.4z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#00336E\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M90.2,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8\\n\\t\\t\\t\\t\\tc-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.4-0.3,0.7h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.5\\n\\t\\t\\t\\t\\tc0.2-0.1,0.4-0.2,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2\\n\\t\\t\\t\\t\\tC90.3,69.5,90.2,69.5,90.2,69.5 M87.7,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.1,0.1-0.2\\n\\t\\t\\t\\t\\tc0-0.1,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1c0,0.1,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C87.9,69.5,87.8,69.5,87.7,69.5z\\n\\t\\t\\t\\t\\t M92.6,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.3\\n\\t\\t\\t\\t\\tc-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.5-0.3,0.8h-0.5c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.1,0.5-0.2,0.8-0.2\\n\\t\\t\\t\\t\\tc0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2C92.7,69.5,92.6,69.5,92.6,69.5z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#00336E\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M94.4,64.9c-0.1,0-0.2,0-0.3-0.1C94,64.7,94,64.7,94,64.5c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1\\n\\t\\t\\t\\t\\tc0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2-0.1,0.3C94.6,64.9,94.5,64.9,94.4,64.9 M94.4,69.5\\n\\t\\t\\t\\t\\tc-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1\\n\\t\\t\\t\\t\\tc0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.2-0.1,0.2C94.5,69.5,94.4,69.5,94.4,69.5z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#00336E\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M96.2,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1\\n\\t\\t\\t\\t\\tc0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C96.4,69.5,96.3,69.5,96.2,69.5 M99.2,69.5\\n\\t\\t\\t\\t\\tc-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-1.8c0-0.3-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.1-0.6-0.1\\n\\t\\t\\t\\t\\tc-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.3,0.2-0.4,0.4c-0.1,0.2-0.2,0.3-0.2,0.5h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.6\\n\\t\\t\\t\\t\\tc0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.6s0.2,0.6,0.2,1v1.8c0,0.1,0,0.1-0.1,0.2\\n\\t\\t\\t\\t\\tC99.3,69.5,99.3,69.5,99.2,69.5z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<text\\n\\t\\t\\t\\t\\t\\ttransform=\\"matrix(1 0 0 1 92.5 63)\\"\\n\\t\\t\\t\\t\\t\\tfill=\\"#00336E\\"\\n\\t\\t\\t\\t\\t\\ttext-anchor=\\"middle\\"\\n\\t\\t\\t\\t\\t\\tfont-family=\\"var(--comfortea)\\"\\n\\t\\t\\t\\t\\t\\tfont-size=\\"12px\\">{poiDistanceBus}</text\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t</g>\\n\\t\\t{/if}\\n\\n\\t\\t<!-- CAR -->\\n\\t\\t{#if poiDistanceCar}\\n\\t\\t\\t<g class=\\"car\\">\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#0399A6\\"\\n\\t\\t\\t\\t\\t\\td=\\"M130.5,41.7c0.6,0,1.1-0.5,1.1-1.1c0-0.6-0.5-1.1-1.1-1.1s-1.1,0.5-1.1,1.1\\n\\t\\t\\t\\tC129.4,41.2,129.9,41.7,130.5,41.7 M130.5,40.2c0.2,0,0.4,0.2,0.4,0.4c0,0.2-0.2,0.4-0.4,0.4c-0.2,0-0.4-0.2-0.4-0.4\\n\\t\\t\\t\\tC130.1,40.4,130.3,40.2,130.5,40.2z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#0399A6\\"\\n\\t\\t\\t\\t\\t\\td=\\"M139.8,39.6c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1\\n\\t\\t\\t\\tC140.9,40,140.4,39.6,139.8,39.6 M139.8,41.1c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4c0.2,0,0.4,0.2,0.4,0.4\\n\\t\\t\\t\\tC140.2,40.9,140.1,41.1,139.8,41.1z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#0399A6\\"\\n\\t\\t\\t\\t\\t\\td=\\"M143.8,36.2c-0.4-0.7-1.1-1-2-1h-2.5c-0.4-0.9-2.3-4.6-4.8-4.6h-7.7c-0.2,0-0.3,0.1-0.3,0.3v7.3\\n\\t\\t\\t\\tc0,1.9,0,2.6,1.2,2.7c0.1,1.4,1.3,2.5,2.8,2.5c1.4,0,2.6-1.1,2.8-2.5h1.3c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-1.3\\n\\t\\t\\t\\tc-0.2-1.4-1.4-2.5-2.8-2.5c-1.4,0-2.6,1.1-2.8,2.4c-0.5-0.1-0.5-0.3-0.5-2.1v-1.1h4.5c0.2,0,0.3-0.1,0.3-0.3\\n\\t\\t\\t\\tc0-0.2-0.1-0.3-0.3-0.3h-4.5v-0.7h14.6c0.7,0,1.1,0.2,1.4,0.7h-8.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h9\\n\\t\\t\\t\\tc0.1,0.3,0.1,0.6,0.1,1.1c0,1.3,0,1.9-1,2c-0.2-1.4-1.4-2.4-2.8-2.4c-1.4,0-2.6,1.1-2.8,2.5h-1.4c-0.2,0-0.3,0.1-0.3,0.3\\n\\t\\t\\t\\tc0,0.2,0.1,0.3,0.3,0.3h1.4c0.2,1.4,1.4,2.5,2.8,2.5c1.5,0,2.7-1.1,2.8-2.6c1.6-0.2,1.6-1.5,1.6-2.7\\n\\t\\t\\t\\tC144.2,37.3,144.1,36.7,143.8,36.2 M130.5,38.5c1.2,0,2.1,1,2.1,2.1c0,1.2-1,2.1-2.1,2.1c-1.2,0-2.1-1-2.1-2.1\\n\\t\\t\\t\\tC128.3,39.5,129.3,38.5,130.5,38.5z M132.1,35.1h-4.9v-3.9h4.9V35.1z M132.7,35.1v-3.9h1.8c1.8,0,3.5,2.8,4,3.9H132.7z\\n\\t\\t\\t\\t M139.8,42.8c-1.2,0-2.1-1-2.1-2.1c0-1.2,1-2.1,2.1-2.1c1.2,0,2.1,1,2.1,2.1C142,41.8,141,42.8,139.8,42.8z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#0399A6\\"\\n\\t\\t\\t\\t\\t\\td=\\"M132.8,36.5c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h0.6c0.2,0,0.3-0.1,0.3-0.3\\n\\t\\t\\t\\tc0-0.2-0.1-0.3-0.3-0.3H132.8z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#FFFFFF\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M138,47.6l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.7,1,2.6,2.7,2.6,4.5h0v11.1c0,2.1-1.3,3.9-3.1,4.8\\n\\t\\t\\t\\t\\tl-4.4,2.5l0,0l-4.8,2.8c-1.7,1-3.7,0.9-5.3,0l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.7-1-2.6-2.7-2.6-4.5h0V57.6\\n\\t\\t\\t\\t\\tc0-2.1,1.3-3.9,3.1-4.8l4.4-2.5l0,0l4.8-2.8C134.4,46.5,136.5,46.6,138,47.6z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#0399A6\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M135.4,79.8c-1,0-1.9-0.3-2.8-0.8l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.6-0.9-2.6-2.6-2.7-4.5\\n\\t\\t\\t\\t\\th0l0-0.3V57.6c0-2.2,1.3-4.1,3.2-5l9.2-5.3c1.7-1,3.9-1,5.6,0l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.6,0.9,2.6,2.6,2.7,4.5\\n\\t\\t\\t\\t\\th0l0,0.3v11.1c0,2.2-1.3,4.1-3.2,5l-9.2,5.3C137.3,79.5,136.3,79.8,135.4,79.8z M120.8,68.4l0,0.3c0,1.8,0.9,3.4,2.5,4.3l4.5,2.6\\n\\t\\t\\t\\t\\tc0.1,0.1,0.2,0.1,0.3,0.2l4.8,2.7c1.5,0.9,3.5,0.9,5,0l9.2-5.3c1.8-0.8,2.9-2.6,2.9-4.5l0-11.1c0-1.8-0.9-3.4-2.5-4.3l-4.5-2.6\\n\\t\\t\\t\\t\\tc-0.1-0.1-0.2-0.1-0.3-0.2l-4.8-2.7c-1.5-0.9-3.5-0.9-5,0l-9.2,5.3c-1.8,0.8-2.9,2.6-2.9,4.5V68.4z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#0399A6\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M132.6,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8\\n\\t\\t\\t\\t\\tc-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.4-0.3,0.7h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.5\\n\\t\\t\\t\\t\\tc0.2-0.1,0.4-0.2,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2\\n\\t\\t\\t\\t\\tC132.7,69.5,132.7,69.5,132.6,69.5 M130.2,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.1,0.1-0.2\\n\\t\\t\\t\\t\\ts0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1s0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C130.3,69.5,130.3,69.5,130.2,69.5z M135,69.5\\n\\t\\t\\t\\t\\tc-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3\\n\\t\\t\\t\\t\\tc-0.2,0.2-0.3,0.5-0.3,0.8h-0.5c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.5,0.1,0.7,0.2\\n\\t\\t\\t\\t\\tc0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2C135.2,69.5,135.1,69.5,135,69.5z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#0399A6\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M136.8,64.9c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1\\n\\t\\t\\t\\t\\tc0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2-0.1,0.3C137,64.9,136.9,64.9,136.8,64.9 M136.8,69.5\\n\\t\\t\\t\\t\\tc-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1\\n\\t\\t\\t\\t\\tc0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.2-0.1,0.2C137,69.5,136.9,69.5,136.8,69.5z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#0399A6\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M138.7,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1\\n\\t\\t\\t\\t\\tc0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C138.8,69.5,138.8,69.5,138.7,69.5 M141.7,69.5\\n\\t\\t\\t\\t\\tc-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-1.8c0-0.3-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.1-0.6-0.1\\n\\t\\t\\t\\t\\tc-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.3,0.2-0.4,0.4c-0.1,0.2-0.2,0.3-0.2,0.5h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.6\\n\\t\\t\\t\\t\\tc0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.6c0.1,0.3,0.2,0.6,0.2,1v1.8c0,0.1,0,0.1-0.1,0.2\\n\\t\\t\\t\\t\\tC141.8,69.5,141.7,69.5,141.7,69.5z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<text\\n\\t\\t\\t\\t\\ttransform=\\"matrix(1 0 0 1 135.5 63)\\"\\n\\t\\t\\t\\t\\tfill=\\"#0399A6\\"\\n\\t\\t\\t\\t\\ttext-anchor=\\"middle\\"\\n\\t\\t\\t\\t\\tfont-family=\\"var(--comfortea)\\"\\n\\t\\t\\t\\t\\tfont-size=\\"13px\\">{poiDistanceCar}</text\\n\\t\\t\\t\\t>\\n\\t\\t\\t</g>\\n\\t\\t{/if}\\n\\t\\t<!-- BIKE -->\\n\\n\\t\\t{#if poiDistanceBike}\\n\\t\\t\\t<g class=\\"bike\\">\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path transition:draw=\\"{{duration: 1500, easing: quintOut}}\\"\\n\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\" \\n\\t\\t\\t\\t\\t\\td=\\"M172.1,42.7c1.7,0,3.1-1.4,3.1-3.1c0-0.1,0-0.2,0-0.3l0.6-0.1c0.2,0.4,0.6,0.6,1,0.6\\n\\t\\t\\t\\tc0.6,0,1.1-0.5,1.1-1.1c0-0.1,0-0.2,0-0.3l3.6-2.2l0.4,0.8c-0.9,0.6-1.5,1.5-1.5,2.6c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1\\n\\t\\t\\t\\tc0-1.7-1.4-3.1-3.1-3.1c-0.4,0-0.7,0.1-1.1,0.2l-1.2-2.5l2.2-2.2c0.1-0.1,0.1-0.2,0.1-0.4c-0.1-0.1-0.2-0.2-0.3-0.2h-2.1\\n\\t\\t\\t\\tc-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h1.3l-1.7,1.7h-1.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.2,0.3,0.3,0.3h1.7l0.6,1.2\\n\\t\\t\\t\\tl-3.7,2.3c-0.2-0.2-0.5-0.3-0.8-0.3c0,0,0,0,0,0l-1.1-3.1h1.2c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-1.5l-0.2-0.6h0.4\\n\\t\\t\\t\\tc0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.2-0.3-0.3-0.3h-1.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h0.7l0.3,0.8l-1.5,2.8\\n\\t\\t\\t\\tc-0.4-0.2-0.8-0.2-1.2-0.2c-1.7,0-3.1,1.4-3.1,3.1C168.9,41.3,170.3,42.7,172.1,42.7 M183.3,39.7c0.1,0.1,0.2,0.2,0.3,0.2\\n\\t\\t\\t\\tc0,0,0.1,0,0.1,0c0.2-0.1,0.2-0.3,0.2-0.4l-1.1-2.2c0.2-0.1,0.5-0.1,0.8-0.1c1.4,0,2.5,1.1,2.5,2.5c0,1.4-1.1,2.5-2.5,2.5\\n\\t\\t\\t\\tc-1.4,0-2.5-1.1-2.5-2.5c0-0.8,0.4-1.6,1.1-2L183.3,39.7z M176.8,38.1c0.3,0,0.5,0.2,0.5,0.5c0,0.3-0.2,0.5-0.5,0.5\\n\\t\\t\\t\\tc-0.3,0-0.5-0.2-0.5-0.5C176.3,38.3,176.5,38.1,176.8,38.1z M175.1,34.7l1,3c-0.3,0.2-0.4,0.5-0.5,0.8l-0.6,0.1\\n\\t\\t\\t\\tc-0.2-0.7-0.6-1.2-1.2-1.6L175.1,34.7z M173.5,37.6c0.4,0.3,0.7,0.7,0.9,1.2l-1.7,0.3L173.5,37.6z M172.1,37.1\\n\\t\\t\\t\\tc0.3,0,0.6,0.1,0.9,0.2l-1.2,2.1c-0.1,0.1-0.1,0.3,0,0.4c0.1,0.1,0.2,0.1,0.3,0.1c0,0,0,0,0.1,0l2.4-0.5c0,0.1,0,0.1,0,0.2\\n\\t\\t\\t\\tc0,1.4-1.1,2.5-2.5,2.5c-1.4,0-2.5-1.1-2.5-2.5C169.6,38.2,170.7,37.1,172.1,37.1z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\td=\\"M172.1,41.1c0.3,0,0.5-0.1,0.7-0.2c0.2-0.1,0.2-0.3,0.1-0.5c-0.1-0.2-0.3-0.2-0.5-0.1\\n\\t\\t\\t\\tc-0.1,0.1-0.3,0.1-0.4,0.1c-0.4,0-0.8-0.3-0.9-0.8c0-0.2-0.2-0.3-0.4-0.3c-0.2,0-0.3,0.2-0.3,0.4\\n\\t\\t\\t\\tC170.6,40.6,171.3,41.1,172.1,41.1\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\td=\\"M170.8,39.2c0.1,0,0.1,0,0.2,0c0.1,0,0.2-0.1,0.3-0.2c0,0,0,0,0,0c0.1-0.2,0.1-0.4-0.1-0.5\\n\\t\\t\\t\\tc-0.2-0.1-0.4-0.1-0.5,0.1c0,0,0,0.1,0,0.1C170.6,38.9,170.7,39.1,170.8,39.2\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\td=\\"M184.1,41c0,0,0.1,0,0.1,0c0.7-0.3,1.1-1.1,0.9-1.8c-0.1-0.3-0.2-0.5-0.4-0.7c-0.1-0.1-0.3-0.2-0.5,0\\n\\t\\t\\t\\tc-0.1,0.1-0.2,0.3,0,0.5c0.1,0.1,0.2,0.2,0.2,0.4c0.1,0.4-0.1,0.9-0.5,1.1c-0.2,0.1-0.2,0.3-0.2,0.4C183.8,41,183.9,41,184.1,41\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\td=\\"M183,41C183,41,183,41.1,183,41c0.1,0,0.2,0,0.2,0c0.1,0,0.3-0.1,0.3-0.2c0.1-0.2,0-0.4-0.2-0.4\\n\\t\\t\\t\\tc0,0,0,0-0.1,0c-0.2-0.1-0.4,0-0.4,0.2C182.7,40.8,182.8,41,183,41\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\td=\\"M177.8,34.3h0.2c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-0.2c-0.2,0-0.3,0.1-0.3,0.3\\n\\t\\t\\t\\tC177.5,34.2,177.6,34.3,177.8,34.3\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\td=\\"M180.1,32h0.1c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-0.1c-0.2,0-0.3,0.1-0.3,0.3\\n\\t\\t\\t\\tC179.8,31.8,179.9,32,180.1,32\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#FFFFFF\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M180.5,47.6l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.7,1,2.6,2.7,2.6,4.5h0v11.1\\n\\t\\t\\t\\t\\tc0,2.1-1.3,3.9-3.1,4.8l-4.4,2.5l0,0l-4.8,2.8c-1.7,1-3.7,0.9-5.3,0l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6\\n\\t\\t\\t\\t\\tc-1.7-1-2.6-2.7-2.6-4.5h0V57.6c0-2.1,1.3-3.9,3.1-4.8l4.4-2.5l0,0l4.8-2.8C176.9,46.5,178.9,46.6,180.5,47.6z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M177.8,79.8c-1,0-1.9-0.3-2.8-0.8l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.6-0.9-2.6-2.6-2.7-4.5\\n\\t\\t\\t\\t\\th0l0-0.3V57.6c0-2.2,1.3-4.1,3.2-5l9.2-5.3c1.7-1,3.9-1,5.6,0l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.6,0.9,2.6,2.6,2.7,4.5\\n\\t\\t\\t\\t\\th0l0,0.3v11.1c0,2.1-1.3,4.1-3.2,5l-9.2,5.3C179.7,79.5,178.8,79.8,177.8,79.8z M163.3,68.4l0,0.3c0,1.8,0.9,3.4,2.5,4.3l4.5,2.6\\n\\t\\t\\t\\t\\tc0.1,0.1,0.2,0.1,0.3,0.2l4.8,2.7c1.5,0.9,3.5,0.9,5,0l9.2-5.3c1.8-0.8,2.9-2.6,2.9-4.5l0-11.1c0-1.8-0.9-3.4-2.5-4.3l-4.5-2.6\\n\\t\\t\\t\\t\\tc-0.1-0.1-0.2-0.1-0.3-0.2l-4.8-2.7c-1.5-0.9-3.5-0.9-5,0l-9.2,5.3c-1.8,0.8-2.9,2.6-2.9,4.5V68.4z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M175.1,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8\\n\\t\\t\\t\\t\\tc-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.4-0.3,0.7h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.5\\n\\t\\t\\t\\t\\tc0.2-0.1,0.5-0.2,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2\\n\\t\\t\\t\\t\\tC175.2,69.5,175.1,69.5,175.1,69.5 M172.6,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.1,0.1-0.2\\n\\t\\t\\t\\t\\tc0-0.1,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1c0,0.1,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C172.8,69.5,172.7,69.5,172.6,69.5z\\n\\t\\t\\t\\t\\t M177.5,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.3\\n\\t\\t\\t\\t\\tc-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.5-0.3,0.8h-0.5c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.1,0.5-0.2,0.8-0.2\\n\\t\\t\\t\\t\\tc0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2\\n\\t\\t\\t\\t\\tC177.6,69.5,177.5,69.5,177.5,69.5z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M179.3,64.9c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1\\n\\t\\t\\t\\t\\tc0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2-0.1,0.3C179.5,64.9,179.4,64.9,179.3,64.9 M179.3,69.5\\n\\t\\t\\t\\t\\tc-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1\\n\\t\\t\\t\\t\\tc0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.2-0.1,0.2C179.4,69.5,179.4,69.5,179.3,69.5z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<g>\\n\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\t\\td=\\"M181.2,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1\\n\\t\\t\\t\\t\\tc0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C181.3,69.5,181.2,69.5,181.2,69.5 M184.1,69.5\\n\\t\\t\\t\\t\\tc-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-1.8c0-0.3-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.1-0.6-0.1\\n\\t\\t\\t\\t\\tc-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.3,0.2-0.4,0.4c-0.1,0.2-0.2,0.3-0.2,0.5H181c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.6\\n\\t\\t\\t\\t\\tc0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.6s0.2,0.6,0.2,1v1.8c0,0.1,0,0.1-0.1,0.2\\n\\t\\t\\t\\t\\tC184.2,69.5,184.2,69.5,184.1,69.5z\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</g>\\n\\t\\t\\t\\t\\t<text \\n\\n\\t\\t\\t\\t\\t\\ttransform=\\"matrix(1 0 0 1 177.5 63)\\"\\n\\t\\t\\t\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\t\\t\\t\\ttext-anchor=\\"middle\\"\\n\\t\\t\\t\\t\\t\\tfont-family=\\"var(--comfortea)\\"\\n\\t\\t\\t\\t\\t\\tfont-size=\\"13px\\">{poiDistanceBike}</text\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t</g>\\n\\t\\t\\t</g>\\n\\t\\t{/if}\\n\\n\\t\\t<g>\\n\\t\\t\\t<path\\n\\t\\t\\t\\tfill=\\"{color}\\" stroke=\\"white\\" stroke-width= \\"0.6px\\"\\n\\t\\t\\t\\tclass=\\"cls-8\\"\\n\\t\\t\\t\\td=\\"M-3.1,0c-4.4,0-8,3.6-8,8s8,14.7,8,14.7s8-10.3,8-14.7C4.8,3.6,1.3,0-3.1,0 M-3.1,11.9C-5.3,11.9-7,10.1-7,8\\n\\t\\tc0-2.2,1.8-3.9,3.9-3.9C-1,4,0.8,5.8,0.8,8C0.8,10.1-1,11.9-3.1,11.9z\\"\\n\\t\\t\\t/>\\n\\t\\t</g>\\n\\t\\t<text\\n\\t\\t\\ttransform=\\"matrix(1 0 0 1 -11.6097 35.1343)\\"\\n\\t\\t\\tfill=\\"#2181b3\\"\\n\\t\\t\\tfont-family=\\"var(--comfortea)\\"\\n\\t\\t\\tfont-size=\\"9.0051px\\">{poiName}</text\\n\\t\\t>\\n\\t\\t<text\\n\\t\\t\\ttransform=\\"matrix(1 0 0 1 -11.2855 54.0779)\\"\\n\\t\\t\\tfill=\\"#00336E\\"\\n\\t\\t\\tfont-family=\\"var(--comfortea)\\"\\n\\t\\t\\tfont-size=\\"9.0051px\\">{poiCity}</text\\n\\t\\t>\\n\\t</svg>\\n</div>\\n\\n<style>\\n:global(.svg-itema .car, .svg-itema .bus, .svg-itema .bike){\\n\\ttransform: matrix(1, 0, 0, 1, 0, 11);\\n}\\n:global(.POIelement .svg-itema svg) {\\n    width: 305px;\\n    height: 146px !important;\\n    position: relative;\\n    display: block;\\n\\t\\n}\\n\\n\\t@keyframes donut1 {\\n\\t\\t0% {\\n\\t\\t\\topacity: 0;\\n\\t\\t\\t/* transform: y rotate(50deg); */\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 1;\\n\\t\\t\\t/* transform: y rotate(0deg); */\\n\\t\\t}\\n\\t}\\n\\n\\t/* COLORS */\\n\\n\\n\\t\\n\\n\\t/* :global(.cls-1) {\\n\\t\\tfill: #75ffb0;\\n\\t}\\n\\n\\t:global(.cls-2) {\\n\\t\\tfill: #29c2c9;\\n\\t}\\n\\n\\t:global(.cls-3) {\\n\\t\\tfill: #334d4f;\\n\\t}\\n\\n\\t:global(.cls-4) {\\n\\t\\tfill: #2181b3;\\n\\t}\\n\\n\\t:global(.cls-5) {\\n\\t\\tfill: #056b45;\\n\\t}\\n\\n\\t:global(.cls-6) {\\n\\t\\tfill: #21cc8c;\\n\\t}\\n\\n\\t:global(.cls-7) {\\n\\t\\tfill: #0099b5;\\n\\t}\\n\\n\\t:global(.cls-8) {\\n\\t\\tfill: #00336e;\\n\\t} */\\n</style>\\n"],"names":[],"mappings":"AAmZQ,kDAAmD,CAC1D,SAAS,CAAE,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CACpC,CACQ,0BAA4B,CAChC,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CAAC,UAAU,CACxB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAEb,CAEC,WAAW,oBAAO,CACjB,EAAG,CACF,OAAO,CAAE,CAEV,CACA,IAAK,CACJ,OAAO,CAAE,CAEV,CACD"}`
};
const DistanceElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { poiName = "Galeria Reszowska" } = $$props;
  let { poiCity = "Rzeszów" } = $$props;
  let { poiDistanceCar, poiDistanceBus, poiDistanceBike } = $$props;
  let { color = "#2181b3" } = $$props;
  console.log("color", color);
  if ($$props.poiName === void 0 && $$bindings.poiName && poiName !== void 0) $$bindings.poiName(poiName);
  if ($$props.poiCity === void 0 && $$bindings.poiCity && poiCity !== void 0) $$bindings.poiCity(poiCity);
  if ($$props.poiDistanceCar === void 0 && $$bindings.poiDistanceCar && poiDistanceCar !== void 0) $$bindings.poiDistanceCar(poiDistanceCar);
  if ($$props.poiDistanceBus === void 0 && $$bindings.poiDistanceBus && poiDistanceBus !== void 0) $$bindings.poiDistanceBus(poiDistanceBus);
  if ($$props.poiDistanceBike === void 0 && $$bindings.poiDistanceBike && poiDistanceBike !== void 0) $$bindings.poiDistanceBike(poiDistanceBike);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  $$result.css.add(css$d);
  return `${$$result.head += `<!-- HEAD_undefined_START --><!-- HEAD_undefined_END -->`, ""} <div class="svg-itema"><svg version="1.1" id="Warstwa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="120px" y="0px" width="220px" height="90px" viewBox="-20 0 213 79.8" style="enable-background:new 0 0 220 90;" xml:space="preserve"><g><polygon fill="#2181b3" points="46.2,63.1 -20,63.1 -20,28.3 -19.2,28.3 -19.2,62.3 46.2,62.3 "></polygon></g>${poiDistanceBus ? `<g class="bus"><g><path fill="#084A96" d="M98.7,36.2v-1.7c0-0.6-0.5-1.2-1.2-1.2H86.2c-0.2,0-0.3,0.1-0.3,0.3v2.6c0,0.2,0.1,0.3,0.3,0.3h12.1
				C98.5,36.6,98.7,36.4,98.7,36.2 M88.7,35.9h-2.2V34h2.2V35.9z M92.8,35.9h-3.5V34h3.5V35.9z M98,35.9h-4.5V34h4
				c0.3,0,0.5,0.2,0.5,0.5V35.9z"></path></g><g><path fill="#084A96" d="M101.7,35.5l-1.1-0.9c-0.1-1.6-1.4-2.9-3-2.9H84.4c-0.2,0-0.3,0.1-0.3,0.3v8.6c0,0.2,0.1,0.3,0.3,0.3h1.6
				c0.2,0.8,0.9,1.4,1.7,1.4c0.8,0,1.5-0.6,1.7-1.4h3.6c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-3.6c-0.2-0.8-0.9-1.4-1.7-1.4
				c-0.8,0-1.5,0.6-1.7,1.4h-1.2v-2.1h3.8c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-3.8v-5.1h12.8c1.3,0,2.4,1.1,2.4,2.4
				c0,0.1,0,0.2,0.1,0.3l1.1,0.9v1.6h-9.4c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h9.4v2.1h-2.8c-0.2-0.8-0.9-1.4-1.7-1.4
				c-0.8,0-1.5,0.6-1.7,1.4h-0.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3H95c0.2,0.8,0.9,1.4,1.7,1.4c0.8,0,1.5-0.6,1.7-1.4
				h3.1c0.2,0,0.3-0.1,0.3-0.3v-4.8C101.8,35.7,101.7,35.6,101.7,35.5 M86.6,40.6c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1
				c0,0.6-0.5,1.1-1.1,1.1C87,41.6,86.6,41.2,86.6,40.6C86.6,40.6,86.6,40.6,86.6,40.6z M96.7,41.6c-0.6,0-1.1-0.5-1.1-1.1
				c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C97.7,41.2,97.2,41.6,96.7,41.6z"></path></g><g><path fill="#084A96" d="M89.7,37.5c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h0.9c0.2,0,0.3-0.1,0.3-0.3
				c0-0.2-0.1-0.3-0.3-0.3H89.7z"></path></g><g><path fill="#084A96" d="M87.6,40.9c0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2-0.1-0.2c-0.1-0.1-0.1-0.1-0.2-0.1
				c-0.1,0-0.2,0-0.2,0.1c-0.1,0.1-0.1,0.1-0.1,0.2c0,0.1,0,0.2,0.1,0.2C87.5,40.9,87.5,40.9,87.6,40.9"></path></g><g><path fill="#084A96" d="M96.7,40.2c-0.1,0-0.2,0-0.2,0.1c-0.1,0.1-0.1,0.1-0.1,0.2c0,0.1,0,0.2,0.1,0.2c0.1,0.1,0.1,0.1,0.2,0.1
				c0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2-0.1-0.2C96.8,40.3,96.7,40.2,96.7,40.2"></path></g><g><g><path fill="#FFFFFF" d="M95.6,47.6l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.7,1,2.6,2.7,2.6,4.5h0v11.1c0,2.1-1.3,3.9-3.1,4.8
					l-4.4,2.5l0,0l-4.8,2.8c-1.7,1-3.7,0.9-5.3,0L85.5,76c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.7-1-2.6-2.7-2.6-4.5h0V57.6
					c0-2.1,1.3-3.9,3.1-4.8l4.4-2.5l0,0l4.8-2.8C92,46.5,94,46.6,95.6,47.6z"></path></g><g><path fill="#00336E" d="M92.9,79.8c-1,0-1.9-0.3-2.8-0.8l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.6-0.9-2.6-2.6-2.7-4.5h0
					l0-0.3V57.6c0-2.2,1.3-4.1,3.2-5l9.2-5.3c1.7-1,3.9-1,5.6,0l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.6,0.9,2.6,2.6,2.7,4.5h0
					l0,0.3v11.1c0,2.2-1.3,4.1-3.2,5L95.7,79C94.8,79.5,93.9,79.8,92.9,79.8z M78.3,68.4l0,0.3c0,1.8,0.9,3.4,2.5,4.3l4.5,2.6
					c0.1,0.1,0.2,0.1,0.3,0.2l4.8,2.7c1.5,0.9,3.5,0.9,5,0l9.2-5.3c1.8-0.8,2.9-2.6,2.9-4.5l0-11.1c0-1.8-0.9-3.4-2.5-4.3l-4.5-2.6
					c-0.1-0.1-0.2-0.1-0.3-0.2l-4.8-2.7c-1.5-0.9-3.5-0.9-5,0l-9.2,5.3c-1.8,0.8-2.9,2.6-2.9,4.5V68.4z"></path></g><g><path fill="#00336E" d="M90.2,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8
					c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.4-0.3,0.7h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.5
					c0.2-0.1,0.4-0.2,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2
					C90.3,69.5,90.2,69.5,90.2,69.5 M87.7,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.1,0.1-0.2
					c0-0.1,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1c0,0.1,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C87.9,69.5,87.8,69.5,87.7,69.5z
					 M92.6,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.3
					c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.5-0.3,0.8h-0.5c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.1,0.5-0.2,0.8-0.2
					c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2C92.7,69.5,92.6,69.5,92.6,69.5z"></path></g><g><path fill="#00336E" d="M94.4,64.9c-0.1,0-0.2,0-0.3-0.1C94,64.7,94,64.7,94,64.5c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1
					c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2-0.1,0.3C94.6,64.9,94.5,64.9,94.4,64.9 M94.4,69.5
					c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1
					c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.2-0.1,0.2C94.5,69.5,94.4,69.5,94.4,69.5z"></path></g><g><path fill="#00336E" d="M96.2,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1
					c0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C96.4,69.5,96.3,69.5,96.2,69.5 M99.2,69.5
					c-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-1.8c0-0.3-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.1-0.6-0.1
					c-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.3,0.2-0.4,0.4c-0.1,0.2-0.2,0.3-0.2,0.5h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.6
					c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.6s0.2,0.6,0.2,1v1.8c0,0.1,0,0.1-0.1,0.2
					C99.3,69.5,99.3,69.5,99.2,69.5z"></path></g><text transform="matrix(1 0 0 1 92.5 63)" fill="#00336E" text-anchor="middle" font-family="var(--comfortea)" font-size="12px">${escape(poiDistanceBus)}</text></g></g>` : ``}${poiDistanceCar ? `<g class="car"><g><path fill="#0399A6" d="M130.5,41.7c0.6,0,1.1-0.5,1.1-1.1c0-0.6-0.5-1.1-1.1-1.1s-1.1,0.5-1.1,1.1
				C129.4,41.2,129.9,41.7,130.5,41.7 M130.5,40.2c0.2,0,0.4,0.2,0.4,0.4c0,0.2-0.2,0.4-0.4,0.4c-0.2,0-0.4-0.2-0.4-0.4
				C130.1,40.4,130.3,40.2,130.5,40.2z"></path></g><g><path fill="#0399A6" d="M139.8,39.6c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1
				C140.9,40,140.4,39.6,139.8,39.6 M139.8,41.1c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4c0.2,0,0.4,0.2,0.4,0.4
				C140.2,40.9,140.1,41.1,139.8,41.1z"></path></g><g><path fill="#0399A6" d="M143.8,36.2c-0.4-0.7-1.1-1-2-1h-2.5c-0.4-0.9-2.3-4.6-4.8-4.6h-7.7c-0.2,0-0.3,0.1-0.3,0.3v7.3
				c0,1.9,0,2.6,1.2,2.7c0.1,1.4,1.3,2.5,2.8,2.5c1.4,0,2.6-1.1,2.8-2.5h1.3c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-1.3
				c-0.2-1.4-1.4-2.5-2.8-2.5c-1.4,0-2.6,1.1-2.8,2.4c-0.5-0.1-0.5-0.3-0.5-2.1v-1.1h4.5c0.2,0,0.3-0.1,0.3-0.3
				c0-0.2-0.1-0.3-0.3-0.3h-4.5v-0.7h14.6c0.7,0,1.1,0.2,1.4,0.7h-8.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h9
				c0.1,0.3,0.1,0.6,0.1,1.1c0,1.3,0,1.9-1,2c-0.2-1.4-1.4-2.4-2.8-2.4c-1.4,0-2.6,1.1-2.8,2.5h-1.4c-0.2,0-0.3,0.1-0.3,0.3
				c0,0.2,0.1,0.3,0.3,0.3h1.4c0.2,1.4,1.4,2.5,2.8,2.5c1.5,0,2.7-1.1,2.8-2.6c1.6-0.2,1.6-1.5,1.6-2.7
				C144.2,37.3,144.1,36.7,143.8,36.2 M130.5,38.5c1.2,0,2.1,1,2.1,2.1c0,1.2-1,2.1-2.1,2.1c-1.2,0-2.1-1-2.1-2.1
				C128.3,39.5,129.3,38.5,130.5,38.5z M132.1,35.1h-4.9v-3.9h4.9V35.1z M132.7,35.1v-3.9h1.8c1.8,0,3.5,2.8,4,3.9H132.7z
				 M139.8,42.8c-1.2,0-2.1-1-2.1-2.1c0-1.2,1-2.1,2.1-2.1c1.2,0,2.1,1,2.1,2.1C142,41.8,141,42.8,139.8,42.8z"></path></g><g><path fill="#0399A6" d="M132.8,36.5c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h0.6c0.2,0,0.3-0.1,0.3-0.3
				c0-0.2-0.1-0.3-0.3-0.3H132.8z"></path></g><g><g><path fill="#FFFFFF" d="M138,47.6l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.7,1,2.6,2.7,2.6,4.5h0v11.1c0,2.1-1.3,3.9-3.1,4.8
					l-4.4,2.5l0,0l-4.8,2.8c-1.7,1-3.7,0.9-5.3,0l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.7-1-2.6-2.7-2.6-4.5h0V57.6
					c0-2.1,1.3-3.9,3.1-4.8l4.4-2.5l0,0l4.8-2.8C134.4,46.5,136.5,46.6,138,47.6z"></path></g><g><path fill="#0399A6" d="M135.4,79.8c-1,0-1.9-0.3-2.8-0.8l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.6-0.9-2.6-2.6-2.7-4.5
					h0l0-0.3V57.6c0-2.2,1.3-4.1,3.2-5l9.2-5.3c1.7-1,3.9-1,5.6,0l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.6,0.9,2.6,2.6,2.7,4.5
					h0l0,0.3v11.1c0,2.2-1.3,4.1-3.2,5l-9.2,5.3C137.3,79.5,136.3,79.8,135.4,79.8z M120.8,68.4l0,0.3c0,1.8,0.9,3.4,2.5,4.3l4.5,2.6
					c0.1,0.1,0.2,0.1,0.3,0.2l4.8,2.7c1.5,0.9,3.5,0.9,5,0l9.2-5.3c1.8-0.8,2.9-2.6,2.9-4.5l0-11.1c0-1.8-0.9-3.4-2.5-4.3l-4.5-2.6
					c-0.1-0.1-0.2-0.1-0.3-0.2l-4.8-2.7c-1.5-0.9-3.5-0.9-5,0l-9.2,5.3c-1.8,0.8-2.9,2.6-2.9,4.5V68.4z"></path></g><g><path fill="#0399A6" d="M132.6,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8
					c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.4-0.3,0.7h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.5
					c0.2-0.1,0.4-0.2,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2
					C132.7,69.5,132.7,69.5,132.6,69.5 M130.2,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.1,0.1-0.2
					s0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1s0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C130.3,69.5,130.3,69.5,130.2,69.5z M135,69.5
					c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3
					c-0.2,0.2-0.3,0.5-0.3,0.8h-0.5c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.5,0.1,0.7,0.2
					c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2C135.2,69.5,135.1,69.5,135,69.5z"></path></g><g><path fill="#0399A6" d="M136.8,64.9c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1
					c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2-0.1,0.3C137,64.9,136.9,64.9,136.8,64.9 M136.8,69.5
					c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1
					c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.2-0.1,0.2C137,69.5,136.9,69.5,136.8,69.5z"></path></g><g><path fill="#0399A6" d="M138.7,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1
					c0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C138.8,69.5,138.8,69.5,138.7,69.5 M141.7,69.5
					c-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-1.8c0-0.3-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.1-0.6-0.1
					c-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.3,0.2-0.4,0.4c-0.1,0.2-0.2,0.3-0.2,0.5h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.6
					c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.6c0.1,0.3,0.2,0.6,0.2,1v1.8c0,0.1,0,0.1-0.1,0.2
					C141.8,69.5,141.7,69.5,141.7,69.5z"></path></g></g><text transform="matrix(1 0 0 1 135.5 63)" fill="#0399A6" text-anchor="middle" font-family="var(--comfortea)" font-size="13px">${escape(poiDistanceCar)}</text></g>` : ``}${poiDistanceBike ? `<g class="bike"><g><path fill="#2181b3" d="M172.1,42.7c1.7,0,3.1-1.4,3.1-3.1c0-0.1,0-0.2,0-0.3l0.6-0.1c0.2,0.4,0.6,0.6,1,0.6
				c0.6,0,1.1-0.5,1.1-1.1c0-0.1,0-0.2,0-0.3l3.6-2.2l0.4,0.8c-0.9,0.6-1.5,1.5-1.5,2.6c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1
				c0-1.7-1.4-3.1-3.1-3.1c-0.4,0-0.7,0.1-1.1,0.2l-1.2-2.5l2.2-2.2c0.1-0.1,0.1-0.2,0.1-0.4c-0.1-0.1-0.2-0.2-0.3-0.2h-2.1
				c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h1.3l-1.7,1.7h-1.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.2,0.3,0.3,0.3h1.7l0.6,1.2
				l-3.7,2.3c-0.2-0.2-0.5-0.3-0.8-0.3c0,0,0,0,0,0l-1.1-3.1h1.2c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-1.5l-0.2-0.6h0.4
				c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.2-0.3-0.3-0.3h-1.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h0.7l0.3,0.8l-1.5,2.8
				c-0.4-0.2-0.8-0.2-1.2-0.2c-1.7,0-3.1,1.4-3.1,3.1C168.9,41.3,170.3,42.7,172.1,42.7 M183.3,39.7c0.1,0.1,0.2,0.2,0.3,0.2
				c0,0,0.1,0,0.1,0c0.2-0.1,0.2-0.3,0.2-0.4l-1.1-2.2c0.2-0.1,0.5-0.1,0.8-0.1c1.4,0,2.5,1.1,2.5,2.5c0,1.4-1.1,2.5-2.5,2.5
				c-1.4,0-2.5-1.1-2.5-2.5c0-0.8,0.4-1.6,1.1-2L183.3,39.7z M176.8,38.1c0.3,0,0.5,0.2,0.5,0.5c0,0.3-0.2,0.5-0.5,0.5
				c-0.3,0-0.5-0.2-0.5-0.5C176.3,38.3,176.5,38.1,176.8,38.1z M175.1,34.7l1,3c-0.3,0.2-0.4,0.5-0.5,0.8l-0.6,0.1
				c-0.2-0.7-0.6-1.2-1.2-1.6L175.1,34.7z M173.5,37.6c0.4,0.3,0.7,0.7,0.9,1.2l-1.7,0.3L173.5,37.6z M172.1,37.1
				c0.3,0,0.6,0.1,0.9,0.2l-1.2,2.1c-0.1,0.1-0.1,0.3,0,0.4c0.1,0.1,0.2,0.1,0.3,0.1c0,0,0,0,0.1,0l2.4-0.5c0,0.1,0,0.1,0,0.2
				c0,1.4-1.1,2.5-2.5,2.5c-1.4,0-2.5-1.1-2.5-2.5C169.6,38.2,170.7,37.1,172.1,37.1z"></path></g><g><path fill="#2181b3" d="M172.1,41.1c0.3,0,0.5-0.1,0.7-0.2c0.2-0.1,0.2-0.3,0.1-0.5c-0.1-0.2-0.3-0.2-0.5-0.1
				c-0.1,0.1-0.3,0.1-0.4,0.1c-0.4,0-0.8-0.3-0.9-0.8c0-0.2-0.2-0.3-0.4-0.3c-0.2,0-0.3,0.2-0.3,0.4
				C170.6,40.6,171.3,41.1,172.1,41.1"></path></g><g><path fill="#2181b3" d="M170.8,39.2c0.1,0,0.1,0,0.2,0c0.1,0,0.2-0.1,0.3-0.2c0,0,0,0,0,0c0.1-0.2,0.1-0.4-0.1-0.5
				c-0.2-0.1-0.4-0.1-0.5,0.1c0,0,0,0.1,0,0.1C170.6,38.9,170.7,39.1,170.8,39.2"></path></g><g><path fill="#2181b3" d="M184.1,41c0,0,0.1,0,0.1,0c0.7-0.3,1.1-1.1,0.9-1.8c-0.1-0.3-0.2-0.5-0.4-0.7c-0.1-0.1-0.3-0.2-0.5,0
				c-0.1,0.1-0.2,0.3,0,0.5c0.1,0.1,0.2,0.2,0.2,0.4c0.1,0.4-0.1,0.9-0.5,1.1c-0.2,0.1-0.2,0.3-0.2,0.4C183.8,41,183.9,41,184.1,41"></path></g><g><path fill="#2181b3" d="M183,41C183,41,183,41.1,183,41c0.1,0,0.2,0,0.2,0c0.1,0,0.3-0.1,0.3-0.2c0.1-0.2,0-0.4-0.2-0.4
				c0,0,0,0-0.1,0c-0.2-0.1-0.4,0-0.4,0.2C182.7,40.8,182.8,41,183,41"></path></g><g><path fill="#2181b3" d="M177.8,34.3h0.2c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-0.2c-0.2,0-0.3,0.1-0.3,0.3
				C177.5,34.2,177.6,34.3,177.8,34.3"></path></g><g><path fill="#2181b3" d="M180.1,32h0.1c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-0.1c-0.2,0-0.3,0.1-0.3,0.3
				C179.8,31.8,179.9,32,180.1,32"></path></g><g><g><path fill="#FFFFFF" d="M180.5,47.6l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.7,1,2.6,2.7,2.6,4.5h0v11.1
					c0,2.1-1.3,3.9-3.1,4.8l-4.4,2.5l0,0l-4.8,2.8c-1.7,1-3.7,0.9-5.3,0l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6
					c-1.7-1-2.6-2.7-2.6-4.5h0V57.6c0-2.1,1.3-3.9,3.1-4.8l4.4-2.5l0,0l4.8-2.8C176.9,46.5,178.9,46.6,180.5,47.6z"></path></g><g><path fill="#2181b3" d="M177.8,79.8c-1,0-1.9-0.3-2.8-0.8l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.6-0.9-2.6-2.6-2.7-4.5
					h0l0-0.3V57.6c0-2.2,1.3-4.1,3.2-5l9.2-5.3c1.7-1,3.9-1,5.6,0l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.6,0.9,2.6,2.6,2.7,4.5
					h0l0,0.3v11.1c0,2.1-1.3,4.1-3.2,5l-9.2,5.3C179.7,79.5,178.8,79.8,177.8,79.8z M163.3,68.4l0,0.3c0,1.8,0.9,3.4,2.5,4.3l4.5,2.6
					c0.1,0.1,0.2,0.1,0.3,0.2l4.8,2.7c1.5,0.9,3.5,0.9,5,0l9.2-5.3c1.8-0.8,2.9-2.6,2.9-4.5l0-11.1c0-1.8-0.9-3.4-2.5-4.3l-4.5-2.6
					c-0.1-0.1-0.2-0.1-0.3-0.2l-4.8-2.7c-1.5-0.9-3.5-0.9-5,0l-9.2,5.3c-1.8,0.8-2.9,2.6-2.9,4.5V68.4z"></path></g><g><path fill="#2181b3" d="M175.1,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8
					c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.4-0.3,0.7h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.5
					c0.2-0.1,0.5-0.2,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2
					C175.2,69.5,175.1,69.5,175.1,69.5 M172.6,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.1,0.1-0.2
					c0-0.1,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1c0,0.1,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C172.8,69.5,172.7,69.5,172.6,69.5z
					 M177.5,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.3
					c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.5-0.3,0.8h-0.5c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.1,0.5-0.2,0.8-0.2
					c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2
					C177.6,69.5,177.5,69.5,177.5,69.5z"></path></g><g><path fill="#2181b3" d="M179.3,64.9c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1
					c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2-0.1,0.3C179.5,64.9,179.4,64.9,179.3,64.9 M179.3,69.5
					c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1
					c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.2-0.1,0.2C179.4,69.5,179.4,69.5,179.3,69.5z"></path></g><g><path fill="#2181b3" d="M181.2,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1
					c0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C181.3,69.5,181.2,69.5,181.2,69.5 M184.1,69.5
					c-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-1.8c0-0.3-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.1-0.6-0.1
					c-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.3,0.2-0.4,0.4c-0.1,0.2-0.2,0.3-0.2,0.5H181c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.6
					c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.6s0.2,0.6,0.2,1v1.8c0,0.1,0,0.1-0.1,0.2
					C184.2,69.5,184.2,69.5,184.1,69.5z"></path></g><text transform="matrix(1 0 0 1 177.5 63)" fill="#2181b3" text-anchor="middle" font-family="var(--comfortea)" font-size="13px">${escape(poiDistanceBike)}</text></g></g>` : ``}<g><path${add_attribute("fill", color, 0)} stroke="white" stroke-width="0.6px" class="cls-8" d="M-3.1,0c-4.4,0-8,3.6-8,8s8,14.7,8,14.7s8-10.3,8-14.7C4.8,3.6,1.3,0-3.1,0 M-3.1,11.9C-5.3,11.9-7,10.1-7,8
		c0-2.2,1.8-3.9,3.9-3.9C-1,4,0.8,5.8,0.8,8C0.8,10.1-1,11.9-3.1,11.9z"></path></g><text transform="matrix(1 0 0 1 -11.6097 35.1343)" fill="#2181b3" font-family="var(--comfortea)" font-size="9.0051px">${escape(poiName)}</text><text transform="matrix(1 0 0 1 -11.2855 54.0779)" fill="#00336E" font-family="var(--comfortea)" font-size="9.0051px">${escape(poiCity)}</text></svg> </div>`;
});
const css$c = {
  code: ':root{--brand-green:#2181b3;--brand-blue:#003661;--brand-lightgreen:#f0f4eb;--brand-light:#f0f4eb70;--comfortea:"Comfortaa", sans-serif;--dark-background:rgba(31, 40, 55, 1.000);--dark-text:#f0f4eb}.pageNumber.svelte-1a1zqgd{text-align:left}.POIelement{min-height:488px}.POIelement .svg-itema svg{width:305px;height:137px;position:relative;display:block}.anachorTop{text-align:center !important;position:relative;width:100%}.POIelement .svg-itema{width:317px;height:171px;padding:0px;position:relative;margin-top:-59px;display:block;max-width:unset;transform:scale(0.96)}.maplibregl-control-container{display:none !important}',
  map: `{"version":3,"file":"page04.svelte","sources":["page04.svelte"],"sourcesContent":["<script>\\n\\timport { onMount } from 'svelte';\\n\\timport Header from '$lib/components/header.svelte';\\n\\timport { scrollTo } from 'svelte-scrolling';\\n\\timport { PUBLIC_API_MAPTILER } from '$env/static/public';\\n\\timport { Map, Marker, MapStyle, config } from '@maptiler/sdk';\\n\\timport '@maptiler/sdk/dist/maptiler-sdk.css';\\n\\tconfig.apiKey = PUBLIC_API_MAPTILER;\\n\\timport { browser } from '$app/environment';\\n\\n\\timport DistanceElement from '$lib/components/DistanceElement.svelte';\\n\\timport Loading from '$lib/components/loading.svelte';\\n\\timport {\\n\\t\\tpoiReady,\\n\\t\\tloading,\\n\\t\\terror,\\n\\t\\toptions,\\n\\t\\tlocation,\\n\\t\\tnewLocation,\\n\\t\\tallDocuments,\\n\\t\\tcurrentDocument\\n\\t} from '$lib/stores/appStore';\\n\\n\\tlet POI;\\n\\tlet colors = {\\n\\t\\tcls0: '#75ffb0',\\n\\t\\tcls1: '#03263D',\\n\\t\\tcls2: '#29c2c9',\\n\\t\\tcls3: '#334d4f',\\n\\t\\tcls4: '#2181b3',\\n\\t\\tcls5: '#056b45',\\n\\t\\tcls6: '#21cc8c',\\n\\t\\tcls7: '#0099b5',\\n\\t\\tcls8: '#00336e',\\n\\t\\tcls9: '#078c5f',\\n\\t\\tcls10: '#03263D',\\n\\t\\tcls11: '#86EAE2',\\n\\t\\tcls12: '#004B49',\\n\\t\\tcls13: '#5EE9C9',\\n\\t\\tcls14: '#4DBDA1',\\n\\t\\tcls15: '#53CDAC',\\n\\t\\tcls16: '#00947A',\\n\\t\\tcls17: '#122C28',\\n\\t\\tcls18: '#209B94',\\n\\t\\tcls19: '#1E8082',\\n\\t\\tcls20: '#88B6B1',\\n\\t\\tcls21: '#4CB7B4',\\n\\t\\tcls22: '#16796B',\\n\\t\\tcls23: '#78DBC0',\\n\\t\\tcls24: '#63A69A',\\n\\t\\tcls25: '#2B7871',\\n\\t\\tcls26: '#4AABA8'\\n\\t};\\n\\n\\timport { fade } from 'svelte/transition';\\n\\t// import fetchData from '$lib/database.js';\\n\\n\\t// import { PUBLIC_API_MAPBOX } from 'PUBLIC_AUTH_TRUST_HOST';\\n\\t// import  Map  from 'mapbox-gl';\\n\\t// import '/node_modules/mapbox-gl/dist/mapbox-gl.css';\\n\\n\\timport {\\n\\t\\tgetLoc,\\n\\t\\tgetNearBy,\\n\\t\\tcreatePOIforMap,\\n\\t\\tgetBounds,\\n\\t\\tgetNearFromAllDocuments\\n\\t} from '$lib/functions';\\n\\n\\tlet mode,\\n\\t\\tready = false,\\n\\t\\tmap;\\n\\n\\tasync function initPOImap() {\\n\\t\\t// console.log('Data for map exist', $location);\\n\\t\\tmap = new Map({\\n\\t\\t\\tcontainer: 'mapa',\\n\\t\\t\\tstyle: MapStyle.BASIC,\\n\\t\\t\\tcenter: [$location.params.lon + 1, $location.params.lat + 1],\\n\\t\\t\\tzoom: 13\\n\\t\\t});\\n\\t\\tmode = 'edit';\\n\\t\\tready = true;\\n\\t}\\n\\tlet addressMarkers = {};\\n\\tlet addresMarkersArray = {};\\n\\tasync function drawPoins(POI) {\\n\\t\\t// NOTE rysowanie punktów na mapie #2\\n\\t\\taddressMarkers = [];\\n\\t\\taddresMarkersArray = [];\\n\\t\\tlet i = 0;\\n\\t\\tif (POI && typeof POI === 'object') {\\n\\t\\t\\tfor (let [key, poi] of Object.entries(POI)) {\\n\\t\\t\\t\\tlet color = colors['cls' + i];\\n\\t\\t\\t\\t// console.log('DisplayPOI OBJECT', poi);\\n\\t\\t\\t\\tlet object = {\\n\\t\\t\\t\\t\\tcolor: color,\\n\\t\\t\\t\\t\\tname: poi.name,\\n\\t\\t\\t\\t\\tcity: poi.city.shortText,\\n\\t\\t\\t\\t\\ttime_car: poi.by_car.time_text,\\n\\t\\t\\t\\t\\ttime_bus: poi.by_bus.time_text,\\n\\t\\t\\t\\t\\ttime_bike: poi.by_bike.time_text\\n\\t\\t\\t\\t};\\n\\n\\t\\t\\t\\taddresMarkersArray.push(object);\\n\\t\\t\\t\\tlet featureCoord = [poi.lon, poi.lat];\\n\\n\\t\\t\\t\\tconst svgCode =\\n\\t\\t\\t\\t\\t\`<svg id=\\"Warstwa_1\\" class=\\"drop\\" data-name=\\"\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 15.95 22.66\\"><defs><style></style></defs><path class=\\"\\" fill=\\"\` +\\n\\t\\t\\t\\t\\tcolor +\\n\\t\\t\\t\\t\\t\`\\" stroke=white stroke-width=\\"0.6px\\" d=\\"m7.98,0C3.57,0,0,3.57,0,7.97s7.98,14.69,7.98,14.69c0,0,7.97-10.28,7.97-14.69S12.39,0,7.98,0m0,11.9c-2.17,0-3.92-1.75-3.92-3.92s1.75-3.93,3.92-3.93,3.92,1.76,3.92,3.93-1.76,3.92-3.92,3.92Z\\"/></svg>\`;\\n\\n\\t\\t\\t\\tconst marker = new Marker({\\n\\t\\t\\t\\t\\telement: document.createElement('div') // Create a div element for the SVG\\n\\t\\t\\t\\t})\\n\\t\\t\\t\\t\\t.setLngLat(featureCoord) // Marker position [lng, lat]\\n\\t\\t\\t\\t\\t.addTo(map);\\n\\n\\t\\t\\t\\tmarker.getElement().innerHTML = svgCode;\\n\\t\\t\\t\\tmarker.getElement().style.width = '24px';\\n\\t\\t\\t\\tmarker.getElement().style.height = '20px';\\n\\n\\t\\t\\t\\taddressMarkers.push(marker);\\n\\t\\t\\t\\ti++;\\n\\t\\t\\t}\\n\\t\\t} else {\\n\\t\\t\\t// console.log(\`POI is \${POI}. Please pass a valid object.\`);\\n\\t\\t}\\n\\t\\tmap.fitBounds($location.params.fitBounds, { padding: 80 });\\n\\t\\treturn true;\\n\\t}\\n\\n\\t$: {\\n\\t\\tif ($location && $location.params && ready == false) {\\n\\t\\t\\tinitPOImap();\\n\\t\\t}\\n\\t\\tif ($location && $location.params && ready == true  && $poiReady==true) {\\n\\t\\t\\tPOI = $location.params.POI;\\n\\t\\t\\tlet filteredPOI = [];\\n\\t\\t\\tfor (let transport in POI) {\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\tif (POI[transport].lat != 0) {\\n\\t\\t\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\t\\t\\tfilteredPOI.push(POI[transport]);\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\tif (filteredPOI.length > 0) {\\n\\t\\t\\t\\tdrawPoins(filteredPOI);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n\\n\\tonMount(() => {});\\n<\/script>\\n\\n<div class=\\"content-block section page_04\\">\\n\\t<Header />\\n\\n\\t<div class=\\"page_content _1\\">\\n\\t\\t<div class=\\"grid_content noselect full_width\\">\\n\\t\\t\\t<h2 class=\\"title_medium noselect\\">\\n\\t\\t\\t\\t<span class=\\"number_type noselect\\">11</span> Wskaźniki czasu dojazdu\\n\\t\\t\\t</h2>\\n\\n\\t\\t\\t<p class=\\"opis_\\">\\n\\t\\t\\t\\tPowyższa mapka i grafiki wskazują orientacyjne czasy dojazdów do określonych punktów\\n\\t\\t\\t\\tdocelowych.\\n\\t\\t\\t</p>\\n\\t\\t</div>\\n\\n\\t\\t<div class=\\"grid_content full_width mapa\\"><div id=\\"mapa\\" /></div>\\n\\t</div>\\n\\t<div class=\\"page_content _2\\">\\n\\t\\t<div class=\\"grid_content noselect POIelement\\">\\n\\t\\t\\t{#if $location && $location.params && $location.params.POI && addresMarkersArray.length > 1}\\n\\t\\t\\t\\t{#each addresMarkersArray as poi}\\n\\t\\t\\t\\t\\t<DistanceElement\\n\\t\\t\\t\\t\\t\\tpoiName={poi.name}\\n\\t\\t\\t\\t\\t\\tpoiCity={poi.city}\\n\\t\\t\\t\\t\\t\\tpoiDistanceBus={poi.time_bus}\\n\\t\\t\\t\\t\\t\\tpoiDistanceCar={poi.time_car}\\n\\t\\t\\t\\t\\t\\tpoiDistanceBike={poi.time_bike}\\n\\t\\t\\t\\t\\t\\tcolor={poi.color}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<!-- svelte-ignore a11y-missing-attribute -->\\n\\t\\t\\t\\t<a\\n\\t\\t\\t\\t\\tuse:scrollTo={'page_01'}\\n\\t\\t\\t\\t\\tclass=\\"anachorTop text-center hover:bg-sky-700 hover:text-white transition-all p-5 rounded-lg\\"\\n\\t\\t\\t\\t\\t>Wybierz lokalizacje na stronie pierwszej</a\\n\\t\\t\\t\\t>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<div class=\\"pageNumber\\">4</div>\\n</div>\\n\\n<style lang=\\"scss\\">/* Variables and mixins declared here will be available in all other SCSS files */\\n:root {\\n  --brand-green: #2181b3;\\n  --brand-blue: #003661;\\n  --brand-lightgreen: #f0f4eb;\\n  --brand-light: #f0f4eb70;\\n  --comfortea: \\"Comfortaa\\", sans-serif;\\n  --dark-background: rgba(31, 40, 55, 1.000);\\n  --dark-text: #f0f4eb;\\n}\\n\\n.pageNumber {\\n  text-align: left;\\n}\\n\\n:global(.POIelement) {\\n  min-height: 488px;\\n}\\n\\n:global(.POIelement .svg-itema svg) {\\n  width: 305px;\\n  height: 137px;\\n  position: relative;\\n  display: block;\\n}\\n\\n:global(.anachorTop) {\\n  text-align: center !important;\\n  position: relative;\\n  width: 100%;\\n}\\n\\n:global(.POIelement .svg-itema) {\\n  width: 317px;\\n  /* border: solid 1px gray; */\\n  height: 171px;\\n  padding: 0px;\\n  position: relative;\\n  margin-top: -59px;\\n  display: block;\\n  max-width: unset;\\n  transform: scale(0.96);\\n}\\n\\n:global(.maplibregl-control-container) {\\n  display: none !important;\\n}</style>\\n"],"names":[],"mappings":"AA0MA,KAAM,CACJ,aAAa,CAAE,OAAO,CACtB,YAAY,CAAE,OAAO,CACrB,kBAAkB,CAAE,OAAO,CAC3B,aAAa,CAAE,SAAS,CACxB,WAAW,CAAE,uBAAuB,CACpC,iBAAiB,CAAE,uBAAuB,CAC1C,WAAW,CAAE,OACf,CAEA,0BAAY,CACV,UAAU,CAAE,IACd,CAEQ,WAAa,CACnB,UAAU,CAAE,KACd,CAEQ,0BAA4B,CAClC,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KACX,CAEQ,WAAa,CACnB,UAAU,CAAE,MAAM,CAAC,UAAU,CAC7B,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IACT,CAEQ,sBAAwB,CAC9B,KAAK,CAAE,KAAK,CAEZ,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,MAAM,IAAI,CACvB,CAEQ,6BAA+B,CACrC,OAAO,CAAE,IAAI,CAAC,UAChB"}`
};
const Page04 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  let $poiReady, $$unsubscribe_poiReady;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_poiReady = subscribe(poiReady, (value) => $poiReady = value);
  config.apiKey = PUBLIC_API_MAPTILER;
  let POI;
  let colors = {
    cls0: "#75ffb0",
    cls1: "#03263D",
    cls2: "#29c2c9",
    cls3: "#334d4f",
    cls4: "#2181b3",
    cls5: "#056b45",
    cls6: "#21cc8c",
    cls7: "#0099b5",
    cls8: "#00336e",
    cls9: "#078c5f",
    cls10: "#03263D",
    cls11: "#86EAE2",
    cls12: "#004B49",
    cls13: "#5EE9C9",
    cls14: "#4DBDA1",
    cls15: "#53CDAC",
    cls16: "#00947A",
    cls17: "#122C28",
    cls18: "#209B94",
    cls19: "#1E8082",
    cls20: "#88B6B1",
    cls21: "#4CB7B4",
    cls22: "#16796B",
    cls23: "#78DBC0",
    cls24: "#63A69A",
    cls25: "#2B7871",
    cls26: "#4AABA8"
  };
  let ready = false, map;
  async function initPOImap() {
    map = new Map({
      container: "mapa",
      style: MapStyle.BASIC,
      center: [$location.params.lon + 1, $location.params.lat + 1],
      zoom: 13
    });
    ready = true;
  }
  let addressMarkers = {};
  let addresMarkersArray = {};
  async function drawPoins(POI2) {
    addressMarkers = [];
    addresMarkersArray = [];
    let i = 0;
    if (POI2 && typeof POI2 === "object") {
      for (let [key, poi] of Object.entries(POI2)) {
        let color = colors["cls" + i];
        let object = {
          color,
          name: poi.name,
          city: poi.city.shortText,
          time_car: poi.by_car.time_text,
          time_bus: poi.by_bus.time_text,
          time_bike: poi.by_bike.time_text
        };
        addresMarkersArray.push(object);
        let featureCoord = [poi.lon, poi.lat];
        const svgCode = `<svg id="Warstwa_1" class="drop" data-name="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.95 22.66"><defs><style></style></defs><path class="" fill="` + color + `" stroke=white stroke-width="0.6px" d="m7.98,0C3.57,0,0,3.57,0,7.97s7.98,14.69,7.98,14.69c0,0,7.97-10.28,7.97-14.69S12.39,0,7.98,0m0,11.9c-2.17,0-3.92-1.75-3.92-3.92s1.75-3.93,3.92-3.93,3.92,1.76,3.92,3.93-1.76,3.92-3.92,3.92Z"/></svg>`;
        const marker = new Marker({
          element: document.createElement("div")
          // Create a div element for the SVG
        }).setLngLat(featureCoord).addTo(
          map
        );
        marker.getElement().innerHTML = svgCode;
        marker.getElement().style.width = "24px";
        marker.getElement().style.height = "20px";
        addressMarkers.push(marker);
        i++;
      }
    }
    map.fitBounds($location.params.fitBounds, { padding: 80 });
    return true;
  }
  $$result.css.add(css$c);
  {
    {
      if ($location && $location.params && ready == false) {
        initPOImap();
      }
      if ($location && $location.params && ready == true && $poiReady == true) {
        POI = $location.params.POI;
        let filteredPOI = [];
        for (let transport in POI) {
          {
            if (POI[transport].lat != 0) {
              {
                filteredPOI.push(POI[transport]);
              }
            }
          }
        }
        if (filteredPOI.length > 0) {
          drawPoins(filteredPOI);
        }
      }
    }
  }
  $$unsubscribe_location();
  $$unsubscribe_poiReady();
  return `<div class="content-block section page_04">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <div class="page_content _1" data-svelte-h="svelte-48uwu5"><div class="grid_content noselect full_width"><h2 class="title_medium noselect"><span class="number_type noselect">11</span> Wskaźniki czasu dojazdu</h2> <p class="opis_">Powyższa mapka i grafiki wskazują orientacyjne czasy dojazdów do określonych punktów
				docelowych.</p></div> <div class="grid_content full_width mapa"><div id="mapa"></div></div></div> <div class="page_content _2"><div class="grid_content noselect POIelement">${$location && $location.params && $location.params.POI && addresMarkersArray.length > 1 ? `${each(addresMarkersArray, (poi) => {
    return `${validate_component(DistanceElement, "DistanceElement").$$render(
      $$result,
      {
        poiName: poi.name,
        poiCity: poi.city,
        poiDistanceBus: poi.time_bus,
        poiDistanceCar: poi.time_car,
        poiDistanceBike: poi.time_bike,
        color: poi.color
      },
      {},
      {}
    )}`;
  })}` : ` <a class="anachorTop text-center hover:bg-sky-700 hover:text-white transition-all p-5 rounded-lg" data-svelte-h="svelte-13l3v7s">Wybierz lokalizacje na stronie pierwszej</a>`}</div></div> <div class="pageNumber svelte-1a1zqgd" data-svelte-h="svelte-qbmqgr">4</div> </div>`;
});
const css$b = {
  code: ".rangeSlider{--pip:var(--range-pip, lightslategray);--pip-text:var(--range-pip-text, var(--pip));--pip-active:var(--range-pip-active, darkslategrey);--pip-active-text:var(--range-pip-active-text, var(--pip-active));--pip-hover:var(--range-pip-hover, darkslategrey);--pip-hover-text:var(--range-pip-hover-text, var(--pip-hover));--pip-in-range:var(--range-pip-in-range, var(--pip-active));--pip-in-range-text:var(--range-pip-in-range-text, var(--pip-active-text))}.rangePips{position:absolute;height:1em;left:0;right:0;bottom:-1em}.rangePips.vertical{height:auto;width:1em;left:100%;right:auto;top:0;bottom:0}.rangePips .pip{height:0.4em;position:absolute;top:0.25em;width:1px;white-space:nowrap}.rangePips.vertical .pip{height:1px;width:0.4em;left:0.25em;top:auto;bottom:auto}.rangePips .pipVal{position:absolute;top:0.4em;transform:translate(-50%, 25%)}.rangePips.vertical .pipVal{position:absolute;top:0;left:0.4em;transform:translate(25%, -50%)}.rangePips .pip{transition:all 0.15s ease}.rangePips .pipVal{transition:all 0.15s ease, font-weight 0s linear}.rangePips .pip{color:lightslategray;color:var(--pip-text);background-color:lightslategray;background-color:var(--pip)}.rangePips .pip.selected{color:darkslategrey;color:var(--pip-active-text);background-color:darkslategrey;background-color:var(--pip-active)}.rangePips.hoverable:not(.disabled) .pip:hover{color:darkslategrey;color:var(--pip-hover-text);background-color:darkslategrey;background-color:var(--pip-hover)}.rangePips .pip.in-range{color:darkslategrey;color:var(--pip-in-range-text);background-color:darkslategrey;background-color:var(--pip-in-range)}.rangePips .pip.selected{height:0.75em}.rangePips.vertical .pip.selected{height:1px;width:0.75em}.rangePips .pip.selected .pipVal{font-weight:bold;top:0.75em}.rangePips.vertical .pip.selected .pipVal{top:0;left:0.75em}.rangePips.hoverable:not(.disabled) .pip:not(.selected):hover{transition:none}.rangePips.hoverable:not(.disabled) .pip:not(.selected):hover .pipVal{transition:none;font-weight:bold}",
  map: `{"version":3,"file":"RangePips.svelte","sources":["RangePips.svelte"],"sourcesContent":["<script>\\n\\n  // range slider props\\n  export let range = false;\\n  export let min = 0;\\n  export let max = 100;\\n  export let step = 1;\\n  export let values = [(max + min) / 2];\\n  export let vertical = false;\\n  export let reversed = false;\\n  export let hoverable = true;\\n  export let disabled = false;\\n\\n  // range pips / values props\\n  export let pipstep = undefined;\\n  export let all = true;\\n  export let first = undefined;\\n  export let last = undefined;\\n  export let rest = undefined;\\n\\n  // formatting props\\n  export let prefix = \\"\\";\\n  export let suffix = \\"\\";\\n  export let formatter = (v,i,p) => v;\\n\\n  // stylistic props\\n  export let focus = undefined;\\n  export let orientationStart = undefined;\\n\\n  // methods\\n  export let percentOf = undefined;\\n  export let moveHandle = undefined;\\n  export let fixFloat = undefined;\\n  export let normalisedClient = undefined;\\n\\n  let clientStart;\\n\\n  $: pipStep = pipstep || ((max - min) / step >= ( vertical ? 50 : 100 ) ? (max - min) / ( vertical ? 10 : 20 ) : 1);\\n\\n  $: pipCount = parseInt((max - min) / (step * pipStep), 10);\\n\\n  $: pipVal = function(val) {\\n    return fixFloat( min + val * step * pipStep );\\n  };\\n\\n  $: isSelected = function(val) {\\n    return values.some(v => fixFloat(v) === fixFloat(val));\\n  };\\n\\n  $: inRange = function(val) {\\n    if (range === \\"min\\") {\\n      return values[0] > val;\\n    } else if (range === \\"max\\") {\\n      return values[0] < val;\\n    } else if (range) {\\n      return values[0] < val && values[1] > val;\\n    }\\n  };\\n\\n  /**\\n   * function to run when the user clicks on a label\\n   * we store the original client position so we can check if the user has moved the mouse/finger\\n   * @param {event} e the event from browser\\n   **/\\n  function labelDown(e) {\\n    e = normalisedClient(e);\\n    clientStart = { x: e.clientX, y: e.clientY };\\n  }\\n\\n  /**\\n   * function to run when the user releases the mouse/finger\\n   * we check if the user has moved the mouse/finger, if not we \\"click\\" the label\\n   * and move the handle it to the label position\\n   * @param {number} val the value of the label\\n   * @param {event} e the event from browser\\n   */\\n  function labelUp(val,e) {\\n    e = normalisedClient(e);\\n    if ( !disabled ) {\\n      const distanceMoved = Math.sqrt( Math.pow( clientStart.x - e.clientX, 2 ) + Math.pow( clientStart.y - e.clientY, 2 ) );\\n      if ( clientStart && ( distanceMoved <= 5 ) ) {\\n        moveHandle( undefined, val );\\n      }\\n    }\\n  }\\n<\/script>\\n\\n<style>\\n  :global(.rangeSlider) {\\n    --pip: var(--range-pip, lightslategray);\\n    --pip-text: var(--range-pip-text, var(--pip));\\n    --pip-active: var(--range-pip-active, darkslategrey);\\n    --pip-active-text: var(--range-pip-active-text, var(--pip-active));\\n    --pip-hover: var(--range-pip-hover, darkslategrey);\\n    --pip-hover-text: var(--range-pip-hover-text, var(--pip-hover));\\n    --pip-in-range: var(--range-pip-in-range, var(--pip-active));\\n    --pip-in-range-text: var(--range-pip-in-range-text, var(--pip-active-text));\\n  }\\n  :global(.rangePips) {\\n    position: absolute;\\n    height: 1em;\\n    left: 0;\\n    right: 0;\\n    bottom: -1em;\\n  }\\n  :global(.rangePips.vertical) {\\n    height: auto;\\n    width: 1em;\\n    left: 100%;\\n    right: auto;\\n    top: 0;\\n    bottom: 0;\\n  }\\n  :global(.rangePips .pip) {\\n    height: 0.4em;\\n    position: absolute;\\n    top: 0.25em;\\n    width: 1px;\\n    white-space: nowrap;\\n  }\\n  :global(.rangePips.vertical .pip) {\\n    height: 1px;\\n    width: 0.4em;\\n    left: 0.25em;\\n    top: auto;\\n    bottom: auto;\\n  }\\n  :global(.rangePips .pipVal) {\\n    position: absolute;\\n    top: 0.4em;\\n    transform: translate(-50%, 25%);\\n  }\\n  :global(.rangePips.vertical .pipVal) {\\n    position: absolute;\\n    top: 0;\\n    left: 0.4em;\\n    transform: translate(25%, -50%);\\n  }\\n  :global(.rangePips .pip) {\\n    transition: all 0.15s ease;\\n  }\\n  :global(.rangePips .pipVal) {\\n    transition: all 0.15s ease, font-weight 0s linear;\\n  }\\n  :global(.rangePips .pip) {\\n    color: lightslategray;\\n    color: var(--pip-text);\\n    background-color: lightslategray;\\n    background-color: var(--pip);\\n  }\\n  :global(.rangePips .pip.selected) {\\n    color: darkslategrey;\\n    color: var(--pip-active-text);\\n    background-color: darkslategrey;\\n    background-color: var(--pip-active);\\n  }\\n  :global(.rangePips.hoverable:not(.disabled) .pip:hover) {\\n    color: darkslategrey;\\n    color: var(--pip-hover-text);\\n    background-color: darkslategrey;\\n    background-color: var(--pip-hover);\\n  }\\n  :global(.rangePips .pip.in-range) {\\n    color: darkslategrey;\\n    color: var(--pip-in-range-text);\\n    background-color: darkslategrey;\\n    background-color: var(--pip-in-range);\\n  }\\n  :global(.rangePips .pip.selected) {\\n    height: 0.75em;\\n  }\\n  :global(.rangePips.vertical .pip.selected) {\\n    height: 1px;\\n    width: 0.75em;\\n  }\\n  :global(.rangePips .pip.selected .pipVal) {\\n    font-weight: bold;\\n    top: 0.75em;\\n  }\\n  :global(.rangePips.vertical .pip.selected .pipVal) {\\n    top: 0;\\n    left: 0.75em;\\n  }\\n  :global(.rangePips.hoverable:not(.disabled) .pip:not(.selected):hover) {\\n    transition: none;\\n  }\\n  :global(.rangePips.hoverable:not(.disabled) .pip:not(.selected):hover .pipVal) {\\n    transition: none;\\n    font-weight: bold;\\n  }\\n</style>\\n\\n<!-- svelte-ignore a11y-click-events-have-key-events -->\\n<div \\n  class=\\"rangePips\\" \\n  class:disabled\\n  class:hoverable \\n  class:vertical \\n  class:reversed \\n  class:focus \\n>\\n  {#if ( all && first !== false ) || first }\\n    <span\\n      class=\\"pip first\\"\\n      class:selected={isSelected(min)}\\n      class:in-range={inRange(min)}\\n      style=\\"{orientationStart}: 0%;\\"\\n      on:pointerdown={(e)=>{labelDown(e)}}\\n      on:pointerup={(e)=>{labelUp(min,e)}}\\n    >\\n      {#if all === 'label' || first === 'label'}\\n        <span class=\\"pipVal\\">\\n          {#if prefix}<span class=\\"pipVal-prefix\\">{prefix}</span>{/if}{@html formatter(fixFloat(min),0,0)}{#if suffix}<span class=\\"pipVal-suffix\\">{suffix}</span>{/if}\\n        </span>\\n      {/if}\\n    </span>\\n  {/if}\\n\\n  {#if ( all && rest !== false ) || rest}\\n    {#each Array(pipCount + 1) as _, i}\\n      {#if pipVal(i) !== min && pipVal(i) !== max}\\n        <span\\n          class=\\"pip\\"\\n          class:selected={isSelected(pipVal(i))}\\n          class:in-range={inRange(pipVal(i))}\\n          style=\\"{orientationStart}: {percentOf(pipVal(i))}%;\\"\\n          on:pointerdown={(e)=>{labelDown(e)}}\\n          on:pointerup={(e)=>{labelUp(pipVal(i),e)}}\\n        >\\n          {#if all === 'label' || rest === 'label'}\\n            <span class=\\"pipVal\\">\\n              {#if prefix}<span class=\\"pipVal-prefix\\">{prefix}</span>{/if}{@html formatter(pipVal(i),i,percentOf(pipVal(i)))}{#if suffix}<span class=\\"pipVal-suffix\\">{suffix}</span>{/if}\\n            </span>\\n          {/if}\\n        </span>\\n      {/if}\\n    {/each}\\n  {/if}\\n\\n  {#if ( all && last !== false ) || last}\\n    <span\\n      class=\\"pip last\\"\\n      class:selected={isSelected(max)}\\n      class:in-range={inRange(max)}\\n      style=\\"{orientationStart}: 100%;\\"\\n      on:pointerdown={(e)=>{labelDown(e)}}\\n      on:pointerup={(e)=>{labelUp(max,e)}}\\n    >\\n      {#if all === 'label' || last === 'label'}\\n        <span class=\\"pipVal\\">\\n          {#if prefix}<span class=\\"pipVal-prefix\\">{prefix}</span>{/if}{@html formatter(fixFloat(max),pipCount,100)}{#if suffix}<span class=\\"pipVal-suffix\\">{suffix}</span>{/if}\\n        </span>\\n      {/if}\\n    </span>\\n  {/if}\\n  \\n</div>\\n"],"names":[],"mappings":"AAwFU,YAAc,CACpB,KAAK,CAAE,gCAAgC,CACvC,UAAU,CAAE,iCAAiC,CAC7C,YAAY,CAAE,sCAAsC,CACpD,iBAAiB,CAAE,+CAA+C,CAClE,WAAW,CAAE,qCAAqC,CAClD,gBAAgB,CAAE,6CAA6C,CAC/D,cAAc,CAAE,4CAA4C,CAC5D,mBAAmB,CAAE,sDACvB,CACQ,UAAY,CAClB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,IACV,CACQ,mBAAqB,CAC3B,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,GAAG,CACV,IAAI,CAAE,IAAI,CACV,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CACV,CACQ,eAAiB,CACvB,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,MAAM,CACX,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,MACf,CACQ,wBAA0B,CAChC,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,KAAK,CACZ,IAAI,CAAE,MAAM,CACZ,GAAG,CAAE,IAAI,CACT,MAAM,CAAE,IACV,CACQ,kBAAoB,CAC1B,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,GAAG,CAChC,CACQ,2BAA6B,CACnC,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CACX,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,IAAI,CAChC,CACQ,eAAiB,CACvB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IACxB,CACQ,kBAAoB,CAC1B,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,WAAW,CAAC,EAAE,CAAC,MAC7C,CACQ,eAAiB,CACvB,KAAK,CAAE,cAAc,CACrB,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,gBAAgB,CAAE,cAAc,CAChC,gBAAgB,CAAE,IAAI,KAAK,CAC7B,CACQ,wBAA0B,CAChC,KAAK,CAAE,aAAa,CACpB,KAAK,CAAE,IAAI,iBAAiB,CAAC,CAC7B,gBAAgB,CAAE,aAAa,CAC/B,gBAAgB,CAAE,IAAI,YAAY,CACpC,CACQ,8CAAgD,CACtD,KAAK,CAAE,aAAa,CACpB,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,gBAAgB,CAAE,aAAa,CAC/B,gBAAgB,CAAE,IAAI,WAAW,CACnC,CACQ,wBAA0B,CAChC,KAAK,CAAE,aAAa,CACpB,KAAK,CAAE,IAAI,mBAAmB,CAAC,CAC/B,gBAAgB,CAAE,aAAa,CAC/B,gBAAgB,CAAE,IAAI,cAAc,CACtC,CACQ,wBAA0B,CAChC,MAAM,CAAE,MACV,CACQ,iCAAmC,CACzC,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,MACT,CACQ,gCAAkC,CACxC,WAAW,CAAE,IAAI,CACjB,GAAG,CAAE,MACP,CACQ,yCAA2C,CACjD,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,MACR,CACQ,6DAA+D,CACrE,UAAU,CAAE,IACd,CACQ,qEAAuE,CAC7E,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,IACf"}`
};
const RangePips = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pipStep;
  let pipCount;
  let pipVal;
  let isSelected;
  let inRange;
  let { range = false } = $$props;
  let { min = 0 } = $$props;
  let { max = 100 } = $$props;
  let { step = 1 } = $$props;
  let { values = [(max + min) / 2] } = $$props;
  let { vertical = false } = $$props;
  let { reversed = false } = $$props;
  let { hoverable = true } = $$props;
  let { disabled = false } = $$props;
  let { pipstep = void 0 } = $$props;
  let { all = true } = $$props;
  let { first = void 0 } = $$props;
  let { last = void 0 } = $$props;
  let { rest = void 0 } = $$props;
  let { prefix = "" } = $$props;
  let { suffix = "" } = $$props;
  let { formatter = (v, i, p) => v } = $$props;
  let { focus = void 0 } = $$props;
  let { orientationStart = void 0 } = $$props;
  let { percentOf = void 0 } = $$props;
  let { moveHandle = void 0 } = $$props;
  let { fixFloat = void 0 } = $$props;
  let { normalisedClient: normalisedClient2 = void 0 } = $$props;
  if ($$props.range === void 0 && $$bindings.range && range !== void 0) $$bindings.range(range);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0) $$bindings.step(step);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0) $$bindings.values(values);
  if ($$props.vertical === void 0 && $$bindings.vertical && vertical !== void 0) $$bindings.vertical(vertical);
  if ($$props.reversed === void 0 && $$bindings.reversed && reversed !== void 0) $$bindings.reversed(reversed);
  if ($$props.hoverable === void 0 && $$bindings.hoverable && hoverable !== void 0) $$bindings.hoverable(hoverable);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.pipstep === void 0 && $$bindings.pipstep && pipstep !== void 0) $$bindings.pipstep(pipstep);
  if ($$props.all === void 0 && $$bindings.all && all !== void 0) $$bindings.all(all);
  if ($$props.first === void 0 && $$bindings.first && first !== void 0) $$bindings.first(first);
  if ($$props.last === void 0 && $$bindings.last && last !== void 0) $$bindings.last(last);
  if ($$props.rest === void 0 && $$bindings.rest && rest !== void 0) $$bindings.rest(rest);
  if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0) $$bindings.prefix(prefix);
  if ($$props.suffix === void 0 && $$bindings.suffix && suffix !== void 0) $$bindings.suffix(suffix);
  if ($$props.formatter === void 0 && $$bindings.formatter && formatter !== void 0) $$bindings.formatter(formatter);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0) $$bindings.focus(focus);
  if ($$props.orientationStart === void 0 && $$bindings.orientationStart && orientationStart !== void 0) $$bindings.orientationStart(orientationStart);
  if ($$props.percentOf === void 0 && $$bindings.percentOf && percentOf !== void 0) $$bindings.percentOf(percentOf);
  if ($$props.moveHandle === void 0 && $$bindings.moveHandle && moveHandle !== void 0) $$bindings.moveHandle(moveHandle);
  if ($$props.fixFloat === void 0 && $$bindings.fixFloat && fixFloat !== void 0) $$bindings.fixFloat(fixFloat);
  if ($$props.normalisedClient === void 0 && $$bindings.normalisedClient && normalisedClient2 !== void 0) $$bindings.normalisedClient(normalisedClient2);
  $$result.css.add(css$b);
  pipStep = pipstep || ((max - min) / step >= (vertical ? 50 : 100) ? (max - min) / (vertical ? 10 : 20) : 1);
  pipCount = parseInt((max - min) / (step * pipStep), 10);
  pipVal = function(val) {
    return fixFloat(min + val * step * pipStep);
  };
  isSelected = function(val) {
    return values.some((v) => fixFloat(v) === fixFloat(val));
  };
  inRange = function(val) {
    if (range === "min") {
      return values[0] > val;
    } else if (range === "max") {
      return values[0] < val;
    } else if (range) {
      return values[0] < val && values[1] > val;
    }
  };
  return ` <div class="${[
    "rangePips",
    (disabled ? "disabled" : "") + " " + (hoverable ? "hoverable" : "") + " " + (vertical ? "vertical" : "") + " " + (reversed ? "reversed" : "") + " " + (focus ? "focus" : "")
  ].join(" ").trim()}">${all && first !== false || first ? `<span class="${[
    "pip first",
    (isSelected(min) ? "selected" : "") + " " + (inRange(min) ? "in-range" : "")
  ].join(" ").trim()}" style="${escape(orientationStart, true) + ": 0%;"}">${all === "label" || first === "label" ? `<span class="pipVal">${prefix ? `<span class="pipVal-prefix">${escape(prefix)}</span>` : ``}<!-- HTML_TAG_START -->${formatter(fixFloat(min), 0, 0)}<!-- HTML_TAG_END -->${suffix ? `<span class="pipVal-suffix">${escape(suffix)}</span>` : ``}</span>` : ``}</span>` : ``} ${all && rest !== false || rest ? `${each(Array(pipCount + 1), (_, i) => {
    return `${pipVal(i) !== min && pipVal(i) !== max ? `<span class="${[
      "pip",
      (isSelected(pipVal(i)) ? "selected" : "") + " " + (inRange(pipVal(i)) ? "in-range" : "")
    ].join(" ").trim()}" style="${escape(orientationStart, true) + ": " + escape(percentOf(pipVal(i)), true) + "%;"}">${all === "label" || rest === "label" ? `<span class="pipVal">${prefix ? `<span class="pipVal-prefix">${escape(prefix)}</span>` : ``}<!-- HTML_TAG_START -->${formatter(pipVal(i), i, percentOf(pipVal(i)))}<!-- HTML_TAG_END -->${suffix ? `<span class="pipVal-suffix">${escape(suffix)}</span>` : ``} </span>` : ``} </span>` : ``}`;
  })}` : ``} ${all && last !== false || last ? `<span class="${[
    "pip last",
    (isSelected(max) ? "selected" : "") + " " + (inRange(max) ? "in-range" : "")
  ].join(" ").trim()}" style="${escape(orientationStart, true) + ": 100%;"}">${all === "label" || last === "label" ? `<span class="pipVal">${prefix ? `<span class="pipVal-prefix">${escape(prefix)}</span>` : ``}<!-- HTML_TAG_START -->${formatter(fixFloat(max), pipCount, 100)}<!-- HTML_TAG_END -->${suffix ? `<span class="pipVal-suffix">${escape(suffix)}</span>` : ``}</span>` : ``}</span>` : ``}</div>`;
});
const css$a = {
  code: '.rangeSlider{--slider:var(--range-slider, #d7dada);--handle-inactive:var(--range-handle-inactive, #99a2a2);--handle:var(--range-handle, #838de7);--handle-focus:var(--range-handle-focus, #4a40d4);--handle-border:var(--range-handle-border, var(--handle));--range-inactive:var(--range-range-inactive, var(--handle-inactive));--range:var(--range-range, var(--handle-focus));--float-inactive:var(--range-float-inactive, var(--handle-inactive));--float:var(--range-float, var(--handle-focus));--float-text:var(--range-float-text, white)}.rangeSlider{position:relative;border-radius:100px;height:0.5em;margin:1em;transition:opacity 0.2s ease;-webkit-user-select:none;-moz-user-select:none;user-select:none}.rangeSlider *{-webkit-user-select:none;-moz-user-select:none;user-select:none}.rangeSlider.pips{margin-bottom:1.8em}.rangeSlider.pip-labels{margin-bottom:2.8em}.rangeSlider.vertical{display:inline-block;border-radius:100px;width:0.5em;min-height:200px}.rangeSlider.vertical.pips{margin-right:1.8em;margin-bottom:1em}.rangeSlider.vertical.pip-labels{margin-right:2.8em;margin-bottom:1em}.rangeSlider .rangeHandle{position:absolute;display:block;height:1.4em;width:1.4em;top:0.25em;bottom:auto;transform:translateY(-50%) translateX(-50%);z-index:2}.rangeSlider.reversed .rangeHandle{transform:translateY(-50%) translateX(50%)}.rangeSlider.vertical .rangeHandle{left:0.25em;top:auto;transform:translateY(50%) translateX(-50%)}.rangeSlider.vertical.reversed .rangeHandle{transform:translateY(-50%) translateX(-50%)}.rangeSlider .rangeNub,.rangeSlider .rangeHandle:before{position:absolute;left:0;top:0;display:block;border-radius:10em;height:100%;width:100%;transition:box-shadow 0.2s ease}.rangeSlider .rangeHandle:before{content:"";left:1px;top:1px;bottom:1px;right:1px;height:auto;width:auto;box-shadow:0 0 0 0px var(--handle-border);opacity:0}.rangeSlider.hoverable:not(.disabled) .rangeHandle:hover:before{box-shadow:0 0 0 8px var(--handle-border);opacity:0.2}.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:before,.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:hover:before{box-shadow:0 0 0 12px var(--handle-border);opacity:0.4}.rangeSlider.range:not(.min):not(.max) .rangeNub{border-radius:10em 10em 10em 1.6em}.rangeSlider.range .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(-135deg)}.rangeSlider.range .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(45deg)}.rangeSlider.range.reversed .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(45deg)}.rangeSlider.range.reversed .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(-135deg)}.rangeSlider.range.vertical .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(135deg)}.rangeSlider.range.vertical .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(-45deg)}.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(-45deg)}.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(135deg)}.rangeSlider .rangeFloat{display:block;position:absolute;left:50%;top:-0.5em;transform:translate(-50%, -100%);font-size:1em;text-align:center;opacity:0;pointer-events:none;white-space:nowrap;transition:all 0.2s ease;font-size:0.9em;padding:0.2em 0.4em;border-radius:0.2em}.rangeSlider .rangeHandle.active .rangeFloat,.rangeSlider.hoverable .rangeHandle:hover .rangeFloat{opacity:1;top:-0.2em;transform:translate(-50%, -100%)}.rangeSlider .rangeBar{position:absolute;display:block;transition:background 0.2s ease;border-radius:1em;height:0.5em;top:0;-webkit-user-select:none;-moz-user-select:none;user-select:none;z-index:1}.rangeSlider.vertical .rangeBar{width:0.5em;height:auto}.rangeSlider{background-color:#d7dada;background-color:var(--slider)}.rangeSlider .rangeBar{background-color:#99a2a2;background-color:var(--range-inactive)}.rangeSlider.focus .rangeBar{background-color:#838de7;background-color:var(--range)}.rangeSlider .rangeNub{background-color:#99a2a2;background-color:var(--handle-inactive)}.rangeSlider.focus .rangeNub{background-color:#838de7;background-color:var(--handle)}.rangeSlider .rangeHandle.active .rangeNub{background-color:#4a40d4;background-color:var(--handle-focus)}.rangeSlider .rangeFloat{color:white;color:var(--float-text);background-color:#99a2a2;background-color:var(--float-inactive)}.rangeSlider.focus .rangeFloat{background-color:#4a40d4;background-color:var(--float)}.rangeSlider.disabled{opacity:0.5}.rangeSlider.disabled .rangeNub{background-color:#d7dada;background-color:var(--slider)}',
  map: `{"version":3,"file":"RangeSlider.svelte","sources":["RangeSlider.svelte"],"sourcesContent":["<svelte:options immutable={false} />\\n\\n<script>\\n  import { spring } from \\"svelte/motion\\";\\n  import { createEventDispatcher } from \\"svelte\\";\\n  import RangePips from \\"./RangePips.svelte\\";\\n\\n  // dom references\\n  export let slider = undefined;\\n\\n  // range slider props\\n  export let range = false;\\n  export let pushy = false;\\n  export let min = 0;\\n  export let max = 100;\\n  export let step = 1;\\n  export let values = [(max + min) / 2];\\n  export let vertical = false;\\n  export let float = false;\\n  export let reversed = false;\\n  export let hoverable = true;\\n  export let disabled = false;\\n\\n  // range pips / values props\\n  export let pips = false;\\n  export let pipstep = undefined;\\n  export let all = undefined;\\n  export let first = undefined;\\n  export let last = undefined;\\n  export let rest = undefined;\\n\\n  // formatting props\\n  export let id = undefined;\\n  export let prefix = \\"\\";\\n  export let suffix = \\"\\";\\n  export let formatter = (v,i,p) => v;\\n  export let handleFormatter = formatter;\\n  export let ariaLabels = [];\\n\\n  // stylistic props\\n  export let precision = 2;\\n  export let springValues = { stiffness: 0.15, damping: 0.4 };\\n\\n  // prepare dispatched events\\n  const dispatch = createEventDispatcher();\\n\\n  // state management\\n  let valueLength = 0;\\n  let focus = false;\\n  let handleActivated = false;\\n  let handlePressed = false;\\n  let keyboardActive = false;\\n  let activeHandle = values.length - 1;\\n  let startValue;\\n  let previousValue;\\n\\n  // copy the initial values in to a spring function which\\n  // will update every time the values array is modified\\n\\n  let springPositions;\\n\\n  /**\\n   * make sure the value is coerced to a float value\\n   * @param {number} v the value to fix\\n   * @return {number} a float version of the input\\n   **/\\n  const fixFloat = (v) => parseFloat((+v).toFixed(precision));\\n\\n  $: {\\n\\n    // check that \\"values\\" is an array, or set it as array\\n    // to prevent any errors in springs, or range trimming\\n    if ( !Array.isArray( values ) ) {\\n      values = [(max + min) / 2];\\n      console.error( \\"'values' prop should be an Array (https://github.com/simeydotme/svelte-range-slider-pips#slider-props)\\" );\\n    }\\n    // trim the range so it remains as a min/max (only 2 handles)\\n    // and also align the handles to the steps\\n    const trimmedAlignedValues = trimRange(values.map((v) => alignValueToStep(v)));\\n    if ( !(values.length === trimmedAlignedValues.length) || !values.every((element, index) => fixFloat(element) === trimmedAlignedValues[index]) ) {\\n      values = trimmedAlignedValues;\\n    }\\n\\n    // check if the valueLength (length of values[]) has changed,\\n    // because if so we need to re-seed the spring function with the\\n    // new values array.\\n    if ( valueLength !== values.length ) {\\n      // set the initial spring values when the slider initialises,\\n      // or when values array length has changed\\n      springPositions = spring(values.map((v) => percentOf(v)), springValues );\\n    } else {\\n      // update the value of the spring function for animated handles\\n      // whenever the values has updated\\n      springPositions.set(values.map((v) => percentOf(v)));\\n    }\\n    // set the valueLength for the next check\\n    valueLength = values.length;\\n\\n    if ( values.length > 1 && !Array.isArray(ariaLabels) ) {\\n      console.warn( \`'ariaLabels' prop should be an Array (https://github.com/simeydotme/svelte-range-slider-pips#slider-props)\` );\\n    }\\n\\n  };\\n\\n  /**\\n   * take in a value, and then calculate that value's percentage\\n   * of the overall range (min-max);\\n   * @param {number} val the value we're getting percent for\\n   * @return {number} the percentage value\\n   **/\\n  $: percentOf = function (val) {\\n    let perc = ((val - min) / (max - min)) * 100;\\n    if (isNaN(perc) || perc <= 0) {\\n      return 0;\\n    } else if (perc >= 100) {\\n      return 100;\\n    } else {\\n      return fixFloat(perc);\\n    }\\n  };\\n\\n  /**\\n   * clamp a value from the range so that it always\\n   * falls within the min/max values\\n   * @param {number} val the value to clamp\\n   * @return {number} the value after it's been clamped\\n   **/\\n  $: clampValue = function (val) {\\n    // return the min/max if outside of that range\\n    return val <= min ? min : val >= max ? max : val;\\n  };\\n\\n  /**\\n   * align the value with the steps so that it\\n   * always sits on the closest (above/below) step\\n   * @param {number} val the value to align\\n   * @return {number} the value after it's been aligned\\n   **/\\n  $: alignValueToStep = function (val) {\\n\\t\\n    // sanity check for performance\\n    if (val <= min) {\\n      return fixFloat(min);\\n    } else if (val >= max) {\\n      return fixFloat(max);\\n    } else {\\n      val = fixFloat(val);\\n    }\\n\\t\\n    // find the middle-point between steps\\n    // and see if the value is closer to the\\n    // next step, or previous step\\n    let remainder = (val - min) % step;\\n    let aligned = val - remainder;\\n    if (Math.abs(remainder) * 2 >= step) {\\n      aligned += remainder > 0 ? step : -step;\\n    }\\n    // make sure the value is within acceptable limits\\n    aligned = clampValue(aligned);\\n    // make sure the returned value is set to the precision desired\\n    // this is also because javascript often returns weird floats\\n    // when dealing with odd numbers and percentages\\n    return fixFloat(aligned);\\n  };\\n\\n  /**\\n   * the orientation of the handles/pips based on the\\n   * input values of vertical and reversed\\n   **/\\n  $: orientationStart = vertical ? reversed ? 'top' : 'bottom' : reversed ? 'right' : 'left';\\n  $: orientationEnd = vertical ? reversed ? 'bottom' : 'top' : reversed ? 'left' : 'right';\\n\\n  /**\\n   * helper func to get the index of an element in it's DOM container\\n   * @param {object} el dom object reference we want the index of\\n   * @returns {number} the index of the input element\\n   **/\\n  function index(el) {\\n    if (!el) return -1;\\n    var i = 0;\\n    while ((el = el.previousElementSibling)) {\\n      i++;\\n    }\\n    return i;\\n  }\\n\\n  /**\\n   * normalise a mouse or touch event to return the\\n   * client (x/y) object for that event\\n   * @param {event} e a mouse/touch event to normalise\\n   * @returns {object} normalised event client object (x,y)\\n   **/\\n  function normalisedClient(e) {\\n    if (e.type.includes(\\"touch\\")) {\\n      return e.touches[0] || e.changedTouches[0];\\n    } else {\\n      return e;\\n    }\\n  }\\n\\n  /**\\n   * check if an element is a handle on the slider\\n   * @param {object} el dom object reference we want to check\\n   * @returns {boolean}\\n   **/\\n  function targetIsHandle(el) {\\n    const handles = slider.querySelectorAll(\\".handle\\");\\n    const isHandle = Array.prototype.includes.call(handles, el);\\n    const isChild = Array.prototype.some.call(handles, (e) => e.contains(el));\\n    return isHandle || isChild;\\n  }\\n\\n  /**\\n   * trim the values array based on whether the property\\n   * for 'range' is 'min', 'max', or truthy. This is because we\\n   * do not want more than one handle for a min/max range, and we do\\n   * not want more than two handles for a true range.\\n   * @param {array} values the input values for the rangeSlider\\n   * @return {array} the range array for creating a rangeSlider\\n   **/\\n  function trimRange(values) {\\n    if (range === \\"min\\" || range === \\"max\\") {\\n      return values.slice(0, 1);\\n    } else if (range) {\\n      return values.slice(0, 2);\\n    } else {\\n      return values;\\n    }\\n  }\\n\\n  /**\\n   * helper to return the slider dimensions for finding\\n   * the closest handle to user interaction\\n   * @return {object} the range slider DOM client rect\\n   **/\\n  function getSliderDimensions() {\\n    return slider.getBoundingClientRect();\\n  }\\n\\n  /**\\n   * helper to return closest handle to user interaction\\n   * @param {object} clientPos the client{x,y} positions to check against\\n   * @return {number} the index of the closest handle to clientPos\\n   **/\\n  function getClosestHandle(clientPos) {\\n    // first make sure we have the latest dimensions\\n    // of the slider, as it may have changed size\\n    const dims = getSliderDimensions();\\n    // calculate the interaction position, percent and value\\n    let handlePos = 0;\\n    let handlePercent = 0;\\n    let handleVal = 0;\\n    if (vertical) {\\n      handlePos = clientPos.clientY - dims.top;\\n      handlePercent = (handlePos / dims.height) * 100;\\n      handlePercent = reversed ? handlePercent : 100 - handlePercent;\\n    } else {\\n      handlePos = clientPos.clientX - dims.left;\\n      handlePercent = (handlePos / dims.width) * 100;\\n      handlePercent = reversed ? 100 - handlePercent : handlePercent;\\n    }\\n    handleVal = ((max - min) / 100) * handlePercent + min;\\n\\n    let closest;\\n\\n    // if we have a range, and the handles are at the same\\n    // position, we want a simple check if the interaction\\n    // value is greater than return the second handle\\n    if (range === true && values[0] === values[1]) {\\n      if (handleVal > values[1]) {\\n        return 1;\\n      } else {\\n        return 0;\\n      }\\n      // if there are multiple handles, and not a range, then\\n      // we sort the handles values, and return the first one closest\\n      // to the interaction value\\n    } else {\\n      closest = values.indexOf(\\n        [...values].sort((a, b) => Math.abs(handleVal - a) - Math.abs(handleVal - b))[0]\\n      );\\n    }\\n    return closest;\\n  }\\n\\n  /**\\n   * take the interaction position on the slider, convert\\n   * it to a value on the range, and then send that value\\n   * through to the moveHandle() method to set the active\\n   * handle's position\\n   * @param {object} clientPos the client{x,y} of the interaction\\n   **/\\n  function handleInteract(clientPos) {\\n    // first make sure we have the latest dimensions\\n    // of the slider, as it may have changed size\\n    const dims = getSliderDimensions();\\n    // calculate the interaction position, percent and value\\n    let handlePos = 0;\\n    let handlePercent = 0;\\n    let handleVal = 0;\\n    if (vertical) {\\n      handlePos = clientPos.clientY - dims.top;\\n      handlePercent = (handlePos / dims.height) * 100;\\n      handlePercent = reversed ? handlePercent : 100 - handlePercent;\\n    } else {\\n      handlePos = clientPos.clientX - dims.left;\\n      handlePercent = (handlePos / dims.width) * 100;\\n      handlePercent = reversed ? 100 - handlePercent : handlePercent;\\n    }\\n    handleVal = ((max - min) / 100) * handlePercent + min;\\n    // move handle to the value\\n    moveHandle(activeHandle, handleVal);\\n  }\\n\\n  /**\\n   * move a handle to a specific value, respecting the clamp/align rules\\n   * @param {number} index the index of the handle we want to move\\n   * @param {number} value the value to move the handle to\\n   * @return {number} the value that was moved to (after alignment/clamping)\\n   **/\\n  function moveHandle(index, value) {\\n    // align & clamp the value so we're not doing extra\\n    // calculation on an out-of-range value down below\\n    value = alignValueToStep(value);\\n    // use the active handle if handle index is not provided\\n    if ( typeof index === 'undefined' ) {\\n      index = activeHandle;\\n    }\\n    // if this is a range slider perform special checks\\n    if (range) {\\n      // restrict the handles of a range-slider from\\n      // going past one-another unless \\"pushy\\" is true\\n      if (index === 0 && value > values[1]) {\\n        if (pushy) {\\n          values[1] = value;\\n        } else {\\n          value = values[1];\\n        }\\n      } else if (index === 1 && value < values[0]) {\\n        if (pushy) {\\n          values[0] = value;\\n        } else {\\n          value = values[0];\\n        }\\n      }\\n    }\\n\\n    // if the value has changed, update it\\n    if (values[index] !== value) {\\n      values[index] = value;\\n    }\\n\\n    // fire the change event when the handle moves,\\n    // and store the previous value for the next time\\n    if (previousValue !== value) {\\n      eChange();\\n      previousValue = value;\\n    }\\n    return value;\\n  }\\n\\n  /**\\n   * helper to find the beginning range value for use with css style\\n   * @param {array} values the input values for the rangeSlider\\n   * @return {number} the beginning of the range\\n   **/\\n  function rangeStart(values) {\\n    if (range === \\"min\\") {\\n      return 0;\\n    } else {\\n      return values[0];\\n    }\\n  }\\n\\n  /**\\n   * helper to find the ending range value for use with css style\\n   * @param {array} values the input values for the rangeSlider\\n   * @return {number} the end of the range\\n   **/\\n  function rangeEnd(values) {\\n    if (range === \\"max\\") {\\n      return 0;\\n    } else if (range === \\"min\\") {\\n      return 100 - values[0];\\n    } else {\\n      return 100 - values[1];\\n    }\\n  }\\n\\n  /**\\n   * helper to take a string of html and return only the text\\n   * @param {string} possibleHtml the string that may contain html\\n   * @return {string} the text from the input\\n   */\\n  function pureText(possibleHtml) {\\n    return \`\${possibleHtml}\`.replace(/<[^>]*>/g, '');\\n  }\\n\\n  /**\\n   * when the user has unfocussed (blurred) from the\\n   * slider, deactivate all handles\\n   * @param {event} e the event from browser\\n   **/\\n  function sliderBlurHandle(e) {\\n    if (keyboardActive) {\\n      focus = false;\\n      handleActivated = false;\\n      handlePressed = false;\\n    }\\n  }\\n\\n  /**\\n   * when the user focusses the handle of a slider\\n   * set it to be active\\n   * @param {event} e the event from browser\\n   **/\\n  function sliderFocusHandle(e) {\\n    if ( !disabled ) {\\n      activeHandle = index(e.target);\\n      focus = true;\\n    }\\n  }\\n\\n  /**\\n   * handle the keyboard accessible features by checking the\\n   * input type, and modfier key then moving handle by appropriate amount\\n   * @param {event} e the event from browser\\n   **/\\n  function sliderKeydown(e) {\\n    if ( !disabled ) {\\n      const handle = index(e.target);\\n      let jump = e.ctrlKey || e.metaKey || e.shiftKey ? step * 10 : step;\\n      let prevent = false;\\n\\n      switch (e.key) {\\n        case \\"PageDown\\":\\n          jump *= 10;\\n        case \\"ArrowRight\\":\\n        case \\"ArrowUp\\":\\n          moveHandle(handle, values[handle] + jump);\\n          prevent = true;\\n          break;\\n        case \\"PageUp\\":\\n          jump *= 10;\\n        case \\"ArrowLeft\\":\\n        case \\"ArrowDown\\":\\n          moveHandle(handle, values[handle] - jump);\\n          prevent = true;\\n          break;\\n        case \\"Home\\":\\n          moveHandle(handle, min);\\n          prevent = true;\\n          break;\\n        case \\"End\\":\\n          moveHandle(handle, max);\\n          prevent = true;\\n          break;\\n      }\\n      if (prevent) {\\n        e.preventDefault();\\n        e.stopPropagation();\\n      }\\n    }\\n  }\\n\\n  /**\\n   * function to run when the user touches\\n   * down on the slider element anywhere\\n   * @param {event} e the event from browser\\n   **/\\n  function sliderInteractStart(e) {\\n    if ( !disabled ) {\\n      const el = e.target;\\n      const clientPos = normalisedClient(e);\\n      // set the closest handle as active\\n      focus = true;\\n      handleActivated = true;\\n      handlePressed = true;\\n      activeHandle = getClosestHandle(clientPos);\\n\\n      // fire the start event\\n      startValue = previousValue = alignValueToStep(values[activeHandle]);\\n      eStart();\\n\\n      // for touch devices we want the handle to instantly\\n      // move to the position touched for more responsive feeling\\n      if (e.type === \\"touchstart\\" && !el.matches(\\".pipVal\\")) {\\n        handleInteract(clientPos);\\n      }\\n    }\\n  }\\n\\n  /**\\n   * function to run when the user stops touching\\n   * down on the slider element anywhere\\n   * @param {event} e the event from browser\\n   **/\\n  function sliderInteractEnd(e) {\\n    // fire the stop event for touch devices\\n    if (e.type === \\"touchend\\") {\\n      eStop();\\n    }\\n    handlePressed = false;\\n  }\\n\\n  /**\\n   * unfocus the slider if the user clicked off of\\n   * it, somewhere else on the screen\\n   * @param {event} e the event from browser\\n   **/\\n  function bodyInteractStart(e) {\\n    keyboardActive = false;\\n    if (focus && e.target !== slider && !slider.contains(e.target)) {\\n      focus = false;\\n    }\\n  }\\n\\n  /**\\n   * send the clientX through to handle the interaction\\n   * whenever the user moves acros screen while active\\n   * @param {event} e the event from browser\\n   **/\\n  function bodyInteract(e) {\\n    if ( !disabled ) {\\n      if (handleActivated) {\\n        handleInteract(normalisedClient(e));\\n      }\\n    }\\n  }\\n\\n  /**\\n   * if user triggers mouseup on the body while\\n   * a handle is active (without moving) then we\\n   * trigger an interact event there\\n   * @param {event} e the event from browser\\n   **/\\n  function bodyMouseUp(e) {\\n    if ( !disabled ) {\\n      const el = e.target;\\n      // this only works if a handle is active, which can\\n      // only happen if there was sliderInteractStart triggered\\n      // on the slider, already\\n      if (handleActivated) {\\n        if (el === slider || slider.contains(el)) {\\n          focus = true;\\n          // don't trigger interact if the target is a handle (no need) or\\n          // if the target is a label (we want to move to that value from rangePips)\\n          if (!targetIsHandle(el) && !el.matches(\\".pipVal\\")) {\\n            handleInteract(normalisedClient(e));\\n          }\\n        }\\n        // fire the stop event for mouse device\\n        // when the body is triggered with an active handle\\n        eStop();\\n      }\\n    }\\n    handleActivated = false;\\n    handlePressed = false;\\n  }\\n\\n  /**\\n   * if user triggers touchend on the body then we\\n   * defocus the slider completely\\n   * @param {event} e the event from browser\\n   **/\\n  function bodyTouchEnd(e) {\\n    handleActivated = false;\\n    handlePressed = false;\\n  }\\n\\n  function bodyKeyDown(e) {\\n    if ( !disabled ) {\\n      if (e.target === slider || slider.contains(e.target)) {\\n        keyboardActive = true;\\n      }\\n    }\\n  }\\n\\n  function eStart() {\\n    !disabled && dispatch(\\"start\\", {\\n      activeHandle,\\n      value: startValue,\\n      values: values.map((v) => alignValueToStep(v)),\\n    });\\n  }\\n\\n  function eStop() {\\n    !disabled && dispatch(\\"stop\\", {\\n      activeHandle,\\n      startValue: startValue,\\n      value: values[activeHandle],\\n      values: values.map((v) => alignValueToStep(v)),\\n    });\\n  }\\n\\n  function eChange() {\\n    !disabled && dispatch(\\"change\\", {\\n      activeHandle,\\n      startValue: startValue,\\n      previousValue:\\n        typeof previousValue === \\"undefined\\" ? startValue : previousValue,\\n      value: values[activeHandle],\\n      values: values.map((v) => alignValueToStep(v)),\\n    });\\n  }\\n<\/script>\\n\\n<style>\\n  :global(.rangeSlider) {\\n    --slider: var(--range-slider, #d7dada);\\n    --handle-inactive: var(--range-handle-inactive, #99a2a2);\\n    --handle: var(--range-handle, #838de7);\\n    --handle-focus: var(--range-handle-focus, #4a40d4);\\n    --handle-border: var(--range-handle-border, var(--handle));\\n    --range-inactive: var(--range-range-inactive, var(--handle-inactive));\\n    --range: var(--range-range, var(--handle-focus));\\n    --float-inactive: var(--range-float-inactive, var(--handle-inactive));\\n    --float: var(--range-float, var(--handle-focus));\\n    --float-text: var(--range-float-text, white);\\n  }\\n  :global(.rangeSlider) {\\n    position: relative;\\n    border-radius: 100px;\\n    height: 0.5em;\\n    margin: 1em;\\n    transition: opacity 0.2s ease;\\n    -webkit-user-select: none;\\n       -moz-user-select: none;\\n            user-select: none;\\n  }\\n  :global(.rangeSlider *) {\\n    -webkit-user-select: none;\\n       -moz-user-select: none;\\n            user-select: none;\\n  }\\n  :global(.rangeSlider.pips) {\\n    margin-bottom: 1.8em;\\n  }\\n  :global(.rangeSlider.pip-labels) {\\n    margin-bottom: 2.8em;\\n  }\\n  :global(.rangeSlider.vertical) {\\n    display: inline-block;\\n    border-radius: 100px;\\n    width: 0.5em;\\n    min-height: 200px;\\n  }\\n  :global(.rangeSlider.vertical.pips) {\\n    margin-right: 1.8em;\\n    margin-bottom: 1em;\\n  }\\n  :global(.rangeSlider.vertical.pip-labels) {\\n    margin-right: 2.8em;\\n    margin-bottom: 1em;\\n  }\\n  :global(.rangeSlider .rangeHandle) {\\n    position: absolute;\\n    display: block;\\n    height: 1.4em;\\n    width: 1.4em;\\n    top: 0.25em;\\n    bottom: auto;\\n    transform: translateY(-50%) translateX(-50%);\\n    z-index: 2;\\n  }\\n  :global(.rangeSlider.reversed .rangeHandle) {\\n    transform: translateY(-50%) translateX(50%);\\n  }\\n  :global(.rangeSlider.vertical .rangeHandle) {\\n    left: 0.25em;\\n    top: auto;\\n    transform: translateY(50%) translateX(-50%);\\n  }\\n  :global(.rangeSlider.vertical.reversed .rangeHandle) {\\n    transform: translateY(-50%) translateX(-50%);\\n  }\\n  :global(.rangeSlider .rangeNub),\\n  :global(.rangeSlider .rangeHandle:before) {\\n    position: absolute;\\n    left: 0;\\n    top: 0;\\n    display: block;\\n    border-radius: 10em;\\n    height: 100%;\\n    width: 100%;\\n    transition: box-shadow 0.2s ease;\\n  }\\n  :global(.rangeSlider .rangeHandle:before) {\\n    content: \\"\\";\\n    left: 1px;\\n    top: 1px;\\n    bottom: 1px;\\n    right: 1px;\\n    height: auto;\\n    width: auto;\\n    box-shadow: 0 0 0 0px var(--handle-border);\\n    opacity: 0;\\n  }\\n  :global(.rangeSlider.hoverable:not(.disabled) .rangeHandle:hover:before) {\\n    box-shadow: 0 0 0 8px var(--handle-border);\\n    opacity: 0.2;\\n  }\\n  :global(.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:before),\\n  :global(.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:hover:before) {\\n    box-shadow: 0 0 0 12px var(--handle-border);\\n    opacity: 0.4;\\n  }\\n  :global(.rangeSlider.range:not(.min):not(.max) .rangeNub) {\\n    border-radius: 10em 10em 10em 1.6em;\\n  }\\n  :global(.rangeSlider.range .rangeHandle:nth-of-type(1) .rangeNub) {\\n    transform: rotate(-135deg);\\n  }\\n  :global(.rangeSlider.range .rangeHandle:nth-of-type(2) .rangeNub) {\\n    transform: rotate(45deg);\\n  }\\n  :global(.rangeSlider.range.reversed .rangeHandle:nth-of-type(1) .rangeNub) {\\n    transform: rotate(45deg);\\n  }\\n  :global(.rangeSlider.range.reversed .rangeHandle:nth-of-type(2) .rangeNub) {\\n    transform: rotate(-135deg);\\n  }\\n  :global(.rangeSlider.range.vertical .rangeHandle:nth-of-type(1) .rangeNub) {\\n    transform: rotate(135deg);\\n  }\\n  :global(.rangeSlider.range.vertical .rangeHandle:nth-of-type(2) .rangeNub) {\\n    transform: rotate(-45deg);\\n  }\\n  :global(.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(1) .rangeNub) {\\n    transform: rotate(-45deg);\\n  }\\n  :global(.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(2) .rangeNub) {\\n    transform: rotate(135deg);\\n  }\\n  :global(.rangeSlider .rangeFloat) {\\n    display: block;\\n    position: absolute;\\n    left: 50%;\\n    top: -0.5em;\\n    transform: translate(-50%, -100%);\\n    font-size: 1em;\\n    text-align: center;\\n    opacity: 0;\\n    pointer-events: none;\\n    white-space: nowrap;\\n    transition: all 0.2s ease;\\n    font-size: 0.9em;\\n    padding: 0.2em 0.4em;\\n    border-radius: 0.2em;\\n  }\\n  :global(.rangeSlider .rangeHandle.active .rangeFloat),\\n  :global(.rangeSlider.hoverable .rangeHandle:hover .rangeFloat) {\\n    opacity: 1;\\n    top: -0.2em;\\n    transform: translate(-50%, -100%);\\n  }\\n  :global(.rangeSlider .rangeBar) {\\n    position: absolute;\\n    display: block;\\n    transition: background 0.2s ease;\\n    border-radius: 1em;\\n    height: 0.5em;\\n    top: 0;\\n    -webkit-user-select: none;\\n       -moz-user-select: none;\\n            user-select: none;\\n    z-index: 1;\\n  }\\n  :global(.rangeSlider.vertical .rangeBar) {\\n    width: 0.5em;\\n    height: auto;\\n  }\\n  :global(.rangeSlider) {\\n    background-color: #d7dada;\\n    background-color: var(--slider);\\n  }\\n  :global(.rangeSlider .rangeBar) {\\n    background-color: #99a2a2;\\n    background-color: var(--range-inactive);\\n  }\\n  :global(.rangeSlider.focus .rangeBar) {\\n    background-color: #838de7;\\n    background-color: var(--range);\\n  }\\n  :global(.rangeSlider .rangeNub) {\\n    background-color: #99a2a2;\\n    background-color: var(--handle-inactive);\\n  }\\n  :global(.rangeSlider.focus .rangeNub) {\\n    background-color: #838de7;\\n    background-color: var(--handle);\\n  }\\n  :global(.rangeSlider .rangeHandle.active .rangeNub) {\\n    background-color: #4a40d4;\\n    background-color: var(--handle-focus);\\n  }\\n  :global(.rangeSlider .rangeFloat) {\\n    color: white;\\n    color: var(--float-text);\\n    background-color: #99a2a2;\\n    background-color: var(--float-inactive);\\n  }\\n  :global(.rangeSlider.focus .rangeFloat) {\\n    background-color: #4a40d4;\\n    background-color: var(--float);\\n  }\\n  :global(.rangeSlider.disabled) {\\n    opacity: 0.5;\\n  }\\n  :global(.rangeSlider.disabled .rangeNub) {\\n    background-color: #d7dada;\\n    background-color: var(--slider);\\n  }\\n</style>\\n\\n<!-- svelte-ignore a11y-click-events-have-key-events -->\\n<div\\n  {id}\\n  bind:this={slider}\\n  role=\\"none\\"\\n  class=\\"rangeSlider\\"\\n  class:range\\n  class:disabled\\n  class:hoverable\\n  class:vertical\\n  class:reversed\\n  class:focus\\n  class:min={range === 'min'}\\n  class:max={range === 'max'}\\n  class:pips\\n  class:pip-labels={all === 'label' || first === 'label' || last === 'label' || rest === 'label'}\\n  on:mousedown={sliderInteractStart}\\n  on:mouseup={sliderInteractEnd}\\n  on:touchstart|preventDefault={sliderInteractStart}\\n  on:touchend|preventDefault={sliderInteractEnd}\\n>\\n  {#each values as value, index}\\n    <span\\n      role=\\"slider\\"\\n      class=\\"rangeHandle\\"\\n      class:active={focus && activeHandle === index}\\n      class:press={handlePressed && activeHandle === index}\\n      data-handle={index}\\n      on:blur={sliderBlurHandle}\\n      on:focus={sliderFocusHandle}\\n      on:keydown={sliderKeydown}\\n      style=\\"{orientationStart}: {$springPositions[index]}%; z-index: {activeHandle === index ? 3 : 2};\\"\\n      aria-label={ariaLabels[index]}\\n      aria-valuemin={range === true && index === 1 ? values[0] : min}\\n      aria-valuemax={range === true && index === 0 ? values[1] : max}\\n      aria-valuenow={value}\\n      aria-valuetext=\\"{prefix}{pureText(handleFormatter(value,index,percentOf(value)))}{suffix}\\"\\n      aria-orientation={vertical ? 'vertical' : 'horizontal'}\\n      aria-disabled={disabled}\\n      {disabled}\\n      tabindex=\\"{ disabled ? -1 : 0 }\\"\\n    >\\n      <span class=\\"rangeNub\\" />\\n      {#if float}\\n        <span class=\\"rangeFloat\\">\\n          {#if prefix}<span class=\\"rangeFloat-prefix\\">{prefix}</span>{/if}{@html handleFormatter(value,index,percentOf(value))}{#if suffix}<span class=\\"rangeFloat-suffix\\">{suffix}</span>{/if}\\n        </span>\\n      {/if}\\n    </span>\\n  {/each}\\n  {#if range}\\n    <span\\n      class=\\"rangeBar\\"\\n      style=\\"{orientationStart}: {rangeStart($springPositions)}%; \\n             {orientationEnd}: {rangeEnd($springPositions)}%;\\" />\\n  {/if}\\n  {#if pips}\\n    <RangePips\\n      {values}\\n      {min}\\n      {max}\\n      {step}\\n      {range}\\n      {vertical}\\n      {reversed}\\n      {orientationStart}\\n      {hoverable}\\n      {disabled}\\n      {all}\\n      {first}\\n      {last}\\n      {rest}\\n      {pipstep}\\n      {prefix}\\n      {suffix}\\n      {formatter}\\n      {focus}\\n      {percentOf}\\n      {moveHandle}\\n      {fixFloat}\\n      {normalisedClient}\\n    />\\n  {/if}\\n</div>\\n\\n<svelte:window\\n  on:mousedown={bodyInteractStart}\\n  on:touchstart={bodyInteractStart}\\n  on:mousemove={bodyInteract}\\n  on:touchmove={bodyInteract}\\n  on:mouseup={bodyMouseUp}\\n  on:touchend={bodyTouchEnd}\\n  on:keydown={bodyKeyDown} />\\n"],"names":[],"mappings":"AAgmBU,YAAc,CACpB,QAAQ,CAAE,4BAA4B,CACtC,iBAAiB,CAAE,qCAAqC,CACxD,QAAQ,CAAE,4BAA4B,CACtC,cAAc,CAAE,kCAAkC,CAClD,eAAe,CAAE,yCAAyC,CAC1D,gBAAgB,CAAE,mDAAmD,CACrE,OAAO,CAAE,uCAAuC,CAChD,gBAAgB,CAAE,mDAAmD,CACrE,OAAO,CAAE,uCAAuC,CAChD,YAAY,CAAE,8BAChB,CACQ,YAAc,CACpB,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,KAAK,CACpB,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,IAAI,CAC7B,mBAAmB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,CACjB,WAAW,CAAE,IACvB,CACQ,cAAgB,CACtB,mBAAmB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,CACjB,WAAW,CAAE,IACvB,CACQ,iBAAmB,CACzB,aAAa,CAAE,KACjB,CACQ,uBAAyB,CAC/B,aAAa,CAAE,KACjB,CACQ,qBAAuB,CAC7B,OAAO,CAAE,YAAY,CACrB,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,KACd,CACQ,0BAA4B,CAClC,YAAY,CAAE,KAAK,CACnB,aAAa,CAAE,GACjB,CACQ,gCAAkC,CACxC,YAAY,CAAE,KAAK,CACnB,aAAa,CAAE,GACjB,CACQ,yBAA2B,CACjC,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,GAAG,CAAE,MAAM,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,WAAW,IAAI,CAAC,CAC5C,OAAO,CAAE,CACX,CACQ,kCAAoC,CAC1C,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,WAAW,GAAG,CAC5C,CACQ,kCAAoC,CAC1C,IAAI,CAAE,MAAM,CACZ,GAAG,CAAE,IAAI,CACT,SAAS,CAAE,WAAW,GAAG,CAAC,CAAC,WAAW,IAAI,CAC5C,CACQ,2CAA6C,CACnD,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,WAAW,IAAI,CAC7C,CACQ,sBAAuB,CACvB,gCAAkC,CACxC,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,IAC9B,CACQ,gCAAkC,CACxC,OAAO,CAAE,EAAE,CACX,IAAI,CAAE,GAAG,CACT,GAAG,CAAE,GAAG,CACR,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,IAAI,eAAe,CAAC,CAC1C,OAAO,CAAE,CACX,CACQ,+DAAiE,CACvE,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,IAAI,eAAe,CAAC,CAC1C,OAAO,CAAE,GACX,CACQ,+DAAgE,CAChE,qEAAuE,CAC7E,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,eAAe,CAAC,CAC3C,OAAO,CAAE,GACX,CACQ,gDAAkD,CACxD,aAAa,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,KAChC,CACQ,wDAA0D,CAChE,SAAS,CAAE,OAAO,OAAO,CAC3B,CACQ,wDAA0D,CAChE,SAAS,CAAE,OAAO,KAAK,CACzB,CACQ,iEAAmE,CACzE,SAAS,CAAE,OAAO,KAAK,CACzB,CACQ,iEAAmE,CACzE,SAAS,CAAE,OAAO,OAAO,CAC3B,CACQ,iEAAmE,CACzE,SAAS,CAAE,OAAO,MAAM,CAC1B,CACQ,iEAAmE,CACzE,SAAS,CAAE,OAAO,MAAM,CAC1B,CACQ,0EAA4E,CAClF,SAAS,CAAE,OAAO,MAAM,CAC1B,CACQ,0EAA4E,CAClF,SAAS,CAAE,OAAO,MAAM,CAC1B,CACQ,wBAA0B,CAChC,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,GAAG,CACT,GAAG,CAAE,MAAM,CACX,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,KAAK,CAAC,CACjC,SAAS,CAAE,GAAG,CACd,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IAAI,CACpB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,KAAK,CAAC,KAAK,CACpB,aAAa,CAAE,KACjB,CACQ,4CAA6C,CAC7C,qDAAuD,CAC7D,OAAO,CAAE,CAAC,CACV,GAAG,CAAE,MAAM,CACX,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,KAAK,CAClC,CACQ,sBAAwB,CAC9B,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,IAAI,CAChC,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,KAAK,CACb,GAAG,CAAE,CAAC,CACN,mBAAmB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,CACzB,OAAO,CAAE,CACX,CACQ,+BAAiC,CACvC,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IACV,CACQ,YAAc,CACpB,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,QAAQ,CAChC,CACQ,sBAAwB,CAC9B,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,gBAAgB,CACxC,CACQ,4BAA8B,CACpC,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,OAAO,CAC/B,CACQ,sBAAwB,CAC9B,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,iBAAiB,CACzC,CACQ,4BAA8B,CACpC,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,QAAQ,CAChC,CACQ,0CAA4C,CAClD,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,cAAc,CACtC,CACQ,wBAA0B,CAChC,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,gBAAgB,CACxC,CACQ,8BAAgC,CACtC,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,OAAO,CAC/B,CACQ,qBAAuB,CAC7B,OAAO,CAAE,GACX,CACQ,+BAAiC,CACvC,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,QAAQ,CAChC"}`
};
function normalisedClient(e) {
  if (e.type.includes("touch")) {
    return e.touches[0] || e.changedTouches[0];
  } else {
    return e;
  }
}
function pureText(possibleHtml) {
  return `${possibleHtml}`.replace(/<[^>]*>/g, "");
}
const RangeSlider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let percentOf;
  let clampValue;
  let alignValueToStep;
  let orientationStart;
  let orientationEnd;
  let $springPositions, $$unsubscribe_springPositions = noop, $$subscribe_springPositions = () => ($$unsubscribe_springPositions(), $$unsubscribe_springPositions = subscribe(springPositions, ($$value) => $springPositions = $$value), springPositions);
  let { slider = void 0 } = $$props;
  let { range = false } = $$props;
  let { pushy = false } = $$props;
  let { min = 0 } = $$props;
  let { max = 100 } = $$props;
  let { step = 1 } = $$props;
  let { values = [(max + min) / 2] } = $$props;
  let { vertical = false } = $$props;
  let { float = false } = $$props;
  let { reversed = false } = $$props;
  let { hoverable = true } = $$props;
  let { disabled = false } = $$props;
  let { pips = false } = $$props;
  let { pipstep = void 0 } = $$props;
  let { all = void 0 } = $$props;
  let { first = void 0 } = $$props;
  let { last = void 0 } = $$props;
  let { rest = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { prefix = "" } = $$props;
  let { suffix = "" } = $$props;
  let { formatter = (v, i, p) => v } = $$props;
  let { handleFormatter = formatter } = $$props;
  let { ariaLabels = [] } = $$props;
  let { precision = 2 } = $$props;
  let { springValues = { stiffness: 0.15, damping: 0.4 } } = $$props;
  const dispatch = createEventDispatcher();
  let valueLength = 0;
  let focus = false;
  let activeHandle = values.length - 1;
  let startValue;
  let previousValue;
  let springPositions;
  const fixFloat = (v) => parseFloat((+v).toFixed(precision));
  function trimRange(values2) {
    if (range === "min" || range === "max") {
      return values2.slice(0, 1);
    } else if (range) {
      return values2.slice(0, 2);
    } else {
      return values2;
    }
  }
  function moveHandle(index, value) {
    value = alignValueToStep(value);
    if (typeof index === "undefined") {
      index = activeHandle;
    }
    if (range) {
      if (index === 0 && value > values[1]) {
        if (pushy) {
          values[1] = value;
        } else {
          value = values[1];
        }
      } else if (index === 1 && value < values[0]) {
        if (pushy) {
          values[0] = value;
        } else {
          value = values[0];
        }
      }
    }
    if (values[index] !== value) {
      values[index] = value;
    }
    if (previousValue !== value) {
      eChange();
      previousValue = value;
    }
    return value;
  }
  function rangeStart(values2) {
    if (range === "min") {
      return 0;
    } else {
      return values2[0];
    }
  }
  function rangeEnd(values2) {
    if (range === "max") {
      return 0;
    } else if (range === "min") {
      return 100 - values2[0];
    } else {
      return 100 - values2[1];
    }
  }
  function eChange() {
    !disabled && dispatch("change", {
      activeHandle,
      startValue,
      previousValue: typeof previousValue === "undefined" ? startValue : previousValue,
      value: values[activeHandle],
      values: values.map((v) => alignValueToStep(v))
    });
  }
  if ($$props.slider === void 0 && $$bindings.slider && slider !== void 0) $$bindings.slider(slider);
  if ($$props.range === void 0 && $$bindings.range && range !== void 0) $$bindings.range(range);
  if ($$props.pushy === void 0 && $$bindings.pushy && pushy !== void 0) $$bindings.pushy(pushy);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0) $$bindings.step(step);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0) $$bindings.values(values);
  if ($$props.vertical === void 0 && $$bindings.vertical && vertical !== void 0) $$bindings.vertical(vertical);
  if ($$props.float === void 0 && $$bindings.float && float !== void 0) $$bindings.float(float);
  if ($$props.reversed === void 0 && $$bindings.reversed && reversed !== void 0) $$bindings.reversed(reversed);
  if ($$props.hoverable === void 0 && $$bindings.hoverable && hoverable !== void 0) $$bindings.hoverable(hoverable);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.pips === void 0 && $$bindings.pips && pips !== void 0) $$bindings.pips(pips);
  if ($$props.pipstep === void 0 && $$bindings.pipstep && pipstep !== void 0) $$bindings.pipstep(pipstep);
  if ($$props.all === void 0 && $$bindings.all && all !== void 0) $$bindings.all(all);
  if ($$props.first === void 0 && $$bindings.first && first !== void 0) $$bindings.first(first);
  if ($$props.last === void 0 && $$bindings.last && last !== void 0) $$bindings.last(last);
  if ($$props.rest === void 0 && $$bindings.rest && rest !== void 0) $$bindings.rest(rest);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0) $$bindings.prefix(prefix);
  if ($$props.suffix === void 0 && $$bindings.suffix && suffix !== void 0) $$bindings.suffix(suffix);
  if ($$props.formatter === void 0 && $$bindings.formatter && formatter !== void 0) $$bindings.formatter(formatter);
  if ($$props.handleFormatter === void 0 && $$bindings.handleFormatter && handleFormatter !== void 0) $$bindings.handleFormatter(handleFormatter);
  if ($$props.ariaLabels === void 0 && $$bindings.ariaLabels && ariaLabels !== void 0) $$bindings.ariaLabels(ariaLabels);
  if ($$props.precision === void 0 && $$bindings.precision && precision !== void 0) $$bindings.precision(precision);
  if ($$props.springValues === void 0 && $$bindings.springValues && springValues !== void 0) $$bindings.springValues(springValues);
  $$result.css.add(css$a);
  clampValue = function(val) {
    return val <= min ? min : val >= max ? max : val;
  };
  alignValueToStep = function(val) {
    if (val <= min) {
      return fixFloat(min);
    } else if (val >= max) {
      return fixFloat(max);
    } else {
      val = fixFloat(val);
    }
    let remainder = (val - min) % step;
    let aligned = val - remainder;
    if (Math.abs(remainder) * 2 >= step) {
      aligned += remainder > 0 ? step : -step;
    }
    aligned = clampValue(aligned);
    return fixFloat(aligned);
  };
  percentOf = function(val) {
    let perc = (val - min) / (max - min) * 100;
    if (isNaN(perc) || perc <= 0) {
      return 0;
    } else if (perc >= 100) {
      return 100;
    } else {
      return fixFloat(perc);
    }
  };
  {
    {
      if (!Array.isArray(values)) {
        values = [(max + min) / 2];
        console.error("'values' prop should be an Array (https://github.com/simeydotme/svelte-range-slider-pips#slider-props)");
      }
      const trimmedAlignedValues = trimRange(values.map((v) => alignValueToStep(v)));
      if (!(values.length === trimmedAlignedValues.length) || !values.every((element, index) => fixFloat(element) === trimmedAlignedValues[index])) {
        values = trimmedAlignedValues;
      }
      if (valueLength !== values.length) {
        $$subscribe_springPositions(springPositions = spring(values.map((v) => percentOf(v)), springValues));
      } else {
        springPositions.set(values.map((v) => percentOf(v)));
      }
      valueLength = values.length;
      if (values.length > 1 && !Array.isArray(ariaLabels)) {
        console.warn(`'ariaLabels' prop should be an Array (https://github.com/simeydotme/svelte-range-slider-pips#slider-props)`);
      }
    }
  }
  orientationStart = vertical ? reversed ? "top" : "bottom" : reversed ? "right" : "left";
  orientationEnd = vertical ? reversed ? "bottom" : "top" : reversed ? "left" : "right";
  $$unsubscribe_springPositions();
  return `    <div${add_attribute("id", id, 0)} role="none" class="${[
    "rangeSlider",
    (range ? "range" : "") + " " + (disabled ? "disabled" : "") + " " + (hoverable ? "hoverable" : "") + " " + (vertical ? "vertical" : "") + " " + (reversed ? "reversed" : "") + "  " + (range === "min" ? "min" : "") + " " + (range === "max" ? "max" : "") + " " + (pips ? "pips" : "") + " " + (all === "label" || first === "label" || last === "label" || rest === "label" ? "pip-labels" : "")
  ].join(" ").trim()}"${add_attribute("this", slider, 0)}>${each(values, (value, index) => {
    return `<span role="slider" class="${[
      "rangeHandle",
      " "
    ].join(" ").trim()}"${add_attribute("data-handle", index, 0)} style="${escape(orientationStart, true) + ": " + escape($springPositions[index], true) + "%; z-index: " + escape(activeHandle === index ? 3 : 2, true) + ";"}"${add_attribute("aria-label", ariaLabels[index], 0)}${add_attribute("aria-valuemin", range === true && index === 1 ? values[0] : min, 0)}${add_attribute("aria-valuemax", range === true && index === 0 ? values[1] : max, 0)}${add_attribute("aria-valuenow", value, 0)} aria-valuetext="${escape(prefix, true) + escape(pureText(handleFormatter(value, index, percentOf(value))), true) + escape(suffix, true)}"${add_attribute("aria-orientation", vertical ? "vertical" : "horizontal", 0)}${add_attribute("aria-disabled", disabled, 0)} ${disabled ? "disabled" : ""}${add_attribute("tabindex", disabled ? -1 : 0, 0)}><span class="rangeNub"></span> ${float ? `<span class="rangeFloat">${prefix ? `<span class="rangeFloat-prefix">${escape(prefix)}</span>` : ``}<!-- HTML_TAG_START -->${handleFormatter(value, index, percentOf(value))}<!-- HTML_TAG_END -->${suffix ? `<span class="rangeFloat-suffix">${escape(suffix)}</span>` : ``} </span>` : ``} </span>`;
  })} ${range ? `<span class="rangeBar" style="${escape(orientationStart, true) + ": " + escape(rangeStart($springPositions), true) + "%; " + escape(orientationEnd, true) + ": " + escape(rangeEnd($springPositions), true) + "%;"}"></span>` : ``} ${pips ? `${validate_component(RangePips, "RangePips").$$render(
    $$result,
    {
      values,
      min,
      max,
      step,
      range,
      vertical,
      reversed,
      orientationStart,
      hoverable,
      disabled,
      all,
      first,
      last,
      rest,
      pipstep,
      prefix,
      suffix,
      formatter,
      focus,
      percentOf,
      moveHandle,
      fixFloat,
      normalisedClient
    },
    {},
    {}
  )}` : ``}</div> `;
});
const Page05 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  let $poiReady, $$unsubscribe_poiReady;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_poiReady = subscribe(poiReady, (value) => $poiReady = value);
  $$unsubscribe_location();
  $$unsubscribe_poiReady();
  return `<div class="content-block section page_05">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${!$location.params ? `<div class="center">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>` : ``} <div class="page_content"><div class="containerFlex noselect"><div class="grid_content noselect mb-20" data-svelte-h="svelte-1yik2er"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">12</span> Ocena atrakcyjności otoczenia</h2> <p class="tabText">Na poniszej grafice przedstawiono kluczowe miejsca uytku publicznego w pobliu danej
						lokalizacji. Wykaz dostarcza informację o dzielące je od nieruchomości odległości.
						Poniej wskaźnika atrakcyjności okolicy widać współczynnik POI.</p></div></div> <div class="grid_content noselect"><div class="full-width grid_content"><div class="grid_content noselect" data-svelte-h="svelte-1ub16tj"><div><img src="/images/iconstar.svg" class="star" alt="ocena lokalizacji"></div> <div><hr class="hr-green"> <p class="textobok">Wskaźnik odznaczający<br>poziom atrakcyjności<br>okolicy</p></div></div> <div class="grid_content noselect">${validate_component(RangeSlider, "RangeSlider").$$render(
    $$result,
    {
      range: "min",
      values: [5],
      max: "5",
      pips: true,
      all: "label"
    },
    {},
    {}
  )}</div></div></div> <div class="full-width grid_content background-blur" data-svelte-h="svelte-h7od8r"><p>Powyższy współczynnik to wynik zestawienia i analizy strategicznych punktów użyteczności
					publicznej w danym obszarze. Każde takie miejsce zostało zweryfikowane pod względem
					stopnia Istotności i pożyteczności w codziennym życiu. Analiza ta obejmuje obszar w
					obrębie do 2 km od nieruchomosci, co oznacza, ze im wyższy wskaźnik, tym znaczenie punktów
					usytuowanych w okolicy jest większe.</p></div> <br><br><br> <div class="grid_content noselect mb-20" data-svelte-h="svelte-1td51u2"><div class="full-width"><h2 class="title_medium noselect">Kluczowe punkty POI</h2></div></div> <div class="full-width grid_content"><div class="POI">${$location.params?.POI && $poiReady == true ? `${each(Object.entries($location.params.POI).filter(([key, value]) => []), ([key, POI]) => {
    return `${POI.by_bike.distance <= 2e3 && POI.by_bike.distance > 1 ? `<div class="grid_content"><div class="image_"><img src="${"/images/POI/" + escape(POI.icon, true)}"${add_attribute("alt", POI.name, 0)}></div> <div class="POI_opis"><p class="name">${escape(POI.displayName)}</p> <hr class="hr_green"> <br> <p class="name2">${escape(POI.name)}</p> <p class="dist font-extrabold">${escape(POI.by_bike.distance.toFixed(0))} m</p></div> </div>` : ``}`;
  })}` : ``}</div></div></div> <div class="pageNumber right" data-svelte-h="svelte-8y6s64">5</div></div> </div>`;
});
const css$9 = {
  code: ".polygonMAP svg path{transform:matrix(47, 0, 0, 47, -929, -2229)}.svgMap{border-bottom:1px solid rgba(0, 0, 0, 0.03) !important}.options{background-color:rgba(206, 42, 42, 0.672);border:1px solid rgba(0, 0, 0, 0.03) !important;font-size:10px;box-shadow:3px 3px 18px 3px rgba(165, 165, 165, 0.5);border-radius:8px;padding:5px;padding-top:1px;padding-bottom:1px;transition:all ease 0.3s;color:white;margin-top:527px;position:absolute;margin-left:-204px;z-index:999999999999999}.options:hover{color:white;background-color:rgba(0, 0, 0, 0.672)}.polygonMAP.svelte-1q0npgw{border:1px solid #ccc;height:500px;width:500px}.circle.svelte-1q0npgw{transform-origin:center}",
  map: `{"version":3,"file":"mapaDots.svelte","sources":["mapaDots.svelte"],"sourcesContent":["<script>\\n\\t// import axios from 'axios';\\n\\timport { onMount, afterUpdate } from 'svelte';\\n\\timport { location } from '$lib/stores/appStore';\\n\\timport osmtogeojson from 'osmtogeojson';\\n\\timport * as turf from '@turf/turf';\\n\\timport * as d3 from 'd3';\\n\\timport rewind from '@mapbox/geojson-rewind';\\n\\n\\t$: cityInput = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);\\n\\n\\tlet lon,\\n\\t\\tlat,\\n\\t\\tcity,\\n\\t\\tdata,\\n\\t\\tmenu_settings_visible = false,\\n\\t\\tisLoadingData = false,\\n\\t\\tcityPolygon,\\n\\t\\tcityInput = 'Rzeszów';\\n\\t// export const address = 'Spacerowa 125, 34-124 Klecza Dolna';\\n\\tlet polygonPoints = [];\\n\\tlet dotSpacing = 10;\\n\\tlet shiftDistance = -dotSpacing / 3;\\n\\tlet width = 300;\\n\\tlet height = 400;\\n\\n\\tconst updateMap = async () => {\\n\\t\\tif (isLoadingData) {\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\t\\ttry {\\n\\t\\t\\tisLoadingData = true;\\n\\t\\t\\t// console.log(cityInput);\\n\\t\\t\\tconst response = await findcityPolygon(cityInput);\\n\\t\\t} catch (error) {\\n\\t\\t\\tconsole.error(error);\\n\\t\\t} finally {\\n\\t\\t\\tisLoadingData = false;\\n\\t\\t}\\n\\t};\\n\\n\\tconst findcityPolygon = async (city) => {\\n\\t\\tconst cityPolygonQuery = \`\\n\\t\\t[out:json];\\n\\t\\t(\\n\\t\\t  relation[\\"admin_level\\"=\\"8\\"][\\"boundary\\"=\\"administrative\\"][\\"name\\"=\\"\${city}\\"];\\n\\t\\t);\\n\\t\\tout geom;\\n\\t  \`;\\n\\t\\tconst query = encodeURIComponent(cityPolygonQuery);\\n\\t\\tconst boundaryUrl = \`https://overpass-api.de/api/interpreter?data=\${query}\`;\\n\\t\\ttry {\\n\\t\\t\\tconst response = await fetch(boundaryUrl);\\n\\t\\t\\tdata = await response.json();\\n\\t\\t\\t// console.log('Poligons data', data);\\n\\t\\t\\tdata = osmtogeojson(data);\\n\\t\\t\\t// console.log('GeoJson data', data);\\n\\t\\t\\tif (data.features && data.features.length > 0) {\\n\\t\\t\\t\\t// cityPolygon = data.features[0];\\n\\t\\t\\t\\tcityPolygon = data;\\n// console.log('CityPolygon data', cityPolygon);\\n\\t\\t\\t\\tdrawImage();\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tconsole.error('City boundary not found in OSM.');\\n\\t\\t\\t}\\n\\t\\t} catch (error) {\\n\\t\\t\\tconsole.error('Error fetching city boundary:', error);\\n\\t\\t}\\n\\t};\\n\\n\\tconst updatecityPolygon = () => {\\n\\t\\tconst coordinates = cityPolygon[0].geometry.coordinates[0]; // polygon dla mapy\\n\\n\\t\\tconst getBoundingBox = (coordinates) => {\\n\\t\\t\\tconst pointCoordinates = [parseFloat($location.params.lon), parseFloat($location.params.lat)];\\n\\n\\t\\t\\tvar line = turf.lineString(coordinates);\\n\\n\\t\\t\\tconst cityPolygonBounds = turf.bbox(line);\\n\\t\\t\\treturn [\\n\\t\\t\\t\\t[\\n\\t\\t\\t\\t\\tMath.min(pointCoordinates[0], cityPolygonBounds[0]),\\n\\t\\t\\t\\t\\tMath.min(pointCoordinates[1], cityPolygonBounds[1])\\n\\t\\t\\t\\t],\\n\\t\\t\\t\\t[\\n\\t\\t\\t\\t\\tMath.max(pointCoordinates[0], cityPolygonBounds[2]),\\n\\t\\t\\t\\t\\tMath.max(pointCoordinates[1], cityPolygonBounds[3])\\n\\t\\t\\t\\t]\\n\\t\\t\\t];\\n\\t\\t};\\n\\n\\t\\tconst boundingBox = getBoundingBox(coordinates);\\n\\t\\tboundingBox, { padding: 280 };\\n\\t};\\n\\n\\tonMount(() => {\\n\\t\\tif ($location && $location.params && $location.params.lat) {\\n\\t\\t\\t// lat = $location.params.lat;\\n\\t\\t\\t// lon = $location.params.lon;\\n\\t\\t\\tlat = 50.0374531;\\n\\t\\t\\tlon = 22.0047174;\\n\\t\\t\\tif ($location.params.imagePage6) {\\n\\t\\t\\t\\tlet svgObject = JSON.parse($location.params.imagePage6);\\n\\t\\t\\t\\tlet svgContent = svgObject.svg;\\n\\n\\n\\t\\t\\t\\tdocument.querySelector('.svgMap').innerHTML = svgContent;\\n\\t\\t\\t\\n\\t\\t\\t\\t\\n\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tupdateMap();\\n\\t\\t\\t}\\n\\t\\t}\\n\\t});\\n\\n\\tlet startX; // Zadeklaruj zmienną startX przed użyciem w funkcji dragHandler()\\n\\tlet startY; // Zadeklaruj zmienną startX przed użyciem w funkcji dragHandler()\\n\\n\\tfunction saveImage() {\\n\\t\\tlet obj = { svg: document.querySelector('.svgMap').outerHTML };\\n\\n\\t\\t// Konwertuj obiekt na format JSON\\n\\t\\tobj = JSON.stringify(obj);\\n\\n\\t\\t$location.params.page06.imageSVG = obj;\\n\\t}\\n\\n\\tfunction drawImage() {\\n\\t\\tconst _geoJson = rewind(cityPolygon, true);\\n\\n\\t\\tlet svg = d3\\n\\t\\t\\t.create('svg')\\n\\t\\t\\t.attr('width', '790')\\n\\t\\t\\t.attr('height', '457')\\n\\t\\t\\t.style('border', 'none')\\n\\t\\t\\t.classed('svgMap', true);\\n\\n\\n\\t\\tlet center = cityPolygon.features[1].geometry.coordinates\\n\\n\\t\\tconst projection = d3.geoMercator().center(center).fitSize([width, height], _geoJson.features[0]);\\n\\n\\t\\tprojection.scale(projection.scale() * $location.params.page06.scalefactor);\\n\\n\\t\\tconst path = d3.geoPath().projection(projection);\\n\\n\\t\\tfunction dragHandler() {\\n\\t\\t\\treturn d3\\n\\t\\t\\t\\t.drag()\\n\\t\\t\\t\\t.on('start', function (e) {\\n\\t\\t\\t\\t\\t// Pobieramy początkowe współrzędne myszy\\n\\n\\t\\t\\t\\t\\tstartX = e.x;\\n\\t\\t\\t\\t\\tstartY = e.y;\\n\\t\\t\\t\\t})\\n\\t\\t\\t\\t.on('drag', function (e) {\\n\\t\\t\\t\\t\\t// Obliczamy różnicę między aktualnymi współrzędnymi myszy a początkowymi\\n\\t\\t\\t\\t\\tconst dx = e.x - startX;\\n\\t\\t\\t\\t\\tconst dy = e.y - startY;\\n\\n\\t\\t\\t\\t\\t// Pobieramy aktualne współrzędne x i y obrazu\\n\\t\\t\\t\\t\\tlet x = +image.attr('x') + dx;\\n\\t\\t\\t\\t\\tlet y = +image.attr('y') + dy;\\n\\n\\t\\t\\t\\t\\t// Ustawiamy nowe współrzędne dla obrazu\\n\\t\\t\\t\\t\\timage.attr('x', x).attr('y', y);\\n\\n\\t\\t\\t\\t\\t// Aktualizujemy początkowe współrzędne myszy\\n\\t\\t\\t\\t\\tstartX = e.x;\\n\\t\\t\\t\\t\\tstartY = e.y;\\n\\t\\t\\t\\t})\\n\\t\\t\\t\\t.on('end', function () {\\n\\t\\t\\t\\t\\tsaveImage();\\n\\t\\t\\t\\t});\\n\\t\\t}\\n\\n\\t\\tfunction dragHandlerDots() {\\n\\t\\t\\treturn d3\\n\\t\\t\\t\\t.drag()\\n\\t\\t\\t\\t.on('start', function (e) {\\n\\t\\t\\t\\t\\t// Pobieramy początkowe współrzędne myszy\\n\\n\\t\\t\\t\\t\\tstartX = e.x;\\n\\t\\t\\t\\t\\tstartY = e.y;\\n\\t\\t\\t\\t})\\n\\t\\t\\t\\t.on('drag', function (e) {\\n\\t\\t\\t\\t\\t// Obliczamy różnicę między aktualnymi współrzędnymi myszy a początkowymi\\n\\t\\t\\t\\t\\tconst dx = e.x - startX;\\n\\t\\t\\t\\t\\tconst dy = e.y - startY;\\n\\n\\t\\t\\t\\t\\t// Sprawdzamy, czy atrybut transform istnieje\\n\\t\\t\\t\\t\\tlet transformAttr = circlesGroup.attr('transform');\\n\\t\\t\\t\\t\\tlet transformX = transformAttr\\n\\t\\t\\t\\t\\t\\t? +transformAttr.split(',')[0].replace('translate(', '')\\n\\t\\t\\t\\t\\t\\t: 0;\\n\\t\\t\\t\\t\\tlet transformY = transformAttr ? +transformAttr.split(',')[1].replace(')', '') : 0;\\n\\n\\t\\t\\t\\t\\t// Przesuwamy grupę kółek (circlesGroup)\\n\\t\\t\\t\\t\\tlet x = transformX + dx;\\n\\t\\t\\t\\t\\tlet y = transformY + dy;\\n\\n\\t\\t\\t\\t\\t// Ustawiamy nowe współrzędne dla grupy kółek\\n\\t\\t\\t\\t\\tcirclesGroup.attr('transform', \`translate(\${x},\${y})\`);\\n\\n\\t\\t\\t\\t\\t// Aktualizujemy początkowe współrzędne myszy\\n\\t\\t\\t\\t\\tstartX = e.x;\\n\\t\\t\\t\\t\\tstartY = e.y;\\n\\t\\t\\t\\t})\\n\\t\\t\\t\\t.on('end', function () {\\n\\t\\t\\t\\t\\tsaveImage();\\n\\t\\t\\t\\t});\\n\\t\\t}\\n\\n\\t\\tdocument.querySelectorAll('#polygonMAP svg').forEach((e) => {\\n\\t\\t\\te.remove();\\n\\t\\t});\\n\\t\\tdocument.querySelector('#polygonMAP').appendChild(svg.node());\\n\\n\\t\\t////   POINT\\n\\n\\t\\tlet newPointGeoJson = turf.point([lon, lat]);\\n\\t\\tlet newPointCoords = projection([lon, lat]);\\n\\n\\t\\tvar xAxis = d3.range(0, width, dotSpacing);\\n\\t\\tvar yAxis = d3.range(0, height, dotSpacing);\\n\\n\\t\\t////   POINT\\n\\n\\t\\tlet circlesGroup = svg.append('g').classed('circlesGroup', true);\\n\\n\\t\\tcirclesGroup\\n\\t\\t\\t.append('path')\\n\\t\\t\\t.attr('fill', 'white')\\n\\t\\t\\t.attr('stroke', 'red')\\n\\t\\t\\t.datum(_geoJson.features[0])\\n\\t\\t\\t.attr('opacity', '0.05')\\n\\t\\t\\t.attr('d', path);\\n\\n\\t\\t// Dodajemy punkty na mapie do grupy\\n\\t\\tyAxis.forEach((y, i) => {\\n\\t\\t\\txAxis.forEach((x) => {\\n\\t\\t\\t\\tconst geoPoint = projection.invert([x, y]);\\n\\t\\t\\t\\tif (turf.booleanPointInPolygon(geoPoint, _geoJson.features[0])) {\\n\\t\\t\\t\\t\\tcirclesGroup\\n\\t\\t\\t\\t\\t\\t.append('circle')\\n\\t\\t\\t\\t\\t\\t.attr('cx', x + (i % 2 === 0 ? 0 : shiftDistance) + 2)\\n\\t\\t\\t\\t\\t\\t.attr('cy', y)\\n\\t\\t\\t\\t\\t\\t.attr('r', dotSpacing / 2.8)\\n\\t\\t\\t\\t\\t\\t.style('fill', 'rgba(72, 165, 227, 1.000)');\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\t\\t});\\n\\t\\tcirclesGroup.call(dragHandlerDots());\\n\\n\\t\\tconst middleX = (xAxis[xAxis.length - 1] + xAxis[0]) / 2;\\n\\t\\tconst middleY = (yAxis[yAxis.length - 1] + yAxis[0]) / 2;\\n\\t\\tnewPointCoords[0] = middleX;\\n\\t\\tnewPointCoords[1] = middleY;\\n\\n\\t\\tconst image = svg\\n\\t\\t\\t.append('image')\\n\\t\\t\\t.attr('xlink:href', 'images/iconLocation.png')\\n\\t\\t\\t.attr('x', newPointCoords[0])\\n\\t\\t\\t.attr('y', newPointCoords[1])\\n\\t\\t\\t.attr('width', '70') // Ustaw szerokość obrazu\\n\\t\\t\\t.classed('pointCoord', true)\\n\\t\\t\\t.call(dragHandler());\\n\\n\\t\\td3.select('.pointCoord').raise();\\n\\t\\n\\t\\n\\n\\t\\t\\n\\n\\n\\t}\\n<\/script>\\n\\n<svelte:head>\\n\\t<link rel=\\"stylesheet\\" href=\\"/css/mapaDots.css\\" />\\n</svelte:head>\\n\\n<main>\\n\\t<button\\n\\t\\ton:click={() => {\\n\\t\\t\\tmenu_settings_visible = true;\\n\\t\\t}}\\n\\t\\tclass=\\"options noPrint\\">Opcje</button\\n\\t>\\n\\t<div class=\\"map-wrap\\">\\n\\t\\t<div id=\\"polygonMAP\\" />\\n\\t</div>\\n\\t<div class=\\"settings-menu {menu_settings_visible}\\" id=\\"settings-menu\\">\\n\\t\\t<button\\n\\t\\t\\tclass=\\"close\\"\\n\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\tmenu_settings_visible = false;\\n\\t\\t\\t}}>x</button\\n\\t\\t>\\n\\t\\t<label for=\\"city\\">Miasto:</label>\\n\\t\\t<input type=\\"text\\" bind:value={cityInput} />\\n\\t\\t<label for=\\"city\\">Skalowanie</label>\\n\\t\\t<input type=\\"number\\" step=\\"0.01\\" bind:value={$location.params.page06.scalefactor} />\\n\\t\\t<!-- <label for=\\"address\\">Punkt:</label>\\n\\t\\t<input type=\\"text\\" bind:value={address} /> -->\\n\\t\\t<button class=\\"getLoc\\" on:click={updateMap}>Pobierz grafike miasta</button>\\n\\t\\t<!-- <button class=\\"getPoint\\" on:click={updatePoint}>Pobierz punkt</button> -->\\n\\t</div>\\n</main>\\n\\n<style>\\n\\t:global(.polygonMAP svg path) {\\n\\t\\ttransform: matrix(47, 0, 0, 47, -929, -2229);\\n\\t}\\n\\n\\t:global(.svgMap) {\\n\\t\\tborder-bottom: 1px solid rgba(0, 0, 0, 0.03) !important;\\n\\t}\\n\\t:global(.options) {\\n\\t\\tbackground-color: rgba(206, 42, 42, 0.672);\\n\\t\\tborder: 1px solid rgba(0, 0, 0, 0.03) !important;\\n\\t\\tfont-size: 10px;\\n\\t\\tbox-shadow: 3px 3px 18px 3px rgba(165, 165, 165, 0.5);\\n\\t\\tborder-radius: 8px;\\n\\t\\tpadding: 5px;\\n\\t\\tpadding-top: 1px;\\n\\t\\tpadding-bottom: 1px;\\n\\t\\ttransition: all ease 0.3s;\\n\\t\\tcolor: white;\\n\\t\\tmargin-top: 527px;\\n\\t\\tposition: absolute;\\n\\t\\tmargin-left: -204px;\\n\\t\\tz-index: 999999999999999;\\n\\t}\\n\\n\\t:global(.options:hover) {\\n\\t\\tcolor: white;\\n\\t\\tbackground-color: rgba(0, 0, 0, 0.672);\\n\\t}\\n\\n\\t.polygonMAP {\\n\\t\\tborder: 1px solid #ccc;\\n\\t\\theight: 500px;\\n\\t\\twidth: 500px;\\n\\t}\\n\\t.circle {\\n\\t\\ttransform-origin: center;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwTS,oBAAsB,CAC7B,SAAS,CAAE,OAAO,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,KAAK,CAC5C,CAEQ,OAAS,CAChB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAC9C,CACQ,QAAU,CACjB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,CAC1C,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,CAChD,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACrD,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,GAAG,CACZ,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,GAAG,CACnB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,KAAK,CACjB,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,eACV,CAEQ,cAAgB,CACvB,KAAK,CAAE,KAAK,CACZ,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CACtC,CAEA,0BAAY,CACX,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KACR,CACA,sBAAQ,CACP,gBAAgB,CAAE,MACnB"}`
};
const MapaDots = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  let menu_settings_visible = false, cityInput = "Rzeszów";
  $$result.css.add(css$9);
  cityInput = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);
  $$unsubscribe_location();
  return `${$$result.head += `<!-- HEAD_svelte-gp4945_START --><link rel="stylesheet" href="/css/mapaDots.css"><!-- HEAD_svelte-gp4945_END -->`, ""} <main><button class="options noPrint" data-svelte-h="svelte-1q5f0fy">Opcje</button> <div class="map-wrap" data-svelte-h="svelte-1enbpb"><div id="polygonMAP"></div></div> <div class="${"settings-menu " + escape(menu_settings_visible, true) + " svelte-1q0npgw"}" id="settings-menu"><button class="close" data-svelte-h="svelte-1s4bl73">x</button> <label for="city" data-svelte-h="svelte-lkd1fc">Miasto:</label> <input type="text"${add_attribute("value", cityInput, 0)}> <label for="city" data-svelte-h="svelte-i4ir1h">Skalowanie</label> <input type="number" step="0.01"${add_attribute("value", $location.params.page06.scalefactor, 0)}>  <button class="getLoc" data-svelte-h="svelte-3p656l">Pobierz grafike miasta</button> </div> </main>`;
});
const css$8 = {
  code: "svg.svelte-1usl05k.svelte-1usl05k{transform:scale(0.7)}.cls-1.svelte-1usl05k.svelte-1usl05k{fill:none;stroke:#2181b3;stroke-miterlimit:42.93;stroke-width:.59px}svg.svelte-1usl05k tspan.svelte-1usl05k{outline:none;border:none}.cls-2.svelte-1usl05k.svelte-1usl05k{fill:#2181b3;font-family:var(--comfortea);font-size:16px;text-align:center;outline:#2181b3}",
  map: '{"version":3,"file":"ramka.svelte","sources":["ramka.svelte"],"sourcesContent":["<script>\\nexport let value = 33;\\n<\/script>\\n\\n\\n<svg \\n viewBox=\\"0 0 29 33\\">\\n  <defs>\\n  </defs>\\n  <path class=\\"cls-1\\" d=\\"m15.17.91l4.04,2.33c.08.05.15.09.23.14l3.84,2.22c1.42.82,2.22,2.31,2.22,3.84h.02v9.44c0,1.79-1.06,3.34-2.6,4.04l-3.72,2.15h0s-4.09,2.37-4.09,2.37c-1.44.83-3.15.77-4.49-.03l-4.04-2.33c-.08-.04-.15-.09-.23-.14l-3.84-2.22c-1.42-.82-2.22-2.31-2.22-3.84h-.02v-9.44c0-1.79,1.06-3.34,2.6-4.04l3.72-2.15h0S10.68.88,10.68.88c1.44-.83,3.15-.77,4.49.03Z\\"/>\\n  <text class=\\"cls-2\\" transform=\\"translate(9 20)\\"><tspan text-anchor=\\"middle\\" class=\\"tsSpann\\" x=\\"17\\" y=\\"24.5\\">{value}</tspan></text>\\n</svg>\\n\\n<style>\\n  svg{\\n\\n\\n    transform: scale(0.7);\\n  }\\n.cls-1 {\\n    fill: none;\\n    stroke: #2181b3;\\n    stroke-miterlimit: 42.93;\\n    stroke-width: .59px;\\n  }\\nsvg tspan{\\n\\n  outline:none;\\n  border: none;\\n\\n\\n}\\n  .cls-2 {\\n    fill: #2181b3;\\n    font-family: var(--comfortea);\\n    font-size: 16px;\\n    text-align: center;\\n    outline: #2181b3;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAcE,iCAAG,CAGD,SAAS,CAAE,MAAM,GAAG,CACtB,CACF,oCAAO,CACH,IAAI,CAAE,IAAI,CACV,MAAM,CAAE,OAAO,CACf,iBAAiB,CAAE,KAAK,CACxB,YAAY,CAAE,KAChB,CACF,kBAAG,CAAC,oBAAK,CAEP,QAAQ,IAAI,CACZ,MAAM,CAAE,IAGV,CACE,oCAAO,CACL,IAAI,CAAE,OAAO,CACb,WAAW,CAAE,IAAI,WAAW,CAAC,CAC7B,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,OACX"}'
};
const Ramka = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = 33 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  $$result.css.add(css$8);
  return `<svg viewBox="0 0 29 33" class="svelte-1usl05k"><defs></defs><path class="cls-1 svelte-1usl05k" d="m15.17.91l4.04,2.33c.08.05.15.09.23.14l3.84,2.22c1.42.82,2.22,2.31,2.22,3.84h.02v9.44c0,1.79-1.06,3.34-2.6,4.04l-3.72,2.15h0s-4.09,2.37-4.09,2.37c-1.44.83-3.15.77-4.49-.03l-4.04-2.33c-.08-.04-.15-.09-.23-.14l-3.84-2.22c-1.42-.82-2.22-2.31-2.22-3.84h-.02v-9.44c0-1.79,1.06-3.34,2.6-4.04l3.72-2.15h0S10.68.88,10.68.88c1.44-.83,3.15-.77,4.49.03Z"></path><text class="cls-2 svelte-1usl05k" transform="translate(9 20)"><tspan text-anchor="middle" class="tsSpann svelte-1usl05k" x="17" y="24.5">${escape(value)}</tspan></text></svg>`;
});
const Page06 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_location();
  return `<div class="content-block section page_05 page_06">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${!$location.params ? `<div class="center">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>` : ``} ${$location.adres ? `<div class="page_content"><div class="containerFlex noselect"><div class="grid_content noselect mb-20" data-svelte-h="svelte-r5hu5f"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">13</span> Poziom bezpieczeństwa okolicy</h2> <p class="tabText">Poniżej oznaczono wynik analizy odnoszący się do występowania potencjalnych zagrożeń,
						biorąc pod uwagę czynnik ludzki - statystyki popełnianych w danym obszarze przestępstw.
						Im wyższy wskaźnik, tym skalę rodzaj i liczbę przewinień zanotowanych w okolicy uznaję
						się za mało lub nieistotne w odniesieniu do ogólnego bezpieczeństwa. Przy tworzeniu
						analizy wzięto pod uwagę uchybienia skupione wokół kilku kategorii, w tym wandalizm,
						kradzieże, napady, pobicia. Przedstawiony poniżej rezultat ma charakter lokalny, co
						oznacza, ze zakres wartości tyczy się danego miasta.</p></div></div> <div class="grid_content noselect"><div class="full-width grid_content"><div class="grid_content noselect" data-svelte-h="svelte-dqg2qk"><div><img src="/images/shield.svg" class="star" alt="ocena bezpieczeństwa lokalizacji"></div> <div><hr class="hr-green"> <p class="textobok">Wskaźnik odznaczający<br>poziom bezpieczeństwa <br>otoczenia</p></div></div> <div class="grid_content noselect">${validate_component(RangeSlider, "RangeSlider").$$render(
    $$result,
    {
      range: "min",
      values: [$location.params.page06.poziomBEZPIECZENSTWA],
      max: "5",
      pips: true,
      all: "label"
    },
    {},
    {}
  )}</div></div></div> <div class="full-width grid_content background-blur" data-svelte-h="svelte-1qtgzc2"><p>Przy wyliczeniu powyższej wartości wzięto pod uwagę liczbę akcji o charakterze
					przestępczym, które miały miejsce w obrębie 1,5 km od nieruchomości. Z tego względu ogólny
					poziom bezpieczeństwa dla wybranej dzielnicy może de facto obiegać od zobrazowanego wyżej
					wskaźnika.</p></div> <div class="grid_content POI_conteiner"><div class="POI_map">${validate_component(MapaDots, "MapaDots").$$render($$result, {}, {}, {})}</div> <div class="POI_opis"><br><br><br> <p data-svelte-h="svelte-89rwgf">Stopień poziomu bezpieczeństwa</p> ${validate_component(Ramka, "Ramka").$$render(
    $$result,
    {
      value: $location.params.page06.poziomBEZPIECZENSTWA
    },
    {},
    {}
  )} <hr class="green"> <h2>Wskazana mapka aglomeracji miejskiej <br>
						obrazuje ${escape($location.params.page06.poziomBEZPIECZENSTWA)} poziom bezpieczeństwa dla<br> wybranej dzielnicy.</h2></div></div></div> <div class="pageNumber right" data-svelte-h="svelte-pb5esb">6</div></div>` : ``}</div>`;
});
const css$7 = {
  code: ".classHovered.svelte-1geoao4{background-color:lightblue;color:white}.imagemini{width:62px !important;height:62px;border-radius:20px;margin-top:-20px !important}.addDataBoxs{padding-top:8px;background:rgba(20, 20, 20, 0.1);width:100%;display:flex;flex-direction:row;border-radius:12px 12px 0px 0px;box-shadow:inset -3px -4px 61px -27px rgba(66, 68, 90, 1);justify-content:space-between;padding-bottom:8px;align-items:center}.addButton.svelte-1geoao4{box-shadow:1px 2px 5px 0px rgba(66, 68, 90, 1);position:relative;display:block;background-color:rgba(200, 200, 200, 0.9);width:42px;height:33px;padding-left:12px;border-radius:59px;padding-right:11px;vertical-align:baseline;margin-left:-11px}.mini.active{background:var(--brand-lightgreen);border-radius:35px}.mini.svelte-1geoao4{transition:all ease 0.4s;width:30px;height:27px;padding-top:5px;margin-right:10px}.filelist.svelte-1geoao4{position:absolute;max-width:107px;padding:10px !important;padding:4px;padding-right:20px !important;width:200px;background-color:#d8d9e0;border-radius:8px;box-shadow:2px 6px 36px -18px rgba(66, 68, 90, 1)}path.svelte-1geoao4{shape-rendering:geometricPrecision}.addDataBoxs .mini{width:20px;margin-left:20px}.donutTarget .name{width:289px}",
  map: `{"version":3,"file":"DonutMultiplePage7.svelte","sources":["DonutMultiplePage7.svelte"],"sourcesContent":["<script>\\n\\timport { onMount, afterUpdate } from 'svelte';\\n\\timport { fade } from 'svelte/transition';\\n\\timport { select, arc, pie } from 'd3';\\n\\timport * as d3 from 'd3';\\n\\timport { browser } from '$app/environment';\\n\\t// import addImage from '$lib/components/addImage.svg';\\n\\timport { draggable } from '@neodrag/svelte';\\n\\n\\timport { MoveIcon, SortableItem } from 'svelte-sortable-items';\\n\\timport { flip } from 'svelte/animate';\\n\\n\\timport Filelist from '$lib/components/Filelist.svelte';\\n\\tlet showFileList = false;\\n\\t// let imageSrc = addImage;\\n\\tlet currentData;\\n\\t// Funkcja obsługująca kliknięcie na obrazek i pokazująca listę plików\\n\\tfunction handleImageClick(e) {\\n\\t\\tshowFileList = true;\\n\\t\\tdocument.querySelectorAll('img.mini').forEach((img) => {\\n\\t\\t\\timg.classList.remove('active');\\n\\t\\t});\\n\\t\\te.srcElement.classList.add('active');\\n\\t}\\n\\n\\tasync function handleClickElement(index) {\\n\\t\\tlet imgElement = document.querySelector('img.mini.active');\\n\\t\\tif (imgElement) {\\n\\t\\t\\timgElement.src = index; //podmień na nową ścieżkę\\n\\t\\t\\tlet dataVal = imgElement.getAttribute('dataVal');\\n\\n\\t\\t\\tdata[dataVal].image = index;\\n\\n\\t\\t\\t// console.log(data);\\n\\t\\t}\\n\\t}\\n\\tlet _id = 0;\\n\\t// INPUT VALUES\\n\\texport let id = '';\\n\\texport let data;\\n\\n\\tlet newValues = {\\n\\t\\tid: _id,\\n\\t\\timage: 'image',\\n\\t\\tname: 'newData',\\n\\t\\tval: 56\\n\\t};\\n\\tlet donutElement;\\n\\tlet ready = false;\\n\\n\\tonMount(() => {\\n\\t\\tdonutElement = select('#' + id);\\n\\t\\tcreateDonut();\\n\\n\\t\\tready = true;\\n\\t});\\n\\n\\tafterUpdate(() => {\\n\\t\\tcreateDonut();\\n\\t});\\n\\tfunction sortDataById() {\\n\\t\\tdata.sort((a, b) => a.id - b.id);\\n\\t}\\n\\tfunction updateChartData(index) {\\n\\t\\tconst newValue = newValues.val;\\n\\t\\tconst newName = newValues.name;\\n\\t\\tconst newImage = newValues.image;\\n\\n\\t\\t// Aktualizuj dane\\n\\t\\tdata = data.map((item, i) => (i === index ? { ...item, val: newValue } : item));\\n\\n\\t\\t// Sortuj dane po ID\\n\\t\\tsortDataById();\\n\\t}\\n\\tfunction removeData(index) {\\n\\t\\tdata = data.filter((_, i) => i !== index);\\n\\t}\\n\\n\\tfunction addData() {\\n\\t\\tconst newValue = newValues.val;\\n\\t\\tconst newName = newValues.name;\\n\\t\\tconst newImage = newValues.image;\\n\\t\\tconst newId = _id + 1 + Math.floor(Math.random() * 100) + 1;\\n\\t\\tdata = [...data, { name: newName, val: newValue, image: newImage, id: newId }];\\n\\t}\\n\\n\\tlet colorEl = 0;\\n\\tfunction createDonut() {\\n\\t\\tdonutElement.selectAll('*').remove();\\n\\t\\tcolorEl += 1;\\n\\t\\tlet width = 800,\\n\\t\\t\\theight = 400,\\n\\t\\t\\ttransTime = 750,\\n\\t\\t\\tcornerRadius = 5,\\n\\t\\t\\tpadAngle = 0,\\n\\t\\t\\tvariable = 'val',\\n\\t\\t\\tcategory = 'name',\\n\\t\\t\\tmargin = { top: 10, right: 0, bottom: 10, left: 0 },\\n\\t\\t\\tupdateData;\\n\\n\\t\\tlet color = [\\n\\t\\t\\t'rgb(4,76,68)',\\n\\t\\t\\t'rgb(4,245,148)',\\n\\t\\t\\t'rgb(113,198,191)',\\n\\t\\t\\t'rgb(89,144,150)',\\n\\t\\t\\t'rgb(44,169,156)',\\n\\t\\t\\t'rgb(19,155,148)',\\n\\t\\t\\t'rgb(4,103,106)',\\n\\t\\t\\t'rgb(6,233,173)',\\n\\t\\t\\t'rgb(149,251,15)'\\n\\t\\t];\\n\\n\\t\\t// generate chart\\n\\t\\t// ===========================================================================================\\n\\t\\tvar radius = Math.min(width, height) / 2;\\n\\n\\t\\t// creates a new pie generator\\n\\t\\tvar pie = d3\\n\\t\\t\\t.pie()\\n\\t\\t\\t.value(function (d) {\\n\\t\\t\\t\\treturn d[variable];\\n\\t\\t\\t})\\n\\t\\t\\t.sort(null);\\n\\n\\t\\tvar arc = d3\\n\\t\\t\\t.arc()\\n\\t\\t\\t.outerRadius(radius * 0.65)\\n\\t\\t\\t.innerRadius(radius * 0)\\n\\t\\t\\t.cornerRadius(cornerRadius)\\n\\t\\t\\t.padAngle(padAngle);\\n\\n\\t\\tvar outerArc = d3\\n\\t\\t\\t.arc()\\n\\t\\t\\t.outerRadius(radius * 0.9)\\n\\t\\t\\t.innerRadius(radius * 0.9);\\n\\t\\t// ===========================================================================================\\n\\n\\t\\t// ===========================================================================================\\n\\t\\t// append the svg object to the donutElement\\n\\t\\t// var svg = donutElement.append('svg')\\n\\t\\tvar svg = donutElement\\n\\t\\t\\t.append('svg')\\n\\t\\t\\t.classed('wykresSVG', true)\\n\\t\\t\\t.attr('width', width + margin.left + margin.right)\\n\\t\\t\\t.attr('height', height + margin.top + margin.bottom)\\n\\t\\t\\t.append('g')\\n\\t\\t\\t.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');\\n\\t\\t// ===========================================================================================\\n\\n\\t\\t// ===========================================================================================\\n\\t\\t// g elements to keep elements within svg modular\\n\\t\\tsvg.append('g').attr('class', 'slices');\\n\\t\\tsvg.append('g').attr('class', 'labelName');\\n\\t\\tsvg.append('g').attr('class', 'lines');\\n\\t\\t// ===========================================================================================\\n\\n\\t\\t// ===========================================================================================\\n\\t\\t// add and colour the donut slices\\n\\t\\tvar path = svg\\n\\t\\t\\t.select('.slices')\\n\\t\\t\\t.selectAll('path')\\n\\t\\t\\t.data(pie(data))\\n\\t\\t\\t.enter()\\n\\t\\t\\t.append('path')\\n\\t\\t\\t.attr('d', arc)\\n\\t\\t\\t.each(function (d, i) {\\n\\t\\t\\t\\td3.select(this)\\n\\t\\t\\t\\t\\t.attr('fill', color[i % color.length])\\n\\t\\t\\t\\t\\t.attr('stroke', 'white')\\n\\t\\t\\t\\t\\t.attr('stroke-width', '5')\\n\\t\\t\\t\\t\\t.attr('stroke-linejoin', 'round')\\n\\t\\t\\t\\t\\t.attr('stroke-linecap', 'round')\\n\\t\\t\\t\\t\\t.classed('slice_patch patch_' + i, true);\\n\\t\\t\\t});\\n\\t\\t// ===========================================================================================\\n\\n\\t\\t// add text labels\\n\\t\\tvar labels = svg.select('.labelName').selectAll('text').data(pie(data)).enter().append('g');\\n\\n\\t\\tfunction getCenter() {\\n\\t\\t\\tlet _slices = d3.selectAll('.slice_patch');\\n\\t\\t\\tvar bbox = _slices.node().getBBox();\\n\\t\\t\\tvar centerX = bbox.x + bbox.width / 2;\\n\\t\\t\\tvar centerY = bbox.y + bbox.height / 2;\\n\\n\\t\\t\\treturn centerX;\\n\\t\\t}\\n\\n\\t\\tlabels\\n\\t\\t\\t.append('text') // add the text to the group\\n\\t\\t\\t.attr('dx', '-2px')\\n\\t\\t\\t.attr('dy', function (d, i) {\\n\\t\\t\\t\\tlet bbox = this.getBoundingClientRect();\\n\\n\\t\\t\\t\\tconsole.log(bbox);\\n\\n\\t\\t\\t\\tlet center = getCenter();\\n\\t\\t\\t\\tconsole.log(center, i);\\n\\n\\t\\t\\t\\tlet label = labels.filter(function (_, index) {\\n\\t\\t\\t\\t\\treturn index === i;\\n\\t\\t\\t\\t});\\n\\t\\t\\t\\t// let g = label.select('g');\\n\\t\\t\\t\\t// let transform = g.node().getAttribute('transform');\\n\\t\\t\\t\\t// console.log(transform);\\n\\n\\t\\t\\t\\treturn -10;\\n\\t\\t\\t})\\n\\n\\t\\t\\t.classed('mojaKlasa', true)\\n\\t\\t\\t.html(updateLabelText)\\n\\t\\t\\t.attr('transform', labelTransform)\\n\\t\\t\\t.style('text-anchor', function (d) {\\n\\t\\t\\t\\t// if slice centre is on the left, anchor text to start, otherwise anchor to end\\n\\t\\t\\t\\treturn midAngle(d) < Math.PI ? 'start' : 'end';\\n\\t\\t\\t})\\n\\t\\t\\t.style('font-size', '12px');\\n\\n\\t\\tlabels.each(function (i) {\\n\\t\\t\\tvar element = d3.select(this);\\n\\t\\t\\tvar textElement = d3.select(this).select('text');\\n\\t\\t\\tvar transformAttr = textElement.attr('transform');\\n\\t\\t\\tvar dyAttr = textElement.attr('dx');\\n\\n\\t\\t\\tlet transformString = transformAttr.replace('translate(', '').replace(')', '');\\n\\n\\t\\t\\t// Podziel łańcuch na części, oddzielając po przecinku\\n\\t\\t\\tvar parts = transformString.split(',');\\n\\n\\t\\t\\t// Pobierz wartości x i y z części\\n\\t\\t\\tvar x = parseFloat(parts[0]);\\n\\t\\t\\tvar y = parseFloat(parts[1]);\\n\\n\\t\\t\\t// console.log('x:', x, dyAttr);\\n\\t\\t\\t// console.log('y:', y);\\n\\n\\t\\t\\t// console.log(transformAttr, dyAttr);\\n\\t\\t\\tlet center = getCenter();\\n\\n\\t\\t\\tvar data = element.data()[0].data;\\n\\t\\t\\tvar image = element // POZYCJA OBRAZKA\\n\\t\\t\\t\\t.append('svg:image')\\n\\t\\t\\t\\t.attr('href', data.image)\\n\\t\\t\\t\\t.attr('width', 35)\\n\\t\\t\\t\\t.attr('height', 35)\\n\\t\\t\\t\\t.classed('imageFlaf', true);\\n\\n\\t\\t\\tif (center < x) {\\n\\t\\t\\t\\timage.attr('x', '190px');\\n\\t\\t\\t\\timage.attr('y', y - 22, 5);\\n\\t\\t\\t} else {\\n\\t\\t\\t\\timage.attr('x', '-235px');\\n\\t\\t\\t\\timage.attr('y', y - 22.5);\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\t// add IMAGES\\n\\n\\t\\t// add lines connecting labels to slice. A polyline creates straight lines connecting several points\\n\\t\\tvar polyline = svg\\n\\t\\t\\t.select('.lines')\\n\\t\\t\\t.selectAll('polyline')\\n\\t\\t\\t.data(pie(data))\\n\\t\\t\\t.enter()\\n\\t\\t\\t.append('polyline')\\n\\t\\t\\t.attr('stroke-width', 2)\\n\\t\\t\\t.attr('fill', 'none')\\n\\t\\t\\t.attr('stroke', color[colorEl])\\n\\t\\t\\t.attr('points', calculatePoints)\\n\\t\\t\\t.each(function (d, i) {\\n\\t\\t\\t\\td3.select(this).attr('stroke', color[i % color.length]);\\n\\t\\t\\t});\\n\\n\\t\\td3.selectAll('.labelName text, .slices path');\\n\\n\\t\\t// FUNCTION TO UPDATE CHART\\n\\t\\tupdateData = function () {\\n\\t\\t\\tvar updatePath = d3.select('.slices').selectAll('path');\\n\\t\\t\\tvar updateLines = d3.select('.lines').selectAll('polyline');\\n\\t\\t\\tvar updateLabels = d3.select('.labelName').selectAll('text');\\n\\n\\t\\t\\tvar data0 = path.data(), // store the current data before updating to the new\\n\\t\\t\\t\\tdata1 = pie(data);\\n\\n\\t\\t\\tupdatePath = updatePath.data(data1, key);\\n\\t\\t\\tupdateLines = updateLines.data(data1, key);\\n\\t\\t\\tupdateLabels = updateLabels.data(data1, key);\\n\\n\\t\\t\\t// adds new slices/lines/labels\\n\\t\\t\\tupdatePath\\n\\t\\t\\t\\t.enter()\\n\\t\\t\\t\\t.append('path')\\n\\t\\t\\t\\t.each(function (d, i) {\\n\\t\\t\\t\\t\\tthis._current = findNeighborArc(i, data0, data1, key) || d;\\n\\t\\t\\t\\t})\\n\\t\\t\\t\\t.attr('fill', function (d) {\\n\\t\\t\\t\\t\\treturn color[colorEl];\\n\\t\\t\\t\\t})\\n\\t\\t\\t\\t.attr('d', arc);\\n\\n\\t\\t\\tupdateLines\\n\\t\\t\\t\\t.enter()\\n\\t\\t\\t\\t.append('polyline')\\n\\t\\t\\t\\t.each(function (d, i) {\\n\\t\\t\\t\\t\\tthis._current = findNeighborArc(i, data0, data1, key) || d;\\n\\t\\t\\t\\t})\\n\\t\\t\\t\\t.attr('points', calculatePoints);\\n\\n\\t\\t\\tupdateLabels\\n\\t\\t\\t\\t.enter()\\n\\t\\t\\t\\t.append('text')\\n\\t\\t\\t\\t.each(function (d, i) {\\n\\t\\t\\t\\t\\tthis._current = findNeighborArc(i, data0, data1, key) || d;\\n\\t\\t\\t\\t})\\n\\t\\t\\t\\t.html(updateLabelText)\\n\\t\\t\\t\\t.attr('transform', labelTransform)\\n\\t\\t\\t\\t.style('text-anchor', function (d) {\\n\\t\\t\\t\\t\\treturn midAngle(d) < Math.PI ? 'start' : 'end';\\n\\t\\t\\t\\t});\\n\\n\\t\\t\\t// removes slices/labels/lines that are not in the current dataset\\n\\t\\t\\tupdatePath.exit().transition().duration(transTime).attrTween('d', arcTween).remove();\\n\\n\\t\\t\\tupdateLines.exit().transition().duration(transTime).attrTween('points', pointTween).remove();\\n\\n\\t\\t\\tupdateLabels.exit().remove();\\n\\n\\t\\t\\t// animates the transition from old angle to new angle for slices/lines/labels\\n\\t\\t\\tupdatePath.transition().duration(transTime).attrTween('d', arcTween);\\n\\n\\t\\t\\tupdateLines.transition().duration(transTime).attrTween('points', pointTween);\\n\\n\\t\\t\\tupdateLabels\\n\\t\\t\\t\\t.transition()\\n\\t\\t\\t\\t.duration(transTime)\\n\\t\\t\\t\\t.attrTween('transform', labelTween)\\n\\t\\t\\t\\t.styleTween('text-anchor', labelStyleTween);\\n\\n\\t\\t\\tupdateLabels.html(updateLabelText); // update the label text\\n\\n\\t\\t\\tvar textElements = svg.selectAll('.labelName text');\\n\\n\\t\\t\\ttextElements.each(function (d, i) {\\n\\t\\t\\t\\tvar text = d3.select(this);\\n\\t\\t\\t\\tvar textX = parseFloat(text.attr('transform').split('(')[1].split(',')[0]);\\n\\t\\t\\t\\tvar textY = parseFloat(text.attr('transform').split(',')[1].split(')')[0]);\\n\\n\\t\\t\\t\\tvar imageX = textX - 100; // Ustawienie pozycji X obrazka (np. 100 pikseli na lewo od tekstu)\\n\\t\\t\\t\\tvar imageY = textY + 20; // Ustawienie pozycji Y obrazka (np. 20 pikseli poniżej tekstu)\\n\\n\\t\\t\\t\\t// Ustawienie nowych wartości X i Y dla obrazka\\n\\t\\t\\t\\tvar image = svg.selectAll('.labelName image').filter(function (d, j) {\\n\\t\\t\\t\\t\\treturn j === i;\\n\\t\\t\\t\\t});\\n\\t\\t\\t\\timage.attr('x', imageX).attr('y', imageY);\\n\\t\\t\\t});\\n\\n\\t\\t\\t// add tooltip to mouse events on slices and labels\\n\\t\\t\\t// d3.selectAll('.labelName text, .slices path').call(toolTip);\\n\\t\\t};\\n\\t\\t// ===========================================================================================\\n\\t\\t// Functions\\n\\t\\t// calculates the angle for the middle of a slice\\n\\t\\tfunction midAngle(d) {\\n\\t\\t\\treturn d.startAngle + (d.endAngle - d.startAngle) / 2;\\n\\t\\t}\\n\\n\\t\\tfunction calculatePoints(d) {\\n\\t\\t\\t// see label transform function for explanations of these three lines.\\n\\t\\t\\tvar pos = outerArc.centroid(d);\\n\\t\\t\\tpos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);\\n\\t\\t\\treturn [arc.centroid(d), outerArc.centroid(d), pos];\\n\\t\\t}\\n\\n\\t\\tfunction labelTransform(d) {\\n\\t\\t\\t// POZYCJA LABELS\\n\\t\\t\\tvar pos = outerArc.centroid(d);\\n\\n\\t\\t\\tpos[1] = pos[1];\\n\\t\\t\\t//console.log(pos)\\n\\t\\t\\tlet center = getCenter();\\n\\n\\t\\t\\t// console.log(pos, center);\\n\\t\\t\\tif (pos[0] > center) {\\n\\t\\t\\t\\t// console.log('Lewa');\\n\\t\\t\\t\\tpos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1) + 40;\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tpos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1) - 45;\\n\\t\\t\\t\\t// console.log('Prawa');\\n\\t\\t\\t}\\n\\n\\t\\t\\treturn 'translate(' + pos + ')';\\n\\t\\t}\\n\\n\\t\\tfunction updateLabelText(d) {\\n\\t\\t\\t// Zwróć sformatowany tekst z obrazkiem i wartością procentową\\n\\t\\t\\t// return imageSrc + d.data[category] + ': <tspan>' + d.data[variable] + '%' + '</tspan>';\\n\\n\\t\\t\\treturn d.data[category] + ': <tspan>' + d.data[variable] + '%' + '</tspan>';\\n\\t\\t}\\n\\n\\t\\tfunction labelStyleTween(d) {\\n\\t\\t\\tthis._current = this._current || d;\\n\\t\\t\\tvar interpolate = d3.interpolate(this._current, d);\\n\\t\\t\\tthis._current = interpolate(0);\\n\\t\\t\\treturn function (t) {\\n\\t\\t\\t\\tvar d2 = interpolate(t);\\n\\t\\t\\t\\treturn midAngle(d2) < Math.PI ? 'start' : 'end';\\n\\t\\t\\t};\\n\\t\\t}\\n\\n\\t\\tfunction labelTween(d) {\\n\\t\\t\\tthis._current = this._current || d;\\n\\t\\t\\tvar interpolate = d3.interpolate(this._current, d);\\n\\t\\t\\tthis._current = interpolate(0);\\n\\t\\t\\treturn function (t) {\\n\\t\\t\\t\\tvar d2 = interpolate(t),\\n\\t\\t\\t\\t\\tpos = outerArc.centroid(d2); // computes the midpoint [x,y] of the centre line that would be\\n\\t\\t\\t\\tpos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1); // aligns the labels on the sides\\n\\t\\t\\t\\treturn 'translate(' + pos + ')';\\n\\t\\t\\t};\\n\\t\\t}\\n\\n\\t\\tfunction pointTween(d) {\\n\\t\\t\\tthis._current = this._current || d;\\n\\t\\t\\tvar interpolate = d3.interpolate(this._current, d);\\n\\t\\t\\tthis._current = interpolate(0);\\n\\t\\t\\treturn function (t) {\\n\\t\\t\\t\\tvar d2 = interpolate(t),\\n\\t\\t\\t\\t\\tpos = outerArc.centroid(d2);\\n\\t\\t\\t\\tpos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);\\n\\t\\t\\t\\treturn [arc.centroid(d2), outerArc.centroid(d2), pos];\\n\\t\\t\\t};\\n\\t\\t}\\n\\n\\t\\tfunction arcTween(d) {\\n\\t\\t\\tvar i = d3.interpolate(this._current, d);\\n\\t\\t\\tthis._current = i(0);\\n\\t\\t\\treturn function (t) {\\n\\t\\t\\t\\treturn arc(i(t));\\n\\t\\t\\t};\\n\\t\\t}\\n\\n\\t\\tfunction findNeighborArc(i, data0, data1, key) {\\n\\t\\t\\tvar d;\\n\\t\\t\\treturn (d = findPreceding(i, data0, data1, key))\\n\\t\\t\\t\\t? { startAngle: d.endAngle, endAngle: d.endAngle }\\n\\t\\t\\t\\t: (d = findFollowing(i, data0, data1, key))\\n\\t\\t\\t\\t? { startAngle: d.startAngle, endAngle: d.startAngle }\\n\\t\\t\\t\\t: null;\\n\\t\\t}\\n\\t\\t// Find the element in data0 that joins the highest preceding element in data1.\\n\\t\\tfunction findPreceding(i, data0, data1, key) {\\n\\t\\t\\tvar m = data0.length;\\n\\t\\t\\twhile (--i >= 0) {\\n\\t\\t\\t\\tvar k = key(data1[i]);\\n\\t\\t\\t\\tfor (var j = 0; j < m; ++j) {\\n\\t\\t\\t\\t\\tif (key(data0[j]) === k) return data0[j];\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\tfunction key(d) {\\n\\t\\t\\treturn d.data[category];\\n\\t\\t}\\n\\n\\t\\t// Find the element in data0 that joins the lowest following element in data1.\\n\\t\\tfunction findFollowing(i, data0, data1, key) {\\n\\t\\t\\tvar n = data1.length,\\n\\t\\t\\t\\tm = data0.length;\\n\\t\\t\\twhile (++i < n) {\\n\\t\\t\\t\\tvar k = key(data1[i]);\\n\\t\\t\\t\\tfor (var j = 0; j < m; ++j) {\\n\\t\\t\\t\\t\\tif (key(data0[j]) === k) return data0[j];\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\t// ===========================================================================================\\n\\t}\\n\\n\\tlet open = false;\\n\\n\\tlet numberHoveredItem = 0;\\n<\/script>\\n\\n<svelte:head>\\n\\t<link rel=\\"stylesheet\\" href=\\"/css/donutMultiplePage7.scss\\" />\\n\\t<script src=\\"https://d3js.org/d3.v6.min.js\\" charset=\\"utf-8\\"><\/script>\\n</svelte:head>\\n\\n<div class=\\"bigWrapperpage7\\">\\n\\t<div\\n\\t\\tclass=\\"donutWrapper\\"\\n\\t\\taria-hidden\\n\\t\\ton:click={() => {\\n\\t\\t\\topen = !open;\\n\\t\\t}}\\n\\t>\\n\\t\\t<div class=\\"donutTarget\\" {id} />\\n\\t</div>\\n\\t<!-- <p>{JSON.stringify(data)}</p> -->\\n\\t{#if open}\\n\\t\\t<div class=\\"legendWrapper\\" transition:fade use:draggable={{ handle: '.addDataBoxs' }}>\\n\\t\\t\\t<button\\n\\t\\t\\t\\tclass=\\"close\\"\\n\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\topen = !open;\\n\\t\\t\\t\\t}}>x</button\\n\\t\\t\\t>\\n\\n\\t\\t\\t<div class=\\"addDataBoxs\\">\\n\\t\\t\\t\\n\\t\\t\\t\\t<svg   on:click={(e) => handleImageClick(e)} xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"mini\\"\\n    xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" version=\\"1.1\\" x=\\"0px\\" y=\\"0px\\" viewBox=\\"0 0 200 250\\" style=\\"enable-background:new 0 0 200 200;\\" xml:space=\\"preserve\\">\\n    <g>\\n        <path fill=\\"rgba(0,0,0,0.2)\\" d=\\"M121.2,43.8c-23.5-9-51.2-1.7-67.3,17.7c-16.1,19.5-18.4,47.1-5.8,68.8c10.9,18.5,31,29.7,52.1,29.7   c3.4,0,6.8-0.3,10.2-0.9c28.1-4.8,49-29.7,49.6-59.1C159.5,74.7,144.3,52.6,121.2,43.8z M148.9,100c-0.4,20.8-12.9,38.8-31.8,45.8   c-19.3,7.2-41.2,1.4-54.6-14.4c-16-18.9-12.7-41.1-4.3-55.6c9.1-15.6,24.9-24.8,41.8-24.8c2.8,0,5.7,0.3,8.6,0.8   C131.5,56.1,148.4,76.3,148.9,100z\\"/>\\n        <path fill=\\"rgba(255,250,250,0.4)\\" d=\\"M129.7,94h-25V69c0-3.6-2.8-5.4-5.6-5.4c-2.8,0-5.6,1.9-5.6,5.4v25h-25c-3.6,0-5.4,2.8-5.4,5.6c0,2.8,1.9,5.6,5.4,5.6h25   v25c0,3.6,2.8,5.4,5.6,5.4c2.8,0,5.6-1.9,5.6-5.4v-25h25c3.6,0,5.4-2.8,5.4-5.6C135.1,96.8,133.3,94,129.7,94z\\"/>\\n    </g>\\n</svg>\\n\\n\\n\\n\\t\\t\\t\\t<input class=\\"dataName\\" contenteditable=\\"true\\" bind:value={newValues.name} />\\n\\t\\t\\t\\t<input class=\\"dataValue\\" contenteditable=\\"true\\" bind:value={newValues.val} />\\n\\t\\t\\t\\t<button class=\\"addButton\\" on:click={addData}>+</button>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t{#each data as { name, val, image }, numberCounter}\\n\\t\\t\\t\\t<div>\\n\\t\\t\\t\\t\\t<SortableItem\\n\\t\\t\\t\\t\\t\\tpropItemNumber={numberCounter}\\n\\t\\t\\t\\t\\t\\tbind:propData={data}\\n\\t\\t\\t\\t\\t\\tbind:propHoveredItemNumber={numberHoveredItem}\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<div class:classHovered={numberHoveredItem === numberCounter}>\\n\\t\\t\\t\\t\\t\\t\\t<MoveIcon propSize={22} />\\n\\t\\t\\t\\t\\t\\t\\t<!-- svelte-ignore a11y-click-events-have-key-events -->\\n\\t\\t\\t\\t\\t\\t\\t<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->\\n\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t<svg on:click={handleImageClick}\\n\\t\\t\\t\\t\\t\\t\\tdataVal={numberCounter} xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"mini\\"\\n    xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" version=\\"1.1\\" x=\\"0px\\" y=\\"0px\\" viewBox=\\"0 0 200 250\\" style=\\"enable-background:new 0 0 200 200;\\" xml:space=\\"preserve\\">\\n    <g>\\n        <path fill=\\"rgba(0,0,0,0.2)\\" d=\\"M121.2,43.8c-23.5-9-51.2-1.7-67.3,17.7c-16.1,19.5-18.4,47.1-5.8,68.8c10.9,18.5,31,29.7,52.1,29.7   c3.4,0,6.8-0.3,10.2-0.9c28.1-4.8,49-29.7,49.6-59.1C159.5,74.7,144.3,52.6,121.2,43.8z M148.9,100c-0.4,20.8-12.9,38.8-31.8,45.8   c-19.3,7.2-41.2,1.4-54.6-14.4c-16-18.9-12.7-41.1-4.3-55.6c9.1-15.6,24.9-24.8,41.8-24.8c2.8,0,5.7,0.3,8.6,0.8   C131.5,56.1,148.4,76.3,148.9,100z\\"/>\\n        <path fill=\\"rgba(255,250,250,0.4)\\" d=\\"M129.7,94h-25V69c0-3.6-2.8-5.4-5.6-5.4c-2.8,0-5.6,1.9-5.6,5.4v25h-25c-3.6,0-5.4,2.8-5.4,5.6c0,2.8,1.9,5.6,5.4,5.6h25   v25c0,3.6,2.8,5.4,5.6,5.4c2.8,0,5.6-1.9,5.6-5.4v-25h25c3.6,0,5.4-2.8,5.4-5.6C135.1,96.8,133.3,94,129.7,94z\\"/>\\n    </g>\\n</svg>\\n\\n\\t\\t\\t\\t\\t\\n\\n\\n\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t<input class=\\"name\\" contenteditable=\\"true\\" bind:value={data[numberCounter].name} />\\n\\t\\t\\t\\t\\t\\t\\t<input class=\\"val\\" contenteditable=\\"true\\" bind:value={data[numberCounter].val} />\\n\\t\\t\\t\\t\\t\\t\\t<button class=\\"removeButton\\" on:click={() => removeData(numberCounter)}>x</button>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t</SortableItem>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/each}\\n\\n\\t\\t\\t{#if showFileList}\\n\\t\\t\\t\\t<div class=\\"filelist\\" transition:fade>\\n\\t\\t\\t\\t\\t<Filelist\\n\\t\\t\\t\\t\\t\\tfileClicked={(val) => {\\n\\t\\t\\t\\t\\t\\t\\thandleClickElement(val);\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n\\n<style type=\\"postcss\\">\\n\\t.classHovered {\\n\\t\\tbackground-color: lightblue;\\n\\t\\tcolor: white;\\n\\t}\\n\\t:global(.imagemini) {\\n\\t\\twidth: 62px !important;\\n\\t\\theight: 62px;\\n\\t\\tborder-radius: 20px;\\n\\t\\tmargin-top: -20px !important;\\n\\t}\\n\\t:global(svg) {\\n\\t\\t/* -webkit-filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3));\\n\\t\\tfilter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25)); */\\n\\t}\\n\\t:global(.addDataBoxs) {\\n\\t\\tpadding-top: 8px;\\n\\t\\tbackground: rgba(20, 20, 20, 0.1);\\n\\t\\twidth: 100%;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tborder-radius: 12px 12px 0px 0px;\\n\\t\\tbox-shadow: inset -3px -4px 61px -27px rgba(66, 68, 90, 1);\\n\\t\\tjustify-content: space-between;\\n\\t\\tpadding-bottom: 8px;\\n\\t\\talign-items: center;\\n\\t}\\n\\n\\t.addButton {\\n\\t\\tbox-shadow: 1px 2px 5px 0px rgba(66, 68, 90, 1);\\n\\t\\tposition: relative;\\n\\t\\tdisplay: block;\\n\\t\\tbackground-color: rgba(200, 200, 200, 0.9);\\n\\t\\twidth: 42px;\\n\\t\\theight: 33px; /* padding: 9px; */\\n\\t\\tpadding-left: 12px;\\n\\t\\tborder-radius: 59px;\\n\\t\\tpadding-right: 11px;\\n\\t\\tvertical-align: baseline;\\n\\t\\tmargin-left: -11px;\\n\\t}\\n\\t:global(.mini.active) {\\n\\t\\tbackground: var(--brand-lightgreen);\\n\\t\\tborder-radius: 35px;\\n\\t}\\n\\n\\t.mini {\\n\\t\\ttransition: all ease 0.4s;\\n\\t\\twidth: 30px;\\n\\t\\theight: 27px;\\n\\t\\tpadding-top: 5px;\\n\\t\\tmargin-right: 10px;\\n\\t}\\n\\t.filelist {\\n\\t\\tposition: absolute;\\n\\t\\tmax-width: 107px;\\n\\t\\tpadding: 10px !important;\\n\\t\\tpadding: 4px;\\n\\t\\tpadding-right: 20px !important;\\n\\t\\twidth: 200px;\\n\\t\\tbackground-color: #d8d9e0;\\n\\t\\tborder-radius: 8px;\\n\\t\\tbox-shadow: 2px 6px 36px -18px rgba(66, 68, 90, 1);\\n\\t}\\n\\n\\tpath {\\n\\t\\tshape-rendering: geometricPrecision;\\n\\t}\\n\\n\\t.labelName tspan {\\n\\t\\tfont-style: normal;\\n\\t\\tfont-weight: 700;\\n\\t}\\n\\n\\t.labelName {\\n\\t\\tfont-size: 0.8em;\\n\\t\\tfont-style: italic;\\n\\t}\\n\\n\\t:global(.addDataBoxs .mini) {\\n\\t\\twidth: 20px;\\n\\t\\tmargin-left: 20px;\\n\\t}\\n\\t:global(.donutTarget .name) {\\n\\t\\twidth: 289px;\\n\\t}\\n\\t:global(.donutTarget .val) {\\n\\t}\\n\\t:global(.donutTarget .removeButton) {\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAgkBC,4BAAc,CACb,gBAAgB,CAAE,SAAS,CAC3B,KAAK,CAAE,KACR,CACQ,UAAY,CACnB,KAAK,CAAE,IAAI,CAAC,UAAU,CACtB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,KAAK,CAAC,UACnB,CAKQ,YAAc,CACrB,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACjC,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,aAAa,CAAE,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,GAAG,CAChC,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAC1D,eAAe,CAAE,aAAa,CAC9B,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MACd,CAEA,yBAAW,CACV,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAC/C,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAAK,CACd,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,CACnB,aAAa,CAAE,IAAI,CACnB,cAAc,CAAE,QAAQ,CACxB,WAAW,CAAE,KACd,CACQ,YAAc,CACrB,UAAU,CAAE,IAAI,kBAAkB,CAAC,CACnC,aAAa,CAAE,IAChB,CAEA,oBAAM,CACL,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,GAAG,CAChB,YAAY,CAAE,IACf,CACA,wBAAU,CACT,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CAAC,UAAU,CACxB,OAAO,CAAE,GAAG,CACZ,aAAa,CAAE,IAAI,CAAC,UAAU,CAC9B,KAAK,CAAE,KAAK,CACZ,gBAAgB,CAAE,OAAO,CACzB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAClD,CAEA,mBAAK,CACJ,eAAe,CAAE,kBAClB,CAYQ,kBAAoB,CAC3B,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,IACd,CACQ,kBAAoB,CAC3B,KAAK,CAAE,KACR"}`
};
const DonutMultiplePage7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "" } = $$props;
  let { data } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$7);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-xxmvv_START --><link rel="stylesheet" href="/css/donutMultiplePage7.scss"><script src="https://d3js.org/d3.v6.min.js" charset="utf-8" data-svelte-h="svelte-1ujepqs"><\/script><!-- HEAD_svelte-xxmvv_END -->`, ""} <div class="bigWrapperpage7"><div class="donutWrapper" aria-hidden><div class="donutTarget"${add_attribute("id", id, 0)}></div></div>  ${``} </div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$6 = {
  code: ':root{--brand-green:#2181b3;--brand-blue:#003661;--brand-lightgreen:#f0f4eb;--brand-light:#f0f4eb70;--comfortea:"Comfortaa", sans-serif;--dark-background:rgba(31, 40, 55, 1.000);--dark-text:#f0f4eb}.svg-option-button.svelte-pvpisa.svelte-pvpisa{transition:all ease-out 0.5s;width:150px;height:144px;border-radius:225px;margin:5px -75px 14px 2px;position:relative;margin-left:52px}.svg-option-button.svelte-pvpisa.svelte-pvpisa:hover{filter:blur(7px) invert(0) hue-rotate(-48deg);background-color:rgba(123, 154, 185, 0.5)}.optionsDonut.svelte-pvpisa.svelte-pvpisa{display:none}.optionsDonut.svelte-pvpisa input[type=number].svelte-pvpisa::-webkit-inner-spin-button,.optionsDonut.svelte-pvpisa input[type=number].svelte-pvpisa::-webkit-outer-spin-button{opacity:1}.optionsDonut.svelte-pvpisa input.svelte-pvpisa{opacity:0.6;font-size:25px;background:none !important}.optionsDonut.active.svelte-pvpisa.svelte-pvpisa{text-align:center;display:block !important;width:106px;position:absolute;box-shadow:4px 8px 10px 0px rgba(72, 165, 227, 0.4);border:solid rgba(100, 100, 100, 0.2) 0.1px;height:46px;background:var(--brand-lightgreen);border-radius:14px;margin-left:270px;margin-top:106px;border:2px solid var(--brand-green)}svg.svelte-pvpisa.svelte-pvpisa{color:hsl(125, 50%, 60%);display:block;max-width:20rem}',
  map: `{"version":3,"file":"DonutD3page7.svelte","sources":["DonutD3page7.svelte"],"sourcesContent":["<script>\\n\\timport { fade, slide } from 'svelte/transition';\\n\\timport { tweened } from 'svelte/motion';\\n\\timport { createEventDispatcher } from 'svelte';\\n\\n\\tconst dispatch = createEventDispatcher();\\n\\n\\texport let value = 5.7;\\n\\texport let average = 83;\\n\\texport let color = 'rgb(72, 165, 227)';\\n\\n\\tfunction updateValue(newValue) {\\n\\t\\tif (editable) {\\n\\t\\t\\tvalue = newValue;\\n\\t\\t\\tdispatch('valueChange', value);\\n\\t\\t}\\n\\t}\\n\\n\\texport let editable = false,\\n\\t\\tactive = false;\\n\\n\\tconst pathLength = 100;\\n\\tconst id = Math.random().toString().slice(-5);\\n\\n\\t$: offset = pathLength - value;\\n\\t$: angle = (360 * average) / pathLength;\\n\\n\\tconst tOffset = tweened(pathLength, {\\n\\t\\tduration: 400\\n\\t});\\n\\tconst tAngle = tweened(-10, {\\n\\t\\tduration: 200\\n\\t});\\n\\n\\t$: update(offset, angle);\\n\\n\\tconst update = async (offset, angle) => {\\n\\t\\tawait tOffset.set(offset);\\n\\t\\ttAngle.set(angle);\\n\\t};\\n<\/script>\\n\\n<!-- svelte-ignore a11y-positive-tabindex -->\\n{#if editable == true}\\n\\t<div\\n\\t\\trole=\\"button\\"\\n\\t\\ttabindex=\\"2\\"\\n\\t\\ton:keydown={() => {}}\\n\\t\\tclass=\\"svg-option-button\\"\\n\\t\\ton:click={() => {\\n\\t\\t\\tactive = !active;\\n\\t\\t}}\\n\\t/>\\n{/if}\\n<div class=\\"svg-item\\">\\n\\t<svg style:color viewBox=\\"-70 -70 140 140\\">\\n\\t\\t<defs>\\n\\t\\t\\t<style>\\n\\t\\t\\t\\t.cls-1 {\\n\\t\\t\\t\\t\\toutline: solid;\\n\\t\\t\\t\\t\\tborder-radius: 57px;\\n\\t\\t\\t\\t\\tfill: none;\\n\\t\\t\\t\\t\\toutline-width: 0.5px;\\n\\t\\t\\t\\t\\ttransform: scale(1.123);\\n\\t\\t\\t\\t\\toutline-color: var(--brand-blue);\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\t.cls-2 {\\n\\t\\t\\t\\t\\toutline: solid;\\n\\t\\t\\t\\t\\tborder-radius: 57px;\\n\\t\\t\\t\\t\\tfill: none;\\n\\t\\t\\t\\t\\toutline-width: 0.5px;\\n\\t\\t\\t\\t\\ttransform: scale(0.85);\\n\\t\\t\\t\\t\\toutline-color: var(--brand-blue);\\n\\t\\t\\t\\t}\\n\\t\\t\\t</style>\\n\\n\\t\\t\\t<path\\n\\t\\t\\t\\tout:fade={{ duration: 200 }}\\n\\t\\t\\t\\t{pathLength}\\n\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\tstroke-width=\\"14\\"\\n\\t\\t\\t\\tid=\\"donut-path-{id}\\"\\n\\t\\t\\t\\td=\\"M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100\\"\\n\\t\\t\\t/>\\n\\t\\t</defs>\\n\\n\\t\\t<g out:fade={{ duration: 400 }} mask=\\"url(#donut-mask-{id})\\">\\n\\t\\t\\t<use href=\\"#donut-path-{id}\\" stroke=\\"hsl(0, 0%, 100%)\\" />\\n\\t\\t\\t<use\\n\\t\\t\\t\\thref=\\"#donut-path-{id}\\"\\n\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\tstroke-width=\\"40\\"\\n\\t\\t\\t\\tstroke-dasharray={pathLength}\\n\\t\\t\\t\\tstroke-dashoffset={$tOffset}\\n\\t\\t\\t/>\\n\\t\\t</g>\\n\\t\\t<g\\n\\t\\t\\ttext-anchor=\\"middle\\"\\n\\t\\t\\tdominant-baseline=\\"central\\"\\n\\t\\t\\tfont-size=\\"25\\"\\n\\t\\t\\tfont-weight=\\"700\\"\\n\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\toutline-color=\\"var(--brand-blue)\\"\\n\\t\\t\\tstroke-width=\\"3\\"\\n\\t\\t>\\n\\t\\t\\t<text out:slide={{ duration: 200 }}>\\n\\t\\t\\t\\t{#if value % 1 !== 0}\\n\\t\\t\\t\\t\\t{(pathLength - $tOffset).toFixed(1)}%\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t{Math.floor(pathLength - $tOffset)}%\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</text>\\n\\t\\t</g>\\n\\n\\t\\t<path class=\\"cls-1\\" d=\\"M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100\\" />\\n\\t\\t<path class=\\"cls-2\\" d=\\"M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100\\" />\\n\\t</svg>\\n\\n\\t<div class=\\"optionsDonut\\" class:active>\\n\\t\\t<input\\n\\t\\t\\ttype=\\"number\\"\\n\\t\\t\\tclass=\\"option_number\\"\\n\\t\\t\\tbind:value\\n\\t\\t\\tmin=\\"1\\"\\n\\t\\t\\tmax=\\"100\\"\\n\\t\\t\\ton:change={updateValue(value)}\\n\\t\\t/>\\n\\t</div>\\n</div>\\n\\n<style lang=\\"scss\\">/* Variables and mixins declared here will be available in all other SCSS files */\\n:root {\\n  --brand-green: #2181b3;\\n  --brand-blue: #003661;\\n  --brand-lightgreen: #f0f4eb;\\n  --brand-light: #f0f4eb70;\\n  --comfortea: \\"Comfortaa\\", sans-serif;\\n  --dark-background: rgba(31, 40, 55, 1.000);\\n  --dark-text: #f0f4eb;\\n}\\n\\n.svg-option-button {\\n  transition: all ease-out 0.5s;\\n  width: 150px;\\n  height: 144px;\\n  border-radius: 225px;\\n  margin: 5px -75px 14px 2px;\\n  position: relative;\\n  margin-left: 52px;\\n}\\n\\n.svg-option-button:hover {\\n  filter: blur(7px) invert(0) hue-rotate(-48deg);\\n  background-color: rgba(123, 154, 185, 0.5);\\n}\\n\\n.optionsDonut {\\n  display: none;\\n}\\n\\n.optionsDonut input[type=number]::-webkit-inner-spin-button,\\n.optionsDonut input[type=number]::-webkit-outer-spin-button {\\n  opacity: 1;\\n}\\n\\n.optionsDonut input {\\n  opacity: 0.6;\\n  font-size: 25px;\\n  background: none !important;\\n}\\n\\n.optionsDonut.active {\\n  text-align: center;\\n  display: block !important;\\n  width: 106px;\\n  position: absolute;\\n  box-shadow: 4px 8px 10px 0px rgba(72, 165, 227, 0.4);\\n  border: solid rgba(100, 100, 100, 0.2) 0.1px;\\n  height: 46px;\\n  background: var(--brand-lightgreen);\\n  border-radius: 14px;\\n  margin-left: 270px;\\n  margin-top: 106px;\\n  border: 2px solid var(--brand-green);\\n}\\n\\nsvg {\\n  color: hsl(125, 50%, 60%);\\n  display: block;\\n  max-width: 20rem;\\n}</style>\\n"],"names":[],"mappings":"AAmIA,KAAM,CACJ,aAAa,CAAE,OAAO,CACtB,YAAY,CAAE,OAAO,CACrB,kBAAkB,CAAE,OAAO,CAC3B,aAAa,CAAE,SAAS,CACxB,WAAW,CAAE,uBAAuB,CACpC,iBAAiB,CAAE,uBAAuB,CAC1C,WAAW,CAAE,OACf,CAEA,8CAAmB,CACjB,UAAU,CAAE,GAAG,CAAC,QAAQ,CAAC,IAAI,CAC7B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,KAAK,CACpB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAAC,GAAG,CAC1B,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,IACf,CAEA,8CAAkB,MAAO,CACvB,MAAM,CAAE,KAAK,GAAG,CAAC,CAAC,OAAO,CAAC,CAAC,CAAC,WAAW,MAAM,CAAC,CAC9C,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC3C,CAEA,yCAAc,CACZ,OAAO,CAAE,IACX,CAEA,2BAAa,CAAC,KAAK,CAAC,IAAI,CAAC,MAAM,eAAC,2BAA2B,CAC3D,2BAAa,CAAC,KAAK,CAAC,IAAI,CAAC,MAAM,eAAC,2BAA4B,CAC1D,OAAO,CAAE,CACX,CAEA,2BAAa,CAAC,mBAAM,CAClB,OAAO,CAAE,GAAG,CACZ,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IAAI,CAAC,UACnB,CAEA,aAAa,mCAAQ,CACnB,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,KAAK,CAAC,UAAU,CACzB,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpD,MAAM,CAAE,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,KAAK,CAC5C,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,kBAAkB,CAAC,CACnC,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,KAAK,CAClB,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CACrC,CAEA,+BAAI,CACF,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACzB,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,KACb"}`
};
const pathLength = 100;
const DonutD3page7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let offset;
  let angle;
  let $tOffset, $$unsubscribe_tOffset;
  createEventDispatcher();
  let { value = 5.7 } = $$props;
  let { average = 83 } = $$props;
  let { color = "rgb(72, 165, 227)" } = $$props;
  let { editable = false, active = false } = $$props;
  const id = Math.random().toString().slice(-5);
  const tOffset = tweened(pathLength, { duration: 400 });
  $$unsubscribe_tOffset = subscribe(tOffset, (value2) => $tOffset = value2);
  const tAngle = tweened(-10, { duration: 200 });
  const update = async (offset2, angle2) => {
    await tOffset.set(offset2);
    tAngle.set(angle2);
  };
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.average === void 0 && $$bindings.average && average !== void 0) $$bindings.average(average);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0) $$bindings.editable(editable);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0) $$bindings.active(active);
  $$result.css.add(css$6);
  offset = pathLength - value;
  angle = 360 * average / pathLength;
  {
    update(offset, angle);
  }
  $$unsubscribe_tOffset();
  return ` ${editable == true ? `<div role="button" tabindex="2" class="svg-option-button svelte-pvpisa"></div>` : ``} <div class="svg-item"><svg viewBox="-70 -70 140 140" class="svelte-pvpisa"${add_styles({ color })}><defs><style>.cls-1 {
					outline: solid;
					border-radius: 57px;
					fill: none;
					outline-width: 0.5px;
					transform: scale(1.123);
					outline-color: var(--brand-blue);
				}
				.cls-2 {
					outline: solid;
					border-radius: 57px;
					fill: none;
					outline-width: 0.5px;
					transform: scale(0.85);
					outline-color: var(--brand-blue);
				}
			</style><path${add_attribute("pathLength", pathLength, 0)} fill="none" stroke-width="14" id="${"donut-path-" + escape(id, true)}" d="M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100"></path></defs><g mask="${"url(#donut-mask-" + escape(id, true) + ")"}"><use href="${"#donut-path-" + escape(id, true)}" stroke="hsl(0, 0%, 100%)"></use><use href="${"#donut-path-" + escape(id, true)}" stroke="currentColor" stroke-width="40"${add_attribute("stroke-dasharray", pathLength, 0)}${add_attribute("stroke-dashoffset", $tOffset, 0)}></use></g><g text-anchor="middle" dominant-baseline="central" font-size="25" font-weight="700" fill="currentColor" outline-color="var(--brand-blue)" stroke-width="3"><text>${value % 1 !== 0 ? `${escape((pathLength - $tOffset).toFixed(1))}%` : `${escape(Math.floor(pathLength - $tOffset))}%`}</text></g><path class="cls-1" d="M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100"></path><path class="cls-2" d="M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100"></path></svg> <div class="${["optionsDonut svelte-pvpisa", active ? "active" : ""].join(" ").trim()}"><input type="number" class="option_number svelte-pvpisa" min="1" max="100"${add_attribute("value", value, 0)}></div> </div>`;
});
const css$5 = {
  code: ".donuts .svg-item{margin-top:-24px;margin-left:-169px;padding:0px;position:relative;max-width:31%;display:initial}.donuts .optionsDonut.active{position:relative !important;display:block;margin:-116px -315px;left:-107px;top:-303px}.donuts .svg-item .options{position:absolute}.donuts .svg-option-button{z-index:99999999999;position:absolute;background-color:rgba(123, 154, 185, 0)}.donuts.svelte-8rnh5f{display:flex;width:657px;height:200px;flex-direction:row;justify-content:space-evenly;margin-top:-40px}.donuts .svg-item{transform:scale(1.12)}.pageNumber.svelte-8rnh5f{background:none;margin-top:881px}",
  map: `{"version":3,"file":"page07.svelte","sources":["page07.svelte"],"sourcesContent":["<script>\\n\\timport { onMount } from 'svelte';\\n\\timport Header from '$lib/components/header.svelte';\\n\\timport Loading from '$lib/components/loading.svelte';\\n\\timport { location } from '$lib/stores/appStore';\\n\\timport DonutMultiple from '$lib/components/DonutMultiplePage7.svelte';\\n\\timport Donut from '$lib/components/DonutD3page7.svelte';\\n\\tonMount(async () => {\\n\\t\\t// console.log($location.params?.POI);\\n\\t});\\n\\n\\n\\n\\n\\n<\/script>\\n\\n<div class=\\"content-block section page_07\\">\\n\\t<Header />\\n\\t{#if !$location.params}\\n\\t\\t<div class=\\"center\\"><Loading /></div>\\n\\t{/if}\\n\\n\\t{#if $location.params && $location.params.page07 && $location.params.page07.text14}\\n\\t\\t<div class=\\"page_content\\">\\n\\t\\t\\t<div class=\\"containerFlex noselect\\">\\n\\t\\t\\t\\t<div class=\\"grid_content noselect mb-20\\">\\n\\t\\t\\t\\t\\t<div class=\\"full-width\\">\\n\\t\\t\\t\\t\\t\\t<h2 class=\\"title_medium noselect\\">\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"number_type noselect\\">14</span> Rozkład preferencji wyborczych w okolicy\\n\\t\\t\\t\\t\\t\\t</h2>\\n\\t\\t\\t\\t\\t\\t<p class=\\"tabText\\" contenteditable>\\n\\t\\t\\t\\t\\t\\t\\t{$location.params.page07.text14}\\n\\t\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t<div class=\\"grid_content noselect mb-20\\">\\n\\t\\t\\t\\t\\t<div class=\\"full-width\\">\\n\\t\\t\\t\\t\\t\\t<h2 class=\\"title_medium noselect\\">\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"number_type noselect\\">15</span>Rozkład głosów w ostatniej turze wyborów w\\n\\t\\t\\t\\t\\t\\t\\tdanej okolicy:\\n\\t\\t\\t\\t\\t\\t</h2>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t<div class=\\"grid_content noselect mb-20\\">\\n\\t\\t\\t\\t\\t<div class=\\"full-width\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"wykres\\">\\n\\t\\t\\t\\t\\t\\t\\t<DonutMultiple  bind:data={$location.params.page07.wykresData} id={'page7donut'} />\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t<div class=\\"grid_content noselect mb-20\\">\\n\\t\\t\\t\\t\\t<div class=\\"full-width\\">\\n\\t\\t\\t\\t\\t\\t<h2 class=\\"title_medium noselect\\">\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"number_type noselect\\">16</span>Bilans uzyskanej frekwencji w odniesieniu\\n\\t\\t\\t\\t\\t\\t\\tdo ostatnich wyborów parlamentarnych\\n\\t\\t\\t\\t\\t\\t</h2>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t{#if $location.params}\\n\\t\\t\\t\\t\\t<div class=\\"donuts\\">\\n\\t\\t\\t\\t\\t\\t<Donut\\n\\t\\t\\t\\t\\t\\t\\tbind:value={$location.params.page07.donut1}\\n\\t\\t\\t\\t\\t\\t\\teditable={true}\\n\\t\\t\\t\\t\\t\\t\\ton:valueChange={(event) => console.log(event.detail)}\\n\\t\\t\\t\\t\\t\\t/>\\n\\n\\t\\t\\t\\t\\t\\t<Donut\\n\\t\\t\\t\\t\\t\\t\\tbind:value={$location.params.page07.donut2}\\n\\t\\t\\t\\t\\t\\t\\teditable={true}\\n\\t\\t\\t\\t\\t\\t\\ton:valueChange={(event) => console.log(event.detail)}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<div class=\\"pageNumber right\\">7</div>\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t:global(.donuts .svg-item) {\\n\\t\\tmargin-top: -24px;\\n\\t\\tmargin-left: -169px;\\n\\t\\tpadding: 0px;\\n\\t\\tposition: relative;\\n\\t\\tmax-width: 31%;\\n\\t\\tdisplay: initial;\\n\\t}\\n\\t:global(.donuts .optionsDonut.active){\\n\\n\\t\\tposition: relative !important;\\n    display: block;\\n    margin: -116px -315px;\\n    left: -107px;\\n    top: -303px;\\n\\t}\\n\\t:global(.donuts .svg-item .options) {\\n\\t\\tposition: absolute;\\n\\t}\\n\\t:global(.donuts .svg-option-button) {\\n\\t\\tz-index: 99999999999;\\n\\t\\tposition: absolute;\\n\\t\\tbackground-color: rgba(123, 154, 185, 0);\\n\\t}\\n\\t.donuts {\\n\\t\\tdisplay: flex;\\n\\t\\twidth: 657px;\\n\\t\\theight: 200px;\\n\\t\\tflex-direction: row;\\n\\t\\tjustify-content: space-evenly;\\n\\t\\tmargin-top: -40px;\\n\\t}\\n\\t:global(.donuts .svg-item) {\\n\\t\\ttransform: scale(1.12);\\n\\t}\\n\\t.pageNumber {\\n\\t\\tbackground: none;\\n\\t\\tmargin-top: 881px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAsFS,iBAAmB,CAC1B,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,GAAG,CACd,OAAO,CAAE,OACV,CACQ,4BAA6B,CAEpC,QAAQ,CAAE,QAAQ,CAAC,UAAU,CAC3B,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,MAAM,CAAC,MAAM,CACrB,IAAI,CAAE,MAAM,CACZ,GAAG,CAAE,MACR,CACQ,0BAA4B,CACnC,QAAQ,CAAE,QACX,CACQ,0BAA4B,CACnC,OAAO,CAAE,WAAW,CACpB,QAAQ,CAAE,QAAQ,CAClB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CACxC,CACA,qBAAQ,CACP,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,YAAY,CAC7B,UAAU,CAAE,KACb,CACQ,iBAAmB,CAC1B,SAAS,CAAE,MAAM,IAAI,CACtB,CACA,yBAAY,CACX,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,KACb"}`
};
const Page07 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$result.css.add(css$5);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="content-block section page_07">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${!$location.params ? `<div class="center">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>` : ``} ${$location.params && $location.params.page07 && $location.params.page07.text14 ? `<div class="page_content"><div class="containerFlex noselect"><div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect" data-svelte-h="svelte-1ccqt1s"><span class="number_type noselect">14</span> Rozkład preferencji wyborczych w okolicy</h2> <p class="tabText" contenteditable>${escape($location.params.page07.text14)}</p></div></div> <div class="grid_content noselect mb-20" data-svelte-h="svelte-1ubuqsy"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">15</span>Rozkład głosów w ostatniej turze wyborów w
							danej okolicy:</h2></div></div> <div class="grid_content noselect mb-20"><div class="full-width"><div class="wykres">${validate_component(DonutMultiplePage7, "DonutMultiple").$$render(
      $$result,
      {
        id: "page7donut",
        data: $location.params.page07.wykresData
      },
      {
        data: ($$value) => {
          $location.params.page07.wykresData = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div></div> <div class="grid_content noselect mb-20" data-svelte-h="svelte-9c4y6l"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">16</span>Bilans uzyskanej frekwencji w odniesieniu
							do ostatnich wyborów parlamentarnych</h2></div></div> ${$location.params ? `<div class="donuts svelte-8rnh5f">${validate_component(DonutD3page7, "Donut").$$render(
      $$result,
      {
        editable: true,
        value: $location.params.page07.donut1
      },
      {
        value: ($$value) => {
          $location.params.page07.donut1 = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(DonutD3page7, "Donut").$$render(
      $$result,
      {
        editable: true,
        value: $location.params.page07.donut2
      },
      {
        value: ($$value) => {
          $location.params.page07.donut2 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>` : ``}</div> <div class="pageNumber right svelte-8rnh5f" data-svelte-h="svelte-lejaui">7</div></div>` : ``} </div>`;
  } while (!$$settled);
  $$unsubscribe_location();
  return $$rendered;
});
const css$4 = {
  code: ".range_element.svelte-1uxdrpr.svelte-1uxdrpr{overflow:hidden;height:19px;margin-top:-6px}.range_element.svelte-1uxdrpr h4.svelte-1uxdrpr{color:#999;font-weight:500}.range_element.svelte-1uxdrpr h4.svelte-1uxdrpr:after{content:'%';padding-left:1px}.range_element.svelte-1uxdrpr input[type='range'].svelte-1uxdrpr{outline:0;border:0;border-radius:500px;width:420px;max-width:100%;margin:8px 0 6px;transition:box-shadow 1.6s ease-in-out}.range_element.svelte-1uxdrpr input[type='range'].svelte-1uxdrpr{border-radius:20px;height:10px;-webkit-appearance:none;background-color:#ffffff;position:relative;overflow:hidden}.range_element.svelte-1uxdrpr input[type='range'].svelte-1uxdrpr::-webkit-slider-runnable-track{height:10px;-webkit-appearance:none;color:#444;-webkit-transition:box-shadow 0.8s ease-in-out;transition:box-shadow 0.8s ease-in-out;position:relative}.range_element.color0.svelte-1uxdrpr input[type='range'].svelte-1uxdrpr::-webkit-slider-thumb{width:10px;-webkit-appearance:none;height:10px;cursor:ew-resize;background:#fff;box-shadow:-340px 0 0 335px rgba(14, 207, 93, 1.000), inset 0 0 0 40px rgba(14, 207, 93, 1.000);border-radius:80%;-webkit-transition:box-shadow 0.8s ease-in-out;transition:box-shadow 0.8s ease-in-out;position:relative}.range_element.color0.svelte-1uxdrpr input[type='range'].svelte-1uxdrpr:active::-webkit-slider-thumb{background:#fff;box-shadow:-340px 0 0 335px #1597ff, inset 0 0 0 3px #1597ff}.range_element.color1.svelte-1uxdrpr input[type='range'].svelte-1uxdrpr::-webkit-slider-thumb{width:10px;-webkit-appearance:none;height:10px;cursor:ew-resize;background:#fff;box-shadow:-340px 0 0 335px rgba(121, 253, 171, 1.000), inset 0 0 0 40px rgba(121, 253, 171, 1.000);border-radius:80%;-webkit-transition:box-shadow 0.8s ease-in-out;transition:box-shadow 0.8s ease-in-out;position:relative}.range_element.color1.svelte-1uxdrpr input[type='range'].svelte-1uxdrpr:active::-webkit-slider-thumb{background:#fff;box-shadow:-340px 0 0 335px #1597ff, inset 0 0 0 3px #1597ff}.range_element.svelte-1uxdrpr .value.svelte-1uxdrpr{font-size:10px;margin-left:430px;margin-top:7px;position:absolute;opacity:0.7}#h4-container.svelte-1uxdrpr.svelte-1uxdrpr{width:400px;max-width:100%;padding:0 20px;box-sizing:border-box;position:relative}input:not(:active)+#h4-container.svelte-1uxdrpr h4.svelte-1uxdrpr{opacity:0;margin-top:-50px;pointer-events:none}",
  map: `{"version":3,"file":"range08.svelte","sources":["range08.svelte"],"sourcesContent":["<script>\\n\\timport { onMount, afterUpdate } from 'svelte';\\n\\timport { fade, blur, fly, slide } from 'svelte/transition';\\n\\tlet colors = ['rgba(14, 207, 93, 1.000)', 'rgba(121, 253, 171, 1.000)'];\\n\\texport let color;\\n\\texport let value = 30;\\n\\n\\tlet rangePercent = value;\\n\\tlet h4Style = {\\n\\t\\ttransform: 'translateX(-50%) scale(1)',\\n\\t\\tleft: '0%'\\n\\t};\\n\\n\\tfunction handleRangeChange(event) {\\n\\t\\trangePercent = event.target.value;\\n\\t\\th4Style = {\\n\\t\\t\\t...h4Style,\\n\\t\\t\\ttransform: \`translateX(-50%) scale(\${1 + rangePercent / 100})\`,\\n\\t\\t\\tleft: \`\${rangePercent}%\`\\n\\t\\t};\\n\\t}\\n\\n\\tlet ballSize = 10; // Rozmiar kulki\\n\\tlet borderRadius = 50; // Początkowy border radius\\n\\n\\tlet ready = false;\\n\\n\\tonMount(() => {\\n\\t\\tready = true;\\n\\t});\\n\\n\\tafterUpdate(() => {});\\n<\/script>\\n\\n<div class=\\"range_element color{color}\\" transition:fade>\\n\\t<div class=\\"value\\">{rangePercent}</div>\\n\\t<input type=\\"range\\" bind:value={rangePercent} on:change={handleRangeChange} style='backgrount-color:\\"{colors[color]}\\"!important' />\\n\\t<div id=\\"h4-container\\" transition:slide>\\n\\t\\t<h4 style={h4Style} transition:fly>\\n\\t\\t\\t<span\\n\\t\\t\\t \\tstyle=\\"width: {ballSize}px; height: {ballSize}px; border-radius: {borderRadius}px;}\\"\\n\\t\\t\\t/>\\n\\t\\t</h4>\\n\\n\\t</div>\\n\\t<!-- <div class=\\"value\\">{rangePercent}</div> -->\\n</div>\\n\\n<style type=\\"\\">\\n\\t.range_element {\\n\\t\\toverflow: hidden;\\n\\t\\theight: 19px;\\n\\t\\tmargin-top: -6px;\\n\\t}\\n\\t.range_element h1 {\\n\\t\\tcolor: #333;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\t.range_element h3 {\\n\\t\\tcolor: #aaa;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\t.range_element h4 {\\n\\t\\tcolor: #999;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\t.range_element h4:after {\\n\\t\\tcontent: '%';\\n\\t\\tpadding-left: 1px;\\n\\t}\\n\\t.range_element input[type='range'] {\\n\\t\\toutline: 0;\\n\\t\\tborder: 0;\\n\\t\\tborder-radius: 500px;\\n\\t\\twidth: 420px;\\n\\t\\tmax-width: 100%;\\n\\t\\tmargin: 8px 0 6px;\\n\\t\\ttransition: box-shadow 1.6s ease-in-out;\\n\\t}\\n\\t.range_element input[type='range'] {\\n\\t\\t\\tborder-radius: 20px;\\n\\t\\t\\theight: 10px;\\n\\t\\t\\t-webkit-appearance: none;\\n\\t\\t\\tbackground-color: #ffffff;\\n\\t\\t\\tposition: relative;\\n\\t\\t\\toverflow: hidden;\\n\\t\\t}\\n\\t\\n\\t\\n\\t\\t.range_element input[type='range']::-webkit-slider-runnable-track {\\n\\t\\t\\theight: 10px;\\n\\t\\t\\t-webkit-appearance: none;\\n\\t\\t\\tcolor: #444;\\n\\t\\t\\t-webkit-transition: box-shadow 0.8s ease-in-out;\\n\\t\\t\\ttransition: box-shadow 0.8s ease-in-out;\\n\\t\\t\\tposition: relative;\\n\\t\\t}\\n\\t\\t.range_element.color0 input[type='range']::-webkit-slider-thumb {\\n\\t\\t\\twidth: 10px;\\n\\t\\t\\t-webkit-appearance: none;\\n\\t\\t\\theight: 10px;\\n\\t\\t\\tcursor: ew-resize;\\n\\t\\t\\tbackground: #fff;\\n\\t\\t\\tbox-shadow: -340px 0 0 335px rgba(14, 207, 93, 1.000), inset 0 0 0 40px rgba(14, 207, 93, 1.000);\\n\\t\\t\\tborder-radius: 80%;\\n\\t\\t\\t-webkit-transition: box-shadow 0.8s ease-in-out;\\n\\t\\t\\ttransition: box-shadow 0.8s ease-in-out;\\n\\t\\t\\tposition: relative;\\n\\t\\t}\\n\\t\\t.range_element.color0 input[type='range']:active::-webkit-slider-thumb {\\n\\t\\t\\tbackground: #fff;\\n\\t\\t\\tbox-shadow: -340px 0 0 335px #1597ff, inset 0 0 0 3px #1597ff;\\n\\t\\t}\\n\\t\\t.range_element.color1 input[type='range']::-webkit-slider-thumb {\\n\\t\\t\\twidth: 10px;\\n\\t\\t\\t-webkit-appearance: none;\\n\\t\\t\\theight: 10px;\\n\\t\\t\\tcursor: ew-resize;\\n\\t\\t\\tbackground: #fff;\\n\\t\\t\\tbox-shadow: -340px 0 0 335px rgba(121, 253, 171, 1.000), inset 0 0 0 40px rgba(121, 253, 171, 1.000);\\n\\t\\t\\tborder-radius: 80%;\\n\\t\\t\\t-webkit-transition: box-shadow 0.8s ease-in-out;\\n\\t\\t\\ttransition: box-shadow 0.8s ease-in-out;\\n\\t\\t\\tposition: relative;\\n\\t\\t}\\n\\t\\t.range_element.color1 input[type='range']:active::-webkit-slider-thumb {\\n\\t\\t\\tbackground: #fff;\\n\\t\\t\\tbox-shadow: -340px 0 0 335px #1597ff, inset 0 0 0 3px #1597ff;\\n\\t\\t}\\n\\t\\n\\t.range_element .value{\\n\\n\\t\\tfont-size: 10px;\\n    margin-left: 430px;\\n    margin-top: 7px;\\n    position: absolute;\\n\\t\\topacity: 0.7;\\n\\t}\\n\\n\\t#h4-container {\\n\\t\\twidth: 400px;\\n\\t\\tmax-width: 100%;\\n\\t\\tpadding: 0 20px;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tposition: relative;\\n\\t}\\n\\tinput:not(:active) + #h4-container h4 {\\n\\t\\topacity: 0;\\n\\t\\tmargin-top: -50px;\\n\\t\\tpointer-events: none;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAiDC,4CAAe,CACd,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IACb,CASA,6BAAc,CAAC,iBAAG,CACjB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,GACd,CACA,6BAAc,CAAC,iBAAE,MAAO,CACvB,OAAO,CAAE,GAAG,CACZ,YAAY,CAAE,GACf,CACA,6BAAc,CAAC,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAE,CAClC,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,aAAa,CAAE,KAAK,CACpB,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,GAAG,CAAC,CAAC,CAAC,GAAG,CACjB,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,WAC7B,CACA,6BAAc,CAAC,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAE,CACjC,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,IAAI,CACZ,kBAAkB,CAAE,IAAI,CACxB,gBAAgB,CAAE,OAAO,CACzB,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,MACX,CAGA,6BAAc,CAAC,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAC,+BAAgC,CACjE,MAAM,CAAE,IAAI,CACZ,kBAAkB,CAAE,IAAI,CACxB,KAAK,CAAE,IAAI,CACX,kBAAkB,CAAE,UAAU,CAAC,IAAI,CAAC,WAAW,CAC/C,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,WAAW,CACvC,QAAQ,CAAE,QACX,CACA,cAAc,sBAAO,CAAC,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAC,sBAAuB,CAC/D,KAAK,CAAE,IAAI,CACX,kBAAkB,CAAE,IAAI,CACxB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,SAAS,CACjB,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,CAChG,aAAa,CAAE,GAAG,CAClB,kBAAkB,CAAE,UAAU,CAAC,IAAI,CAAC,WAAW,CAC/C,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,WAAW,CACvC,QAAQ,CAAE,QACX,CACA,cAAc,sBAAO,CAAC,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAC,OAAO,sBAAuB,CACtE,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,OACvD,CACA,cAAc,sBAAO,CAAC,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAC,sBAAuB,CAC/D,KAAK,CAAE,IAAI,CACX,kBAAkB,CAAE,IAAI,CACxB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,SAAS,CACjB,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,KAAK,CAAC,CACpG,aAAa,CAAE,GAAG,CAClB,kBAAkB,CAAE,UAAU,CAAC,IAAI,CAAC,WAAW,CAC/C,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,WAAW,CACvC,QAAQ,CAAE,QACX,CACA,cAAc,sBAAO,CAAC,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAC,OAAO,sBAAuB,CACtE,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,OACvD,CAED,6BAAc,CAAC,qBAAM,CAEpB,SAAS,CAAE,IAAI,CACb,WAAW,CAAE,KAAK,CAClB,UAAU,CAAE,GAAG,CACf,QAAQ,CAAE,QAAQ,CACpB,OAAO,CAAE,GACV,CAEA,2CAAc,CACb,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,UAAU,CAAE,UAAU,CACtB,QAAQ,CAAE,QACX,CACA,KAAK,KAAK,OAAO,CAAC,CAAG,4BAAa,CAAC,iBAAG,CACrC,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,KAAK,CACjB,cAAc,CAAE,IACjB"}`
};
let ballSize = 10;
let borderRadius = 50;
const Range08 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let colors = ["rgba(14, 207, 93, 1.000)", "rgba(121, 253, 171, 1.000)"];
  let { color } = $$props;
  let { value = 30 } = $$props;
  let rangePercent = value;
  let h4Style = {
    transform: "translateX(-50%) scale(1)",
    left: "0%"
  };
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  $$result.css.add(css$4);
  return `<div class="${"range_element color" + escape(color, true) + " svelte-1uxdrpr"}"><div class="value svelte-1uxdrpr">${escape(rangePercent)}</div> <input type="range" style="${"backgrount-color:&quot;" + escape(colors[color], true) + "&quot;!important"}" class="svelte-1uxdrpr"${add_attribute("value", rangePercent, 0)}> <div id="h4-container" class="svelte-1uxdrpr"><h4${add_attribute("style", h4Style, 0)} class="svelte-1uxdrpr"><span style="${"width: " + escape(ballSize, true) + "px; height: " + escape(ballSize, true) + "px; border-radius: " + escape(borderRadius, true) + "px;}"}"></span></h4></div>  </div>`;
});
const css$3 = {
  code: ".shadowBox.svelte-e6m856.svelte-e6m856{display:flex;box-shadow:0px 2px 17px 0px rgba(66, 68, 90, 0.21);width:140px;font-size:10px;border-radius:25px;margin-left:167px;padding:19px;flex-direction:column;align-content:space-around;align-items:flex-start}.shadowBox.svelte-e6m856 .text.svelte-e6m856{font-size:9px;text-align:right;margin-top:10px;margin-bottom:10px;line-height:120%;width:120px;padding-right:10px;border-top:1px solid rgba(0, 0, 0, 0.12)}.shadowBox.svelte-e6m856 li svg._45.svelte-e6m856{transform:rotate(90deg);padding-left:9px}.shadowBox.svelte-e6m856 li span.svelte-e6m856{float:left}.shadowBox.svelte-e6m856 li svg.svelte-e6m856{width:24px;padding:3px;height:14px;margin-right:6px}.line.svelte-e6m856.svelte-e6m856{width:359px;overflow:hidden;height:387px;margin-top:20px;margin-left:40px;background-color:rgba(0, 0, 0, 0);position:absolute}.draggable.svelte-e6m856.svelte-e6m856{width:3px;height:335px;position:absolute;cursor:ew-resize;left:50%;transform:translateX(-50%);z-index:99999999999}",
  map: `{"version":3,"file":"Pmstatus.svelte","sources":["Pmstatus.svelte"],"sourcesContent":["<script>\\n\\timport { location } from '$lib/stores/appStore';\\n\\timport Range08 from '$lib/components/range08.svelte';\\n\\timport { onMount } from 'svelte';\\n\\tlet activeElement = null; // Element, który jest aktualnie przeciągany\\n\\tlet color = ['rgba(14, 207, 93, 1.000)', 'rgba(121, 253, 171, 1.000)'];\\n\\n\\texport let positionPM10 = $location.params.page08.positionPM10; // Początkowa pozycja PM10\\n\\texport let positionPM25 = $location.params.page08.positionPM25; // Początkowa pozycja PM2.5\\n\\tlet startX;\\n\\tconst handleMouseDown = (event, type) => {\\n\\t\\tactiveElement = type; // Ustawiamy aktywny element na ten, który jest kliknięty\\n\\t\\tstartX = event.clientX; // Zapisujemy pozycję początkową przy kliknięciu\\n\\t\\tdocument.addEventListener('mousemove', handleMouseMove);\\n\\t\\tdocument.addEventListener('mouseup', handleMouseUp);\\n\\t};\\n\\n\\t// Funkcja obsługująca ruch myszy\\n\\tconst handleMouseMove = (event) => {\\n\\t\\tconst deltaX = event.clientX - startX; // Obliczamy przesunięcie względem pozycji początkowej\\n\\t\\tlet newPosition;\\n\\n\\t\\t// Określamy, który element jest przeciągany i dostosowujemy jego pozycję\\n\\t\\tif (activeElement === 'PM10') {\\n\\t\\t\\tnewPosition = positionPM10 + deltaX / 5; // Przesunięcie dzielimy przez 5 dla płynniejszego ruchu\\n\\t\\t\\tpositionPM10 = Math.max(1, Math.min(100, newPosition)); // Ograniczenie wartości PM10\\n\\t\\t} else if (activeElement === 'PM25') {\\n\\t\\t\\tnewPosition = positionPM25 + deltaX / 5; // Przesunięcie dzielimy przez 5 dla płynniejszego ruchu\\n\\t\\t\\tpositionPM25 = Math.max(1, Math.min(100, newPosition)); // Ograniczenie wartości PM2.5\\n\\t\\t}\\n\\n\\t\\tstartX = event.clientX; // Aktualizujemy pozycję początkową przy każdym ruchu\\n\\t};\\n\\n\\t// Funkcja obsługująca zdarzenie mouseup\\n\\tconst handleMouseUp = () => {\\n\\t\\tif (activeElement === 'PM10') {\\n\\t\\t\\n\\n\\t\\t\\t$location.params.page08.positionPM10 = positionPM10; // Początkowa pozycja PM10\\n\\t\\t} else if (activeElement === 'PM25') {\\n\\t\\t\\t$location.params.page08.positionPM25 = positionPM25;\\n\\t\\t\\t\\n\\t\\t}\\n\\n\\t\\tdocument.removeEventListener('mousemove', handleMouseMove);\\n\\t\\tdocument.removeEventListener('mouseup', handleMouseUp);\\n\\t\\tactiveElement = null; // Resetujemy aktywny element po zakończeniu przeciągania\\n\\t};\\n\\n\\t// Funkcja konwertująca wartość na przedział 1-100\\n\\tconst convertToPercentage = (value) => {\\n\\t\\treturn ((value - 1) / (100 - 1)) * 100;\\n\\t};\\n\\n\\t// Funkcja wywoływana po montażu komponentu\\n\\tonMount(() => {\\n\\t\\t// Konwersja początkowych wartości na przedział 1-100\\n\\t\\tpositionPM10 = convertToPercentage(positionPM10);\\n\\t\\tpositionPM25 = convertToPercentage(positionPM25);\\n\\t});\\n<\/script>\\n\\n<div class=\\"line\\">\\n\\t<div\\n\\t\\tclass=\\"draggable pm10\\"\\n\\t\\tstyle=\\"left: {convertToPercentage(positionPM10)}%; background-color: {color[1]}\\"\\n\\t\\ton:mousedown={(e) => handleMouseDown(e, 'PM10')}\\n\\t/>\\n\\t<div\\n\\t\\tclass=\\"draggable pm25\\"\\n\\t\\tstyle=\\"left: {convertToPercentage(positionPM25)}%; background-color: {color[0]}\\"\\n\\t\\ton:mousedown={(e) => handleMouseDown(e, 'PM25')}\\n\\t/>\\n</div>\\n\\n<div class=\\"container\\">\\n\\t{#if $location.params && $location.params.page08}\\n\\t\\t<div class=\\"cont_left\\">\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Styczeń</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x1_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x1_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Luty</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x2_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x2_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Marzec</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x3_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x3_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Kwiecień</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x4_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x4_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Maj</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x5_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x5_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Czerwiec</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x6_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x6_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Lipiec</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x7_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x7_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Sierpień</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x8_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x8_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Wrzesień</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x9_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x9_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Październik</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x10_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x10_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Listopad</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x11_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x11_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"angry-grid\\">\\n\\t\\t\\t\\t<div class=\\"item-0\\">Grudzień</div>\\n\\t\\t\\t\\t<div class=\\"item-1\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x12_10} color=\\"0\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"item-2\\">\\n\\t\\t\\t\\t\\t<Range08 bind:value={$location.params.page08.PMcurrent.x12_25} color=\\"1\\" />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t{/if}\\n\\n\\t<div class=\\"content_right\\">\\n\\t\\t<ul class=\\"shadowBox\\">\\n\\t\\t\\t<li>\\n\\t\\t\\t\\t<span>\\n\\t\\t\\t\\t\\t<svg class=\\"_45\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 15.8 1.05\\">\\n\\t\\t\\t\\t\\t\\t<defs>\\n\\t\\t\\t\\t\\t\\t\\t<style>\\n\\t\\t\\t\\t\\t\\t\\t\\t.xls-1 {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tfill: #2181b3;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width: 0px;\\n\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t</style>\\n\\t\\t\\t\\t\\t\\t</defs>\\n\\t\\t\\t\\t\\t\\t<rect class=\\"xls-1\\" width=\\"15.8\\" height=\\"4\\" />\\n\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t</span>Norma PM10\\n\\t\\t\\t\\t<span class=\\"text\\"\\n\\t\\t\\t\\t\\t>mieszanina występujących<br />w powietrzu cząstek<br />o średnicy nie mniejszej niz 10\\n\\t\\t\\t\\t\\tmikrometrów</span\\n\\t\\t\\t\\t>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li>\\n\\t\\t\\t\\t<span>\\n\\t\\t\\t\\t\\t<svg class=\\"_45\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 15.8 1.05\\">\\n\\t\\t\\t\\t\\t\\t<defs>\\n\\t\\t\\t\\t\\t\\t\\t<style>\\n\\t\\t\\t\\t\\t\\t\\t\\t.xls-2 {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tfill: #75ffb0;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width: 0px;\\n\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t</style>\\n\\t\\t\\t\\t\\t\\t</defs>\\n\\t\\t\\t\\t\\t\\t<rect class=\\"xls-2\\" width=\\"15.8\\" height=\\"4\\" />\\n\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t</span>Norma PM2.5\\n\\t\\t\\t\\t<span class=\\"text\\">aerozol atmosferyczny o średnicy niewykraczającej poza 2.5 mikrona</span>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li>\\n\\t\\t\\t\\t<span>\\n\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 16.35 7.35\\">\\n\\t\\t\\t\\t\\t\\t<defs>\\n\\t\\t\\t\\t\\t\\t\\t<style>\\n\\t\\t\\t\\t\\t\\t\\t\\t.xls-3 {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tfill: #2181b3;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width: 0px;\\n\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t</style>\\n\\t\\t\\t\\t\\t\\t</defs>\\n\\t\\t\\t\\t\\t\\t<rect class=\\"xls-3\\" x=\\"0\\" y=\\"0\\" width=\\"15.03\\" height=\\"7\\" rx=\\"4.08\\" ry=\\"4.08\\" />\\n\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t</span>PM10\\n\\t\\t\\t</li>\\n\\t\\t\\t<li>\\n\\t\\t\\t\\t<span>\\n\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 16.35 7.35\\">\\n\\t\\t\\t\\t\\t\\t<defs>\\n\\t\\t\\t\\t\\t\\t\\t<style>\\n\\t\\t\\t\\t\\t\\t\\t\\t.xls-4 {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tfill: #75ffb0;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width: 0px;\\n\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t</style>\\n\\t\\t\\t\\t\\t\\t</defs>\\n\\n\\t\\t\\t\\t\\t\\t<rect class=\\"xls-4\\" x=\\"0\\" y=\\"0\\" width=\\"15.03\\" height=\\"7\\" rx=\\"4.08\\" ry=\\"4.08\\" />\\n\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t</span><span>PM2.5</span>\\n\\t\\t\\t\\t<span class=\\"text\\"\\n\\t\\t\\t\\t\\t>Im większe stężenie tych dwóch związków<br />w powietrzu, tym jego jakość się zmniejsza,<br\\n\\t\\t\\t\\t\\t/>a współczynnik szkodliwości dla zdrowia jednostki rośnie</span\\n\\t\\t\\t\\t>\\n\\t\\t\\t</li>\\n\\t\\t</ul>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.pm10 {\\n\\t}\\n\\n\\t.pm25 {\\n\\t}\\n\\n\\t.shadowBox {\\n\\t\\tdisplay: flex;\\n\\t\\tbox-shadow: 0px 2px 17px 0px rgba(66, 68, 90, 0.21);\\n\\t\\twidth: 140px;\\n\\t\\tfont-size: 10px;\\n\\t\\tborder-radius: 25px;\\n\\t\\tmargin-left: 167px;\\n\\t\\tpadding: 19px;\\n\\t\\tflex-direction: column;\\n\\t\\talign-content: space-around;\\n\\t\\talign-items: flex-start;\\n\\t}\\n\\n\\t.shadowBox .text {\\n\\t\\tfont-size: 9px;\\n\\t\\ttext-align: right;\\n\\t\\tmargin-top: 10px;\\n\\t\\tmargin-bottom: 10px;\\n\\t\\tline-height: 120%;\\n\\t\\twidth: 120px;\\n\\t\\tpadding-right: 10px;\\n\\t\\tborder-top: 1px solid rgba(0, 0, 0, 0.12);\\n\\t}\\n\\n\\t.shadowBox li svg._45 {\\n\\t\\ttransform: rotate(90deg);\\n\\t\\tpadding-left: 9px;\\n\\t}\\n\\t.shadowBox li span {\\n\\t\\tfloat: left;\\n\\t}\\n\\t.shadowBox li svg {\\n\\t\\twidth: 24px;\\n\\t\\tpadding: 3px;\\n\\t\\theight: 14px;\\n\\t\\tmargin-right: 6px;\\n\\t}\\n\\n\\t.line {\\n\\t\\twidth: 359px;\\n\\t\\toverflow: hidden;\\n\\t\\theight: 387px;\\n\\t\\tmargin-top: 20px;\\n\\t\\tmargin-left: 40px;\\n\\t\\tbackground-color: rgba(0, 0, 0, 0);\\n\\t\\tposition: absolute;\\n\\t}\\n\\n\\t.draggable {\\n\\t\\twidth: 3px;\\n\\t\\theight: 335px;\\n\\n\\t\\tposition: absolute;\\n\\t\\tcursor: ew-resize;\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translateX(-50%);\\n\\t\\tz-index: 99999999999;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAiRC,sCAAW,CACV,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CACnD,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,KAAK,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,aAAa,CAAE,YAAY,CAC3B,WAAW,CAAE,UACd,CAEA,wBAAU,CAAC,mBAAM,CAChB,SAAS,CAAE,GAAG,CACd,UAAU,CAAE,KAAK,CACjB,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,KAAK,CACZ,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CACzC,CAEA,wBAAU,CAAC,EAAE,CAAC,GAAG,kBAAK,CACrB,SAAS,CAAE,OAAO,KAAK,CAAC,CACxB,YAAY,CAAE,GACf,CACA,wBAAU,CAAC,EAAE,CAAC,kBAAK,CAClB,KAAK,CAAE,IACR,CACA,wBAAU,CAAC,EAAE,CAAC,iBAAI,CACjB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,GACf,CAEA,iCAAM,CACL,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,IAAI,CACjB,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAClC,QAAQ,CAAE,QACX,CAEA,sCAAW,CACV,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,KAAK,CAEb,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,SAAS,CACjB,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,WACV"}`
};
const Pmstatus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  let color = ["rgba(14, 207, 93, 1.000)", "rgba(121, 253, 171, 1.000)"];
  let { positionPM10 = $location.params.page08.positionPM10 } = $$props;
  let { positionPM25 = $location.params.page08.positionPM25 } = $$props;
  const convertToPercentage = (value) => {
    return (value - 1) / (100 - 1) * 100;
  };
  if ($$props.positionPM10 === void 0 && $$bindings.positionPM10 && positionPM10 !== void 0) $$bindings.positionPM10(positionPM10);
  if ($$props.positionPM25 === void 0 && $$bindings.positionPM25 && positionPM25 !== void 0) $$bindings.positionPM25(positionPM25);
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="line svelte-e6m856"><div class="draggable pm10 svelte-e6m856" style="${"left: " + escape(convertToPercentage(positionPM10), true) + "%; background-color: " + escape(color[1], true)}"></div> <div class="draggable pm25 svelte-e6m856" style="${"left: " + escape(convertToPercentage(positionPM25), true) + "%; background-color: " + escape(color[0], true)}"></div></div> <div class="container">${$location.params && $location.params.page08 ? `<div class="cont_left"><div class="angry-grid"><div class="item-0" data-svelte-h="svelte-1wo46xp">Styczeń</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x1_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x1_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x1_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x1_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-3zo95x">Luty</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x2_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x2_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x2_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x2_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-1ljj5j">Marzec</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x3_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x3_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x3_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x3_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-1w8r9c">Kwiecień</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x4_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x4_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x4_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x4_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-13e45kf">Maj</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x5_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x5_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x5_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x5_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-wi6f5b">Czerwiec</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x6_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x6_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x6_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x6_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-1tg2l8h">Lipiec</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x7_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x7_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x7_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x7_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-1qnn2w">Sierpień</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x8_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x8_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x8_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x8_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-190ttvo">Wrzesień</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x9_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x9_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x9_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x9_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-fzgnfq">Październik</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x10_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x10_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x10_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x10_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-1cgl81v">Listopad</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x11_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x11_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x11_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x11_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="angry-grid"><div class="item-0" data-svelte-h="svelte-5n6v2x">Grudzień</div> <div class="item-1">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "0",
        value: $location.params.page08.PMcurrent.x12_10
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x12_10 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="item-2">${validate_component(Range08, "Range08").$$render(
      $$result,
      {
        color: "1",
        value: $location.params.page08.PMcurrent.x12_25
      },
      {
        value: ($$value) => {
          $location.params.page08.PMcurrent.x12_25 = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div></div>` : ``} <div class="content_right" data-svelte-h="svelte-1m7zjl7"><ul class="shadowBox svelte-e6m856"><li><span class="svelte-e6m856"><svg class="_45 svelte-e6m856" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 1.05"><defs><style>.xls-1 {
									fill: #2181b3;
									stroke-width: 0px;
								}</style></defs><rect class="xls-1" width="15.8" height="4"></rect></svg> </span>Norma PM10
				<span class="text svelte-e6m856">mieszanina występujących<br>w powietrzu cząstek<br>o średnicy nie mniejszej niz 10
					mikrometrów</span></li> <li><span class="svelte-e6m856"><svg class="_45 svelte-e6m856" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 1.05"><defs><style>.xls-2 {
									fill: #75ffb0;
									stroke-width: 0px;
								}</style></defs><rect class="xls-2" width="15.8" height="4"></rect></svg> </span>Norma PM2.5
				<span class="text svelte-e6m856">aerozol atmosferyczny o średnicy niewykraczającej poza 2.5 mikrona</span></li> <li><span class="svelte-e6m856"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.35 7.35" class="svelte-e6m856"><defs><style>.xls-3 {
									fill: #2181b3;
									stroke-width: 0px;
								}</style></defs><rect class="xls-3" x="0" y="0" width="15.03" height="7" rx="4.08" ry="4.08"></rect></svg> </span>PM10</li> <li><span class="svelte-e6m856"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.35 7.35" class="svelte-e6m856"><defs><style>.xls-4 {
									fill: #75ffb0;
									stroke-width: 0px;
								}</style></defs><rect class="xls-4" x="0" y="0" width="15.03" height="7" rx="4.08" ry="4.08"></rect></svg> </span><span class="svelte-e6m856">PM2.5</span> <span class="text svelte-e6m856">Im większe stężenie tych dwóch związków<br>w powietrzu, tym jego jakość się zmniejsza,<br>a współczynnik szkodliwości dla zdrowia jednostki rośnie</span></li></ul></div> </div>`;
  } while (!$$settled);
  $$unsubscribe_location();
  return $$rendered;
});
const css$2 = {
  code: ".rangeSlider_.svelte-o4qec9{width:348px;padding-left:59px}.image.svelte-o4qec9{width:100px;align-items:left}.ocena.svelte-o4qec9{margin-top:-120px} .pageNumber.svelte-o4qec9{background:none;margin-top:881px}.disabled_number.svelte-o4qec9{background-color:white}",
  map: `{"version":3,"file":"page08.svelte","sources":["page08.svelte"],"sourcesContent":["<script>\\n\\timport { onMount } from 'svelte';\\n\\timport Header from '$lib/components/header.svelte';\\n\\timport Loading from '$lib/components/loading.svelte';\\n\\timport RangeSlider from 'svelte-range-slider-pips';\\n\\timport PMstatus from '$lib/components/Pmstatus.svelte';\\n\\timport { location } from '$lib/stores/appStore';\\n\\n\\t// let ready = \\"false\\";\\n\\n\\t// onMount(async () => {\\n\\t// \\tif ($location && $location.params && $location.params.page08) {\\n\\t// \\t\\tready = \\"true\\";\\n\\t// \\t\\tconsole.log($location.params.page08);\\n\\t// \\t}\\n\\t// });\\n<\/script>\\n\\n<div class=\\"content-block section page_08\\">\\n\\t<Header />\\n\\t{#if !$location.params}\\n\\t\\t<div class=\\"center\\"><Loading /></div>\\n\\t{:else}\\n\\t\\n\\t\\n\\t<div class=\\"page_content\\">\\n\\t\\t<div class=\\"containerFlex noselect\\">\\n\\t\\t\\t<div class=\\"grid_content noselect mb-20\\">\\n\\t\\t\\t\\t<div class=\\"full-width\\">\\n\\t\\t\\t\\t\\t<h2 class=\\"title_medium noselect\\">\\n\\t\\t\\t\\t\\t\\t<span class=\\"number_type noselect\\">17</span> Ocena zanieczyszczenia powietrza\\n\\t\\t\\t\\t\\t</h2>\\n\\t\\t\\t\\t\\t<p class=\\"tabText\\">\\n\\t\\t\\t\\t\\t\\tStopień czystości powietrza to parametr istotny dla zdrowia. mający również wpływ na\\n\\t\\t\\t\\t\\t\\tatrakcyjność okolicy,<br />w której znajduje się nieruchomość. Stąd, o ile\\n\\t\\t\\t\\t\\t\\twystępowaniu tzw. smogu towarzysza określone warunki atmosferyczne, take jak mgła lub\\n\\t\\t\\t\\t\\t\\tbrak wiatru, sama koncentracja zanieczyszczeń w danym obszarze stanowi punkt wyjściowy\\n\\t\\t\\t\\t\\t\\tprzy określaniu poziomu klarowności dostępnego w tym regionie powietrza.<br /><br\\n\\t\\t\\t\\t\\t\\t/>Załączone poniżej informacje ukazują skale jakości powietrza w omawianej lokalizacji\\n\\t\\t\\t\\t\\t\\twskaźnik ten jest systematycznie badany i uaktualniany oraz dotyczy aglomeracji, gdzie\\n\\t\\t\\t\\t\\t\\tzanieczyszczenie powietrza jest uznawane za problem. mowa tu m.in. o Krakowie.\\n\\t\\t\\t\\t\\t\\tWarszawie lub Katowicach\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t<h3>\\n\\t\\t\\t\\t\\t\\tŚredni miesięczny poziom stężenia pyłów dla najbliższego punktu pomiarowego [µg/m³]:\\n\\t\\t\\t\\t\\t</h3>\\n\\n\\t\\t\\t\\t\\t<PMstatus\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<div class=\\"grid_content noselect mb-20 ocena\\">\\n\\t\\t\\t\\t<div class=\\"full-width\\">\\n\\t\\t\\t\\t\\t<h2 class=\\"title_medium noselect\\">\\n\\t\\t\\t\\t\\t\\t<span class=\\"number_type noselect disabled_number\\" />Ocena jakosci powietrza\\n\\t\\t\\t\\t\\t</h2>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t{#if $location.params}\\n\\t\\t\\t\\t<div class=\\"flex\\">\\n\\t\\t\\t\\t\\t<div class=\\"image\\">\\n\\t\\t\\t\\t\\t\\t<img src=\\"/images/solniczka.svg\\" style=\\"width:110px;\\" />\\n\\t\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t\\t<div class=\\"text\\">\\n\\t\\t\\t\\t\\t\\t<br />\\n\\t\\t\\t\\t\\t\\t<hr />\\n\\t\\t\\t\\t\\t\\t<p>Wskaźnik oznaczający poziom zanieczyszczenia powietrza</p>\\n\\t\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t\\t<div class=\\"rangeSlider_\\">\\n\\t\\t\\t\\t\\t\\t<RangeSlider\\n\\t\\t\\t\\t\\t\\t\\ton:stop={(e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t$location.params.page08.poziomBEZPIECZENSTWA = e.detail.value;\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\trange=\\"min\\"\\n\\t\\t\\t\\t\\t\\t\\tvalues={[$location.params.page08.poziomBEZPIECZENSTWA]}\\n\\t\\t\\t\\t\\t\\t\\tmax=\\"5\\"\\n\\t\\t\\t\\t\\t\\t\\tpips\\n\\t\\t\\t\\t\\t\\t\\tall=\\"label\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\n\\t\\t\\t\\t\\t\\t<div />\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\n\\t\\t<div class=\\"pageNumber right\\">8</div>\\n\\t</div>\\n\\n\\n\\n\\t{/if}\\n\\n\\n\\n\\n</div>\\n\\n<style>\\n\\t.rangeSlider_ {\\n\\t\\twidth: 348px;\\n\\t\\tpadding-left: 59px;\\n\\t}\\n\\n\\t.image {\\n\\t\\twidth: 100px;\\n\\t\\talign-items: left;\\n\\t}\\n\\n\\t.ocena {\\n\\t\\tmargin-top: -120px;\\n\\t}\\n\\t:global() .pageNumber {\\n\\t\\tbackground: none;\\n\\t\\tmargin-top: 881px;\\n\\t}\\n\\t.disabled_number {\\n\\t\\tbackground-color: white;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwGC,2BAAc,CACb,KAAK,CAAE,KAAK,CACZ,YAAY,CAAE,IACf,CAEA,oBAAO,CACN,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,IACd,CAEA,oBAAO,CACN,UAAU,CAAE,MACb,CACS,CAAC,yBAAY,CACrB,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,KACb,CACA,8BAAiB,CAChB,gBAAgB,CAAE,KACnB"}`
};
const Page08 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$result.css.add(css$2);
  $$unsubscribe_location();
  return `<div class="content-block section page_08">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${!$location.params ? `<div class="center">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>` : `<div class="page_content"><div class="containerFlex noselect"><div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect" data-svelte-h="svelte-8kyfi5"><span class="number_type noselect">17</span> Ocena zanieczyszczenia powietrza</h2> <p class="tabText" data-svelte-h="svelte-1lcoov6">Stopień czystości powietrza to parametr istotny dla zdrowia. mający również wpływ na
						atrakcyjność okolicy,<br>w której znajduje się nieruchomość. Stąd, o ile
						występowaniu tzw. smogu towarzysza określone warunki atmosferyczne, take jak mgła lub
						brak wiatru, sama koncentracja zanieczyszczeń w danym obszarze stanowi punkt wyjściowy
						przy określaniu poziomu klarowności dostępnego w tym regionie powietrza.<br><br>Załączone poniżej informacje ukazują skale jakości powietrza w omawianej lokalizacji
						wskaźnik ten jest systematycznie badany i uaktualniany oraz dotyczy aglomeracji, gdzie
						zanieczyszczenie powietrza jest uznawane za problem. mowa tu m.in. o Krakowie.
						Warszawie lub Katowicach</p> <h3 data-svelte-h="svelte-vc6gpn">Średni miesięczny poziom stężenia pyłów dla najbliższego punktu pomiarowego [µg/m³]:</h3> ${validate_component(Pmstatus, "PMstatus").$$render($$result, {}, {}, {})}</div></div> <div class="grid_content noselect mb-20 ocena svelte-o4qec9" data-svelte-h="svelte-7s9c50"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect disabled_number svelte-o4qec9"></span>Ocena jakosci powietrza</h2></div></div> ${$location.params ? `<div class="flex"><div class="image svelte-o4qec9" data-svelte-h="svelte-1c0as33"><img src="/images/solniczka.svg" style="width:110px;"></div> <div class="text" data-svelte-h="svelte-4e3as8"><br> <hr> <p>Wskaźnik oznaczający poziom zanieczyszczenia powietrza</p></div> <div class="rangeSlider_ svelte-o4qec9">${validate_component(RangeSlider, "RangeSlider").$$render(
    $$result,
    {
      range: "min",
      values: [$location.params.page08.poziomBEZPIECZENSTWA],
      max: "5",
      pips: true,
      all: "label"
    },
    {},
    {}
  )} <div></div></div></div>` : ``}</div> <div class="pageNumber right svelte-o4qec9" data-svelte-h="svelte-lav97t">8</div></div>`} </div>`;
});
const Page09 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="content-block section page_09">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <div class="page_content" data-svelte-h="svelte-jzyxg0"><div class="containerFlex noselect"><div class="grid_content noselect mb-20"><div class="full-width"><h1 contenteditable>Objaśnienie poszczególnych ujęć odnoszących się do raportu</h1> <h2 class="title_medium noselect"><span class="number_type noselect">2</span> Charakterystyka lokum</h2> <p class="tabText" contenteditable>Dane zamieszczone w tej sekcji stanowią informacje pozyskane od użytkownika i wskazuje,
						jakie czynniki posłużyły do wyceny. Mowa tu więc o tych parametrach, które uwzględnia
						osoba na stronie internetowej przy wypełnianiu formularza służącego do oszacowania
						wartości nieruchomosci. Marka Home Rate nie może, w związku z powyższym. odpowiadać za
						ewentualne nieścisłości, jeśli tokowe znalazły się w wygenerowanej specyfice mieszkania</p></div></div> <div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">3</span> Wycena posiadłości</h2> <p class="tabText" contenteditable>Sekcja ta stanowi informacje o przewidywanej wartości standardowej nieruchomości względem dostarczonych danych. Wyceny dokonuje się na podstawie niezliczonej liczby zrealizowanych w wybranym mieście transakcji oraz w oparciu<br>o adekwatne bazy danych (no. RciWN, prowadzonej przez starostwa). Należy mieć jednak na względzie, ze kluczowym aspektem mającym wpływ na cenę nieruchomosci jest zawsze lokalizacja.</p></div></div> <div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">8</span>Wykaz transakcii referencynych</h2> <p class="tabText" contenteditable>W treści raportu uwzględniono 10 przykładów przeprowadzonych transakcji sprzedaży nieruchomosci w danej okolicy. Mają one charakter poglądowy, a samą wycenę przeprowadza się, biorąc pod uwagę dane z transakcji sprzedaży dostępnych w publicznych źródłach, w tym z aktów notarialnych i wycen rzeczoznawców oraz w oparciu<br>
						o charakterystykę mieszkania.</p></div></div> <div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">9</span> Prezentacja cen sprzedazy nieruchomości oraz
						ich powierzchnie</h2> <p class="tabText" contenteditable>Bilanse te zawierają  ceny sprzedawanych w danej lokalizacji lokali oraz ich powierzchnię. Wykres ten obrazuje, jakiego typu posiadłości są sprzedawane najcześciej (np. kawalerki) oraz jaka była cena transakcji. Wskazano również grupę do której przynależy wyceniana nieruchomość. Wszelkie dane z tej sekcji opierają się na statystykach sprzedaży mieszkań<br>w skali całego miasta.</p></div></div> <div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">11</span>Wskazniki czasu dojazdu</h2> <p class="tabText" contenteditable>Mając na względzie wycenę nieruchomości, należy wziąć pod uwagę, w jaki sposób lokal jest skomunikowany z innymi kluczowymi punktami, takimi jak szkoła, urzędy, sklepy, czy przychodnie. Analiza wlicza również do oceny dane dotyczące sąsiadujących dzielnic/ulic, nieprzypisane bezpośrednio do wybranej lokalizacji. Parametr ten pozwala także ustalić ewentualną opłacalność najmu krótko- i długoterminowego.</p></div></div> <div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">12</span>Ocena atrakcyjności otoczenia</h2> <p class="tabText" contenteditable>Sekcja ta oznacza typowe odległości do najbliższego punktu danego rodzaju, np. przystanku autobusowego, szkoły, szpitala. Analiza ta bazuje na informacjach zaczerpniętych z Open Street Map i wszelkich danych odnoszących się do miejsc użyteczności publicznej. Wskazywanie znaczenia ma tu charakter opiniodawczy i jest rezultatem subiektywnej kalkulacji względem tego, co do danej lokalizacji stanowi punkt krytyczny dla korzystającej z tych zasobów społeczności.</p></div></div> <div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect"><span class="number_type noselect">13</span>Poziom bezpieczeństwa okolicy</h2> <p class="tabText" contenteditable>Wszelkie analizy dotyczące tej sekcji bazują na zestawieniach odznaczających liczbę popełnionych w tym obszarze przestępstw, a które to dane można pozyskać ze źródeł publicznych. Bilans może również zawierać informacje<br>o wykroczeniach nieprzypisanych bezpośrednio do specyficznego miejsca, a samej ulicy. W danym ujęciu za punkt odniesienia przyjmuje się centralnie usytuowaną część. Nadawanie określonym aspektom znaczenia ma charakter opiniodawczy i bazuje na subiektywnych szacunkach odnośnie do tego, którym z kategorii zdarzeń należy przypisać bardziej istotny, krytyczny wymiar.</p></div></div> <div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect no bold" contenteditable><span class="number_type noselect">*</span></h2> <p class="tabText" contenteditable>Przedstawiona aianliza określa szacunkową, rynkową wartość posiadłości i została zrealizowana w oparciu o bazę rzeczywistych transakcji przeprowadzonych na lokalnym rynku oraz informacje pochodzące z aktów notarialnych, wycen rzeczoznawców, skonsolidowanych danych o faktycznych cenach sprzedaży mieszkań na rynku nieruchomości. Przygotowane przez Home Rate narzędzie do szacowania wartości lokalu pozwala na dostarczenie komplementarnego dokumentu zawierającego bilans informacji o walorach, korzyściach i wyróżnikach posiadanej nieruchomosci z zakresu poziomu bezpieczeństwa, rentowności najmu użyteczności publicznej czy wiedzy, jak wypada omawiana posiadłość<br>w porównaniu z innymi w wybranym regionie, w odniesieniu do już przeprowadzonych transakcji sprzedaży.</p></div></div> <div class="grid_content noselect mb-20"><div class="full-width"><h2 class="title_medium noselect no bold"><span class="number_type noselect">*</span></h2> <p class="tabText" contenteditable>Zaprezentowany raport nie stanowi aparatu szacunkowego ani opinii o wartości posiadłości w myśl. Ustawy<br>o gospodarce nieruchomościami. Analiza ta dostarcza możliwie, jak najbardziej zbliżona do faktycznego stanu rzeczy, informacje o wartości mieszkania w formie rekomendacji, biorąc pod uwagę założenie, ze transakcja zostanie przeprowadzona przy typowych warunkach rynkowych wobec standardowej nieruchomości. Kalkulacja ta nie ma jednak charakteru wyceny rzeczoznawcy majątkowego oraz nie uwzględnia dodatkowych kosztów powiązanych z zakupem<br>i obowiazujących podatków.</p></div></div></div></div> </div>`;
});
const css$1 = {
  code: ".page_10.svelte-1r4u99m .header.svelte-1r4u99m{opacity:0}.page_10.svelte-1r4u99m .header p.svelte-1r4u99m{opacity:0 !important}.logotype.svelte-1r4u99m.svelte-1r4u99m{margin-left:189px;width:300px}.page_10.svelte-1r4u99m .pageNumber.svelte-1r4u99m{background-color:rgba(0, 58, 123, 1.000);font-size:14px;color:white;text-shadow:0 0 black;margin-top:746px;margin-left:-402px;width:800px;text-align:center;height:223px;padding-left:42px;padding-top:56px}",
  map: `{"version":3,"file":"page10.svelte","sources":["page10.svelte"],"sourcesContent":["<script>\\n\\timport Header from '$lib/components/header.svelte';\\n    \\n<\/script>\\n\\n<div class=\\"content-block section page_10\\">\\n\\t\\n    <div class=\\"header\\">\\n    <Header />\\n</div>\\n\\t<div class=\\"page_content\\">\\n\\t\\t\\n        <div class=\\"logotype\\">\\n\\n            <img width=\\"400\\" src=\\"/images/logoPropValue.png\\"/>\\n\\n\\n        </div>\\n\\t\\t<div class=\\"pageNumber right\\">\\n\\t\\t\\t<p contenteditable>\\n\\t\\t\\t\\tNazwa (Imię Nazwisko)<br> ul. Nazwa ulicy 1 <br>00-000 Miasto <br>(+48) 999 888 777<br>\\n\\t\\t\\t\\tbiuro@nazwa-strony.pl<br> nazwo-strony.pl\\n\\t\\t\\t</p>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style type=\\"postcss\\">\\n\\n.page_10 .header{\\nopacity:0;\\n}\\n.page_10 .header p{\\n    opacity: 0 !important;\\n}\\n\\n\\n.page_content{}\\n\\n.logotype{\\n    margin-left: 189px;\\n    width: 300px;\\n\\n}\\n.page_10 .pageNumber{\\n    background-color: rgba(0, 58, 123, 1.000);\\n    font-size: 14px;\\n    color: white;\\n    text-shadow: 0 0 black;\\n    margin-top: 746px;\\n    margin-left: -402px;\\n    width: 800px;\\n    text-align: center;\\n    height: 223px;\\n    padding-left: 42px;\\n    padding-top: 56px;\\n\\n\\n}\\n\\n\\n</style>\\n"],"names":[],"mappings":"AA6BA,uBAAQ,CAAC,sBAAO,CAChB,QAAQ,CACR,CACA,uBAAQ,CAAC,OAAO,CAAC,gBAAC,CACd,OAAO,CAAE,CAAC,CAAC,UACf,CAKA,uCAAS,CACL,WAAW,CAAE,KAAK,CAClB,KAAK,CAAE,KAEX,CACA,uBAAQ,CAAC,0BAAW,CAChB,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,KAAK,CAAC,CACzC,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CACtB,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,KAAK,CACb,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,IAGjB"}`
};
const Page10 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="content-block section page_10 svelte-1r4u99m"><div class="header svelte-1r4u99m">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}</div> <div class="page_content svelte-1r4u99m" data-svelte-h="svelte-1swyt96"><div class="logotype svelte-1r4u99m"><img width="400" src="/images/logoPropValue.png"></div> <div class="pageNumber right svelte-1r4u99m"><p contenteditable class="svelte-1r4u99m">Nazwa (Imię Nazwisko)<br> ul. Nazwa ulicy 1 <br>00-000 Miasto <br>(+48) 999 888 777<br>
				biuro@nazwa-strony.pl<br> nazwo-strony.pl</p></div></div> </div>`;
});
const css = {
  code: ".icon.svelte-v8h10h svg.svelte-v8h10h{width:30px;height:30px;margin-right:15px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport { onMount, onDestroy } from 'svelte';\\n\\timport { fade, slide, fly } from 'svelte/transition';\\n\\timport { loading, error, menuVisible, location } from '$lib/stores/appStore';\\n\\timport { redirect } from '$lib/functions';\\n\\timport { DarkMode, Modal } from 'flowbite-svelte';\\n\\timport { saveData } from '$lib/database';\\n\\n\\timport { page } from '$app/stores';\\n\\timport { goto } from '$app/navigation';\\n\\n\\tlet btnClass =\\n\\t\\t'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';\\n\\tlet saveDataModal,\\n\\t\\tgoToDataList,\\n\\t\\tcreateNew = false;\\n\\n\\timport { Drawer, Button, CloseButton, A } from 'flowbite-svelte';\\n\\timport { sineIn } from 'svelte/easing';\\n\\n\\t$menuVisible = true;\\n\\n\\tlet transitionParamsTop = {\\n\\t\\ty: -320,\\n\\t\\tduration: 200,\\n\\t\\teasing: sineIn\\n\\t};\\n\\n\\tlet pageRefs = {};\\n\\tlet observer = null; // Declare observer globally\\n\\tconst handleIntersect = (entries) => {\\n\\t\\tentries.forEach((entry) => {\\n\\t\\t\\t// if (entry.isIntersecting) {\\n\\t\\t\\t// \\t// Page is in view\\n\\t\\t\\t// \\tconsole.log(entry);\\n\\t\\t\\t// \\tentry.target.style.visibility = 'visible';\\n\\t\\t\\t// } else {\\n\\t\\t\\t// \\t// Page is out of view\\n\\t\\t\\t// \\tconsole.log(entry);\\n\\t\\t\\t// \\tentry.target.style.visibility = 'hidden';\\n\\t\\t\\t// } //NOTE VISIBILITY ON / OFF\\n\\t\\t});\\n\\t};\\n\\t// PAGES\\n\\n\\timport PAGE0F from '$lib/PAGES/pageFront.svelte';\\n\\timport PAGE00 from '$lib/PAGES/page00.svelte';\\n\\timport PAGE01 from '$lib/PAGES/page01.svelte';\\n\\timport PAGE02 from '$lib/PAGES/page02.svelte';\\n\\timport PAGE03 from '$lib/PAGES/page03.svelte';\\n\\timport PAGE04 from '$lib/PAGES/page04.svelte';\\n\\timport PAGE05 from '$lib/PAGES/page05.svelte';\\n\\timport PAGE06 from '$lib/PAGES/page06.svelte';\\n\\timport PAGE07 from '$lib/PAGES/page07.svelte';\\n\\timport PAGE08 from '$lib/PAGES/page08.svelte';\\n\\timport PAGE09 from '$lib/PAGES/page09.svelte';\\n\\timport PAGE10 from '$lib/PAGES/page10.svelte';\\n\\t// import PAGE09 from '$lib/PAGES/page09.svelte';\\n\\n\\tonMount(() => {\\n\\t\\t// zalogowany ?\\n\\t\\tif (!$page.data?.session) {\\n\\t\\t\\tgoto('/');\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\n\\t\\tobserver = new IntersectionObserver(handleIntersect, { threshold: 0.5 });\\n\\n\\t\\t// Observe each page element if it exists\\n\\t\\tObject.values(pageRefs).forEach((pageRef) => {\\n\\t\\t\\tif (pageRef instanceof Element) {\\n\\t\\t\\t\\tobserver.observe(pageRef);\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tconsole.warn('Invalid element:', pageRef);\\n\\t\\t\\t}\\n\\t\\t});\\n\\t});\\n\\tonDestroy(() => {\\n\\t\\tif (observer) {\\n\\t\\t\\tobserver.disconnect();\\n\\t\\t}\\n\\t});\\n<\/script>\\n\\n<svelte:head>\\n\\t<link rel=\\"stylesheet\\" href=\\"/css/printStyle.scss\\" />\\n</svelte:head>\\n\\n<div class:loading={$loading}>\\n\\t<div bind:this={pageRefs.PAGE0F} class=\\".show-on-print\\">\\n\\t\\t<PAGE0F />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE00} class=\\".show-on-print\\">\\n\\t\\t<PAGE00 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE01} class=\\".show-on-print\\">\\n\\t\\t<PAGE01 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE02} class=\\".show-on-print\\">\\n\\t\\t<PAGE02 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE03} class=\\".show-on-print\\">\\n\\t\\t<PAGE03 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE04} class=\\".show-on-print\\">\\n\\t\\t<PAGE04 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE05} class=\\".show-on-print\\">\\n\\t\\t<PAGE05 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE06} class=\\".show-on-print\\">\\n\\t\\t<PAGE06 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE07} class=\\".show-on-print\\">\\n\\t\\t<PAGE07 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE08} class=\\".show-on-print\\">\\n\\t\\t<PAGE08 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE09} class=\\".show-on-print\\">\\n\\t\\t<PAGE09 />\\n\\t</div>\\n\\t<div bind:this={pageRefs.PAGE10} class=\\".show-on-print\\">\\n\\t\\t<PAGE10 />\\n\\t</div>\\n\\n\\t<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />\\n\\t<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />\\n\\t<br /> <br /> <br />\\n\\t<!-- <div bind:this={pageRefs.PAGE07} class=\\".show-on-print\\">\\n\\t\\t<PAGE07 />\\n\\t  </div> -->\\n\\t<!-- <PAGE08 /> -->\\n</div>\\n<div class=\\"A4Marker\\" transition:slide />\\n\\n<Drawer\\n\\tplacement=\\"top\\"\\n\\twidth=\\"w-full\\"\\n\\ttransitionType=\\"fly\\"\\n\\ttransitionParams={transitionParamsTop}\\n\\tbind:hidden={$menuVisible}\\n\\tid=\\"sidebar\\"\\n>\\n\\t<div class=\\"flex items-center\\">\\n\\t\\t<Button on:click={() => (goToDataList = true)}>\\n\\t\\t\\t<span class=\\"icon\\">\\n\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\twidth=\\"800px\\"\\n\\t\\t\\t\\t\\theight=\\"800px\\"\\n\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t><script xmlns=\\"\\"><\/script>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\td=\\"M13.2686 14.2686L15 16M12.0627 6.06274L11.9373 5.93726C11.5914 5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 12.0627 6.06274ZM14 12.5C14 13.8807 12.8807 15 11.5 15C10.1193 15 9 13.8807 9 12.5C9 11.1193 10.1193 10 11.5 10C12.8807 10 14 11.1193 14 12.5Z\\"\\n\\t\\t\\t\\t\\t\\tstroke=\\"#fbfbfb\\"\\n\\t\\t\\t\\t\\t\\tstroke-width=\\"2\\"\\n\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t<script xmlns=\\"\\"><\/script></svg\\n\\t\\t\\t\\t>\\n\\t\\t\\t</span>\\n\\t\\t\\tLista\\n\\t\\t</Button>\\n\\t\\t<!-- <Button href=\\"/protected/data\\" class=\\"px-4\\">Wczytaj dane lokalizacji<ArrowRightOutline class=\\"w-3.5 h-3.5 ml-2\\" /></Button> -->\\n\\n\\t\\t<Button on:click={() => (saveDataModal = true)}>\\n\\t\\t\\t<span class=\\"icon\\">\\n\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\twidth=\\"800px\\"\\n\\t\\t\\t\\t\\theight=\\"800px\\"\\n\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\td=\\"M9 11L11 13L15 9M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z\\"\\n\\t\\t\\t\\t\\t\\tstroke=\\"#fbfbfb\\"\\n\\t\\t\\t\\t\\t\\tstroke-width=\\"2\\"\\n\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</svg>\\n\\t\\t\\t</span>\\n\\n\\t\\t\\tZapisz\\n\\t\\t</Button>\\n\\t\\t<Button on:click={() => (createNew = true)}\\n\\t\\t\\t><span class=\\"icon\\">\\n\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\twidth=\\"800px\\"\\n\\t\\t\\t\\t\\theight=\\"800px\\"\\n\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\td=\\"M12 13V7M15 10.0008L9 10M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z\\"\\n\\t\\t\\t\\t\\t\\tstroke=\\"#fbfbfb\\"\\n\\t\\t\\t\\t\\t\\tstroke-width=\\"2\\"\\n\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</svg>\\n\\t\\t\\t</span> Nowy</Button\\n\\t\\t>\\n\\n\\t\\t<Button on:click={() => print()}>\\n\\t\\t\\t<span class=\\"icon\\">\\n\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\twidth=\\"800px\\"\\n\\t\\t\\t\\t\\theight=\\"800px\\"\\n\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\td=\\"M7 18H6.2C5.0799 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V10.2C3 9.0799 3 8.51984 3.21799 8.09202C3.40973 7.71569 3.71569 7.40973 4.09202 7.21799C4.51984 7 5.0799 7 6.2 7H7M17 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V10.2C21 9.07989 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H17M7 11H7.01M17 7V5.4V4.6C17 4.03995 17 3.75992 16.891 3.54601C16.7951 3.35785 16.6422 3.20487 16.454 3.10899C16.2401 3 15.9601 3 15.4 3H8.6C8.03995 3 7.75992 3 7.54601 3.10899C7.35785 3.20487 7.20487 3.35785 7.10899 3.54601C7 3.75992 7 4.03995 7 4.6V5.4V7M17 7H7M8.6 21H15.4C15.9601 21 16.2401 21 16.454 20.891C16.6422 20.7951 16.7951 20.6422 16.891 20.454C17 20.2401 17 19.9601 17 19.4V16.6C17 16.0399 17 15.7599 16.891 15.546C16.7951 15.3578 16.6422 15.2049 16.454 15.109C16.2401 15 15.9601 15 15.4 15H8.6C8.03995 15 7.75992 15 7.54601 15.109C7.35785 15.2049 7.20487 15.3578 7.10899 15.546C7 15.7599 7 16.0399 7 16.6V19.4C7 19.9601 7 20.2401 7.10899 20.454C7.20487 20.6422 7.35785 20.7951 7.54601 20.891C7.75992 21 8.03995 21 8.6 21Z\\"\\n\\t\\t\\t\\t\\t\\tstroke=\\"#fbfbfb\\"\\n\\t\\t\\t\\t\\t\\tstroke-width=\\"2\\"\\n\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</svg>\\n\\t\\t\\t</span>\\n\\n\\t\\t\\tDrukuj</Button\\n\\t\\t>\\n\\t\\t<!-- <DarkMode {btnClass} /> -->\\n\\n\\t\\t<CloseButton on:click={() => ($menuVisible = true)} class=\\"mb-4 dark:text-white\\" />\\n\\t</div>\\n</Drawer>\\n{#if saveDataModal}\\n\\t<div transition:fade={{ delay: 100, duration: 150 }}>\\n\\t\\t<Modal title=\\"Czy na pewno zapisać lokaloizację?\\" bind:open={saveDataModal} autoclose>\\n\\t\\t\\t<p class=\\"text-base leading-relaxed text-gray-500 dark:text-gray-400\\">{$location.adres}</p>\\n\\t\\t\\t<svelte:fragment slot=\\"footer\\">\\n\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\tsaveData();\\n\\t\\t\\t\\t\\t}}>Zapisz dokument</Button\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t<Button color=\\"alternative\\">Anuluj</Button>\\n\\t\\t\\t</svelte:fragment>\\n\\t\\t</Modal>\\n\\t</div>\\n{/if}\\n{#if goToDataList}\\n\\t<div transition:fade={{ delay: 100, duration: 150 }}>\\n\\t\\t<Modal\\n\\t\\t\\ttitle=\\"Czy na pewno chcesz wyjść bez zapisania danych?\\"\\n\\t\\t\\tbind:open={goToDataList}\\n\\t\\t\\tautoclose\\n\\t\\t>\\n\\t\\t\\t<p class=\\"text-base leading-relaxed text-gray-500 dark:text-gray-400\\">{$location.adres}</p>\\n\\t\\t\\t<svelte:fragment slot=\\"footer\\">\\n\\t\\t\\t\\t<Button on:click={() => redirect('/protected/data')}>Wyjdź</Button>\\n\\t\\t\\t\\t<Button on:click={() => (saveDataModal = true)}>Zapisz</Button>\\n\\t\\t\\t\\t<Button color=\\"alternative\\">Anuluj</Button>\\n\\t\\t\\t</svelte:fragment>\\n\\t\\t</Modal>\\n\\t</div>\\n{/if}\\n{#if createNew}\\n\\t<div transition:fade={{ delay: 100, duration: 150 }}>\\n\\t\\t<Modal\\n\\t\\t\\ttitle=\\"Czy na pewno chcesz wyjść bez zapisania aktualnych danych?\\"\\n\\t\\t\\tbind:open={goToDataList}\\n\\t\\t\\tautoclose\\n\\t\\t>\\n\\t\\t\\t<p class=\\"text-base leading-relaxed text-gray-500 dark:text-gray-400\\">{$location.adres}</p>\\n\\t\\t\\t<svelte:fragment slot=\\"footer\\">\\n\\t\\t\\t\\t<Button on:click={() => redirect('/protected?create=true')}>Wyjdź</Button>\\n\\t\\t\\t\\t<Button on:click={() => (saveDataModal = true)}>Nowy</Button>\\n\\t\\t\\t\\t<Button color=\\"alternative\\">Anuluj</Button>\\n\\t\\t\\t</svelte:fragment>\\n\\t\\t</Modal>\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t.icon svg {\\n\\t\\twidth: 30px;\\n\\t\\theight: 30px;\\n\\t\\tmargin-right: 15px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4RC,mBAAK,CAAC,iBAAI,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,IACf"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $menuVisible, $$unsubscribe_menuVisible;
  let $loading, $$unsubscribe_loading;
  let $$unsubscribe_location;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_menuVisible = subscribe(menuVisible, (value) => $menuVisible = value);
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  $$unsubscribe_location = subscribe(location, (value) => value);
  set_store_value(menuVisible, $menuVisible = true, $menuVisible);
  let transitionParamsTop = { y: -320, duration: 200, easing: sineIn };
  let pageRefs = {};
  onDestroy(() => {
  });
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-r9ghfj_START --><link rel="stylesheet" href="/css/printStyle.scss"><!-- HEAD_svelte-r9ghfj_END -->`, ""} <div${add_classes(($loading ? "loading" : "").trim())}><div class=".show-on-print"${add_attribute("this", pageRefs.PAGE0F, 0)}>${validate_component(PageFront, "PAGE0F").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE00, 0)}>${validate_component(Page00, "PAGE00").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE01, 0)}>${validate_component(Page01, "PAGE01").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE02, 0)}>${validate_component(Page02, "PAGE02").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE03, 0)}>${validate_component(Page03, "PAGE03").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE04, 0)}>${validate_component(Page04, "PAGE04").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE05, 0)}>${validate_component(Page05, "PAGE05").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE06, 0)}>${validate_component(Page06, "PAGE06").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE07, 0)}>${validate_component(Page07, "PAGE07").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE08, 0)}>${validate_component(Page08, "PAGE08").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE09, 0)}>${validate_component(Page09, "PAGE09").$$render($$result, {}, {}, {})}</div> <div class=".show-on-print"${add_attribute("this", pageRefs.PAGE10, 0)}>${validate_component(Page10, "PAGE10").$$render($$result, {}, {}, {})}</div> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>  </div> <div class="A4Marker"></div> ${validate_component(Drawer, "Drawer").$$render(
      $$result,
      {
        placement: "top",
        width: "w-full",
        transitionType: "fly",
        transitionParams: transitionParamsTop,
        id: "sidebar",
        hidden: $menuVisible
      },
      {
        hidden: ($$value) => {
          $menuVisible = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="flex items-center">${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `<span class="icon svelte-v8h10h" data-svelte-h="svelte-1vpklua"><svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none" class="svelte-v8h10h"><script xmlns=""><\/script><path d="M13.2686 14.2686L15 16M12.0627 6.06274L11.9373 5.93726C11.5914 5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 12.0627 6.06274ZM14 12.5C14 13.8807 12.8807 15 11.5 15C10.1193 15 9 13.8807 9 12.5C9 11.1193 10.1193 10 11.5 10C12.8807 10 14 11.1193 14 12.5Z" stroke="#fbfbfb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><script xmlns=""><\/script></svg></span>
			Lista`;
            }
          })}  ${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `<span class="icon svelte-v8h10h" data-svelte-h="svelte-ci9krx"><svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none" class="svelte-v8h10h"><path d="M9 11L11 13L15 9M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z" stroke="#fbfbfb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>

			Zapisz`;
            }
          })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `<span class="icon svelte-v8h10h" data-svelte-h="svelte-122wgfx"><svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none" class="svelte-v8h10h"><path d="M12 13V7M15 10.0008L9 10M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z" stroke="#fbfbfb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span> Nowy`;
            }
          })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `<span class="icon svelte-v8h10h" data-svelte-h="svelte-u20sue"><svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none" class="svelte-v8h10h"><path d="M7 18H6.2C5.0799 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V10.2C3 9.0799 3 8.51984 3.21799 8.09202C3.40973 7.71569 3.71569 7.40973 4.09202 7.21799C4.51984 7 5.0799 7 6.2 7H7M17 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V10.2C21 9.07989 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H17M7 11H7.01M17 7V5.4V4.6C17 4.03995 17 3.75992 16.891 3.54601C16.7951 3.35785 16.6422 3.20487 16.454 3.10899C16.2401 3 15.9601 3 15.4 3H8.6C8.03995 3 7.75992 3 7.54601 3.10899C7.35785 3.20487 7.20487 3.35785 7.10899 3.54601C7 3.75992 7 4.03995 7 4.6V5.4V7M17 7H7M8.6 21H15.4C15.9601 21 16.2401 21 16.454 20.891C16.6422 20.7951 16.7951 20.6422 16.891 20.454C17 20.2401 17 19.9601 17 19.4V16.6C17 16.0399 17 15.7599 16.891 15.546C16.7951 15.3578 16.6422 15.2049 16.454 15.109C16.2401 15 15.9601 15 15.4 15H8.6C8.03995 15 7.75992 15 7.54601 15.109C7.35785 15.2049 7.20487 15.3578 7.10899 15.546C7 15.7599 7 16.0399 7 16.6V19.4C7 19.9601 7 20.2401 7.10899 20.454C7.20487 20.6422 7.35785 20.7951 7.54601 20.891C7.75992 21 8.03995 21 8.6 21Z" stroke="#fbfbfb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>

			Drukuj`;
            }
          })}  ${validate_component(CloseButton, "CloseButton").$$render($$result, { class: "mb-4 dark:text-white" }, {}, {})}</div>`;
        }
      }
    )} ${``} ${``} ${``}`;
  } while (!$$settled);
  $$unsubscribe_page();
  $$unsubscribe_menuVisible();
  $$unsubscribe_loading();
  $$unsubscribe_location();
  return $$rendered;
});
export {
  Page as default
};
