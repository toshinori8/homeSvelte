import { PUBLIC_API_OPENROUTE, PUBLIC_GAPI } from '$env/static/public';
import axios from 'axios';
import { location, allDocuments, nearLocation, options, loading } from '$lib/stores/appStore';
import { get } from 'svelte/store';
import { point, distance } from '@turf/turf';
let polaOdpowiedzi = 'places.location,places.displayName,places.addressComponents.shortText';
import { browser } from '$app/environment';

let distanceNear, distanceNearPOI;
options.subscribe(value => {
  // Tutaj możesz wykonać operacje na wartościach
  distanceNear = value.distanceNear;
  distanceNearPOI = value.distanceNearPOI;


  console.log("distanceNearPOI", distanceNearPOI)


});



axios.defaults.adapter = 'xhr';

// openRoute Helper Service
const openrouteService = async (coordinates, medium) => {
  const url = 'https://api.openrouteservice.org/v2/directions/' + medium + '/json';
  const headers = {
    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
    'Content-Type': 'application/json',
    'Authorization': PUBLIC_API_OPENROUTE
  };

  const body = {
    coordinates: coordinates,
    // radiuses: -1
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error('openrouteService Error:', error.message);
    return null; // Zwracanie null zamiast false
  }

};
// Google Directions Helper Service 

let loaded = false;
let directionsService;
const gDirectionsService = async (coord) => {
  const useDirections = () => {
    return new Promise((resolve, reject) => {
      const request = {
        origin: coord[0][1] + ',' + coord[0][0],
        destination: coord[1][0] + ',' + coord[1][1],
        travelMode: "TRANSIT",
      };
      directionsService.route(request, function (response, status) {
        if (status === 'OK') {
          resolve(response);
        } else {
          reject(new Error("Directions request failed due to " + status));
        }
      });
    });
  };

  if (browser && window.google && !loaded) {
    let google = window.google;
    directionsService = new google.maps.DirectionsService();
    return useDirections();
  }
};




//NOTE POBIERZ DANE DISTANCE dla obecnych POI

