
import { PUBLIC_API_OPENROUTE, PUBLIC_GAPI } from '$env/static/public';
import axios from 'axios';
import { location, allDocuments, nearLocation, options, loading } from '$lib/stores/appStore.jsx';
import { get } from 'svelte/store';
import { point, distance } from '@turf/turf';
let polaOdpowiedzi = 'places.location,places.displayName';


let distanceNear;

options.subscribe(value => {
  distanceNear = value.distanceNear;
});


//NOTE POBIERZ DANE DISTANCE dla obecnych POI
export const updateDistanceData = async (data, local) => {

  // console.log('INPUT DATA FOR POI :',local, data);

  const openrouteservice = async (coordinates, medium) => {

    // console.log("coordinates :",coordinates);
    const url = 'https://api.openrouteservice.org/v2/directions/' + medium + '/json';

    const headers = {
      'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      'Content-Type': 'application/json',
      'Authorization': PUBLIC_API_OPENROUTE
    };

    const body = {
      coordinates: coordinates,
      radiuses: 5000
    };
    console.log(body)
    try {
      const response = await axios.post(url, body, { headers });
      // console.log('Status:', response.status);
      // console.log('Headers:', response.headers);
      // console.log('Data:', response.data);
      return response.data
    } catch (error) {
      // console.error('Error:', error.message);
      // return false;
    }
  };
  // ............   HTTP REQUEST  .................................

  const processData = async (data, mode, local) => {


    const arrayData = Object.values(data);

    for (const element of arrayData) {

      //NOTE jeśli parametr POI lon lat nie jest pusty -> sprawdz odległośc 

      // console.log("LONNNNN", element.lon)

      if (element.lat !== '0' && element.lon !== '0') {

        let coord = [[element.lon, element.lat], local];
        let result = await openrouteservice(coord, mode);
        // console.log('result Directions', element, result);
        // console.log("RESUKLT ", result);
        if (mode == 'driving-car') {
          element.by_car[{ distance: result.routes[0].summary.distance, time: result.routes[0].summary.duration }]
        }
        if (mode == 'cycling-regular') {
          element.by_bike[{ distance: result.routes[0].summary.distance, time: result.routes[0].summary.duration }]
        }

      }

    }
  };

  processData(data, 'driving-car', local);
  processData(data, 'cycling-regular', local);

};





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
    let options = { units: 'kilometers' };
    let calculatedDistance = distance(from, to, options);

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



let geojson = {
  'type': 'FeatureCollection',
  'features': []
};


export async function getLoc(loc, type = 'adres') {

  let options;
  let response;

  if (loc === undefined) {
    console.log('No location specified for [getLoc] function');
  }

  if (type === 'place_id' && loc !== undefined) {
    // console.log('Search by Place_ID:', loc)

    options = {
      maxBodyLength: Infinity, //https://places.googleapis.com/v1/places/ChIJj61dQgK6j4AR4GeTYWZsKWw?fields=id,displayName&key=
      url: 'https://places.googleapis.com/v1/places/' + loc + '?fields=location,displayName&key=' + PUBLIC_GAPI,
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': PUBLIC_GAPI,
        'X-Goog-FieldMask': polaOdpowiedzi
      }
    };
    response = await axios.request(options).then((data) => {

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
        return { 'error': "blad pobierania po place_id: " + options }
      }
    });

  } else {


    console.log('Search by adres: ', loc)


    let options = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=' + loc + '&key=' + PUBLIC_GAPI,
      headers: {}
    };
    response = await axios.request(options).then((data) => {
      if (data['data']['status'] === 'OK') {
        return data['data']['results'][0]
      } else {
        return data['error'] = data;
      }
    });


    //  RAPID API VERISON

    // options = {
    //   url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
    //   params: {
    //     address: loc,
    //     components: 'country:pl',
    //     language: 'pl'
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': PUBLIC_X_RapidAPI_Key,
    //     'X-RapidAPI-Host': PUBLIC_X_RapidAPI_Host
    //   }
    // };
    // response = await axios.request(options).then((data) => {
    //   if (data['data']['status'] === 'OK') {
    //     return data['data']['results'][0]
    //   } else {
    //     return data['error'] = data;
    //   }
    // });

    return response

  }
  return response
}

export async function getNearBy(loc) {


  for (var index in loc.params.POI) {
    var attr = loc.params.POI[index];
    console.log('getNearBy ', attr.type, loc);
    try {
      let data = await getNearAX(attr.searchStr, attr.type, loc.params.lat, loc.params.lon);
      console.log('getNearAX : ', data);
      if (data && data.places[0]['location']) {
        location.update(state => {
          state.params.POI[index].lat = data.places[0].location.latitude;
          state.params.POI[index].lon = data.places[0].location.longitude;
          state.params.POI[index].name = data.places[0].displayName.text;

          return state;
        });
      }

    } catch (error) {
      // console.log(error);
    }
  }




}


async function getNearAX(keyword, type, lat, lon) {

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
        "radius": 2000.0
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
      console.log('axios response : ', response)
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
        loc.lon,loc.lat
      ]
    },
    "properties": {
      "name": "Current Location",
      "iconSRC": "/images/POI/miastoDotC.svg"
    }
  }
 
  console.log("getBOUNDS", data)
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