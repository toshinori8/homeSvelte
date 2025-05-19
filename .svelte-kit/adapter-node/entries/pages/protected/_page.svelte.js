import { P as current_component, A as push, M as getContext, Q as spread_attributes, R as clsx$1, S as element, D as pop, F as attr_class, T as bind_props, N as escape_html, E as store_set, I as store_get, K as unsubscribe_stores, U as store_mutate, V as copy_payload, W as assign_payload, X as fallback, O as head, Y as attr } from "../../../chunks/index.js";
import { a as location, m as menuVisible, n as nearLocationsPoints, l as loading } from "../../../chunks/appStore.js";
import { b as button, d as drawer, c as closeButtonVariants, L as Loading, a as convData2Geo, g as getBounds } from "../../../chunks/pl.js";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import "deepmerge";
import "../../../chunks/client.js";
import { config, Map as Map$1, Marker, MapStyle } from "@maptiler/sdk";
import "input-core";
import dayjs from "dayjs";
import * as d3 from "d3";
import "osmtogeojson";
import "textures";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function cubic_out(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function split_css_unit(value) {
  const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return split ? [parseFloat(split[1]), split[2] || "px"] : [
    /** @type {number} */
    value,
    "px"
  ];
}
function fly(node, { delay = 0, duration = 400, easing = cubic_out, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [x_value, x_unit] = split_css_unit(x);
  const [y_value, y_unit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit});
			opacity: ${target_opacity - od * u}`
  };
}
const PUBLIC_API_MAPTILER = "HYfdFgCyq2QEA4rDwPqX";
function Button($$payload, $$props) {
  push();
  const group = getContext("group");
  const ctxDisabled = getContext("disabled");
  let {
    children,
    onclick,
    pill,
    outline = false,
    size = "md",
    color = "primary",
    shadow = false,
    tag = "button",
    disabled,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let actualSize = group ? "sm" : size;
  let actualColor = group ? outline ? "dark" : "alternative" : color;
  let isDisabled = Boolean(ctxDisabled) || Boolean(disabled);
  const { base, outline: outline_, shadow: shadow_ } = button({
    color: actualColor,
    size: actualSize,
    disabled: isDisabled,
    pill,
    group: !!group
  });
  let btnCls = twMerge(base(), outline && outline_(), shadow && shadow_(), clsx(className));
  if (restProps.href === void 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button${spread_attributes(
      {
        type: "button",
        ...restProps,
        class: clsx$1(btnCls),
        disabled: isDisabled
      }
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  } else if (restProps.href) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<a${spread_attributes(
      {
        ...restProps,
        class: clsx$1(btnCls),
        role: "button"
      }
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></a>`;
  } else {
    $$payload.out += "<!--[!-->";
    element(
      $$payload,
      tag,
      () => {
        $$payload.out += `${spread_attributes({ ...restProps, class: clsx$1(btnCls) })}`;
      },
      () => {
        children?.($$payload);
        $$payload.out += `<!---->`;
      }
    );
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function sineIn(t) {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;
  else return 1 - v;
}
function Drawer($$payload, $$props) {
  push();
  let {
    children,
    hidden = void 0,
    closeDrawer = () => hidden = true,
    activateClickOutside = true,
    position,
    width,
    backdrop = true,
    backdropClass,
    placement = "left",
    class: className,
    transitionParams,
    transitionType = fly,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const { base, backdrop_: backdropCls } = drawer({ position, placement, width, backdrop });
  let innerWidth = -1;
  let innerHeight = -1;
  let x = placement === "left" ? -320 : placement === "right" ? innerWidth + 320 : void 0;
  let y = placement === "top" ? -100 : placement === "bottom" ? innerHeight + 100 : void 0;
  Object.assign({}, { x, y, duration: 200, easing: sineIn });
  if (!hidden) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div role="presentation"${attr_class(clsx$1(backdropCls({ class: backdropClass })))}></div> <div${spread_attributes(
      {
        ...restProps,
        class: clsx$1(base({ class: clsx(className) })),
        tabindex: "-1"
      }
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { hidden });
  pop();
}
function CloseButton($$payload, $$props) {
  push();
  let {
    children,
    color = "gray",
    onclick,
    name = "Close",
    ariaLabel,
    size = "md",
    class: className,
    svgClass,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const { base, svg } = closeButtonVariants({ color, size });
  if (restProps.href === void 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button${spread_attributes(
      {
        type: "button",
        ...restProps,
        class: clsx$1(base({ class: clsx(className) })),
        "aria-label": ariaLabel ?? name
      }
    )}>`;
    if (name) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="sr-only">${escape_html(name)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (children) {
      $$payload.out += "<!--[-->";
      children($$payload);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<svg${attr_class(clsx$1(svg({ class: svgClass })))} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
    }
    $$payload.out += `<!--]--></button>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<a${spread_attributes(
      {
        ...restProps,
        class: clsx$1(base({ class: clsx(className) })),
        "aria-label": ariaLabel ?? name
      }
    )}>`;
    if (name) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="sr-only">${escape_html(name)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (children) {
      $$payload.out += "<!--[-->";
      children($$payload);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<svg${attr_class(clsx$1(svg()))} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
    }
    $$payload.out += `<!--]--></a>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function PageFront($$payload, $$props) {
  push();
  var $$store_subs;
  store_set(location, {});
  $$payload.out += `<div class="frontcover noselect page_01"><div class="containerFlex noselect"><img src="/images/firstPage.png" class="frontImage noselect" alt="logo"> `;
  if (!store_get($$store_subs ??= {}, "$location", location).params) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="center">`;
    Loading($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="btn btn-primary frontButton noselect">Wycena wartości nieruchomości</div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Header($$payload, $$props) {
  push();
  onDestroy(() => {
    store_set(menuVisible, true);
  });
  $$payload.out += `<header aria-hidden="true"><p class="p_header noselect">WYCENA WARTOŚCI nieruchomości</p> <img class="logotyp_header noselect" src="/images/logotyp_header.svg" alt="logotyp"></header>`;
  pop();
}
function Page00($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<div class="content-block section page_00 noselect">`;
  Header($$payload);
  $$payload.out += `<!---->  <div class="page_content">`;
  if (store_get($$store_subs ??= {}, "$location", location).params) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h3 class="noselect">Notatki</h3> `;
    if (store_get($$store_subs ??= {}, "$location", location).params) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="editable_text_container" contenteditable="true"><p>${escape_html(store_get($$store_subs ??= {}, "$location", location).params.notes)}</p></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div id="pageFooter"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Page01($$payload, $$props) {
  push();
  var $$store_subs;
  config.apiKey = PUBLIC_API_MAPTILER;
  Map$1.workerCount = 10;
  dayjs.locale("pl");
  let map;
  let otherAdressMarkers = [], ready = false;
  nearLocationsPoints.set([]);
  function runM2_PRICE() {
    store_mutate($$store_subs ??= {}, "$location", location, store_get($$store_subs ??= {}, "$location", location).params.M2_PRICE = Number(store_get($$store_subs ??= {}, "$location", location).params.price / store_get($$store_subs ??= {}, "$location", location).params.POW).toFixed(2));
  }
  function printOtherlocationPoints(tablePoints) {
    console.log(tablePoints);
    if (tablePoints.length > 0) {
      otherAdressMarkers.forEach((marker) => marker.remove());
      tablePoints.forEach((point) => {
        const marker = new Marker({ element: document.createElement("img") }).setLngLat([
          parseFloat(point.params.lon),
          parseFloat(point.params.lat)
        ]).addTo(map);
        marker.getElement().src = "/images/POI/locationsDot.svg";
        marker.getElement().style.width = "15px";
        marker.getElement().style.height = "15px";
        otherAdressMarkers.push(marker);
      });
      let geo = convData2Geo(tablePoints);
      getBounds(store_get($$store_subs ??= {}, "$location", location).params.poiGeodata.features.concat(geo.features), store_get($$store_subs ??= {}, "$location", location).params).then((dataCoor) => {
        map.fitBounds(dataCoor, { padding: 80 });
      });
    }
  }
  {
    if (store_get($$store_subs ??= {}, "$location", location) && store_get($$store_subs ??= {}, "$location", location).params && store_get($$store_subs ??= {}, "$location", location).params.POW) {
      runM2_PRICE();
    }
    if (store_get($$store_subs ??= {}, "$nearLocationsPoints", nearLocationsPoints) && store_get($$store_subs ??= {}, "$nearLocationsPoints", nearLocationsPoints)[0] && store_get($$store_subs ??= {}, "$nearLocationsPoints", nearLocationsPoints).length > 0) {
      printOtherlocationPoints(store_get($$store_subs ??= {}, "$nearLocationsPoints", nearLocationsPoints));
      store_mutate($$store_subs ??= {}, "$location", location, store_get($$store_subs ??= {}, "$location", location).params.page01.nearPoints = store_get($$store_subs ??= {}, "$nearLocationsPoints", nearLocationsPoints));
      console.log("nearLocationsPoints", store_get($$store_subs ??= {}, "$nearLocationsPoints", nearLocationsPoints));
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="content-block section page_01">`;
    Header($$payload2);
    $$payload2.out += `<!----> <div class="page_content">`;
    if (!store_get($$store_subs ??= {}, "$location", location).adres) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="center">`;
      Loading($$payload2);
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$location", location).adres && ready == true) ;
    else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <div class="map-wrap"><div class="map" id="map"></div></div> <div class="pageNumber">1</div></div> `;
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
function Page02($$payload, $$props) {
  push();
  $$payload.out += `<div class="content-block section page_02">`;
  Header($$payload);
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="center">`;
    Loading($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--> <div class="pageNumber">2</div></div>`;
  pop();
}
function DonutMultiple($$payload, $$props) {
  push();
  let id = fallback($$props["id"], "");
  let data = fallback($$props["data"], () => [], true);
  head($$payload, ($$payload2) => {
    $$payload2.out += `<link rel="stylesheet" href="/css/donutMultiple.scss"> <script src="http://d3js.org/d3.v6.min.js" charset="utf-8"><\/script>`;
  });
  $$payload.out += `<div class="bigWrapper"><div class="donutWrapper" aria-hidden=""><svg class="donutTarget donut svgDonut"${attr("id", id)}></svg></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { id, data });
  pop();
}
function Wykres($$payload, $$props) {
  push();
  var $$store_subs;
  let margin = { top: 10, right: 90, bottom: 50, left: 60 }, width = 760 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;
  let ready = false;
  let datax = [];
  let quarterRoman;
  let qartals = [];
  let generateWykres = (datax2) => {
    let m2P = store_get($$store_subs ??= {}, "$location", location).params.M2_PRICE;
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
    y.domain([
      0,
      d3.max(datax2, function(d) {
        return d.value;
      })
    ]);
    g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(xAxis);
    g.append("g").attr("class", "axis axis--y").call(yAxis);
    g.append("path").datum(datax2).attr("class", "line").attr("fill", "none").attr("stroke", "var(--brand-green)").attr("stroke-width", 3).attr("d", line);
    g.selectAll(".dot").data(datax2).enter().append("circle").attr("class", ["dot_wk"]).attr("id", (d, i) => "dot_wk_" + i).attr(
      "r",
      // Dodaj unikalne ID do punktów
      5
    ).attr("cx", function(d) {
      return x(d.timeLabel) + x.bandwidth() / 2;
    }).attr("cy", function(d) {
      return y(d.value);
    }).style("fill", "white").style("stroke-width", 2).style("stroke", "var(--brand-green)").style("cursor", "pointer").call(d3.drag().on("drag", dragg));
    g.selectAll(".dot").data(datax2).enter().append("text").attr("class", "dot-label").attr("id", (d, i) => "dot-label_" + i).attr(
      "x",
      // Dodaj unikalne ID do opisów
      function(d) {
        return x(d.timeLabel) + x.bandwidth() / 2;
      }
    ).attr("y", function(d) {
      return y(d.value);
    }).text(function(d) {
      const numericValue = parseFloat(d.value);
      return isNaN(numericValue) ? d.value : numericValue.toFixed(2);
    }).style("text-anchor", "middle").style("font-size", "12px").style("fill", "var(--brand-green").attr("transform", function(d) {
      const isCloseToXAxis = y(d.value) < 60;
      if (isCloseToXAxis) {
        return "rotate(-90 " + (x(d.timeLabel) - 32 + x.bandwidth()) + " " + (y(d.value) + 18) + ")";
      } else {
        return "rotate(-90 " + (x(d.timeLabel) - 70 + x.bandwidth()) + " " + (y(d.value) - 18) + ")";
      }
    });
    let lastDotX = parseFloat(d3.select(".dot_wk:last-of-type").attr("cx")) + 19.5;
    svg.append("line").classed("dashed-line", true).attr("x1", 70).attr("y1", y(m2P) + 20).attr("y2", y(m2P) + 20).attr("x2", width - 14).style("stroke", "#0399a6").style("stroke-dasharray", "8,5");
    g.append("circle").attr("class", "dot_wk_current").attr("cx", lastDotX - 20).attr(
      "cy",
      // Ustaw punkt na końcu osi X
      y(m2P)
    ).attr(
      "r",
      // Ustaw punkt na wysokości linii kropkowanej
      5
    ).style("fill", "#0399a6").style("stroke-width", 2).style("stroke", "#0399a6");
    g.append("text").attr("x", lastDotX - 10).attr("y", y(m2P)).text("TO MIESZKANIE").style(
      "fill",
      // Dostosuj pozycję tekstu
      "#0399a6"
    ).style("font-size", "9px");
    g.append("text").attr("x", lastDotX - 10).attr("y", y(m2P) + 20).text(m2P).style(
      "fill",
      // Dostosuj pozycję tekstu
      "#0399a6"
    ).style("font-size", "10px");
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
        store_mutate($$store_subs ??= {}, "$location", location, store_get($$store_subs ??= {}, "$location", location).params.page03.wykresData = datax2);
      }
    }
    return true;
  };
  const getRomanNumeral = (num) => {
    const romanNumerals = ["I", "II", "III", "IV"];
    return romanNumerals[num - 1] || num.toString();
  };
  async function updateWykres() {
    if (store_get($$store_subs ??= {}, "$location", location).params.M2_PRICE > 0 && store_get($$store_subs ??= {}, "$location", location).params.page03.numOfQ) {
      if (store_get($$store_subs ??= {}, "$location", location).params.page03.wykresData[1]) {
        datax = store_get($$store_subs ??= {}, "$location", location).params.page03.wykresData;
        ready = true;
      } else {
        ready = true;
        calculateQuart(store_get($$store_subs ??= {}, "$location", location).params.page03.numOfQ);
      }
    }
  }
  updateWykres();
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
        const index = qartals.findIndex((element2) => element2.timeLabel === d.timeLabel);
        if (index !== -1) {
          qartals[index].value = parseFloat(d.value).toFixed(2);
        }
      });
    }
    datax = qartals;
    generateWykres(datax);
  }
  {
    if (store_get($$store_subs ??= {}, "$location", location) && store_get($$store_subs ??= {}, "$location", location).params && ready == false) ;
  }
  if (ready == false) {
    $$payload.out += "<!--[-->";
    Loading($$payload);
  } else if (ready == true) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<svg id="uniqueSvgId" width="700" height="340" class="svelte-2am2t6"></svg> <div class="options svelte-2am2t6"><input id="num" type="number" min="1" max="20" step="1"${attr("value", store_get($$store_subs ??= {}, "$location", location).params.page03.numOfQ)} class="svelte-2am2t6"> <button id="akt" class="svelte-2am2t6">Uaktualnij kwartały</button> <button id="updateWyk" class="svelte-2am2t6">Uaktualnij wykres</button></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Page03($$payload, $$props) {
  push();
  var $$store_subs;
  head($$payload, ($$payload2) => {
    $$payload2.out += `<link rel="stylesheet" href="/css/donut.scss">`;
  });
  $$payload.out += `<div class="content-block section page_03">`;
  Header($$payload);
  $$payload.out += `<!----> `;
  if (!store_get($$store_subs ??= {}, "$location", location).params) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="center">`;
    Loading($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$location", location).adres) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="page_content"><div class="grid_content noselect full"><h2 class="title_medium noselect"><span class="number_type noselect">8</span> Wykaz średnich cen sprzedaży nieruchomości w
					odniesieniu do miasta <span style="color: var(--brand-green); font-size: 1.2em;">${escape_html(store_get($$store_subs ??= {}, "$location", location).adres)} - ${escape_html(store_get($$store_subs ??= {}, "$location", location).params.price)}</span></h2></div> `;
    if (!store_get($$store_subs ??= {}, "$location", location).params.M2_price && store_get($$store_subs ??= {}, "$location", location).params.M2_PRICE == 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="center">cena za metr: ${escape_html(store_get($$store_subs ??= {}, "$location", location).params.M2_PRICE)} `;
      Loading($$payload);
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `cena za metr: ${escape_html(store_get($$store_subs ??= {}, "$location", location).params.M2_PRICE)} `;
      Wykres($$payload);
      $$payload.out += `<!---->`;
    }
    $$payload.out += `<!--]--> <div></div> <div class="grid_content noselect centered full"></div> <h2 class="title_medium noselect"><span class="number_type noselect">9</span> Prezentacja cen sprzedaży nieruchomości w mieście <span style="color: var(--brand-green);">${escape_html(store_get($$store_subs ??= {}, "$location", location).adres)}</span></h2> <div class="grid_content noselect centered full">`;
    DonutMultiple($$payload, {
      data: store_get($$store_subs ??= {}, "$location", location).params.page03.data1,
      id: "id1"
    });
    $$payload.out += `<!----></div> <h2 class="title_medium noselect"><span class="number_type noselect">10</span> Zestawienie sprzedawanych mieszkań w mieście <span style="color: var(--brand-green);">${escape_html(store_get($$store_subs ??= {}, "$location", location).adres)}</span><br>z podziałem na
				powierzchnie</h2> <div class="grid_content noselect centered full">`;
    DonutMultiple($$payload, {
      data: store_get($$store_subs ??= {}, "$location", location).params.page03.data2,
      id: "id2"
    });
    $$payload.out += `<!----></div> <div class="pageNumber svelte-167dqpw">3</div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function DistanceElement($$payload, $$props) {
  let poiName = fallback($$props["poiName"], "Galeria Reszowska");
  let poiCity = fallback($$props["poiCity"], "Rzeszów");
  let poiDistanceCar = $$props["poiDistanceCar"], poiDistanceBus = $$props["poiDistanceBus"], poiDistanceBike = $$props["poiDistanceBike"];
  let poiColor = fallback($$props["poiColor"], "#0FCF5E");
  head($$payload, ($$payload2) => {
  });
  $$payload.out += `<div class="svg-itema svelte-qy6373"><svg version="1.1" id="Warstwa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="120px" y="0px" width="220px" height="90px" viewBox="-20 0 213 79.8" style="enable-background:new 0 0 220 90;" xml:space="preserve" class="svelte-qy6373"><g class="svelte-qy6373"><polygon${attr("fill", poiColor)} points="46.2,63.1 -20,63.1 -20,28.3 -19.2,28.3 -19.2,62.3 46.2,62.3 " class="svelte-qy6373"></polygon></g>`;
  if (poiDistanceBus) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<g class="svelte-qy6373"><g class="svelte-qy6373"><path fill="#084A96" d="M98.7,36.2v-1.7c0-0.6-0.5-1.2-1.2-1.2H86.2c-0.2,0-0.3,0.1-0.3,0.3v2.6c0,0.2,0.1,0.3,0.3,0.3h12.1
				C98.5,36.6,98.7,36.4,98.7,36.2 M88.7,35.9h-2.2V34h2.2V35.9z M92.8,35.9h-3.5V34h3.5V35.9z M98,35.9h-4.5V34h4
				c0.3,0,0.5,0.2,0.5,0.5V35.9z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#084A96" d="M101.7,35.5l-1.1-0.9c-0.1-1.6-1.4-2.9-3-2.9H84.4c-0.2,0-0.3,0.1-0.3,0.3v8.6c0,0.2,0.1,0.3,0.3,0.3h1.6
				c0.2,0.8,0.9,1.4,1.7,1.4c0.8,0,1.5-0.6,1.7-1.4h3.6c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-3.6c-0.2-0.8-0.9-1.4-1.7-1.4
				c-0.8,0-1.5,0.6-1.7,1.4h-1.2v-2.1h3.8c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-3.8v-5.1h12.8c1.3,0,2.4,1.1,2.4,2.4
				c0,0.1,0,0.2,0.1,0.3l1.1,0.9v1.6h-9.4c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h9.4v2.1h-2.8c-0.2-0.8-0.9-1.4-1.7-1.4
				c-0.8,0-1.5,0.6-1.7,1.4h-0.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3H95c0.2,0.8,0.9,1.4,1.7,1.4c0.8,0,1.5-0.6,1.7-1.4
				h3.1c0.2,0,0.3-0.1,0.3-0.3v-4.8C101.8,35.7,101.7,35.6,101.7,35.5 M86.6,40.6c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1
				c0,0.6-0.5,1.1-1.1,1.1C87,41.6,86.6,41.2,86.6,40.6C86.6,40.6,86.6,40.6,86.6,40.6z M96.7,41.6c-0.6,0-1.1-0.5-1.1-1.1
				c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C97.7,41.2,97.2,41.6,96.7,41.6z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#084A96" d="M89.7,37.5c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h0.9c0.2,0,0.3-0.1,0.3-0.3
				c0-0.2-0.1-0.3-0.3-0.3H89.7z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#084A96" d="M87.6,40.9c0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2-0.1-0.2c-0.1-0.1-0.1-0.1-0.2-0.1
				c-0.1,0-0.2,0-0.2,0.1c-0.1,0.1-0.1,0.1-0.1,0.2c0,0.1,0,0.2,0.1,0.2C87.5,40.9,87.5,40.9,87.6,40.9" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#084A96" d="M96.7,40.2c-0.1,0-0.2,0-0.2,0.1c-0.1,0.1-0.1,0.1-0.1,0.2c0,0.1,0,0.2,0.1,0.2c0.1,0.1,0.1,0.1,0.2,0.1
				c0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2-0.1-0.2C96.8,40.3,96.7,40.2,96.7,40.2" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><g class="svelte-qy6373"><path fill="#FFFFFF" d="M95.6,47.6l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.7,1,2.6,2.7,2.6,4.5h0v11.1c0,2.1-1.3,3.9-3.1,4.8
					l-4.4,2.5l0,0l-4.8,2.8c-1.7,1-3.7,0.9-5.3,0L85.5,76c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.7-1-2.6-2.7-2.6-4.5h0V57.6
					c0-2.1,1.3-3.9,3.1-4.8l4.4-2.5l0,0l4.8-2.8C92,46.5,94,46.6,95.6,47.6z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#00336E" d="M92.9,79.8c-1,0-1.9-0.3-2.8-0.8l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.6-0.9-2.6-2.6-2.7-4.5h0
					l0-0.3V57.6c0-2.2,1.3-4.1,3.2-5l9.2-5.3c1.7-1,3.9-1,5.6,0l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.6,0.9,2.6,2.6,2.7,4.5h0
					l0,0.3v11.1c0,2.2-1.3,4.1-3.2,5L95.7,79C94.8,79.5,93.9,79.8,92.9,79.8z M78.3,68.4l0,0.3c0,1.8,0.9,3.4,2.5,4.3l4.5,2.6
					c0.1,0.1,0.2,0.1,0.3,0.2l4.8,2.7c1.5,0.9,3.5,0.9,5,0l9.2-5.3c1.8-0.8,2.9-2.6,2.9-4.5l0-11.1c0-1.8-0.9-3.4-2.5-4.3l-4.5-2.6
					c-0.1-0.1-0.2-0.1-0.3-0.2l-4.8-2.7c-1.5-0.9-3.5-0.9-5,0l-9.2,5.3c-1.8,0.8-2.9,2.6-2.9,4.5V68.4z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#00336E" d="M90.2,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8
					c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.4-0.3,0.7h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.5
					c0.2-0.1,0.4-0.2,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2
					C90.3,69.5,90.2,69.5,90.2,69.5 M87.7,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.1,0.1-0.2
					c0-0.1,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1c0,0.1,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C87.9,69.5,87.8,69.5,87.7,69.5z
					 M92.6,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.3
					c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.5-0.3,0.8h-0.5c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.1,0.5-0.2,0.8-0.2
					c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2C92.7,69.5,92.6,69.5,92.6,69.5z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#00336E" d="M94.4,64.9c-0.1,0-0.2,0-0.3-0.1C94,64.7,94,64.7,94,64.5c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1
					c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2-0.1,0.3C94.6,64.9,94.5,64.9,94.4,64.9 M94.4,69.5
					c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1
					c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.2-0.1,0.2C94.5,69.5,94.4,69.5,94.4,69.5z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#00336E" d="M96.2,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1
					c0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C96.4,69.5,96.3,69.5,96.2,69.5 M99.2,69.5
					c-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-1.8c0-0.3-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.1-0.6-0.1
					c-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.3,0.2-0.4,0.4c-0.1,0.2-0.2,0.3-0.2,0.5h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.6
					c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.6s0.2,0.6,0.2,1v1.8c0,0.1,0,0.1-0.1,0.2
					C99.3,69.5,99.3,69.5,99.2,69.5z" class="svelte-qy6373"></path></g><text transform="matrix(1 0 0 1 86 63)" fill="#00336E" font-family="var(--comfortea)" font-size="12px" class="svelte-qy6373">${escape_html(poiDistanceBus)}</text></g></g>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (poiDistanceCar) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<g class="svelte-qy6373"><g class="svelte-qy6373"><path fill="#0399A6" d="M130.5,41.7c0.6,0,1.1-0.5,1.1-1.1c0-0.6-0.5-1.1-1.1-1.1s-1.1,0.5-1.1,1.1
				C129.4,41.2,129.9,41.7,130.5,41.7 M130.5,40.2c0.2,0,0.4,0.2,0.4,0.4c0,0.2-0.2,0.4-0.4,0.4c-0.2,0-0.4-0.2-0.4-0.4
				C130.1,40.4,130.3,40.2,130.5,40.2z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0399A6" d="M139.8,39.6c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1
				C140.9,40,140.4,39.6,139.8,39.6 M139.8,41.1c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4c0.2,0,0.4,0.2,0.4,0.4
				C140.2,40.9,140.1,41.1,139.8,41.1z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0399A6" d="M143.8,36.2c-0.4-0.7-1.1-1-2-1h-2.5c-0.4-0.9-2.3-4.6-4.8-4.6h-7.7c-0.2,0-0.3,0.1-0.3,0.3v7.3
				c0,1.9,0,2.6,1.2,2.7c0.1,1.4,1.3,2.5,2.8,2.5c1.4,0,2.6-1.1,2.8-2.5h1.3c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-1.3
				c-0.2-1.4-1.4-2.5-2.8-2.5c-1.4,0-2.6,1.1-2.8,2.4c-0.5-0.1-0.5-0.3-0.5-2.1v-1.1h4.5c0.2,0,0.3-0.1,0.3-0.3
				c0-0.2-0.1-0.3-0.3-0.3h-4.5v-0.7h14.6c0.7,0,1.1,0.2,1.4,0.7h-8.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h9
				c0.1,0.3,0.1,0.6,0.1,1.1c0,1.3,0,1.9-1,2c-0.2-1.4-1.4-2.4-2.8-2.4c-1.4,0-2.6,1.1-2.8,2.5h-1.4c-0.2,0-0.3,0.1-0.3,0.3
				c0,0.2,0.1,0.3,0.3,0.3h1.4c0.2,1.4,1.4,2.5,2.8,2.5c1.5,0,2.7-1.1,2.8-2.6c1.6-0.2,1.6-1.5,1.6-2.7
				C144.2,37.3,144.1,36.7,143.8,36.2 M130.5,38.5c1.2,0,2.1,1,2.1,2.1c0,1.2-1,2.1-2.1,2.1c-1.2,0-2.1-1-2.1-2.1
				C128.3,39.5,129.3,38.5,130.5,38.5z M132.1,35.1h-4.9v-3.9h4.9V35.1z M132.7,35.1v-3.9h1.8c1.8,0,3.5,2.8,4,3.9H132.7z
				 M139.8,42.8c-1.2,0-2.1-1-2.1-2.1c0-1.2,1-2.1,2.1-2.1c1.2,0,2.1,1,2.1,2.1C142,41.8,141,42.8,139.8,42.8z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0399A6" d="M132.8,36.5c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h0.6c0.2,0,0.3-0.1,0.3-0.3
				c0-0.2-0.1-0.3-0.3-0.3H132.8z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><g class="svelte-qy6373"><path fill="#FFFFFF" d="M138,47.6l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.7,1,2.6,2.7,2.6,4.5h0v11.1c0,2.1-1.3,3.9-3.1,4.8
					l-4.4,2.5l0,0l-4.8,2.8c-1.7,1-3.7,0.9-5.3,0l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.7-1-2.6-2.7-2.6-4.5h0V57.6
					c0-2.1,1.3-3.9,3.1-4.8l4.4-2.5l0,0l4.8-2.8C134.4,46.5,136.5,46.6,138,47.6z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0399A6" d="M135.4,79.8c-1,0-1.9-0.3-2.8-0.8l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.6-0.9-2.6-2.6-2.7-4.5
					h0l0-0.3V57.6c0-2.2,1.3-4.1,3.2-5l9.2-5.3c1.7-1,3.9-1,5.6,0l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.6,0.9,2.6,2.6,2.7,4.5
					h0l0,0.3v11.1c0,2.2-1.3,4.1-3.2,5l-9.2,5.3C137.3,79.5,136.3,79.8,135.4,79.8z M120.8,68.4l0,0.3c0,1.8,0.9,3.4,2.5,4.3l4.5,2.6
					c0.1,0.1,0.2,0.1,0.3,0.2l4.8,2.7c1.5,0.9,3.5,0.9,5,0l9.2-5.3c1.8-0.8,2.9-2.6,2.9-4.5l0-11.1c0-1.8-0.9-3.4-2.5-4.3l-4.5-2.6
					c-0.1-0.1-0.2-0.1-0.3-0.2l-4.8-2.7c-1.5-0.9-3.5-0.9-5,0l-9.2,5.3c-1.8,0.8-2.9,2.6-2.9,4.5V68.4z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0399A6" d="M132.6,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8
					c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.4-0.3,0.7h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.5
					c0.2-0.1,0.4-0.2,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2
					C132.7,69.5,132.7,69.5,132.6,69.5 M130.2,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.1,0.1-0.2
					s0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1s0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C130.3,69.5,130.3,69.5,130.2,69.5z M135,69.5
					c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3
					c-0.2,0.2-0.3,0.5-0.3,0.8h-0.5c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.5,0.1,0.7,0.2
					c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2C135.2,69.5,135.1,69.5,135,69.5z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0399A6" d="M136.8,64.9c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1
					c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2-0.1,0.3C137,64.9,136.9,64.9,136.8,64.9 M136.8,69.5
					c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1
					c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.2-0.1,0.2C137,69.5,136.9,69.5,136.8,69.5z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0399A6" d="M138.7,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1
					c0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C138.8,69.5,138.8,69.5,138.7,69.5 M141.7,69.5
					c-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-1.8c0-0.3-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.1-0.6-0.1
					c-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.3,0.2-0.4,0.4c-0.1,0.2-0.2,0.3-0.2,0.5h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.6
					c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.6c0.1,0.3,0.2,0.6,0.2,1v1.8c0,0.1,0,0.1-0.1,0.2
					C141.8,69.5,141.7,69.5,141.7,69.5z" class="svelte-qy6373"></path></g></g><text transform="matrix(1 0 0 1 127.5 63)" fill="#0399A6" font-family="var(--comfortea)" font-size="13px" class="svelte-qy6373">${escape_html(poiDistanceCar)}</text></g>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (poiDistanceBike) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<g class="svelte-qy6373"><g class="svelte-qy6373"><path fill="#0FCF5E" d="M172.1,42.7c1.7,0,3.1-1.4,3.1-3.1c0-0.1,0-0.2,0-0.3l0.6-0.1c0.2,0.4,0.6,0.6,1,0.6
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
				c0,1.4-1.1,2.5-2.5,2.5c-1.4,0-2.5-1.1-2.5-2.5C169.6,38.2,170.7,37.1,172.1,37.1z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M172.1,41.1c0.3,0,0.5-0.1,0.7-0.2c0.2-0.1,0.2-0.3,0.1-0.5c-0.1-0.2-0.3-0.2-0.5-0.1
				c-0.1,0.1-0.3,0.1-0.4,0.1c-0.4,0-0.8-0.3-0.9-0.8c0-0.2-0.2-0.3-0.4-0.3c-0.2,0-0.3,0.2-0.3,0.4
				C170.6,40.6,171.3,41.1,172.1,41.1" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M170.8,39.2c0.1,0,0.1,0,0.2,0c0.1,0,0.2-0.1,0.3-0.2c0,0,0,0,0,0c0.1-0.2,0.1-0.4-0.1-0.5
				c-0.2-0.1-0.4-0.1-0.5,0.1c0,0,0,0.1,0,0.1C170.6,38.9,170.7,39.1,170.8,39.2" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M184.1,41c0,0,0.1,0,0.1,0c0.7-0.3,1.1-1.1,0.9-1.8c-0.1-0.3-0.2-0.5-0.4-0.7c-0.1-0.1-0.3-0.2-0.5,0
				c-0.1,0.1-0.2,0.3,0,0.5c0.1,0.1,0.2,0.2,0.2,0.4c0.1,0.4-0.1,0.9-0.5,1.1c-0.2,0.1-0.2,0.3-0.2,0.4C183.8,41,183.9,41,184.1,41" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M183,41C183,41,183,41.1,183,41c0.1,0,0.2,0,0.2,0c0.1,0,0.3-0.1,0.3-0.2c0.1-0.2,0-0.4-0.2-0.4
				c0,0,0,0-0.1,0c-0.2-0.1-0.4,0-0.4,0.2C182.7,40.8,182.8,41,183,41" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M177.8,34.3h0.2c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-0.2c-0.2,0-0.3,0.1-0.3,0.3
				C177.5,34.2,177.6,34.3,177.8,34.3" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M180.1,32h0.1c0.2,0,0.3-0.1,0.3-0.3c0-0.2-0.1-0.3-0.3-0.3h-0.1c-0.2,0-0.3,0.1-0.3,0.3
				C179.8,31.8,179.9,32,180.1,32" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><g class="svelte-qy6373"><path fill="#FFFFFF" d="M180.5,47.6l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.7,1,2.6,2.7,2.6,4.5h0v11.1
					c0,2.1-1.3,3.9-3.1,4.8l-4.4,2.5l0,0l-4.8,2.8c-1.7,1-3.7,0.9-5.3,0l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6
					c-1.7-1-2.6-2.7-2.6-4.5h0V57.6c0-2.1,1.3-3.9,3.1-4.8l4.4-2.5l0,0l4.8-2.8C176.9,46.5,178.9,46.6,180.5,47.6z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M177.8,79.8c-1,0-1.9-0.3-2.8-0.8l-4.8-2.7c-0.1-0.1-0.2-0.1-0.3-0.2l-4.5-2.6c-1.6-0.9-2.6-2.6-2.7-4.5
					h0l0-0.3V57.6c0-2.2,1.3-4.1,3.2-5l9.2-5.3c1.7-1,3.9-1,5.6,0l4.8,2.7c0.1,0.1,0.2,0.1,0.3,0.2l4.5,2.6c1.6,0.9,2.6,2.6,2.7,4.5
					h0l0,0.3v11.1c0,2.1-1.3,4.1-3.2,5l-9.2,5.3C179.7,79.5,178.8,79.8,177.8,79.8z M163.3,68.4l0,0.3c0,1.8,0.9,3.4,2.5,4.3l4.5,2.6
					c0.1,0.1,0.2,0.1,0.3,0.2l4.8,2.7c1.5,0.9,3.5,0.9,5,0l9.2-5.3c1.8-0.8,2.9-2.6,2.9-4.5l0-11.1c0-1.8-0.9-3.4-2.5-4.3l-4.5-2.6
					c-0.1-0.1-0.2-0.1-0.3-0.2l-4.8-2.7c-1.5-0.9-3.5-0.9-5,0l-9.2,5.3c-1.8,0.8-2.9,2.6-2.9,4.5V68.4z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M175.1,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8
					c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.4-0.3,0.7h-0.4c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.5
					c0.2-0.1,0.5-0.2,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2
					C175.2,69.5,175.1,69.5,175.1,69.5 M172.6,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.1,0.1-0.2
					c0-0.1,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1c0,0.1,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C172.8,69.5,172.7,69.5,172.6,69.5z
					 M177.5,69.5c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.1-0.2v-2c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.3
					c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.5-0.3,0.8h-0.5c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.1,0.5-0.2,0.8-0.2
					c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.4,0.3,0.5,0.6c0.1,0.2,0.2,0.5,0.2,0.8v2c0,0.1,0,0.1-0.1,0.2
					C177.6,69.5,177.5,69.5,177.5,69.5z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M179.3,64.9c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1
					c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2-0.1,0.3C179.5,64.9,179.4,64.9,179.3,64.9 M179.3,69.5
					c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1
					c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.2-0.1,0.2C179.4,69.5,179.4,69.5,179.3,69.5z" class="svelte-qy6373"></path></g><g class="svelte-qy6373"><path fill="#0FCF5E" d="M181.2,69.5c-0.1,0-0.1,0-0.2-0.1c0,0-0.1-0.1-0.1-0.2v-3.3c0-0.1,0-0.2,0.1-0.2c0,0,0.1-0.1,0.2-0.1
					c0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.2v3.3c0,0.1,0,0.1-0.1,0.2C181.3,69.5,181.2,69.5,181.2,69.5 M184.1,69.5
					c-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-1.8c0-0.3-0.1-0.5-0.2-0.7c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.1-0.6-0.1
					c-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.3,0.2-0.4,0.4c-0.1,0.2-0.2,0.3-0.2,0.5H181c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.6
					c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.6s0.2,0.6,0.2,1v1.8c0,0.1,0,0.1-0.1,0.2
					C184.2,69.5,184.2,69.5,184.1,69.5z" class="svelte-qy6373"></path></g><text transform="matrix(1 0 0 1 170 63)" fill="#0FCF5E" font-family="var(--comfortea)" font-size="13px" class="svelte-qy6373">${escape_html(poiDistanceBike)}</text></g></g>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--><g class="svelte-qy6373"><path fill="#0FCF5E" stroke="white" stroke-width="0.6px" class="cls-8 svelte-qy6373" d="M-3.1,0c-4.4,0-8,3.6-8,8s8,14.7,8,14.7s8-10.3,8-14.7C4.8,3.6,1.3,0-3.1,0 M-3.1,11.9C-5.3,11.9-7,10.1-7,8
		c0-2.2,1.8-3.9,3.9-3.9C-1,4,0.8,5.8,0.8,8C0.8,10.1-1,11.9-3.1,11.9z"></path></g><text transform="matrix(1 0 0 1 -11.6097 35.1343)" fill="#0FCF5E" font-family="var(--comfortea)" font-size="9.0051px" class="svelte-qy6373">${escape_html(poiName)}</text><text transform="matrix(1 0 0 1 -11.2855 54.0779)" fill="#00336E" font-family="var(--comfortea)" font-size="9.0051px" class="svelte-qy6373">${escape_html(poiCity)}</text></svg></div>`;
  bind_props($$props, {
    poiName,
    poiCity,
    poiDistanceCar,
    poiDistanceBus,
    poiDistanceBike,
    poiColor
  });
}
function Page04($$payload, $$props) {
  push();
  var $$store_subs;
  config.apiKey = PUBLIC_API_MAPTILER;
  let ready = false;
  async function initPOImap() {
    console.log("Data for map exist", store_get($$store_subs ??= {}, "$location", location));
    new Map$1({
      container: "mapa",
      style: MapStyle.OUTDOOR,
      center: [
        store_get($$store_subs ??= {}, "$location", location).params.lon + 1,
        store_get($$store_subs ??= {}, "$location", location).params.lat + 1
      ],
      zoom: 13
    });
    ready = true;
  }
  {
    if (store_get($$store_subs ??= {}, "$location", location) && store_get($$store_subs ??= {}, "$location", location).params && ready == false) {
      initPOImap();
    }
  }
  $$payload.out += `<div class="content-block section page_04">`;
  Header($$payload);
  $$payload.out += `<!----> <div class="page_content _1"><div class="grid_content noselect full_width"><h2 class="title_medium noselect"><span class="number_type noselect">11</span> Wskaźniki czasu dojazdu</h2> <p class="opis_">Powyższa mapka i grafiki wskazują orientacyjne czasy dojazdów do określonych punktów
				docelowych.</p></div> <div class="grid_content full_width mapa"><div id="mapa"></div></div></div> <div class="page_content _2"><div class="grid_content noselect POIelement">`;
  DistanceElement($$payload, {
    poiName: "Galeria Rzeszowska",
    poiCity: "Rzeszów",
    poiDistanceBus: "23",
    poiDistanceCar: "34",
    poiDistanceBike: "36"
  });
  $$payload.out += `<!----> `;
  DistanceElement($$payload, {
    poiName: "Galeria Rzeszowska",
    poiCity: "Rzeszów",
    poiDistanceBus: "23",
    poiDistanceCar: "34",
    poiDistanceBike: "36"
  });
  $$payload.out += `<!----> `;
  DistanceElement($$payload, {
    poiName: "Galeria Rzeszowska",
    poiCity: "Rzeszów",
    poiDistanceBus: "23",
    poiDistanceCar: "34",
    poiDistanceBike: "36"
  });
  $$payload.out += `<!----> `;
  DistanceElement($$payload, {
    poiName: "Galeria Rzeszowska",
    poiCity: "Rzeszów",
    poiDistanceBus: "23",
    poiDistanceCar: "34",
    poiDistanceBike: "36"
  });
  $$payload.out += `<!----> `;
  DistanceElement($$payload, {
    poiName: "Galeria Rzeszowska",
    poiCity: "Rzeszów",
    poiDistanceBus: "23",
    poiDistanceCar: "34",
    poiDistanceBike: "36"
  });
  $$payload.out += `<!----> `;
  DistanceElement($$payload, {
    poiName: "Galeria Rzeszowska",
    poiCity: "Rzeszów",
    poiDistanceBus: "23",
    poiDistanceCar: "34",
    poiDistanceBike: "36"
  });
  $$payload.out += `<!----> `;
  DistanceElement($$payload, {
    poiName: "Galeria Rzeszowska",
    poiCity: "Rzeszów",
    poiDistanceBus: "23",
    poiDistanceCar: "34",
    poiDistanceBike: "36"
  });
  $$payload.out += `<!----> `;
  DistanceElement($$payload, {
    poiName: "Galeria Rzeszowska",
    poiCity: "Rzeszów",
    poiDistanceBus: "23",
    poiDistanceCar: "34",
    poiDistanceBike: "36"
  });
  $$payload.out += `<!----></div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  store_set(menuVisible, true);
  let transitionParamsTop = { y: -320, duration: 200, easing: sineIn };
  onDestroy(() => {
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.out += `<link rel="stylesheet" href="/css/printStyle.scss">`;
    });
    $$payload2.out += `<div${attr_class("", void 0, {
      "loading": store_get($$store_subs ??= {}, "$loading", loading)
    })}><div class=".show-on-print">`;
    PageFront($$payload2);
    $$payload2.out += `<!----></div> <div class=".show-on-print">`;
    Page00($$payload2);
    $$payload2.out += `<!----></div> <div class=".show-on-print">`;
    Page01($$payload2);
    $$payload2.out += `<!----></div> <div class=".show-on-print">`;
    Page02($$payload2);
    $$payload2.out += `<!----></div> <div class=".show-on-print">`;
    Page03($$payload2);
    $$payload2.out += `<!----></div> <div class=".show-on-print">`;
    Page04($$payload2);
    $$payload2.out += `<!----></div></div> <div class="A4Marker"></div> `;
    Drawer($$payload2, {
      placement: "top",
      width: "w-full",
      transitionType: "fly",
      transitionParams: transitionParamsTop,
      id: "sidebar",
      get hidden() {
        return store_get($$store_subs ??= {}, "$menuVisible", menuVisible);
      },
      set hidden($$value) {
        store_set(menuVisible, $$value);
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<div class="flex items-center">`;
        Button($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<svg class="arrowInvert w-[41px] h-[41px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16"><path d="m19.822 7.431-4.846-7A1 1 0 0 0 14.153 0H1a1 1 0 0 0-.822 1.569L4.63 8 .178 14.431A1 1 0 0 0 1 16h13.153a1.001 1.001 0 0 0 .823-.431l4.846-7a1 1 0 0 0 0-1.138Z"></path></svg>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Button($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Zapisz`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Button($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Drukuj`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        CloseButton($$payload3, { class: "mb-4 dark:text-white" });
        $$payload3.out += `<!----></div>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    {
      $$payload2.out += "<!--[!-->";
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