export const updateDistanceData = async (data, local) => {
  let response = [];

  console.log('updateDistanceData', data)

  for (let i = 0; i < data.length; i++) {
    const el = data[i];

    if (el.lon !== 0 && el.lat !== 0) {
      let res;
      let coord = [[el.lon, el.lat], local];
      let obj = {};

      if (el.by_car) {

        res = await openrouteService(coord, "driving-car");
        if (res && res.routes && res.routes[0]) {


          el.by_car.distance = res.routes[0].summary.distance,
            el.by_car.distance_text = (res.routes[0].summary.distance / 1000).toFixed(1).replace('.', ',') + ' km',
            el.by_car.time = res.routes[0].summary.duration,
            el.by_car.time_text = Math.round(res.routes[0].summary.duration / 60).toString()
        }
      }
     
      if (el.by_bike) {

        res = await openrouteService(coord, "cycling-regular");
        if (res && res.routes && res.routes[0]) {

            el.by_bike.distance = res.routes[0].summary.distance,
            el.by_bike.distance_text = (res.routes[0].summary.distance / 1000).toFixed(1).replace('.', ',') + ' km',
            el.by_bike.time = res.routes[0].summary.duration,
            el.by_bike.time_text = Math.round(res.routes[0].summary.duration / 60).toString()
        }







        // console.log(el)





        // console.log('respOND', res)



    }

    if (el.by_bus) {          ///      "GOOGLE DIRECTIONS BY BUS" 
      let coordG = [local, [el.lat, el.lon]];
      let res = await gDirectionsService(coordG);

      if (res && res.routes && res.routes[0] && res.routes[0].legs[0]) {

        el.by_bus.distance = res.routes[0].legs[0].distance.value,
        el.by_bus.distance_text = res.routes[0].legs[0].distance.text,
        el.by_bus.time = res.routes[0].legs[0].duration.value,
        el.by_bus.time_text = res.routes[0].legs[0].duration.text.replace(" min", "")

      }
    }

    // response.push(el);

  }

  }
return true
}
  // export const updateDistanceData = async (data, local) => {
  //   let response = [];


  //   console.log('updateDistanceData',data)



  //   for (let property in data) {

  //     if (data.hasOwnProperty(property)) {
  //       let inner = data[property];
  //       for (let prop in inner) {
  //         //////////////////////////////////////////// 
  //         if (inner.hasOwnProperty(prop) && (prop === "by_car" || prop === "by_bike")) {

  //           let coord = [[data[property].lon, data[property].lat], local];
  //           // console.log("coord Opens", coord);
  //           let res;
  //           if (prop == "by_bike") {
  //             res = await openrouteService(coord, "cycling-regular");
  //           }
  //           if (prop == "by_car") {
  //             res = await openrouteService(coord, "driving-car");
  //           }

  //           if (res && res.routes && res.routes[0] && res.routes[0].summary) {
  //             let existingObject = response.find(obj => obj[property]);

  //             if (existingObject) {
  //               existingObject[property][prop] = {
  //                 id: data[property].id,
  //                 name: data[property].name,
  //                 distance: res.routes[0].summary.distance,
  //                 distance_text: (res.routes[0].summary.distance / 1000).toFixed(1).replace('.', ',') + ' km',
  //                 time: res.routes[0].summary.duration,
  //                 time_text: Math.round(res.routes[0].summary.duration / 60).toString()

  //               };
  //             } else {
  //               let obj = {};
  //               obj[property] = {};
  //               obj[property][prop] = {
  //                 id: data[property].id,
  //                 name: data[property].name,
  //                 distance: res.routes[0].summary.distance,
  //                 distance_text: (res.routes[0].summary.distance / 1000).toFixed(1).replace('.', ',') + ' km',
  //                 time: res.routes[0].summary.duration,
  //                 time_text: Math.round(res.routes[0].summary.duration / 60).toString()

  //               };
  //               response.push(obj);
  //             }
  //           }

  //         }
  //         ////////////////////////////////////////////
  //         if (inner.hasOwnProperty(prop) && (prop === "by_bus")) {

  //           let coord = [local, [data[property].lat, data[property].lon]];
  //           // console.log("coord Ggle", coord);
  //           let res = await gDirectionsService(coord);

  //           if (res) {

  //             let existingObject = response.find(obj => obj[property]);

  //             if (res.routes[0] && res.routes[0].legs[0]) {
  //               if (existingObject) {
  //                 existingObject[property][prop] = {
  //                   id: data[property].id,
  //                   name: data[property].name,
  //                   distance: res.routes[0].legs[0].distance.value,
  //                   distance_text: res.routes[0].legs[0].distance.text,
  //                   time: res.routes[0].legs[0].duration.value,
  //                   time_text: res.routes[0].legs[0].duration.text.replace(" min", "")
  //                 };
  //               } else {
  //                 let obj = {};
  //                 obj[property] = {};
  //                 obj[property][prop] = {
  //                   id: data[property].id,
  //                   name: data[property].name,
  //                   distance: res.routes[0].legs[0].distance.value,
  //                   distance_text: res.routes[0].legs[0].distance.text,
  //                   time: res.routes[0].legs[0].duration.value,
  //                   time_text: res.routes[0].legs[0].duration.text
  //                 };
  //                 response.push(obj);
  //               }
  //             }
  //           }


  //         }
  //         ////////////////////////////////////////////
  //       }
  //     }
  //   }

  //   return response;
  // }




  //NOTE  pobierz punkty wokół lokalizacji 
  export function convData2Geo(data) {
    let POINTS = [];

    data.forEach(el => {
      POINTS.push({
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [parseFloat(el.params.lon), parseFloat(el.params.lat)]
        },
        'properties': {
          'params': el.params,
          'place_id': el.place_id,
          'id': el.ID,
          'createDate': el.createDate,
          'adres': el.adres,
          'sellDate': el.sellDate,
        }
      });
    });
    let GEOJSON = {
      'type': 'FeatureCollection',
      'features': POINTS
    };
    return GEOJSON
  }
  export async function getNearFromAllDocuments() {

    // console.log("options near distance", distanceNear)
    // let distanceNear = 1500000000
    let docs = get(allDocuments),
      POINTS = [];
    for (let key in docs) {
      let el = docs[key];
      let from = point([parseFloat(el.params.lon), parseFloat(el.params.lat)]);
      let to = point([parseFloat(get(location).params.lon), parseFloat(get(location).params.lat)]);
      let optionsx = { units: 'meters' };
      let calculatedDistance = distance(from, to, optionsx);

      if (calculatedDistance <= distanceNear) {
        POINTS.push({
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [parseFloat(el.params.lon), parseFloat(el.params.lat)]
          },
          'properties': {
            'params': el.params,
            'place_id': el.place_id,
            'id': el.ID,
            'createDate': el.createDate,
            'adres': el.adres,
            'sellDate': el.sellDate,
            'distanceToReference': calculatedDistance,

          }
        });
      }
    }

    let GEOJSON = {
      'type': 'FeatureCollection',
      'features': POINTS
    };
    nearLocation.set(GEOJSON)
    return GEOJSON;
  }

  export let geojson = {
    'type': 'FeatureCollection',
    'features': []
  };

  export async function getLoc(loc, type = 'adres') {

    let opt;
    let response;

    if (loc === undefined) {
      console.log('No location specified for [getLoc] function');
    }

    if (type === 'place_id' && loc !== undefined) {
      // console.log('Search by Place_ID:', loc)

      opt = {
        maxBodyLength: Infinity, //https://places.googleapis.com/v1/places/ChIJj61dQgK6j4AR4GeTYWZsKWw?fields=id,displayName&key=
        url: 'https://places.googleapis.com/v1/places/' + loc + '?fields=location,displayName&key=' + PUBLIC_GAPI,
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': PUBLIC_GAPI,
          'X-Goog-FieldMask': polaOdpowiedzi
        }
      };
      response = await axios.request(opt).then((data) => {

        console.log(data)

        if (data['status'] === 200) {

          let respons = {

            geometry: {
              location: {
                lng: data['data']['location']['longitude'],
                lat: data['data']['location']['latitude']
              }
            }
          };
          return respons
        } else {
          return { 'error': "blad pobierania po place_id: " + opt }
        }
      });

    } else {


      // console.log('Search by adres: ', loc)


      let opt1 = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=' + loc + '&key=' + PUBLIC_GAPI,
        headers: {}
      };
      response = await axios.request(opt1).then((data) => {
        if (data['data']['status'] === 'OK') {
          console.log(data);
          return data['data']['results'][0];
          
        } else {
          console.log(data);
          return data['error'] = data;
        }
      });
      return response
    }
    return response
  }

  export async function getNearBy(loc) {


    for (var index in loc.params.POI) {
      var attr = loc.params.POI[index];
      console.log('getNearBy ', attr.type, loc);
      try {
        let data = await getNearAX(attr.searchStr, attr.type, loc.params.lat, loc.params.lon, distanceNearPOI);
        // console.log('getNearAX : ', data);
        if (data && data.places[0]['location']) {
          location.update(state => {
            state.params.POI[index].lat = data.places[0].location.latitude;
            state.params.POI[index].lon = data.places[0].location.longitude;
            state.params.POI[index].name = data.places[0].displayName.text;
            state.params.POI[index].city = data.places[0].addressComponents[2];

console.log(state);
            return state;
          });
        }

      } catch (error) {
        // console.log(error);
      }
    }




  }





