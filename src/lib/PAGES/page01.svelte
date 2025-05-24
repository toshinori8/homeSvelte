<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import Loading from '$lib/components/loading.svelte';
	import EditableSelect from '$lib/components/editableSelect.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { PUBLIC_GAPI } from '$env/static/public';
	import { scrollRef } from 'svelte-scrolling';

	let srcGoogle = 'https://maps.googleapis.com/maps/api/js?key=' + PUBLIC_GAPI;
	const searchParams = browser && $page.url.searchParams;
	// import miastoDot from '/src/images/miastoDot.svg';
	import { PUBLIC_API_MAPTILER } from '$env/static/public';
	import { Map, Marker, MapStyle, config, Popup } from '@maptiler/sdk';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	config.apiKey = PUBLIC_API_MAPTILER;
	Map.workerCount = 10;
	import {
		poiReady,
		loading,
		error,
		options,
		location,
		newLocation,
		allDocuments,
		currentDocument,
		POIelements,
		nearLocationsPoints
	} from '$lib/stores/appStore';
	import { Modal, Button } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import { fetchData, fetchOptions, saveData } from '$lib/database.js';
	import { dayjs } from 'svelte-time';
	import '$lib/stores/pl';
	dayjs.locale('pl');
	import { stopTyping } from '$lib/stopTyping.ts';
	import {
		getLoc,
		getNearBy,
		createPOIforMap,
		getBounds,
		getNearFromAllDocuments,
		convData2Geo,
		updateDistanceData
	} from '$lib/functions';
	import MaskInput from 'svelte-input-mask/MaskInput.svelte';
	// import { data } from '@maptiler/sdk';
	$poiReady = false;
	let searching = false;
	let isNewLocation = false,
		isEdit,
		map,
		mapContainer,
		addressMarkers = [];
	let otherAdressMarkers = [],
		retrievedData,
		ready = false;
	let auto_coompleate,
		visible_autocompleate = false;
	let newAdres,
		mode = '';
	let replaceImage = false;
	let sp = 0,
		m2 = '&#13217;';
	nearLocationsPoints.set([]);
	let modalError = false,
		modalUpdateData = false;

	let cutrrentLocation = [];
	let priceBind;

	function handleWindowKeyDown(event) {
		if (event.key === 'Escape') {
			visible_autocompleate = false;
		}
	}

	let print = () => {
		window.print();
	};

	let LocationGroup;
	let locationIcon;

	let onStopTyping = (e) => {
		newAdres = e.target.value;
		searching = true;
		if (e.target.value.length > 5 && e.target.value != 'Wpisz lokalizację') {
			getLoc(e.target.value).then((e) => {
				if (e['error']) {
					console.log('unable to geocode : ' + e['error']);
				} else {
					auto_coompleate = e;
					visible_autocompleate = true;
				}
			});
		}
	};

	// handle change of m2
	function runM2_PRICE() {
		// console.log("TOUCH runM2_PRICE");
		$location.params.M2_PRICE = Number($location.params.price / $location.params.POW).toFixed(2);
		// console.log($location.params.price.toString(), $location.params.M2_PRICE);
	}

	$: {
		if ($location && $location.params && $location.params.POW) {
			runM2_PRICE();
		}

		if ($nearLocationsPoints && $nearLocationsPoints[0] && $nearLocationsPoints.length > 0) {
			printOtherlocationPoints($nearLocationsPoints);
			$location.params.page01.nearPoints = $nearLocationsPoints;
			// console.log('nearLocationsPoints', $nearLocationsPoints);
		}
	}

	// handle change of price/m2
	// function runM2_POW(e){
	// 	$location.params.POW = e.target.value;
	// 	$location.params.POW = Number($location.params.price / $location.params.M2_PRICE).toFixed(2);
	// };

	// handle change of Price
	const priceChange = ({ detail }) => {
		$location.params.price = detail.inputState.unmaskedValue;
		$location.params.M2_PRICE = Number($location.params.price / $location.params.POW).toFixed(2);
	};

	function printOtherlocationPoints(tablePoints) {
		// console.log(tablePoints);

		if (tablePoints.length > 0) {
			otherAdressMarkers.forEach((marker) => marker.remove());

			tablePoints.forEach((point) => {
				const marker = new Marker({
					element: document.createElement('img')
				})
					.setLngLat([parseFloat(point.params.lon), parseFloat(point.params.lat)]) // Marker position [lng, lat]
					.addTo(map);

				marker.getElement().src = '/images/POI/locationsDot.svg';
				marker.getElement().style.width = '15px';
				marker.getElement().style.height = '15px';

				otherAdressMarkers.push(marker);
			});

			let geo = convData2Geo(tablePoints); //NOTE show other locations points

			getBounds($location.params.poiGeodata.features.concat(geo.features), $location.params).then(
				(dataCoor) => {
					dataCoor = [
						[dataCoor[0][0], dataCoor[0][1]],
						[dataCoor[1][0], dataCoor[1][1]]
					];
					window.dataCoor = dataCoor;
					map.fitBounds(
						[
							[dataCoor[0][0], dataCoor[0][1]],
							[dataCoor[1][0], dataCoor[1][1]]
						],
						{ padding: 80 }
					);
				}
			);
		}
	}

	let drawMap = (mode) => {
		// NOTE DrawMap

		map = new Map({
			container: mapContainer,
			// style: MapStyle.BASIC,
			center: [$location.params.lon + 1, $location.params.lat + 1],
			zoom: 13,
			preserveDrawingBuffer: true,
			style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${PUBLIC_API_MAPTILER}`
		});

		if (mode === 'edit') {
			// NOTE EDYCJA OBIEKTU
			// console.log('DrawMap: ' + mode);
			map.on('load', function () {
				getLoc($location.place_id, 'place_id').then((e) => {
					// console.log(e);
				});

				showLocationPoint();
				// printOtherlocationPoints();
				printPoints2Map($location.params.poiGeodata);
			});
		} else if (mode == 'new') {
			// NOTE NOWY OBIEKT
			// console.log('DrawMap: ' + mode);
			// get options locations display

			// EXTRACT POI TO DISPLAY FROM OOPTIONS
			let sortedElements = [];
			for (const id of $options.POIelementsDisplay) {
				for (const [key, value] of Object.entries(POIelements)) {
					if (value.id == id) {
						sortedElements.push(POIelements[key]);
					}
				}
			}
			$location.params.POI = sortedElements;
			// EXTRACT POI TO DISPLAY FROM OOPTIONS

			showLocationPoint();
			// printOtherlocationPoints();
		} else {
			modalError = true;
		}
	};

	onMount(async () => {
		allDocuments.set({});
		location.set({});
		currentDocument.set('');

		// console.log($options);
		// let google = window.google;

		// if(browser){
		//  let directionsService = new google.maps.DirectionsService();
		// 	console.log('directionsService',directionsService);
		// }
		try {
			retrievedData = await fetchData();

			if (retrievedData.error) {
				console.error('Failed to fetch data', retrievedData.error);
				modalError = true;
			} else {
				if (retrievedData == '{}') {
					modalError = true;
				} else {
					// console.log('recived data ', retrievedData);
					allDocuments.set(retrievedData);
				}
			}
		} catch (error) {
			console.error('Network error', error);
			modalError = true;
		}

		//NOTE : TRYB EDYCJI
		mode = 'edit';
		if (browser && searchParams && searchParams.get('id')) {
			const leaflet = await import('leaflet');

			locationIcon = L.icon({
				iconUrl: '/images/POI/miastoDot.png',
				iconSize: [50, 50] // size of the icon
			});

			isNewLocation = false;
			isEdit = searchParams.get('id');
			if (typeof isEdit == 'string' && isNewLocation == false) {
				currentDocument.set(isEdit);
				location.set(retrievedData.filter((val) => val['ID'] == isEdit)[0]);
				console.log('EDIT MODE extracted document	 ', $location);
				priceBind = $location.params.price;

				runM2_PRICE();
				ready = true;
				drawMap('edit');
			}
		}

		//NOTE : TRYB DODAWANIA
		mode = 'new';
		if (browser && searchParams && searchParams.get('create')) {
			const leaflet = await import('leaflet');

			LocationGroup = L.layerGroup();

			locationIcon = L.icon({
				iconUrl: '/images/POI/miastoDot.png',
				iconSize: [50, 50] // size of the icon
			});

			$location = $newLocation;
			let maxId = 0;
			for (let key in $allDocuments) {
				let currentId = parseInt($allDocuments[key].ID);

				if (currentId > maxId) {
					maxId = currentId;
				}
			}

			let newId = maxId + 1;
			$location['ID'] = newId.toString();
			$location.params.lat = 50;
			$location.params.lon = 20;
			currentDocument.set(newId);
			$location['createDate'] = dayjs().format('YYYY-MM-DD'); // aktualna data
			// console.log('NEW DOCUMENT MODE ID:', $location['ID'], $location);

			runM2_PRICE();
			ready = true;
			drawMap('new');
		}
	});

	let showLocationPoint = async function () {
		addressMarkers.forEach((marker) => {
			marker.remove();
		});

		// Clear addressMarkers array

		const el = document.createElement('div');
		el.className = 'marker';
		el.style.backgroundImage = `url(/images/POI/miastoDotC.svg)`;
		el.style.width = `80px`;
		el.style.height = `80px`;

		var popup = new Popup({ offset: 25 }).setText('Aktualna lokalizacja');
		let marker = new Marker({ element: el })
			.setLngLat([$location.params.lon, $location.params.lat])
			.setPopup(popup)
			.addTo(map);

		// Add the new marker to addressMarkers array
		addressMarkers.push(marker);

		map.flyTo({
			center: [$location.params.lon, $location.params.lat],
			zoom: 12,
			essential: true
		});
	};

	let printPoints2Map = (goeJSON) => {
		addressMarkers.forEach((marker) => {
			marker.remove();
		});
		showLocationPoint();

		let i = 0;
		goeJSON.features.forEach((feature) => {
			let imageId = 'custom-marker-' + i;

			let featureCoord = [feature.geometry.coordinates[0], feature.geometry.coordinates[1]];
			// console.log(featureCoord)
			const marker = new Marker({
				element: document.createElement('img') // Create an img element for the SVG
			})
				.setLngLat(featureCoord) // Marker position [lng, lat]
				.addTo(map);

			marker.getElement().src = feature.properties.iconSRC;
			marker.getElement().style.width = '50px';
			marker.getElement().style.height = '50px';

			addressMarkers.push(marker);

			i++;
		});

		getBounds(goeJSON.features, $location.params).then((dataCoor) => {
			// console.log('list of coordinates ', dataCoor);

			dataCoor = [
				[dataCoor[0][0], dataCoor[0][1]],
				[dataCoor[1][0], dataCoor[1][1]]
			];
			$location.params.fitBounds = dataCoor;
			map.fitBounds(
				[
					[dataCoor[0][0], dataCoor[0][1]],
					[dataCoor[1][0], dataCoor[1][1]]
				],
				{ padding: 80 }
			);

			//NOTE DISTANCE MIERZENIE

			if (replaceImage == true) {
				//NOTE: Podmiana mapy na obrazek  if replaceImage
				map.once('moveend', function () {
					// Po zakończeniu fitBounds czekaj kilka sekund (tutaj: 3 sekundy)
					window.setTimeout(function () {
						const imageDataURL = map.getCanvas().toDataURL('image/jpeg', 1.0);

						// Stworzenie elementu obrazu i przypisanie danych Base64 jako źródło
						const imgElement = document.createElement('img');
						imgElement.src = imageDataURL;

						// Usunięcie mapy i zasobów z nią związanych
						map.remove();

						const mapContainer = document.getElementById('map');
						mapContainer.innerHTML = ''; // Usunięcie wszystkich dzieci kontenera mapy
						mapContainer.appendChild(imgElement);
					}, 3000);
				});
			}
		});
		// console.log('updateDistanceData');
		updateDistanceData($location.params.POI, [$location.params.lon, $location.params.lat]).then(
			(POInts) => {
				if (POInts == true) {
					$poiReady = true;
				}
				// points are in $location
			}
		);
	};

	let updateMap = (type = 'new_location_search') => {
		//NOTE updateMap  poprawa istniejącej lub nowa lokalizacja
		$location.params.lon = auto_coompleate.geometry.location.lng;
		$location.params.lat = auto_coompleate.geometry.location.lat;
		$location.place_id = auto_coompleate.place_id;
		$location.adres = auto_coompleate.formatted_address;
		modalUpdateData = false;
		getNearBy($location).then((data) => {
			// console.log(
			// 	'---------------------------------------------------------',
			// 	'getNearBy',
			// 	$location,
			// 	data
			// );

			createPOIforMap($location.params.POI).then((data) => {
				$location.params.poiGeodata = data; //NOTE PUNKTY POI GEODATA
				console.log('createPOIforMap', data);

				printPoints2Map(data);
			});
		});
	};
</script>

<svelte:head>
	<script src={srcGoogle} async></script>
	<!-- <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" on:load={start_map}></script>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/> -->
</svelte:head>

<svelte:window on:keydown={handleWindowKeyDown} />

<!-- <img src="/images/POI/miastoDotC.svg" width="120" height="180" alt=""  style="position: absolute; margin-left:300px"/> -->

<div class="content-block section page_01" use:scrollRef={'page_01'}>
	<Header />

	<!-- distanceNearPOI
	{$options.distanceNearPOI}
	distanceNear
	{$options.distanceNear} -->

	<div class="page_content">
		{#if !$location.adres}
			<div class="center"><Loading /></div>
		{/if}

		{#if $location.adres && ready == true}
			<div class="grid_content noselect">
				<h2 class="title_medium noselect">
					<span class="number_type noselect">1</span> Lokalizacja
				</h2>

				<textarea
					class="lokalization_name"
					type="text"
					rows="auto"
					on:stopTyping={onStopTyping}
					use:stopTyping
					value={$location.adres}
				/>

				<!-- {#if searching == true}
					<div class="adress_loading">
						<Loading />
					</div>
				{/if} -->
			</div>
			<div class="grid_content">
				<div class="backgr_rounded">
					<h2 class="title_medium noselect">
						<span class="number_type noselect">3</span>Wycena posiadłości
					</h2>
					<MaskInput
						on:change={priceChange}
						alwaysShowMask
						mask="000 000"
						class="lokalization_price"
						value={$location.params.price.toString()}
					/>

					<span class="symbol">zł</span>

					<p class="noselect opis">Ogólna wartość lokalu</p>
				</div>
			</div>

			<div class="grid_content">
				<h2 class="title_medium noselect">
					<span class="number_type noselect">2</span>Charakterystyka lokum
				</h2>

				<ul class="place_params">
					<li class="place_ noselect">
						Powierzchnia
						<input
							type="number"
							class="value m2class"
							style="right: 66px;"
							bind:value={$location.params.POW}
							on:change={() => runM2_PRICE()}
						/>

						<span class="val_symbol">{@html m2}</span>
					</li>
					<li class="place_ noselect">
						Standard mieszkania

						<EditableSelect
							bind:selectedValue={$location.params.STANDARD}
							bind:customValue={$location.params.STANDARD}
							editValue={true}
						>
							{#each Object.entries($options.answers.STANDARD) as [val, name]}
								{#if $location.params.STANDARD == val}
									<option
										contenteditable="true"
										value={val}
										selected={$location.params.STANDARD == val}>{name}</option
									>
								{:else}
									<option contenteditable="true" value={val}>{name}</option>
								{/if}
							{/each}
						</EditableSelect>

						<!-- 
						<select bind:value={$location.params.STANDARD}>
							{#each Object.entries(answers.STANDARD) as [val, name]}
								{#if $location.params.STANDARD == val}
									<option contenteditable="true" value={val} selected={$location.params.STANDARD == val}>{name}</option>
								{:else}
									<option contenteditable="true" value={val}>{name}</option>
								{/if}
							{/each}
						</select> -->
					</li>
					<li class="place_ noselect">
						Pokoje<input type="number" class="value" value={$location.params.POKOJE} />
					</li>
					<li class="place_ noselect">
						<p>Dostępność jasnej, osobnej kuchni</p>
						<span>
							<select bind:value={$location.params.KUCHNIA}>
								{#each Object.entries($options.answers.bool) as [val, name]}
									{#if $location.params.KUCHNIA == val}=
										<option value={val} selected={$location.params.KUCHNIA == val}>{name}</option>
									{:else}
										<option value={val}>{name}</option>
									{/if}
								{/each}
							</select>
						</span>
					</li>
					<li class="place_ noselect">
						<p>Balkon lub taras</p>

						<span
							><select bind:value={$location.params.BALKON_TARAS}>
								{#each Object.entries($options.answers.bool) as [val, name]}
									{#if $location.params.BALKON_TARAS == val}
										<option value={val} selected={$location.params.BALKON_TARAS == val}
											>{name}</option
										>
									{:else}
										<option value={val}>{name}</option>
									{/if}
								{/each}
							</select>
						</span>
					</li>
					<li class="place_ noselect">
						<p>Dostep do windy</p>

						<span>
							<select bind:value={$location.params.WINDA}>
								{#each Object.entries($options.answers.bool) as [val, name]}
									{#if $location.params.WINDA == val}=
										<option value={val} selected={$location.params.WINDA == val}>{name}</option>
									{:else}
										<option value={val}>{name}</option>
									{/if}
								{/each}
							</select>
						</span>
					</li>
					<li class="place_ noselect">
						<p>Piwnica lub komórka lokatorska</p>

						<span>
							<select bind:value={$location.params.PIWNICA}>
								{#each Object.entries($options.answers.bool) as [val, name]}
									{#if $location.params.PIWNICA == val}=
										<option value={val} selected={$location.params.PIWNICA == val}>{name}</option>
									{:else}
										<option value={val}>{name}</option>
									{/if}
								{/each}
							</select>
						</span>
					</li>

					<li class="place_ noselect">
						<p>Miejsce postojowe</p>

						<span>
							<select bind:value={$location.params.PARKING}>
								{#each Object.entries($options.answers.PARKING) as [val, name]}
									{#if $location.params.PARKING == val}=
										<option value={val} selected={$location.params.PARKING == val}>{name}</option>
									{:else}
										<option value={val}>{name}</option>
									{/if}
								{/each}
							</select>
						</span>
					</li>
					<li class="place_ noselect">
						<p>Księga wieczysta</p>

						<EditableSelect
							bind:selectedValue={$location.params.KSIEGA}
							bind:customValue={$location.params.KSIEGA}
							editValue={true}
						>
							{#each Object.entries($options.answers.KSIEGA) as [val, name]}
								{#if $location.params.KSIEGA == val}
									<option
										contenteditable="true"
										value={val}
										selected={$location.params.KSIEGA == val}>{name}</option
									>
								{:else}
									<option contenteditable="true" value={val}>{name}</option>
								{/if}
							{/each}
						</EditableSelect>
					</li>
					<li class="place_ noselect">
						<p>Rodzaj budynku</p>
						<span>
							<select bind:value={$location.params.RODZAJ}>
								{#each Object.entries($options.answers.RODZAJ) as [val, name]}
									{#if $location.params.RODZAJ == val}=
										<option value={val} selected={$location.params.RODZAJ == val}>{name}</option>
									{:else}
										<option value={val}>{name}</option>
									{/if}
								{/each}
							</select>
						</span>
					</li>
					<li class="place_ noselect">
						<p>Rok powstania</p>

						<EditableSelect
							bind:selectedValue={$location.params.ROK_POWSTANIA}
							bind:customValue={$location.params.ROK_POWSTANIA}
							editValue={true}
						>
							{#each Object.entries($options.answers.ROK_POWSTANIA) as [val, name]}
								{#if $location.params.ROK_POWSTANIA == val}
									<option
										contenteditable="true"
										value={val}
										selected={$location.params.ROK_POWSTANIA == val}>{name}</option
									>
								{:else}
									<option contenteditable="true" value={val}>{name}</option>
								{/if}
							{/each}
						</EditableSelect>
					</li>
					<li class="place_ noselect">
						Liczba kondygnacji<input
							type="number"
							class="value"
							value={$location.params.LICZBAKOND}
						/>
					</li>
					<li class="place_ noselect">
						<p>Rynek</p>
						<span>
							<select bind:value={$location.params.RYNEK}>
								{#each Object.entries($options.answers.RYNEK) as [val, name]}
									{#if $location.params.RYNEK == val}=
										<option value={val} selected={$location.params.RYNEK == val}>{name}</option>
									{:else}
										<option value={val}>{name}</option>
									{/if}
								{/each}
							</select>
						</span>
					</li>
				</ul>
			</div>

			<div class="grid_content">
				<div class="podsumowanie">
					<p class="noselect opis1" contenteditable="true">
						{$location.params.M2_PRICE} <span class="sign">zł/{@html m2}</span>
					</p>
					<p class="noselect opis2">
						Cena za {@html m2} mieszkania
					</p>
					<p class="noselect opis1">
						<!--TODO    max min z tabeli ze strony #2  -->
						od
						<span class="from_price">{$location.params.FROM_PRICE}</span>
						do
						<span class="to_price">{$location.params.TO_PRICE}</span>
						<span class="sign">zł/{@html m2}</span>
					</p>
					<p class="noselect opis2">Ogólna wartość lokalu</p>
				</div>
				<div class="wniosek">
					<h2 class="title_medium noselect">
						<span class="number_type noselect">4</span>Ogólny wniosek
					</h2>
					<p class="text" contenteditable="true">
						{$location.params.WNIOSEK}
					</p>
				</div>
			</div>
		{/if}
	</div>

	<div class="map-wrap">
		<div class="map" id="map" bind:this={mapContainer} />
	</div>

	<div class="pageNumber">1</div>
</div>

{#if modalUpdateData}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title="Aktualizacja?" bind:open={modalUpdateData} autoclose>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				Czy na pewno chcesz zaktualizować dane? <br />
			</p>
			<p class="text-base text-gray-500 dark:text-gray-400">
				Spowoduje to przeliczenie wszystkich parametrów punktów POI
			</p>

			<svelte:fragment slot="footer">
				<Button
					on:click={() => {
						updateMap();
					}}>Przelicz</Button
				>
			</svelte:fragment>
		</Modal>
	</div>
{/if}
{#if visible_autocompleate}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title="Wybierz z listy lokalizację" bind:open={visible_autocompleate} autoclose>
			{#if auto_coompleate}
				<li class="locLI noselect">
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a
						aria-hidden="true"
						class="noselect"
						href="#"
						on:click={(event) => {
							event.preventDefault();
							visible_autocompleate = !visible_autocompleate;

							modalUpdateData = true; // show modal with alert message
						}}>{auto_coompleate.formatted_address}</a
					>
				</li>
			{/if}

			<svelte:fragment slot="footer">
				<Button
					on:click={() => {
						($location.adres = auto_coompleate.formatted_address), saveData();
					}}>Zapisz nową nazwę</Button
				>
			</svelte:fragment>
		</Modal>
	</div>
{/if}

{#if modalError}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title="" bind:open={modalError} autoclose>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Wystąpił błąd!</p>
			<svelte:fragment slot="footer">
				<Button>OK</Button>
			</svelte:fragment>
		</Modal>
	</div>
{/if}

<style>
	/* :global(.marker) {
		display: block;
		border: none;

		cursor: pointer;
		padding: 0;
	} */
	/* :global(.maplibregl-marker) {
		display: block;
		border: none;

		cursor: s-resize;
		padding: 0;
		background-image: url(/images/POI/miastoDot.png);
	} */
</style>
