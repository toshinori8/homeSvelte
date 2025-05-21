<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import {
		location,
		allDocuments,
		menuVisible,
		loading,
		currentDocument
	} from '$lib/stores/appStore';
	import { redirect } from '$lib/functions';
	import { removeData, saveData, fetchOptions, fetchData, saveOptions } from '$lib/database.js';
	import { options } from '$lib/stores/appStore';
	import Select from 'svelte-select';

	import { dayjs } from 'svelte-time';
	import '$lib/stores/pl';
	dayjs.locale('pl');

	currentDocument.set(null);

	import addLocation from '$lib/components/images/addLocation.svg';
	import delLocation from '$lib/components/images/delLocation.svg';
	import editLocation from '$lib/components/images/editLocation.svg';
	import settings from '$lib/components/images/settings.svg';
	import Loading from '$lib/components/loading.svelte';
	import { page } from '$app/stores';
	import { DarkMode, Modal, Button } from 'flowbite-svelte';
	import { stopTyping } from '$lib/stopTyping.ts';
	import OptionsPoi from '$lib/components/options_POI.svelte';

	$: {
		if (modalOptions) {
			// Tutaj umieść funkcję, którą chcesz uruchomić
		}
	}

	let modalDelItem = false;

	$: activeUrl = $page.url.pathname;

	$menuVisible = false;

	let filterText = '';

	let value = null;

	let items = [
		{ value: 1, label: 'name 1' },
		{ value: 2, label: 'name 2' },
		{ value: 3, label: 'name 3' },
		{ value: 4, label: 'name 4' },
		{ value: 5, label: 'name 5' }
	];

	function handleFilter(e) {
		if (value?.find((i) => i.label === filterText)) return;
		if (e.detail.length === 0 && filterText.length > 0) {
			const prev = items.filter((i) => !i.created);
			items = [...prev, { value: filterText, label: filterText, created: true }];
		}
	}

	function handleChange(e) {
		items = items.map((i) => {
			delete i.created;
			return i;
		});
	}

	//TODO; pobierz dane w excell
	let downloadSpread = () => {
		alert('not implemented');
	};

	async function removeDatax(e) {
		console.log(e);

		await removeData(e).then(() => {});
		retrievedData = await fetchData();
		$allDocuments = retrievedData;
	}

	let retrievedData,
		modalOptions = false,
		modalError = false;

	onMount(async () => {
		try {
			retrievedData = await fetchData();

			if (retrievedData.error) {
				console.error('Failed to fetch data', retrievedData.error);
				modalError = true;
			} else {
				if (retrievedData.length <= 0) {
					modalError = true;
				} else {
					$allDocuments = retrievedData;
				}
			}
		} catch (error) {
			console.error('Network error', error);
			modalError = true;
		}
	});

	let onStopTyping = (e) => {
		let matches = document.querySelectorAll('.tableData');

		for (var i = 0; i < matches.length; i++) {
			matches[i].classList.remove('is-hidden');
			matches[i].classList.remove('active');
			if (e.target.value == '') {
				matches[i].classList.remove('is-hidden');
			}
			if (e.target.value == '') {
				matches[i].classList.remove('active');
			} else {
				if (matches[i].innerHTML.toLowerCase().includes(e.target.value)) {
					// console.log(matches[i]);
					matches[i].classList.add('active');
				} else {
					matches[i].classList.add('is-hidden');
				}
			}
		}
	};

	let modalNewLoc = false;
	function addNewLocation(confirmed) {
		if (confirmed == 'true') {
			$loading = true;

			$location = [];

			redirect('/protected?create=true');
		} else {
			modalNewLoc = true;
		}
	}

	function editCurrent(e) {
		redirect('/protected?id=' + e);
	}
	let toogleTab = (e) => {
		const elements = document.querySelectorAll('.tabbed-content');
		elements.forEach((element) => {
			element.classList.add('hidden');
			element.parentElement.parentElement.classList.remove('active');
		});

		let tab = document.getElementById('accordion-arrow-icon-body-' + e);
		tab.classList.toggle('hidden');
		tab.parentElement.parentElement.classList.add('active');
	};

	let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
</script>

