import axios from "axios";
import { o as options } from "./appStore.js";
import { c as create_ssr_component } from "./ssr.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
let distanceNearPOI;
options.subscribe((value) => {
  value.distanceNear;
  distanceNearPOI = value.distanceNearPOI;
  console.log("distanceNearPOI", distanceNearPOI);
});
axios.defaults.adapter = "xhr";
function convData2Geo(data) {
  let POINTS = [];
  data.forEach((el) => {
    POINTS.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [parseFloat(el.params.lon), parseFloat(el.params.lat)]
      },
      "properties": {
        "params": el.params,
        "place_id": el.place_id,
        "id": el.ID,
        "createDate": el.createDate,
        "adres": el.adres,
        "sellDate": el.sellDate
      }
    });
  });
  let GEOJSON = {
    "type": "FeatureCollection",
    "features": POINTS
  };
  return GEOJSON;
}
async function getBounds(data, loc) {
  let locationCurrent = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [
        loc.lon,
        loc.lat
      ]
    },
    "properties": {
      "name": "Current Location",
      "iconSRC": "/images/POI/miastoDotC.svg"
    }
  };
  data.push(locationCurrent);
  let Points = [];
  for (let key in data) {
    Points.push(data[key].geometry.coordinates);
  }
  let getSWCoordinates = function(coordinatesCollection) {
    const lowestLng = Math.min(
      ...coordinatesCollection.map((coordinates) => coordinates[0])
    );
    const lowestLat = Math.min(
      ...coordinatesCollection.map((coordinates) => coordinates[1])
    );
    return [lowestLng, lowestLat];
  };
  let getNECoordinates = function(coordinatesCollection) {
    const highestLng = Math.max(
      ...coordinatesCollection.map((coordinates) => coordinates[0])
    );
    const highestLat = Math.max(
      ...coordinatesCollection.map((coordinates) => coordinates[1])
    );
    return [highestLng, highestLat];
  };
  let calcBoundsFromCoordinates = function(coordinatesCollection) {
    return [
      getSWCoordinates(coordinatesCollection),
      getNECoordinates(coordinatesCollection)
    ];
  };
  return calcBoundsFromCoordinates(Points);
}
const css = {
  code: "svg.svelte-3l5u3o{position:relative;left:50%;margin-left:-50px;width:100px;height:100px;margin:0px;margin-bottom:50px;margin-top:50px;display:inline-block}",
  map: `{"version":3,"file":"loading.svelte","sources":["loading.svelte"],"sourcesContent":["<script>\\n\\timport { fade } from 'svelte/transition';\\n<\/script>\\n\\n<svg  transition:fade version=\\"1.1\\" id=\\"Loading\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" x=\\"0px\\" y=\\"0px\\"\\n  viewBox=\\"0 0 100 100\\" enable-background=\\"new 0 0 0 0\\" xml:space=\\"preserve\\">\\n \\n \\n  <circle fill=\\"var(--brand-green)\\" stroke=\\"none\\" cx=\\"6\\" cy=\\"50\\" r=\\"6\\">\\n    <animateTransform \\n       attributeName=\\"transform\\" \\n       dur=\\"1s\\" \\n       type=\\"translate\\" \\n       values=\\"0 15 ; 0 -15; 0 15\\" \\n       repeatCount=\\"indefinite\\" \\n       begin=\\"0.1\\"/>\\n  </circle>\\n \\n  <circle fill=var(--brand-green) stroke=\\"none\\" cx=\\"30\\" cy=\\"50\\" r=\\"6\\">\\n    <animateTransform \\n       attributeName=\\"transform\\" \\n       dur=\\"1s\\" \\n       type=\\"translate\\" \\n       values=\\"0 10 ; 0 -10; 0 10\\" \\n       repeatCount=\\"indefinite\\" \\n       begin=\\"0.2\\"/>\\n  </circle>\\n \\n \\n  <circle fill=var(--brand-green) stroke=\\"none\\" cx=\\"54\\" cy=\\"50\\" r=\\"6\\">\\n    <animateTransform \\n       attributeName=\\"transform\\" \\n       dur=\\"1s\\" \\n       type=\\"translate\\" \\n       values=\\"0 5 ; 0 -5; 0 5\\" \\n       repeatCount=\\"indefinite\\" \\n       begin=\\"0.3\\"/>\\n  </circle>\\n\\n\\n</svg>\\n\\n\\n<style type=\\"scss\\">\\n\\n\\nsvg{\\n    position: relative;\\n    left:50%;\\n    margin-left: -50px;\\n  width: 100px;\\n  height: 100px;\\n  margin: 0px;\\n  margin-bottom: 50px;\\n  margin-top: 50px;\\n  display:inline-block;\\n}\\n\\n\\n</style>"],"names":[],"mappings":"AA8CA,iBAAG,CACC,QAAQ,CAAE,QAAQ,CAClB,KAAK,GAAG,CACR,WAAW,CAAE,KAAK,CACpB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,QAAQ,YACV"}`
};
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<svg version="1.1" id="Loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" class="svelte-3l5u3o"><circle fill="var(--brand-green)" stroke="none" cx="6" cy="50" r="6"><animateTransform attributeName="transform" dur="1s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.1"></animateTransform></circle><circle fill="var(--brand-green)" stroke="none" cx="30" cy="50" r="6"><animateTransform attributeName="transform" dur="1s" type="translate" values="0 10 ; 0 -10; 0 10" repeatCount="indefinite" begin="0.2"></animateTransform></circle><circle fill="var(--brand-green)" stroke="none" cx="54" cy="50" r="6"><animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3"></animateTransform></circle></svg>`;
});
dayjs.extend(relativeTime);
function plural(n) {
  return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 !== 1;
}
function translate(number, withoutSuffix, key) {
  var result = number + " ";
  switch (key) {
    case "m":
      return withoutSuffix ? "minuta" : "minutę";
    case "mm":
      return result + (plural(number) ? "minuty" : "minut");
    case "h":
      return withoutSuffix ? "godzina" : "godzinę";
    case "hh":
      return result + (plural(number) ? "godziny" : "godzin");
    case "MM":
      return result + (plural(number) ? "miesiące" : "miesięcy");
    case "yy":
      return result + (plural(number) ? "lata" : "lat");
  }
}
var monthFormat = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
var monthStandalone = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_");
var MONTHS_IN_FORMAT = /D MMMM/;
var months = function months2(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthFormat[dayjsInstance.month()];
  }
  return monthStandalone[dayjsInstance.month()];
};
months.s = monthStandalone;
months.f = monthFormat;
var locale = {
  name: "pl",
  weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
  weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
  weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
  months,
  monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: "za %s",
    past: "%s temu",
    s: "kilka sekund",
    m: translate,
    mm: translate,
    h: translate,
    hh: translate,
    d: "1 dzień",
    dd: "%d dni",
    M: "miesiąc",
    MM: translate,
    y: "rok",
    yy: translate
  },
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  }
};
dayjs.locale(locale, null, true);
export {
  Loading as L,
  convData2Geo as c,
  getBounds as g
};