export async function getNearAXOpen(keyword, type, lat, lon, radius) {
  console.log('checking amenity', keyword, type, lat, lon, radius);

  try {
    const overpassQuery = `
      [out:json];
      (
        node["amenity"="${type}"](around:${radius},${lat},${lon});
      );
      out body 1;
    `;

    const config = {
      method: 'post',
      url: 'https://overpass-api.de/api/interpreter',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        data: overpassQuery,
      },
    };

    const response = await axios.request(config);
    console.log('Overpass response:', response.data);

    // Przetwarzanie odpowiedzi Overpass i zwracanie danych w odpowiednim formacie
    const pois = response.data.elements.map((element) => ({
      name: element.tags.name,
      latitude: element.lat,
      longitude: element.lon,

      // Dodaj więcej pól w zależności od potrzeb
    }));

    return pois;
  } catch (error) {
    console.error('Błąd podczas wyszukiwania pobliskich punktów:', error);
    return null;
  }
}
  export async function getNearAX(keyword, type, lat, lon) {

    // https://developers.google.com/maps/documentation/places/web-service/place-types?hl=pl#table-a

    let data = JSON.stringify({
      "includedTypes": [type],
      "maxResultCount": 1,
      "languageCode": "pl",
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": lat,
            "longitude": lon
          },
          "radius": distanceNearPOI
        }
      }
    });

    // console.log(data)

    // console.log(' send Data to axios: ',data)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://places.googleapis.com/v1/places:searchNearby?fields=' + polaOdpowiedzi + '&key=' + PUBLIC_GAPI,
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': 'AIzaSyDTVU5CPuioayuZWRA6ND6l97_cvpOsW6I',
        'X-Goog-FieldMask': polaOdpowiedzi
      },
      data: data
    };

    // console.log('searchNearby', config);

    return axios.request(config)
      .then((response) => {
        console.log('google places response : ', response)
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return true;
      });
  }

  export async function getBounds(data, loc) {
    let locationCurrent = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          loc.lon, loc.lat
        ]
      },
      "properties": {
        "name": "Current Location",
        "iconSRC": "/images/POI/miastoDotC.svg"
      }
    }

    // console.log("getBOUNDS", data)
    data.push(locationCurrent)
    //NOTE: Kreacja ramki ZOOM dla punktów POI 
    let Points = [];
    for (let key in data) {
      Points.push(data[key].geometry.coordinates);
    }

    let getSWCoordinates = function (coordinatesCollection) {
      const lowestLng = Math.min(
        ...coordinatesCollection.map((coordinates) => coordinates[0])
      );
      const lowestLat = Math.min(
        ...coordinatesCollection.map((coordinates) => coordinates[1])
      );

      return [lowestLng, lowestLat];
    }

    let getNECoordinates = function (coordinatesCollection) {
      const highestLng = Math.max(
        ...coordinatesCollection.map((coordinates) => coordinates[0])
      );
      const highestLat = Math.max(
        ...coordinatesCollection.map((coordinates) => coordinates[1])
      );

      return [highestLng, highestLat];
    }

    let calcBoundsFromCoordinates = function (coordinatesCollection) {
      return [
        getSWCoordinates(coordinatesCollection),
        getNECoordinates(coordinatesCollection),
      ];
    }
    return calcBoundsFromCoordinates(Points);
  }

  export async function createPOIforMap(poi) {
    // NOTE: Nowy punkty POI 
    function dodajPunkt(longitude, latitude, name, icon) {
      let nowyPunkt = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        properties: {
          name: name,
          // url(/images/POI/szpitalM.svg)
          iconSRC: icon,


        }
      };

      geojson.features.push(nowyPunkt);
    }
    geojson.features = []; //NOTE Reset punktów POI 
    for (var poiType in poi) {


      if (poi[poiType].lon != 0) {

        console.log(poiType, poi[poiType].lat, poi[poiType].lon);


        dodajPunkt(poi[poiType].lon, poi[poiType].lat, poi[poiType].name, '/images/POI/' + poi[poiType].icon, poi.name);

      }
    }

    // console.log(geojson);
    return geojson;
  }

  export async function getBox(lat, lng, zoom, width, height) {
    const EARTH_CIR_METERS = 40075016.686;
    let degreesPerMeter = 360 / EARTH_CIR_METERS;
    function toRadians(degrees) {
      return degrees * Math.PI / 180;
    };
    const metersPerPixelEW = EARTH_CIR_METERS / Math.pow(2, zoom + 8);
    const metersPerPixelNS = EARTH_CIR_METERS / Math.pow(2, zoom + 8) * Math.cos(toRadians(lat));

    const shiftMetersEW = width / 2 * metersPerPixelEW;
    const shiftMetersNS = height / 2 * metersPerPixelNS;

    const shiftDegreesEW = shiftMetersEW * degreesPerMeter;
    const shiftDegreesNS = shiftMetersNS * degreesPerMeter;
    // [[south, west], [north, east]]
    return [[lat - shiftDegreesNS, lng - shiftDegreesEW], [lat + shiftDegreesNS, lng + shiftDegreesEW]];

  };

  export function redirect(pageName) {
    loading.set(true);
    window.location = pageName;
  }
