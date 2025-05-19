<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import Loading from '$lib/components/loading.svelte';
	import { location } from '$lib/stores/appStore.jsx';
	import RangeSlider from 'svelte-range-slider-pips';
	import MapaDots from '$lib/components/mapaDots.svelte';
	import Ramka from '$lib/components/ramka.svelte';
	import CityPolygon from '$lib/components/cityPolygon.svelte';


</script>




zzzzz
<CityPolygon/>



<div class="content-block section page_05 page_06">




	<Header />

	{#if !$location.params}

	<div class="center"><Loading/></div>
	
	{/if}
	{#if $location.adres}
	<div class="page_content">
		<div class="containerFlex noselect">
			<div class="grid_content noselect mb-20">
				<div class="full-width">
					<h2 class="title_medium noselect">
						<span class="number_type noselect">13</span> Poziom bezpieczeństwa okolicy
					</h2>
					<p class="tabText">
						Poniżej oznaczono wynik analizy odnoszący się do występowania potencjalnych zagrożeń,
						biorąc pod uwagę czynnik ludzki - statystyki popełnianych w danym obszarze przestępstw.
						Im wyższy wskaźnik, tym skalę rodzaj i liczbę przewinień zanotowanych w okolicy uznaję
						się za mało lub nieistotne w odniesieniu do ogólnego bezpieczeństwa. Przy tworzeniu
						analizy wzięto pod uwagę uchybienia skupione wokół kilku kategorii, w tym wandalizm,
						kradzieże, napady, pobicia. Przedstawiony poniżej rezultat ma charakter lokalny, co
						oznacza, ze zakres wartości tyczy się danego miasta.
					</p>
				</div>
			</div>
			<div class="grid_content noselect">
				<div class="full-width grid_content">
					<div class="grid_content noselect">
						<div>
							<img src="/images/shield.svg" class="star" alt="ocena bezpieczeństwa lokalizacji" />
						</div>
						<div>
							<hr class="hr-green" />
							<p class="textobok">
								Wskaźnik odznaczający<br />poziom bezpieczeństwa <br />otoczenia
							</p>
						</div>

						
					</div>

					<div class="grid_content noselect">
						<RangeSlider  on:stop={(e) => { $location.params.page06.poziomBEZPIECZENSTWA= e.detail.value }} range="min" values={[$location.params.page06.poziomBEZPIECZENSTWA]} max="5" pips all="label"  />
					</div>
				</div>
			</div>
			<div class="full-width grid_content background-blur">
				<p>
					Przy wyliczeniu powyższej wartości wzięto pod uwagę liczbę akcji o charakterze
					przestępczym, które miały miejsce w obrębie 1,5 km od nieruchomości. Z tego względu ogólny
					poziom bezpieczeństwa dla wybranej dzielnicy może de facto obiegać od zobrazowanego wyżej
					wskaźnika.
				</p>
			</div>
			
			<div class="grid_content POI_conteiner">
				
				<div class="POI_map">
					<MapaDots bind:address={$location.adres}/>
				</div>
				<div class="POI_opis">
					<br /><br /><br />
					<p>Stopień poziomu bezpieczeństwa</p>
					<Ramka value="{$location.params.page06.poziomBEZPIECZENSTWA}" />
					<hr class="green" />
					<h2>Wskazana mapka aglomeracji miejskiej <br>
						obrazuje {$location.params.page06.poziomBEZPIECZENSTWA} poziom bezpieczeństwa dla<br> wybranej dzielnicy.
					</h2> 
				</div>
			</div>
		</div>
		<div class="pageNumber right">6</div>
	</div>


	{/if}
</div>
