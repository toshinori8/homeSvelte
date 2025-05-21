<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import Loading from '$lib/components/loading.svelte';
	import { location } from '$lib/stores/appStore';
	import DonutMultiple from '$lib/components/DonutMultiplePage7.svelte';
	import Donut from '$lib/components/DonutD3page7.svelte';
	onMount(async () => {
		// console.log($location.params?.POI);
	});





</script>

<div class="content-block section page_07">
	<Header />
	{#if !$location.params}
		<div class="center"><Loading /></div>
	{/if}

	{#if $location.params && $location.params.page07 && $location.params.page07.text14}
		<div class="page_content">
			<div class="containerFlex noselect">
				<div class="grid_content noselect mb-20">
					<div class="full-width">
						<h2 class="title_medium noselect">
							<span class="number_type noselect">14</span> Rozkład preferencji wyborczych w okolicy
						</h2>
						<p class="tabText" contenteditable>
							{$location.params.page07.text14}
						</p>
					</div>
				</div>

				<div class="grid_content noselect mb-20">
					<div class="full-width">
						<h2 class="title_medium noselect">
							<span class="number_type noselect">15</span>Rozkład głosów w ostatniej turze wyborów w
							danej okolicy:
						</h2>
					</div>
				</div>

				<div class="grid_content noselect mb-20">
					<div class="full-width">
						<div class="wykres">
							<DonutMultiple  bind:data={$location.params.page07.wykresData} id={'page7donut'} />
						</div>
					</div>
				</div>

				<div class="grid_content noselect mb-20">
					<div class="full-width">
						<h2 class="title_medium noselect">
							<span class="number_type noselect">16</span>Bilans uzyskanej frekwencji w odniesieniu
							do ostatnich wyborów parlamentarnych
						</h2>
					</div>
				</div>

				{#if $location.params}
					<div class="donuts">
						<Donut
							bind:value={$location.params.page07.donut1}
							editable={true}
							on:valueChange={(event) => console.log(event.detail)}
						/>

						<Donut
							bind:value={$location.params.page07.donut2}
							editable={true}
							on:valueChange={(event) => console.log(event.detail)}
						/>
					</div>
				{/if}
			</div>

			<div class="pageNumber right">7</div>
		</div>
	{/if}
</div>

<style>
	:global(.donuts .svg-item) {
		margin-top: -24px;
		margin-left: -169px;
		padding: 0px;
		position: relative;
		max-width: 31%;
		display: initial;
	}
	:global(.donuts .optionsDonut.active){

		position: relative !important;
    display: block;
    margin: -116px -315px;
    left: -107px;
    top: -303px;
	}
	:global(.donuts .svg-item .options) {
		position: absolute;
	}
	:global(.donuts .svg-option-button) {
		z-index: 99999999999;
		position: absolute;
		background-color: rgba(123, 154, 185, 0);
	}
	.donuts {
		display: flex;
		width: 657px;
		height: 200px;
		flex-direction: row;
		justify-content: space-evenly;
		margin-top: -40px;
	}
	:global(.donuts .svg-item) {
		transform: scale(1.12);
	}
	.pageNumber {
		background: none;
		margin-top: 881px;
	}
</style>
