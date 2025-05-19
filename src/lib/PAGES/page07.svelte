<script>
	import { onMount, onDestroy } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import Loading from '$lib/components/loading.svelte';
	// import Slidericon from '$lib/components/slidericon.svg';
	import { location } from '$lib/stores/appStore.js';

	import RangeSlider from 'svelte-range-slider-pips';

	onMount(async () => {
		// console.log($location.params?.POI);
	});
</script>

<div class="content-block section page_05">
	<Header />
	{#if !$location.params}
		<div class="center"><Loading /></div>
	{/if}
	<!-- <div class="page_content">
		<div class="containerFlex noselect">
			<div class="grid_content noselect mb-20">
				<div class="full-width">
					<h2 class="title_medium noselect">
						<span class="number_type noselect">12</span> Ocena atrakcyjności otoczenia
					</h2>
					<p class="tabText">
						Na poniszej grafice przedstawiono kluczowe miejsca uytku publicznego w pobliu danej
						lokalizacji. Wykaz dostarcza informację o dzielące je od nieruchomości odległości.
						Poniej wskaźnika atrakcyjności okolicy widać współczynnik POI.
					</p>
				</div>
			</div>

			<div class="grid_content noselect">
				<div class="full-width grid_content">
					<div class="grid_content noselect">
						<div>
							<img src="/images/iconstar.svg" class="star" alt="ocena lokalizacji" />
						</div>
						<div>
							<hr class="hr-green" />
							<p class="textobok">
								Wskaźnik odznaczający<br />poziom atrakcyjności<br />okolicy
							</p>
						</div>
					</div>

					<div class="grid_content noselect">
						<RangeSlider range="min" values={[5]} max="5" pips all="label" />
					</div>
				</div>
			</div>

			<div class="full-width grid_content background-blur">
				<p>
					Powyższy współczynnik to wynik zestawienia i analizy strategicznych punktów użyteczności
					publicznej w danym obszarze. Każde takie miejsce zostało zweryfikowane pod względem
					stopnia Istotności i pożyteczności w codziennym życiu. Analiza ta obejmuje obszar w
					obrębie do 2 km od nieruchomosci, co oznacza, ze im wyższy wskaźnik, tym znaczenie punktów
					usytuowanych w okolicy jest większe.
				</p>
			</div>

			<br /><br /><br />
			<div class="grid_content noselect mb-20">
				<div class="full-width">
					<h2 class="title_medium noselect">Kluczowe punkty POI</h2>
				</div>
			</div>

			<div class="full-width grid_content">
				<div class="POI">
					{#if $location.params?.POI}
						{#each Object.entries($location.params.POI).filter( ([key, value]) => [2, 5, 6, 7, 8, 9, 10, 11].includes(value.id) ) as [key, POI]}
							<div class="grid_content">
								<div class="image_"><img src="/images/POI/{POI.icon}" /></div>

								<div class="POI_opis">
									<hr class="hr_green" />

									<br />

									<p class="name">{POI.name}</p>

									<p class="dist">{POI.dist}</p>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>

		<div class="pageNumber right">5</div>
	</div> -->
</div>

<style>
</style>
