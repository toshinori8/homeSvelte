import { writable } from 'svelte/store'
import { persisted } from 'svelte-persisted-store'

export const data = persisted('data', { storage: 'session' })

export let allDocuments = persisted('allDocuments', { init: [] }) // Wszystkie lokalizacje zaciągnięte z PHP 
export let location = persisted('location', { init: {} })

export let currentDocument = persisted('currentDocument', { init: [] }) // current document in editMode
export let nearLocation = persisted('nearLocation', { init: [] }) // ustawiane przez getNearFromAllDocuments z FUNCTIONS 
export let nearLocationsPoints = persisted('nearLocationsPoints', { init: [] })
export const newLocation = persisted('newLocation', {  // szablon nowego dokumentu. 

    ID: '',
    adres: 'Wpisz lokalizację',
    createDate: "2023-12-01T12:00:00",
    sellDate: "2023-12-01T12:00:00",
    params: {

        price: 100000,
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
            rentownoscK: 2000,
            rentownoscK12: 24000,
            rentownoscKPercent: 4.2,

            rentownoscD1: 3333,
            rentownoscD12: 1200000,
            rentownoscDPercent: 50,
        },

        page03: {

            numOfQ: 6,

            data1: [
                { name: 'ZSL', val: 19.6 },
                { name: 'ZSL', val: 30 },


            ],
            data2: [
                { name: 'ZSL', val: 19.6 },
                { name: 'ZSL', val: 30 },
                { name: 'ZSL', val: 54.2 },

            ],
            wykresData: []


        },

        page04: {
        },

        page05: {
        },

        page06: {
            poziomBEZPIECZENSTWA: 2,
            customCity: "",
            customLatLon: []
        },
        POI: {

        },

    }




})




export let options = persisted('options', {
    storage: 'session',

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
            1: 'wtórny',
            2: 'pierwotny'
        },
        ROK_POWSTANIA: {


            1: 'lata 40',
            2: 'lata 50',
            3: 'lata 60',
            4: 'lata 70',
            5: 'lata 80',
            6: 'lata 90',
            7: '2000-2010',
            8: ''



        }
    },
    distanceNear: 5,
    distanceNearPOI: 50000,

})


export let menuVisible = writable(true);
export let loading = writable(false);
export let error = writable(false);


export let POIelements = {
    // metro: {
    //     id: 1,
    //     lat: 50.1113303,
    //     lon: 22.0556406,
    //     name: "Metro",
    //     city: "",
    //     dist: 0,
    //     type: "subway_station",
    //     searchStr: "stacja metra",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'metro.svg',
    // },
    bus: {
        id: 2,
        lat: 0,
        lon: 0,
        name: "Przystanek autobusowy",
        city: "",
        dist: 0,
        type: "bus_stop",
        searchStr: "przystanek",
        by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  
        icon: 'bus_stop.svg',
    },
    // tram: {
    //     id: 3,
    //     lat: 0,
    //     lon: 0,
    //     name: "Przystanek tramwajowy",
    //     city: "",
    //     dist: 0,
    //     type: "train_station",
    //     searchStr: "przystanek tramwajowy",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'train.svg',
    // },
    bus_station: {
        id: 4,
        lat: 0,
        lon: 0,
        name: "Dworzec autobusowy",
        city: "",
        dist: 0,
        type: "bus_station",
        searchStr: "bus station",
        by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  
        icon: 'bus_station.svg',
    },
    // train_station: {
    //     id: 5,
    //     lat: 0,
    //     lon: 0,
    //     name: "Dworzec PKP / kolej",
    //     city: "",
    //     dist: 0,
    //     type: "bus_station",
    //     searchStr: "bus station",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'train_station.svg',
    // },
    // szkola: {
    //     id: 6,
    //     lat: 0,
    //     lon: 0,
    //     name: "Szkoła",
    //     city: "",
    //     dist: 0,
    //     type: "school",
    //     searchStr: "szkoła gimnazjum",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'szkola.svg',
    // },
    // przedszkole: {
    //     id: 7,
    //     lat: 0,
    //     lon: 0,
    //     name: "Przedszkole",
    //     city: "",
    //     dist: 0,
    //     type: "preschool",
    //     searchStr: "przedszkole",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'przedszkole.svg',
    // },
    szpitalM: {
        id: 8,
        lat: 0,
        lon: 0,
        name: "Szpital miejski",
        city: "",
        dist: 0,
        type: "hospital",
        searchStr: "szpital",
        by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },   icon: 'szpitalM.svg',
    },
    // przychodnia: {
    //     id: 9,
    //     lat: 0,
    //     lon: 0,
    //     name: "Przychodnia",
    //     city: "",
    //     dist: 0,
    //     type: "doctor",
    //     searchStr: "przychodnia",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'przychodnia.svg',
    // },
    // shop: {
    //     id: 10,
    //     lat: 0,
    //     lon: 0,
    //     name: "Galeria handlowa",
    //     city: "",
    //     dist: 0,
    //     type: "store",
    //     searchStr: "sklep",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'shop.svg',
    // },
    // park: {
    //     id: 11,
    //     lat: 0,
    //     lon: 0,
    //     name: "Park / teren zielony",
    //     city: "",
    //     dist: 0,
    //     type: "park",
    //     searchStr: "park",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'park.svg',
    // },
    // portlot: {
    //     id: 12,
    //     lat: 0,
    //     lon: 0,
    //     name: "",
    //     city: "",
    //     dist: 0,
    //     type: "airport",
    //     searchStr: "airport",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'airport.svg',
    // }
    // klinika: {
    //     id: 13,
    //     lat: 0,
    //     lon: 0,
    //     name: "Klinika",
    //     city: "",
    //     dist: 0,
    //     type: "clinical",
    //     searchStr: "klinika",
    //     by_bike: { distance: 0, time: 0 },by_bus: { distance: 0, time: 0 },by_car: { distance: 0, time: 0 },  icon: 'klinika.svg',
    // },
}












