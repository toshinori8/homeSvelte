<script>
	// import axios from 'axios';
	import { onMount, afterUpdate } from 'svelte';
	import { location } from '$lib/stores/appStore';
	import osmtogeojson from 'osmtogeojson';
	import * as turf from '@turf/turf';
	import * as d3 from 'd3';
	import rewind from '@mapbox/geojson-rewind';

	$: cityInput = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);

	let lon,
		lat,
		city,
		data,
		menu_settings_visible = false,
		isLoadingData = false,
		cityPolygon,
		cityInput = 'Rzeszów';
	// export const address = 'Spacerowa 125, 34-124 Klecza Dolna';
	let polygonPoints = [];
	let dotSpacing = 10;
	let shiftDistance = -dotSpacing / 3;
	let width = 300;
	let height = 400;

	const updateMap = async () => {
		if (isLoadingData) {
			return;
		}
		try {
			isLoadingData = true;
			// console.log(cityInput);
			const response = await findcityPolygon(cityInput);
		} catch (error) {
			console.error(error);
		} finally {
			isLoadingData = false;
		}
	};

	const findcityPolygon = async (city) => {
		const cityPolygonQuery = `
		[out:json];
		(
		  relation["admin_level"="8"]["boundary"="administrative"]["name"="${city}"];
		);
		out geom;
	  `;
		const query = encodeURIComponent(cityPolygonQuery);
		const boundaryUrl = `https://overpass-api.de/api/interpreter?data=${query}`;
		try {
			const response = await fetch(boundaryUrl);
			data = await response.json();
			// console.log('Poligons data', data);
			data = osmtogeojson(data);
			// console.log('GeoJson data', data);
			if (data.features && data.features.length > 0) {
				// cityPolygon = data.features[0];
				cityPolygon = data;
// console.log('CityPolygon data', cityPolygon);
				drawImage();
			} else {
				console.error('City boundary not found in OSM.');
			}
		} catch (error) {
			console.error('Error fetching city boundary:', error);
		}
	};

	const updatecityPolygon = () => {
		const coordinates = cityPolygon[0].geometry.coordinates[0]; // polygon dla mapy

		const getBoundingBox = (coordinates) => {
			const pointCoordinates = [parseFloat($location.params.lon), parseFloat($location.params.lat)];

			var line = turf.lineString(coordinates);

			const cityPolygonBounds = turf.bbox(line);
			return [
				[
					Math.min(pointCoordinates[0], cityPolygonBounds[0]),
					Math.min(pointCoordinates[1], cityPolygonBounds[1])
				],
				[
					Math.max(pointCoordinates[0], cityPolygonBounds[2]),
					Math.max(pointCoordinates[1], cityPolygonBounds[3])
				]
			];
		};

		const boundingBox = getBoundingBox(coordinates);
		boundingBox, { padding: 280 };
	};

	onMount(() => {
		if ($location && $location.params && $location.params.lat) {
			// lat = $location.params.lat;
			// lon = $location.params.lon;
			lat = 50.0374531;
			lon = 22.0047174;
			if ($location.params.imagePage6) {
				let svgObject = JSON.parse($location.params.imagePage6);
				let svgContent = svgObject.svg;


				document.querySelector('.svgMap').innerHTML = svgContent;
			
				

			} else {
				updateMap();
			}
		}
	});

	let startX; // Zadeklaruj zmienną startX przed użyciem w funkcji dragHandler()
	let startY; // Zadeklaruj zmienną startX przed użyciem w funkcji dragHandler()

	function saveImage() {
		let obj = { svg: document.querySelector('.svgMap').outerHTML };

		// Konwertuj obiekt na format JSON
		obj = JSON.stringify(obj);

		$location.params.page06.imageSVG = obj;
	}

	function drawImage() {
		const _geoJson = rewind(cityPolygon, true);

		let svg = d3
			.create('svg')
			.attr('width', '790')
			.attr('height', '457')
			.style('border', 'none')
			.classed('svgMap', true);


		let center = cityPolygon.features[1].geometry.coordinates

		const projection = d3.geoMercator().center(center).fitSize([width, height], _geoJson.features[0]);

		projection.scale(projection.scale() * $location.params.page06.scalefactor);

		const path = d3.geoPath().projection(projection);

		function dragHandler() {
			return d3
				.drag()
				.on('start', function (e) {
					// Pobieramy początkowe współrzędne myszy

					startX = e.x;
					startY = e.y;
				})
				.on('drag', function (e) {
					// Obliczamy różnicę między aktualnymi współrzędnymi myszy a początkowymi
					const dx = e.x - startX;
					const dy = e.y - startY;

					// Pobieramy aktualne współrzędne x i y obrazu
					let x = +image.attr('x') + dx;
					let y = +image.attr('y') + dy;

					// Ustawiamy nowe współrzędne dla obrazu
					image.attr('x', x).attr('y', y);

					// Aktualizujemy początkowe współrzędne myszy
					startX = e.x;
					startY = e.y;
				})
				.on('end', function () {
					saveImage();
				});
		}

		function dragHandlerDots() {
			return d3
				.drag()
				.on('start', function (e) {
					// Pobieramy początkowe współrzędne myszy

					startX = e.x;
					startY = e.y;
				})
				.on('drag', function (e) {
					// Obliczamy różnicę między aktualnymi współrzędnymi myszy a początkowymi
					const dx = e.x - startX;
					const dy = e.y - startY;

					// Sprawdzamy, czy atrybut transform istnieje
					let transformAttr = circlesGroup.attr('transform');
					let transformX = transformAttr
						? +transformAttr.split(',')[0].replace('translate(', '')
						: 0;
					let transformY = transformAttr ? +transformAttr.split(',')[1].replace(')', '') : 0;

					// Przesuwamy grupę kółek (circlesGroup)
					let x = transformX + dx;
					let y = transformY + dy;

					// Ustawiamy nowe współrzędne dla grupy kółek
					circlesGroup.attr('transform', `translate(${x},${y})`);

					// Aktualizujemy początkowe współrzędne myszy
					startX = e.x;
					startY = e.y;
				})
				.on('end', function () {
					saveImage();
				});
		}

		document.querySelectorAll('#polygonMAP svg').forEach((e) => {
			e.remove();
		});
		document.querySelector('#polygonMAP').appendChild(svg.node());

		////   POINT

		let newPointGeoJson = turf.point([lon, lat]);
		let newPointCoords = projection([lon, lat]);

		var xAxis = d3.range(0, width, dotSpacing);
		var yAxis = d3.range(0, height, dotSpacing);

		////   POINT

		let circlesGroup = svg.append('g').classed('circlesGroup', true);

		circlesGroup
			.append('path')
			.attr('fill', 'white')
			.attr('stroke', 'red')
			.datum(_geoJson.features[0])
			.attr('opacity', '0.05')
			.attr('d', path);

		// Dodajemy punkty na mapie do grupy
		yAxis.forEach((y, i) => {
			xAxis.forEach((x) => {
				const geoPoint = projection.invert([x, y]);
				if (turf.booleanPointInPolygon(geoPoint, _geoJson.features[0])) {
					circlesGroup
						.append('circle')
						.attr('cx', x + (i % 2 === 0 ? 0 : shiftDistance) + 2)
						.attr('cy', y)
						.attr('r', dotSpacing / 2.8)
						.style('fill', 'rgba(72, 165, 227, 1.000)');
				}
			});
		});
		circlesGroup.call(dragHandlerDots());

		const middleX = (xAxis[xAxis.length - 1] + xAxis[0]) / 2;
		const middleY = (yAxis[yAxis.length - 1] + yAxis[0]) / 2;
		newPointCoords[0] = middleX;
		newPointCoords[1] = middleY;

		const image = svg
			.append('image')
			.attr('xlink:href', 'images/iconLocation.png')
			.attr('x', newPointCoords[0])
			.attr('y', newPointCoords[1])
			.attr('width', '70') // Ustaw szerokość obrazu
			.classed('pointCoord', true)
			.call(dragHandler());

		d3.select('.pointCoord').raise();
	
	

		


	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/mapaDots.css" />
</svelte:head>

<main>
	<button
		on:click={() => {
			menu_settings_visible = true;
		}}
		class="options noPrint">Opcje</button
	>
	<div class="map-wrap">
		<div id="polygonMAP" />
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
		<label for="city">Skalowanie</label>
		<input type="number" step="0.01" bind:value={$location.params.page06.scalefactor} />
		<!-- <label for="address">Punkt:</label>
		<input type="text" bind:value={address} /> -->
		<button class="getLoc" on:click={updateMap}>Pobierz grafike miasta</button>
		<!-- <button class="getPoint" on:click={updatePoint}>Pobierz punkt</button> -->
	</div>
</main>

<style>
	:global(.polygonMAP svg path) {
		transform: matrix(47, 0, 0, 47, -929, -2229);
	}

	:global(.svgMap) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.03) !important;
	}
	:global(.options) {
		background-color: rgba(206, 42, 42, 0.672);
		border: 1px solid rgba(0, 0, 0, 0.03) !important;
		font-size: 10px;
		box-shadow: 3px 3px 18px 3px rgba(165, 165, 165, 0.5);
		border-radius: 8px;
		padding: 5px;
		padding-top: 1px;
		padding-bottom: 1px;
		transition: all ease 0.3s;
		color: white;
		margin-top: 527px;
		position: absolute;
		margin-left: -204px;
		z-index: 999999999999999;
	}

	:global(.options:hover) {
		color: white;
		background-color: rgba(0, 0, 0, 0.672);
	}

	.polygonMAP {
		border: 1px solid #ccc;
		height: 500px;
		width: 500px;
	}
	.circle {
		transform-origin: center;
	}
</style>
