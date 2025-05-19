import { w as writable } from "./index2.js";
var stores = {
  local: {},
  session: {}
};
function getStorage(type) {
  return type === "local" ? localStorage : sessionStorage;
}
function persisted(key, initialValue, options2) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const serializer = (_a = void 0) != null ? _a : JSON;
  const storageType = (_b = void 0) != null ? _b : "local";
  const syncTabs = (_c = void 0) != null ? _c : true;
  const onWriteError = (_e = (_d = void 0) != null ? _d : void 0) != null ? _e : (e) => console.error(`Error when writing value from persisted store "${key}" to ${storageType}`, e);
  const onParseError = (_f = void 0) != null ? _f : (newVal, e) => console.error(`Error when parsing ${newVal ? '"' + newVal + '"' : "value"} from persisted store "${key}"`, e);
  const beforeRead = (_g = void 0) != null ? _g : (val) => val;
  const beforeWrite = (_h = void 0) != null ? _h : (val) => val;
  const browser = typeof window !== "undefined" && typeof document !== "undefined";
  const storage = browser ? getStorage(storageType) : null;
  function updateStorage(key2, value) {
    const newVal = beforeWrite(value);
    try {
      storage == null ? void 0 : storage.setItem(key2, serializer.stringify(newVal));
    } catch (e) {
      onWriteError(e);
    }
  }
  function maybeLoadInitial() {
    function serialize(json2) {
      try {
        return serializer.parse(json2);
      } catch (e) {
        onParseError(json2, e);
      }
    }
    const json = storage == null ? void 0 : storage.getItem(key);
    if (json == null) return initialValue;
    const serialized = serialize(json);
    if (serialized == null) return initialValue;
    const newVal = beforeRead(serialized);
    return newVal;
  }
  if (!stores[storageType][key]) {
    const initial = maybeLoadInitial();
    const store = writable(initial, (set2) => {
      if (browser && storageType == "local" && syncTabs) {
        const handleStorage = (event) => {
          if (event.key === key && event.newValue) {
            let newVal;
            try {
              newVal = serializer.parse(event.newValue);
            } catch (e) {
              onParseError(event.newValue, e);
              return;
            }
            const processedVal = beforeRead(newVal);
            set2(processedVal);
          }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
      }
    });
    const { subscribe, set } = store;
    stores[storageType][key] = {
      set(value) {
        set(value);
        updateStorage(key, value);
      },
      update(callback) {
        return store.update((last) => {
          const value = callback(last);
          updateStorage(key, value);
          return value;
        });
      },
      reset() {
        this.set(initialValue);
      },
      subscribe
    };
  }
  return stores[storageType][key];
}
persisted("data", { storage: "session" });
persisted("allDocuments", { init: [] });
let location = persisted("location", { init: {} });
persisted("currentDocument", { init: [] });
persisted("nearLocation", { init: [] });
let nearLocationsPoints = persisted("nearLocationsPoints", { init: [] });
persisted("newLocation", {
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
    notes: "Przykładowe notatki ",
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
      customLatLon: []
    },
    POI: {}
  }
});
let options = persisted("options", {
  storage: "session",
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
  loading as l,
  menuVisible as m,
  nearLocationsPoints as n,
  options as o
};