{#if modalOptions}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title="Ustawienia" bind:open={modalOptions} autoclose>
			<form class="form-options flex-items" id="form-options">
				<div>
					<label>
						Odległość szukania sprzedarzy wokół lokalizacji: (metry)
						<input type="number" bind:value={$options.distanceNear} />
					</label>

					<label>
						Odległość poszukiwania punktów POI na stronie #1: (metry)
						<input type="number" bind:value={$options.distanceNearPOI} />
					</label>
					


				</div>
				<hr />

				<OptionsPoi />

				<div>
					<hr />
					<!-- <label for="standardMieszkania">Standard Mieszkania</label> -->
					<!-- <Select id="standardMieszkania" on:change={handleChange} multiple on:filter={handleFilter} bind:filterText bind:value {items}>
						<div slot="item" let:item>
							{item.created ? 'Add new: ' : ''}
							{item.label}
						</div>
					</Select> -->
				</div>
			</form>

			<svelte:fragment slot="footer">
				<button
					type="submit"
					on:click={() => {
						saveOptions();
					}}>Zapisz</button
				>
				<button type="reset" on:click={null}>Pobierz dane</button>
			</svelte:fragment>
		</Modal>
	</div>
{/if}

{#if modalError}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title="Wystąpił błąd pobierania danych" bind:open={modalError} autoclose>
			<svelte:fragment slot="footer">
				<!-- <Button color="alternative">Anuluj</Button> -->
			</svelte:fragment>
		</Modal>
	</div>
{/if}

{#if modalDelItem}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title="Czy na pewno chcesz usunąć lokalizację" bind:open={modalDelItem} autoclose>
			<svelte:fragment slot="footer">
				<Button on:click={removeDatax(modalDelItem)}>Usuń</Button>
				<Button color="alternative">Anuluj</Button>
			</svelte:fragment>
		</Modal>
	</div>
{/if}
{#if modalNewLoc}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title="Czy na pewno chcesz dodać nowy obiekt?" bind:open={modalNewLoc} autoclose>
			<svelte:fragment slot="footer">
				<Button on:click={() => addNewLocation('true')}>Dodaj</Button>
				<Button color="alternative">Anuluj</Button>
			</svelte:fragment>
		</Modal>
	</div>
{/if}

<div class="header">
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg flex _flex">
		<div class="p-4">
			<label for="table-search" class="sr-only">Search</label>
			<div class="relative mt-1">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<input
					on:stopTyping={onStopTyping}
					use:stopTyping
					type="text"
					id="table-search"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Wpisz fraze wyszukiwania"
				/>
			</div>
		</div>
		<div class="p-4">
			<!-- <DarkMode {btnClass} /> -->

			<button
				on:click={() => {
					addNewLocation();
				}}
				class="w-6 h-6 text-gray-500 dark:text-gray-400 buttonTable"
			>
				<img src={addLocation} alt="addLocation" />
			</button>
			<button
				on:click={() => {
					modalOptions = !modalOptions;
				}}
				class="w-6 h-6 text-gray-500 dark:text-gray-400 buttonTable"
			>
				<img src={settings} alt="ustawienia" />
			</button>
		</div>
	</div>
</div>

{#if !retrievedData}
	<div class="center"><Loading /></div>
{/if}

{#if retrievedData}
	{#each retrievedData as item}
		<div class="tableData">
			<div id="accordion-arrow-icon">
				<h2 id="accordion-arrow-icon">
					<button
						type="button"
						class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
						on:click={() => {
							toogleTab(item.ID);
						}}
					>
						<span>{item.adres} </span><span class="text-right text-sm right"
							>{item.createDate} {item.sellDate}</span
						>
						<svg
							data-accordion-icon
							class="w-3 h-3 rotate-180 shrink-0"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5 5 1 1 5"
							/>
						</svg>
					</button>
				</h2>
				<div
					id="accordion-arrow-icon-body-{item.ID}"
					class="hidden tabbed-content"
					aria-labelledby="accordion-arrow-icon-heading"
				>
					<div class="back p-5 border border-t-0 border-gray-200 dark:border-gray-700">
						<div class="flex_ flex">
							<div>
								Loklalizacja : {item.adres} Standard : {item.params.STANDARD}
								<br />

								<hr />

								<br />Powierzchnia : <b>{item.params.POW}</b>
								<br />CENA : {item.params.price} CENA m2 : {item.params.M2_PRICE}
								<br />Rynek : {item.params.RYNEK}
								<br />Rok budowy : {item.params.ROK_POWSTANIA}
							</div>

							<div>
								<button on:click={editCurrent(item.ID)} class="buttonTable">
									<img src={editLocation} alt="editLocation" />
								</button><br />
								<button
									on:click={() => {
										modalDelItem = item.ID;
									}}
									class="buttonTable"
								>
									<img src={delLocation} alt="delLocation" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
{/if}

<style lang="scss">
	#form-options {
		label {
			font-size: 12px;
		}
		display: flex;
		gap: 50%;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: flex-start;
		align-content: flex-start;
	}

	button.buttonTable:hover {
		background-color: rgba(20, 20, 20, 0.2);
	}
	button.buttonTable {
		border-radius: 20px;
		transition: all 0.2s ease-in;
		width: 39px;
		height: 39px;
		padding: 3px;
		padding-left: 6px;
		margin-bottom: 20px;
	}

	.header ._flex {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.tableData .flex_ {
		display: flex;
		justify-content: space-between;
	}

	.tableData .hidden {
		display: block !important;
		visibility: hidden;
		opacity: 1;
		height: 1px;
		transition: 0.1s;
	}
	.tableData .hidden > div {
		opacity: 0;
		transition: all ease 0.5s 0.3s;
		background-color: white;
		transition: 0.1s;
	}
	.tabbed-content > div {
		background-color: white;
		opacity: 1;
		transition-timing-function: ease-in;

		height: auto;
		transition: all ease 0.5s 0.3s;
	}

	.tabbed-content {
		transition: all ease 0.5s;
	}
	._header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
	}
	._header span.right {
		margin-right: 30px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	label {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}

	input[type='number'] {
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		background-color: #f2f2f2;
		transition: border-color 0.2s ease-in-out;
	}

	input[type='number']:focus {
		outline: none;
		border-color: #007bff;
	}

	button[type='submit'] {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		border: none;
		background-color: #007bff;
		color: #fff;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	button[type='submit']:hover {
		background-color: #0069d9;
	}
</style>
