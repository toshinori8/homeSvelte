<script>
	import { Modal, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import Loading from './loading.svelte';
	import { location, nearLocation, nearLocationsPoints } from '$lib/stores/appStore';
	import Pin from '$lib/components/pin.svelte';
	import { fade } from 'svelte/transition';
	let sortKey = 'M2_PRICE';
	let modalUpdateAdress = false;
	let modalMessage = false;
	let modalUpdatePoint = false;
	let centerElement;
	import { getNearFromAllDocuments, getLoc } from '$lib/functions';

	let numClicks = 0;
	let singleClickTimer;
	import printOtherlocationPoints from '$lib/PAGES/page01.svelte';

	function sortTable(arr, sortKey) {
		// console.table(data);
		let centerObject = arr.findIndex((item) => item.center === true);
		let others = arr.filter((item, index) => index !== centerObject);
		// console.table(others);
		centerObject = arr.filter((item, index) => index == centerObject);
		let smallerItems = others
			.filter((item) => item.params[sortKey] < centerObject[0].params[sortKey])
			.sort((b, a) => b.params[sortKey] - a.params[sortKey]);
		// .slice(0, 4);
		let biggerItems = others
			.filter((item) => item.params[sortKey] > centerObject[0].params[sortKey])
			.sort((b, a) => b.params[sortKey] - a.params[sortKey]);
		// .slice(0, 5);
		// console.table(' Center', centerObject, ' smaller', smallerItems, ' bigger', biggerItems);
		data = [...smallerItems, ...centerObject, ...biggerItems];
	}

	let sampleData = [
		{
			ID: '9995',
			adres: 'Warszawa PKP',
			createDate: '2024-01-24',
			params: { POW: 100, price: 200000, M2_PRICE: 2000 },
			center: false,
			place_id: 122
		},
		{
			ID: '9993',
			adres: 'Adres 2',
			createDate: '2024-01-25',
			params: { POW: 150, price: 250000, M2_PRICE: 1666 },
			center: false,
			place_id: 1223
		},
		{
			ID: '9912',
			adres: 'Adres 2',
			createDate: '2024-01-25',
			params: { POW: 150, price: 99250000, M2_PRICE: 9934000 },
			center: false,
			place_id: 121
		}
	];

	let data = sampleData;

	function deleteRow(row) {
		data = data.filter((r) => r.ID !== row.ID);
		sortTable(data, sortKey);
	}

	let itemId = 12;

	function addElem() {
		if (data.length < 9) {
			itemId++;
			let item = {
				ID: itemId.toString(),
				adres: 'Adres ' + itemId,
				createDate: '2024-01-25',
				params: { POW: 150, price: 250000, M2_PRICE: 1666 },
				center: false,
				place_id: itemId
			};
			data = [...data, item];
			sortTable(data, sortKey);
		}
	}

	function saveEdit(item, ikey) {
		data = data.map((dataItem) => (dataItem.ID === item.ID ? item : dataItem));

		if (ikey == 'adres') {
			// console.log('adres changed', item.adres);
		}
		sortTable(data, sortKey);
	}

	function calculatePricePerSquareMeter(row) {
    if (row.params.POW && row.params.price) {
        row.params.M2_PRICE = Math.round(row.params.price / row.params.POW); ;
    }
    saveEdit(row);
}
	async function getNearest() {
		let result = await getNearFromAllDocuments();

		centerElement = {
			ID: $location.ID,
			adres: $location.adres,
			createDate: $location.createDate,
			params: {
				POW: parseFloat($location.params.POW),
				price: parseFloat($location.params.price),
				M2_PRICE: parseFloat($location.params.M2_PRICE)
			},
			center: true,
			place_id: $location.place_id
		};
		data = [...data, centerElement];

		if (result.features.length > 0) {
			// console.log('Near Locations Added ', result);

			let act = result.features.map((feature) => {
				return {
					ID: `${feature.properties.id}`,
					adres: feature.properties.adres,
					createDate: feature.properties.createDate,
					params: {
						lat: parseFloat(feature.properties.params.lat),
						lon: parseFloat(feature.properties.params.lon),
						POW: parseFloat(feature.properties.params.POW),
						price: parseFloat(feature.properties.params.price),
						M2_PRICE: parseFloat(feature.properties.params.M2_PRICE)
					},
					center: false,
					place_id: feature.properties.place_id
				};
			});

			// console.log('Data istniejaca', act);
			data = [...data, ...act];
		}
		sortTable(data, sortKey);
		// console.log('Data', data);
	}
	let ready = false;
	$: {
		if ($location && $location.params && ready == false) {
			getNearest();

			// sortTable(data);
		}
		if ($location && $location.params && ready == true) {
			// getNearest();
			// sortTable(data);
		}
	}

	onMount(() => {
		ready = true;
	});

	let pins = new Map();

	async function handleClick(e, row) {
		//NOTE DOUBLE CLICK HANDLE
		e.preventDefault();
		numClicks++;

		let handleSingleClick = async function () {
			if (!row.params.lon && !row.params.lat) {
				let result = await getLoc(row.adres);
				if (result.data && result.data.status == 'ZERO_RESULTS') {
					modalMessage = 'Popraw adres lokalizacji';
				}
				if (result.address_components && result.address_components.length > 0) {
					let element = data.find((elem) => elem.ID === row.ID);

					if (element) {
						element.params.lat = result.geometry.location.lat;
						element.params.lon = result.geometry.location.lng;
					}

					pins.set(row.ID, true);
					sortTable(data, sortKey);
					nearLocationsPoints.set(
						data.filter((item) => item.params && item.params.lat && item.params.lon)
					);
				}
			}
		};

		let handleDBLClick = async function () {
			row.params.lon = null;
			row.params.lat = null;
			handleSingleClick();
		};

		if (numClicks === 1) {
			// single-click OR event fired before double-click
			singleClickTimer = setTimeout(() => {
				numClicks = 0;
				clearTimeout(singleClickTimer);

				handleSingleClick();
			}, 400);
		} else if (numClicks === 2) {
			// double click
			clearTimeout(singleClickTimer);
			numClicks = 0;

			handleDBLClick();
		} else {
			clearTimeout(singleClickTimer);
			numClicks = 0;
		}

		// const result = await yourAsyncFunction(row.adres);
		// if(result) {
		//     pins.set(row.ID, true);
		// }
	}

	let updateAdres;

</script>

<div class="tableData_">
	{#if data === false}
		<Loading />
	{:else if data}
		<table class="firstTable">
			<button class="addELEM noPrint" on:click={() => addElem()}> + </button>

			<thead>
				<tr>
					<th class="nth" />
					<th class="adres">ADRES NIERUCHOMOŚCI</th>
					<th class="data">DATA</th>
					<th
						class="m2"
						on:click={() => {
							sortKey = 'POW';
							sortTable(data, sortKey);
						}}>m2</th>
					<th
						class="cena"
						on:click={() => {
							sortKey = 'price';
							sortTable(data, sortKey);
						}}>CENA</th>
					<th
						class="cenam2"
						on:click={() => {
							sortKey = 'M2_PRICE';
							sortTable(data, sortKey);
						}}>CENA ZA M2</th>
				</tr>
			</thead>
			<tbody>
				{#each data as row, i}
					{#if !row.center}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span class="delete noPrint" on:click={() => deleteRow(row)}>x</span>
					{/if}
					<tr class:center={row.center}>
						<td>{i + 1}</td>

						{#if row.center}
							<td class="adres">
								<input
									class="inputTD adres"
									bind:value={$location.adres}
									on:blur={() => saveEdit(row, 'adres')}
									onClick="this.select();" 
									readonly />
							</td>
						{:else}
							<td class="adres">
								<input
									class="inputTD adres"
									bind:value={row.adres}
									on:blur={() => saveEdit(row, 'adres')}
									onClick="this.select();" />
							</td>
						{/if}

						<td>
							{#if !row.center}
								<input
									type="date"
									class="inputTD createDate"
									bind:value={row.createDate}
									on:blur={() => saveEdit(row)} />
							{:else}
								<input
									type="date"
									class="inputTD createDate"
									bind:value={row.createDate}
									readonly />
							{/if}
						</td>
						<td>
							{#if !row.center}
								<input
									type="number"
									step="1"
									class="inputTD POW"
									min="1"
									bind:value={row.params.POW}
									onClick="this.select();"
									on:input={() => calculatePricePerSquareMeter(row)} />
							{:else}
								<input
									type="number"
									step="1"
									class="inputTD POW"
									min="1"
									bind:value={row.params.POW}
									readonly
									 />
							{/if}
						</td>
						<td>
							{#if !row.center}
								<input
									type="number"
									min="1"
									class="inputTD price"
									step="100"
									bind:value={row.params.price}
									onClick="this.select();"
									on:input={() => calculatePricePerSquareMeter(row)} />
							{:else}
								<input
									type="number"
									min="1"
									class="inputTD price"
									step="100"
									bind:value={row.params.price}
									readonly
									 />
							{/if}
						</td>
						<td>
							{#if !row.center}
								<input
									type="number"
									step="100"
									min="1"
									class="inputTD M2_PRICE"
									bind:value={row.params.M2_PRICE}
									on:blur={() => saveEdit(row)}
									onClick="this.select();" />
							{:else}
								<input
									type="number"
									step="100"
									min="1"
									class="inputTD M2_PRICE"
									bind:value={row.params.M2_PRICE}
									readonly
									onClick="this.select();" />
							{/if}
						</td>
					</tr>

					{#if row.center == false}
						<span class="onMap noPrint">
							<button on:click={(e) => handleClick(e, row)} disabled={!$location.params.poiGeodata}>
								<Pin enabled={pins.get(row.ID) || Boolean(row.params.lat && row.params.lon)} />
							</button>
						</span>
					{/if}
				{/each}
			</tbody>
		</table>
	{/if}
</div>

{#if modalUpdateAdress}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title="Aktualizacja?" bind:open={modalUpdateAdress} autoclose>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				Czy na pewno chcesz zaktualizować dane?<br />
			</p>
			<!-- <p class="text-base text-gray-500 dark:text-gray-400">
				_______
			</p> -->

			<svelte:fragment slot="footer">
				<!-- <Button on:click={() => updateAdres()}>Tak</Button> -->
				<Button on:click={() => updateAdres()}>Tak</Button>
			</svelte:fragment>
		</Modal>
	</div>
{/if}

{#if modalMessage}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title={modalMessage} bind:open={modalMessage} autoclose />
	</div>
{/if}

<style lang="scss">
	:global(.onMap) {
		position: absolute;
		width: 30px;
		height: 30px;
		margin-left: 710px;
		margin-top: -34px;
	}
	:global(.pin) {
		width: 30px;
		height: 30px;
		position: inherit;
	}

	:global(.onMap button[disabled]) {
		opacity: 0.3;
	}

	table {
		tbody tr:hover {
			background-color: rgba(220, 224, 215, 1);
		}

		margin-left: -30px;
	}

	.addELEM {
		position: absolute;
		width: 30px;
		height: 30px;
		margin-top: -49px;
		margin-left: 696px;
		border-radius: 20px;
		border: solid 3px rgba(100, 100, 100, 0.3);
		color: white;
		font-weight: bold;
		background: var(--brand-green);
		padding-top: 1px;
		padding-left: 1px;
		box-shadow: 2px 2px 10px 0px rgba(66, 68, 90, 0.4);
	}
	.addELEM:hover,
	.inputTD:hover {
		cursor: pointer;
		color: red;
	}

	.inputTD {
		transition: all ease-in-out 0.4s;
		text-align: center;
		background: no-repeat;
		width: auto;
		padding: 0 !important;
		font-size: small;
	}
	.cenam2:hover,
	.cena:hover {
		cursor: pointer;
		color: var(--brand-green);
	}

	:global(tr:hover span.delete) {
		opacity: 1;
	}

	span.delete {
		transition: all ease-in 0.2s;
		background-color: rgba(100, 100, 100, 0.5);
		position: absolute;
		margin-left: -40px;
		opacity: 1;
		width: 21px;
		border-radius: 32px;
		height: 22px;
		vertical-align: middle;
		text-align: center;
		padding: 0px;
	}
	span.delete:hover {
		color: white;

		background-color: red;
	}
	tr.center {
		background-color: var(--brand-green) !important; /* Wybierz odpowiedni kolor dla wyróżnienia */
	}
	.inputTD.adres {
		width: auto;
		min-width: 250px;
	}
	.inputTD.createDate {
		width: 89px;
		text-align: left;
	}
	.inputTD.POW {
		text-align: center;
		width: 40px;
	}
	.inputTD.price {
		text-align: center;
		width: auto;
	}
	.inputTD.M2_PRICE {
		text-align: center;
		width: 110px;
	}

</style>
