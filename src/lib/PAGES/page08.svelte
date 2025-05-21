<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import Loading from '$lib/components/loading.svelte';
	import RangeSlider from 'svelte-range-slider-pips';
	import PMstatus from '$lib/components/Pmstatus.svelte';
	import { location } from '$lib/stores/appStore';

	// let ready = "false";

	// onMount(async () => {
	// 	if ($location && $location.params && $location.params.page08) {
	// 		ready = "true";
	// 		console.log($location.params.page08);
	// 	}
	// });
</script>

<div class="content-block section page_08">
	<Header />
	{#if !$location.params}
		<div class="center"><Loading /></div>
	{:else}
	
	
	<div class="page_content">
		<div class="containerFlex noselect">
			<div class="grid_content noselect mb-20">
				<div class="full-width">
					<h2 class="title_medium noselect">
						<span class="number_type noselect">17</span> Ocena zanieczyszczenia powietrza
					</h2>
					<p class="tabText">
						Stopień czystości powietrza to parametr istotny dla zdrowia. mający również wpływ na
						atrakcyjność okolicy,<br />w której znajduje się nieruchomość. Stąd, o ile
						występowaniu tzw. smogu towarzysza określone warunki atmosferyczne, take jak mgła lub
						brak wiatru, sama koncentracja zanieczyszczeń w danym obszarze stanowi punkt wyjściowy
						przy określaniu poziomu klarowności dostępnego w tym regionie powietrza.<br /><br
						/>Załączone poniżej informacje ukazują skale jakości powietrza w omawianej lokalizacji
						wskaźnik ten jest systematycznie badany i uaktualniany oraz dotyczy aglomeracji, gdzie
						zanieczyszczenie powietrza jest uznawane za problem. mowa tu m.in. o Krakowie.
						Warszawie lub Katowicach
					</p>
					<h3>
						Średni miesięczny poziom stężenia pyłów dla najbliższego punktu pomiarowego [µg/m³]:
					</h3>

					<PMstatus
						
					/>
				</div>
			</div>

			<div class="grid_content noselect mb-20 ocena">
				<div class="full-width">
					<h2 class="title_medium noselect">
						<span class="number_type noselect disabled_number" />Ocena jakosci powietrza
					</h2>
				</div>
			</div>

			{#if $location.params}
				<div class="flex">
					<div class="image">
						<img src="/images/solniczka.svg" style="width:110px;" />
					</div>

					<div class="text">
						<br />
						<hr />
						<p>Wskaźnik oznaczający poziom zanieczyszczenia powietrza</p>
					</div>

					<div class="rangeSlider_">
						<RangeSlider
							on:stop={(e) => {
								$location.params.page08.poziomBEZPIECZENSTWA = e.detail.value;
							}}
							range="min"
							values={[$location.params.page08.poziomBEZPIECZENSTWA]}
							max="5"
							pips
							all="label"
						/>

						<div />
					</div>
				</div>
			{/if}
		</div>

		<div class="pageNumber right">8</div>
	</div>



	{/if}




</div>

<style>
	.rangeSlider_ {
		width: 348px;
		padding-left: 59px;
	}

	.image {
		width: 100px;
		align-items: left;
	}

	.ocena {
		margin-top: -120px;
	}
	:global() .pageNumber {
		background: none;
		margin-top: 881px;
	}
	.disabled_number {
		background-color: white;
	}
</style>
