<script>
	import Header from '$lib/components/header.svelte';
	import Loading from '$lib/components/loading.svelte';
	import { location, data, newLocation } from '$lib/stores/appStore.jsx';
	import DonutMultiple from '$lib/components/DonutMultiple.svelte';
	import Wykres from '$lib/components/Wykres.svelte';
</script>

<div class="content-block section page_03">
	<Header />

	{#if !$location.params}
		<div class="center"><Loading /></div>
	{/if}

	{#if $location.adres}
		<div class="page_content">
			<div class="grid_content noselect full">
				<h2 class="title_medium noselect">
					<span class="number_type noselect">8</span> Wykaz średnich cen sprzedaży nieruchomości w
					odniesieniu do miasta
					<span
						style="    color: var(--brand-green);
				font-size: 1.2em;">{$location.adres} - {$location.params.price}</span
					>
				</h2>
			</div>

			{#if !$location.params.M2_price && $location.params.M2_PRICE == 0}
				<div class="center">
					cena za metr: {$location.params.M2_PRICE}
					<Loading />
				</div>
			{:else}
				cena za metr: {$location.params.M2_PRICE}
				<Wykres />
			{/if}

			<div>

			<div class="grid_content noselect centered full" >

			<h2 class="title_medium noselect">
				<span class="number_type noselect">9</span>
				Prezentacja cen sprzedaży nieruchomości w mieście
				<span style="    color: var(--brand-green);">{$location.adres}</span>
			</h2>

			<div class="grid_content noselect centered full">
				<DonutMultiple data={$location.params.page03.data1} id={'id1'} />
			</div>

			<h2 class="title_medium noselect">
				<span class="number_type noselect">10</span>
				Zestawienie sprzedawanych mieszkań w mieście
				<span style="    color: var(--brand-green);">{$location.adres}</span><br />z podziałem na
				powierzchnie
			</h2>

			<div class="grid_content noselect centered full">
				<DonutMultiple data={$location.params.page03.data2} id={'id2'} />
			</div>

			<div class="pageNumber">3</div>
			</div>
		</div>
		</div>
	{/if}
</div>

<svelte:head>
	<link rel="stylesheet" href="/css/donut.scss" />
</svelte:head>

<style type="scss">
	.pageNumber {
		background-color: transparent;
		margin-top: -64px;
		margin-left: -543px;
	}
</style>
