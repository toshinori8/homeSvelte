<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import { scrollTo } from 'svelte-scrolling';
	import { PUBLIC_API_MAPTILER } from '$env/static/public';
	import { Map, Marker, MapStyle, config } from '@maptiler/sdk';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	config.apiKey = PUBLIC_API_MAPTILER;
	import { browser } from '$app/environment';

	import DistanceElement from '$lib/components/DistanceElement.svelte';
	import Loading from '$lib/components/loading.svelte';
	import {
		poiReady,
		loading,
		error,
		options,
		location,
		newLocation,
		allDocuments,
		currentDocument
	} from '$lib/stores/appStore';

	let POI;
	let colors = {
		cls0: '#75ffb0',
		cls1: '#03263D',
		cls2: '#29c2c9',
		cls3: '#334d4f',
		cls4: '#2181b3',
		cls5: '#056b45',
		cls6: '#21cc8c',
		cls7: '#0099b5',
		cls8: '#00336e',
		cls9: '#078c5f',
		cls10: '#03263D',
		cls11: '#86EAE2',
		cls12: '#004B49',
		cls13: '#5EE9C9',
		cls14: '#4DBDA1',
		cls15: '#53CDAC',
		cls16: '#00947A',
		cls17: '#122C28',
		cls18: '#209B94',
		cls19: '#1E8082',
		cls20: '#88B6B1',
		cls21: '#4CB7B4',
		cls22: '#16796B',
		cls23: '#78DBC0',
		cls24: '#63A69A',
		cls25: '#2B7871',
		cls26: '#4AABA8'
	};

	import { fade } from 'svelte/transition';
	// import fetchData from '$lib/database.js';

	// import { PUBLIC_API_MAPBOX } from 'PUBLIC_AUTH_TRUST_HOST';
	// import  Map  from 'mapbox-gl';
	// import '/node_modules/mapbox-gl/dist/mapbox-gl.css';

	import {
		getLoc,
		getNearBy,
		createPOIforMap,
		getBounds,
		getNearFromAllDocuments
	} from '$lib/functions';

	let mode,
		ready = false,
		map;

	async function initPOImap() {
		// console.log('Data for map exist', $location);
		map = new Map({
			container: 'mapa',
			style: MapStyle.BASIC,
			center: [$location.params.lon + 1, $location.params.lat + 1],
			zoom: 13
		});
		mode = 'edit';
		ready = true;
	}
	let addressMarkers = {};
	let addresMarkersArray = {};
	async function drawPoins(POI) {
		// NOTE rysowanie punktów na mapie #2
		addressMarkers = [];
		addresMarkersArray = [];
		let i = 0;
		if (POI && typeof POI === 'object') {
			for (let [key, poi] of Object.entries(POI)) {
				let color = colors['cls' + i];
				// console.log('DisplayPOI OBJECT', poi);
				let object = {
					color: color,
					name: poi.name,
					city: poi.city.shortText,
					time_car: poi.by_car.time_text,
					time_bus: poi.by_bus.time_text,
					time_bike: poi.by_bike.time_text
				};

				addresMarkersArray.push(object);
				let featureCoord = [poi.lon, poi.lat];

				const svgCode =
					`<svg id="Warstwa_1" class="drop" data-name="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.95 22.66"><defs><style></style></defs><path class="" fill="` +
					color +
					`" stroke=white stroke-width="0.6px" d="m7.98,0C3.57,0,0,3.57,0,7.97s7.98,14.69,7.98,14.69c0,0,7.97-10.28,7.97-14.69S12.39,0,7.98,0m0,11.9c-2.17,0-3.92-1.75-3.92-3.92s1.75-3.93,3.92-3.93,3.92,1.76,3.92,3.93-1.76,3.92-3.92,3.92Z"/></svg>`;

				const marker = new Marker({
					element: document.createElement('div') // Create a div element for the SVG
				})
					.setLngLat(featureCoord) // Marker position [lng, lat]
					.addTo(map);

				marker.getElement().innerHTML = svgCode;
				marker.getElement().style.width = '24px';
				marker.getElement().style.height = '20px';

				addressMarkers.push(marker);
				i++;
			}
		} else {
			// console.log(`POI is ${POI}. Please pass a valid object.`);
		}
		map.fitBounds($location.params.fitBounds, { padding: 80 });
		return true;
	}

	$: {
		if ($location && $location.params && ready == false) {
			initPOImap();
		}
		if ($location && $location.params && ready == true  && $poiReady==true) {
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

	onMount(() => {});
</script>

<div class="content-block section page_04">
	<Header />

	<div class="page_content _1">
		<div class="grid_content noselect full_width">
			<h2 class="title_medium noselect">
				<span class="number_type noselect">11</span> Wskaźniki czasu dojazdu
			</h2>

			<p class="opis_">
				Powyższa mapka i grafiki wskazują orientacyjne czasy dojazdów do określonych punktów
				docelowych.
			</p>
		</div>

		<div class="grid_content full_width mapa"><div id="mapa" /></div>
	</div>
	<div class="page_content _2">
		<div class="grid_content noselect POIelement">
			{#if $location && $location.params && $location.params.POI && addresMarkersArray.length > 1}
				{#each addresMarkersArray as poi}
					<DistanceElement
						poiName={poi.name}
						poiCity={poi.city}
						poiDistanceBus={poi.time_bus}
						poiDistanceCar={poi.time_car}
						poiDistanceBike={poi.time_bike}
						color={poi.color}
					/>
				{/each}
			{:else}
				<!-- svelte-ignore a11y-missing-attribute -->
				<a
					use:scrollTo={'page_01'}
					class="anachorTop text-center hover:bg-sky-700 hover:text-white transition-all p-5 rounded-lg"
					>Wybierz lokalizacje na stronie pierwszej</a
				>
			{/if}
		</div>
	</div>

	<div class="pageNumber">4</div>
</div>

<style lang="scss">
	.pageNumber {
		text-align: left;
	}
	:global(.POIelement) {
		min-height: 488px;
	}
	:global(.POIelement .svg-itema svg) {
		width: 305px;
		height: 137px;
		position: relative;
		display: block;
	}
	:global(.anachorTop) {
		text-align: center !important;
		position: relative;
		width: 100%;
	}
	:global(.POIelement .svg-itema) {
		width: 317px;
		/* border: solid 1px gray; */
		height: 171px;
		padding: 0px;
		position: relative;
		margin-top: -59px;
		display: block;
		max-width: unset;
		transform: scale(0.96);
	}
	:global(.maplibregl-control-container) {
		display: none !important;
	}
</style>
