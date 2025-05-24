import { w as writable } from "./index2.js";
var stores = {
  local: {},
  session: {}
};
function getStorage(type) {
  return type === "local" ? localStorage : sessionStorage;
}
function persisted(key, initialValue, options2) {
  var _a, _b;
  const serializer = (_a = void 0) != null ? _a : JSON;
  const storageType = (_b = void 0) != null ? _b : "local";
  const browser = typeof window !== "undefined" && typeof document !== "undefined";
  const storage = browser ? getStorage(storageType) : null;
  function updateStorage(key2, value) {
    storage == null ? void 0 : storage.setItem(key2, serializer.stringify(value));
  }
  if (!stores[storageType][key]) {
    const store = writable(initialValue, (set2) => {
      const json = storage == null ? void 0 : storage.getItem(key);
      if (json) {
        set2(serializer.parse(json));
      }
      if (browser && storageType == "local") {
        const handleStorage = (event) => {
          if (event.key === key)
            set2(event.newValue ? serializer.parse(event.newValue) : null);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
      }
    });
    const { subscribe, set } = store;
    stores[storageType][key] = {
      set(value) {
        updateStorage(key, value);
        set(value);
      },
      update(callback) {
        return store.update((last) => {
          const value = callback(last);
          updateStorage(key, value);
          return value;
        });
      },
      subscribe
    };
  }
  return stores[storageType][key];
}
persisted("data", { storage: "session" });
let allDocuments = persisted("allDocuments", { init: [] });
let location = persisted("location", { init: {} });
let poiReady = persisted("poiReady", {});
let currentDocument = persisted("currentDocument", { init: [] });
persisted("nearLocation", { init: [] });
let nearLocationsPoints = persisted("nearLocationsPoints", { init: [] });
const newLocation = persisted("newLocation", {
  // szablon nowego dokumentu. 
  ID: "",
  adres: "Wpisz lokalizację",
  createDate: "2023-12-01T12:00:00",
  sellDate: "2023-12-01T12:00:00",
  params: {
    price: 1e5,
    lat: 50.1113303,
    lon: 22.0556406,
    POW: 22,
    STANDARD: 1,
    POKOJE: 1,
    KUCHNIA: "0",
    BALKON_TARAS: "0",
    WINDA: "0",
    PIWNICA: "0",
    PARKING: "0",
    RODZAJ: "1",
    ROK_POWSTANIA: "1",
    RYNEK: "1",
    KSIEGA: "1",
    LICZBAKOND: "1",
    M2_PRICE: 0,
    FROM_PRICE: 12,
    TO_PRICE: 13,
    WNIOSEK: "To mieszkanie znajduje się w bardzo atrakcyjnej i dobrej bezpiecznej okolicy. Lokale o tej powierzchni są bardzo popularne w Jasionce. Cena metra kwadratowego wskazanego przez Ciebie mieszkania jest zbliżona",
    notes: "",
    page01: {
      nearPoints: [],
      nearPOI: []
    },
    page02: {
      rentownoscK: 2e3,
      rentownoscK12: 24e3,
      rentownoscKPercent: 4.2,
      rentownoscD1: 3333,
      rentownoscD12: 12e5,
      rentownoscDPercent: 50
    },
    page03: {
      numOfQ: 6,
      data1: [
        { name: "ZSL", val: 19.6 },
        { name: "ZSL", val: 30 }
      ],
      data2: [
        { name: "ZSL", val: 19.6 },
        { name: "ZSL", val: 30 },
        { name: "ZSL", val: 54.2 }
      ],
      wykresData: []
    },
    page04: {},
    page05: {},
    page06: {
      poziomBEZPIECZENSTWA: 2,
      customCity: "",
      customLatLon: [],
      scalefactor: 1,
      svgImage: false
    },
    page07: {
      text14: "Poniższe bilanse pokazują wykres poparcia dla określonych partii politycznych oraz uzyskaną frekwencję w danym regionie względem ogólnej z całego miasta lub dzielnicy. Dane te zebrano z komisji wyborczej znajdującej się w najbliższej odległości od nieruchomości i odnoszą się do wyborów parlamentarnych mających miejsce w [xxxxxxxxx]",
      donut1: 42,
      donut2: 86,
      wykresData: []
    },
    page08: {
      poziomBEZPIECZENSTWA: 2,
      positionPM10: 80,
      positionPM25: 45,
      PMcurrent: {
        x1_10: 12,
        x1_25: 56,
        x2_10: 12,
        x2_25: 56,
        x3_10: 12,
        x3_25: 56,
        x4_10: 12,
        x4_25: 56,
        x5_10: 12,
        x5_25: 56,
        x6_10: 12,
        x6_25: 56,
        x7_10: 12,
        x7_25: 56,
        x8_10: 12,
        x8_25: 56,
        x9_10: 12,
        x9_25: 56,
        x10_10: 12,
        x10_25: 56,
        x11_10: 12,
        x11_25: 56,
        x12_10: 12,
        x12_25: 56
      }
    },
    POI: {}
  }
});
let options = persisted("options", {
  storage: "session",
  POIelementsDisplay: [1, 2, 3],
  answers: {
    STANDARD: {
      0: "do odświeżenia",
      1: "do remontu",
      2: "do kapitalnego remontu",
      3: "przeciętny",
      4: "wysoki",
      5: "premium",
      6: "custom"
    },
    bool: {
      1: "tak",
      0: "brak"
    },
    PARKING: {
      0: "brak",
      1: "dostęp ogólny",
      2: "przypisane do nieruchomości"
    },
    KSIEGA: {
      1: "brak",
      2: "brak informacji",
      3: "#"
    },
    RODZAJ: {
      1: "kamienica",
      2: "blok",
      3: "dom jednorodzinny",
      4: "inny"
    },
    RYNEK: {
      1: "wtórny",
      2: "pierwotny"
    },
    ROK_POWSTANIA: {
      1: "lata 40",
      2: "lata 50",
      3: "lata 60",
      4: "lata 70",
      5: "lata 80",
      6: "lata 90",
      7: "2000-2010",
      8: ""
    }
  },
  distanceNear: 5,
  distanceNearPOI: 5e4
});
let menuVisible = writable(true);
let loading = writable(false);
export {
  location as a,
  allDocuments as b,
  nearLocationsPoints as c,
  currentDocument as d,
  loading as l,
  menuVisible as m,
  newLocation as n,
  options as o,
  poiReady as p
};
