<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';

	import { PUBLIC_API_MAPTILER } from '$env/static/public';
	import { Map, MapStyle, config } from '@maptiler/sdk';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	config.apiKey = PUBLIC_API_MAPTILER;

	import DistanceElement from '$lib/components/DistanceElement.svelte';
	import Loading from '$lib/components/loading.svelte';
	import {
		loading,
		error,
		options,
		location,
		newLocation,
		allDocuments,
		currentDocument
	} from '$lib/stores/appStore.js';

	import { fade } from 'svelte/transition';
	// import fetchData from '$lib/database.js';

	// import { PUBLIC_API_MAPBOX } from '$env/static/public';
	// import  Map  from 'mapbox-gl';
	// import '/node_modules/mapbox-gl/dist/mapbox-gl.css';

	import {
		getLoc,
		getNearBy,
		createPOIforMap,
		getBounds,
		getNearFromAllDocuments
	} from '$lib/functions';

	let mode, ready=false, map;

	async function initPOImap() {
		console.log('Data for map exist', $location);
		map = new Map({
			container: 'mapa',
			style: MapStyle.OUTDOOR,
			center: [$location.params.lon + 1, $location.params.lat + 1],
			zoom: 13
		});
		mode = 'edit';
		ready = true;
	}
	// initPOImap();
	$: {
		if ($location && $location.params && ready ==false) {
			initPOImap();
		}
	}

	onMount(() => {
		
	});
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

		<div class="grid_content full_width mapa"><div id="mapa" ></div></div>
	</div>
	<div class="page_content _2">
		<div class="grid_content noselect POIelement">
			<DistanceElement
				poiName="Galeria Rzeszowska"
				poiCity="Rzeszów"
				poiDistanceBus="23"
				poiDistanceCar="34"
				poiDistanceBike="36"
			/>

			<DistanceElement
				poiName="Galeria Rzeszowska"
				poiCity="Rzeszów"
				poiDistanceBus="23"
				poiDistanceCar="34"
				poiDistanceBike="36"
			/>

			<DistanceElement
				poiName="Galeria Rzeszowska"
				poiCity="Rzeszów"
				poiDistanceBus="23"
				poiDistanceCar="34"
				poiDistanceBike="36"
			/>

			<DistanceElement
				poiName="Galeria Rzeszowska"
				poiCity="Rzeszów"
				poiDistanceBus="23"
				poiDistanceCar="34"
				poiDistanceBike="36"
			/>
			<DistanceElement
				poiName="Galeria Rzeszowska"
				poiCity="Rzeszów"
				poiDistanceBus="23"
				poiDistanceCar="34"
				poiDistanceBike="36"
			/>

			<DistanceElement
				poiName="Galeria Rzeszowska"
				poiCity="Rzeszów"
				poiDistanceBus="23"
				poiDistanceCar="34"
				poiDistanceBike="36"
			/>

			<DistanceElement
				poiName="Galeria Rzeszowska"
				poiCity="Rzeszów"
				poiDistanceBus="23"
				poiDistanceCar="34"
				poiDistanceBike="36"
			/>

			<DistanceElement
				poiName="Galeria Rzeszowska"
				poiCity="Rzeszów"
				poiDistanceBus="23"
				poiDistanceCar="34"
				poiDistanceBike="36"
			/>
		</div>
	</div>
</div>

<style lang="scss">
	:global(.POIelement .svg-itema svg) {
		width: 305px;
		height: 137px;
		position: relative;
		display: block;
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
</style>
