<script>
	import axios from 'axios';
	import { onMount, afterUpdate } from 'svelte';

	// import mapboxgl from 'mapbox-gl';
	// import { PUBLIC_API_MAPBOX } from 'PUBLIC_AUTH_TRUST_HOST';
	// import 'mapbox-gl/dist/mapbox-gl.css';

	import { PUBLIC_API_MAPTILER } from '$env/static/public';
	import {Map, MapStyle, config} from '@maptiler/sdk';
  	import "@maptiler/sdk/dist/maptiler-sdk.css";
	  config.apiKey =PUBLIC_API_MAPTILER;
		Map.workerCount = 10;
	
	import osmtogeojson from 'osmtogeojson';
	import * as turf from '@turf/turf';

	// import MapaDots from '$lib/components/MapaDots.css?inline'
	import { location } from '$lib/stores/appStore';
	

	let mapMarkers = [];
	let map;
	let mapContainer;
	let cityInput = '';
	export const address = 'Spacerowa 125, 34-124 Klecza Dolna';

	let cityBoundary;
	let city;
	let data;
	let menu_settings_visible = false;
	let message;

	let circles = [];

	const updateMap = async () => {
		const locationInfo = await getLocationInfo(address);
		await findCityBoundary(cityInput);
		updateCityBoundary();
	};

	const getLocationInfo = async (address) => {
		// console.log('getLocationInfo', address);

		try {
			const response = await axios.get('https://nominatim.openstreetmap.org/search', {
				params: {
					q: address,
					format: 'json',
					addressdetails: 1
				}
			});

			if (response.data.length > 0) {
				const locationInfo = response.data[0];
				$location.params.lat = locationInfo.lat;
				$location.params.lon = locationInfo.lon;

				await findTownHallsNearby();
			} else {
				message = 'Brak wyników.';
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			message = 'Wystąpił błąd podczas pobierania danych.';
		}
	};

	const findTownHallsNearby = async () => {
		try {
			const overpassQuery = `
        [out:json];
        (
          node["amenity"="townhall"]["name"~"Urząd Miasta"](around:10000, ${$location.params.lat}, ${$location.params.lon});
          way["amenity"="townhall"]["name"~"Urząd Miasta"](around:10000, ${$location.params.lat}, ${$location.params.lon});
        );
        out center;
      `;

			const encodedQuery = encodeURIComponent(overpassQuery);
			let apiUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;

			const response = await axios.get(apiUrl);

			// console.log('Response PLACE', response);

			if (response.data.elements && response.data.elements.length > 0) {
				let townHalls = response.data.elements;

				if (townHalls[0].tags && townHalls[0].tags.name) {
					city = townHalls[0].tags['addr:city'];
					// console.log('Nazwa miasta:', city);

					await findCityBoundary(city);
				}

				message = `Znaleziono ${townHalls.length} urzędów miasta w okolicy.`;
			} else {
				message = 'Nie znaleziono urzędów miasta w okolicy.';
			}
		} catch (err) {
			console.error('Błąd podczas wyszukiwania urzędów miasta:', err);
			message = 'Wystąpił błąd podczas wyszukiwania urzędów miasta.';
		}
	};

	const findCityBoundary = async (city) => {
		const cityBoundaryQuery = `
		[out:json];
		(
		  relation["admin_level"="8"]["boundary"="administrative"]["name"="${city}"];
		);
		out geom;
	  `;

		const query = encodeURIComponent(cityBoundaryQuery);
		const boundaryUrl = `https://overpass-api.de/api/interpreter?data=${query}`;

		try {
			const response = await fetch(boundaryUrl);
			data = await response.json();
			// console.log("Poligons data", boundaryUrl,data);

			data = osmtogeojson(data);

			// console.log('GeoJson data', data);
			if (data.features && data.features.length > 0) {
				cityBoundary = data.features;
			} else {
				console.error('City boundary not found in OSM.');
			}
		} catch (error) {
			console.error('Error fetching city boundary:', error);
		}
	};

	let zoomLevel;

	// Function to calculate circle size and spacing based on zoom level
	const calculateCircleParameters = () => {
		zoomLevel = map.getZoom();
		const baseSize = 5.4; // Base circle size
		const baseSpacing = 0.002; // Base circle spacing
		const sizeMultiplier = Math.pow(1, zoomLevel - 3); // Adjust size based on zoom level
		const spacingMultiplier = Math.pow(1, 3 - zoomLevel); // Adjust spacing based on zoom level

		const circleSize = baseSize * sizeMultiplier;
		const circleSpacing = baseSpacing * spacingMultiplier;

		return { circleSize, circleSpacing };
	};

	const updateCityBoundary = () => {
		mapMarkers.forEach((marker) => marker.remove());
		mapMarkers = [];

		const coordinates = cityBoundary[0].geometry.coordinates[0]; // polygon dla mapy

		drawCircles(data.features[0], 100);

		const markerElement = document.createElement('img');
		markerElement.src = '../images/iconLocation.png';
		markerElement.style.width = '120px'; // Ustaw szerokość markera na 50 pikseli

		const marker = new Marker({
			draggable: true,
			element: markerElement
		})
			.setLngLat([$location.params.lon, $location.params.lat])
			.addTo(map);

		mapMarkers.push(marker);

		function onDragEnd() {
			markerElement.classList.remove('animate-icon');
			const lngLat = marker.getLngLat();
			$location.params.lon = lngLat.lon;
			$location.params.lat = lngLat.lat;
		}

		marker.on('dragend', onDragEnd);

		markerElement.addEventListener('drag', () => {
			markerElement.classList.add('animate-icon');
		});

		marker.on('dragend', onDragEnd);
		const getBoundingBox = (coordinates) => {
			const pointCoordinates = [parseFloat($location.params.lon), parseFloat($location.params.lat)];

			var line = turf.lineString(coordinates);

			const cityBoundaryBounds = turf.bbox(line);

			// console.log(cityBoundaryBounds);
			// console.log(pointCoordinates);
			return [
				[
					Math.min(pointCoordinates[0], cityBoundaryBounds[0]),
					Math.min(pointCoordinates[1], cityBoundaryBounds[1])
				],
				[
					Math.max(pointCoordinates[0], cityBoundaryBounds[2]),
					Math.max(pointCoordinates[1], cityBoundaryBounds[3])
				]
			];
		};

		const boundingBox = getBoundingBox(coordinates);
		(boundingBox, { padding: 280 });
	};

	const createCircleElement = (color, width, height) => {
		const element = document.createElement('div');
		element.style.width = `${width}px`;
		element.style.height = `${height}px`;
		element.style.borderRadius = '50%';
		element.style.backgroundColor = color;
		return element;
	};

	const updateCircleColors = (polygon) => {
		// console.log('updateCircleColors');
		circles.forEach((circle) => {
			// console.log('circle',circle);
			const lngLat = circle.getLngLat();
			if (turf.booleanPointInPolygon([lngLat.lng, lngLat.lat], polygon)) {
				circle.getElement().style.backgroundColor = '#2181b3';
			} else {
				circle.getElement().style.backgroundColor = 'white';
			}
		});
	};

	const drawCircles = (polygon) => {
		const { circleSize, circleSpacing } = calculateCircleParameters();

		const wicon = 0.00471;
		const hicon = wicon;
		const bbox = turf.bbox(polygon);
		const width = bbox[2] - bbox[0];
		const height = bbox[3] - bbox[1];
		const numColumns = width / (wicon * 2);
		const numRows = height / (hicon * 2 - 0.002);

		const totalCircles = numColumns * numRows;
		if (totalCircles > 0) {
			const columnDistance = width / numColumns;
			const rowDistance = height / numRows;
			// console.log("column distance: " + columnDistance + " row distance: " + rowDistance);
			for (let i = 0; i < numRows; i++) {
				for (let j = 0; j < numColumns; j++) {
					const lng =
						bbox[0] + (j * columnDistance + columnDistance / 2 - (i % 2 === 0 ? 0 : wicon));
					const lat = bbox[1] + i * rowDistance + rowDistance / 2;

					const adjustedCircleSize = circleSize;

					const circle = new Marker({
						draggable: false,
						element: createCircleElement('#2181b3', adjustedCircleSize, adjustedCircleSize)
					})
						.setLngLat([lng, lat])
						.addTo(map);
					if (turf.booleanPointInPolygon([lng, lat], polygon)) {
						circle.getElement().style.backgroundColor = 'green';
					} else {
						circle.remove();
					}
					circles.push(circle);
				}
			}
		}
		updateCircleColors(polygon);
		// console.log("Layers :: ",map.getStyle().layers);
		const layers = map.getStyle().layers;

		layers.forEach((layer) => {
			if (layer.id !== 'desired-layer-id') {
				map.setLayoutProperty(layer.id, 'visibility', 'none');
			}
		});
	};

	onMount(() => {
		if ($location && $location.params && $location.params.lat) {
			map = new Map({
		
				container: mapContainer,
				// style: 'mapbox://styles/mapbox/outdoors-v11',
				style: MapStyle.BASIC,
				center: [$location.params.lon, $location.params.lat],
				preserveDrawingBuffer: true,
				zoom: 9
			});

			map.on('click', () => {
				menu_settings_visible = true;
			});

			map.on('zoom', () => {
				updateMap();
			});

			updateMap();
		}
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/mapaDots.css" />
</svelte:head>

<main>
	<div class="map-wrap">
		<div class="map" bind:this={mapContainer} />
	</div>

	<div class="settings-menu {menu_settings_visible}" id="settings-menu">
		<button
			class="close"
			on:click={() => {
				menu_settings_visible = false;
			}}>x</button
		>

		<label for="city">Miasto:</label>
		<input type="text" bind:value={cityInput} />

		<label for="address">Adres:</label>
		<input type="text" bind:value={address} />

		<button class="getLoc" on:click={updateMap}>Pobierz informacje</button>
	</div>
</main>
