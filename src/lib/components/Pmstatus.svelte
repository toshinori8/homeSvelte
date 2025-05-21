<script>
	import { location } from '$lib/stores/appStore';
	import Range08 from '$lib/components/range08.svelte';
	import { onMount } from 'svelte';
	let activeElement = null; // Element, który jest aktualnie przeciągany
	let color = ['rgba(14, 207, 93, 1.000)', 'rgba(121, 253, 171, 1.000)'];

	export let positionPM10 = $location.params.page08.positionPM10; // Początkowa pozycja PM10
	export let positionPM25 = $location.params.page08.positionPM25; // Początkowa pozycja PM2.5
	let startX;
	const handleMouseDown = (event, type) => {
		activeElement = type; // Ustawiamy aktywny element na ten, który jest kliknięty
		startX = event.clientX; // Zapisujemy pozycję początkową przy kliknięciu
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	// Funkcja obsługująca ruch myszy
	const handleMouseMove = (event) => {
		const deltaX = event.clientX - startX; // Obliczamy przesunięcie względem pozycji początkowej
		let newPosition;

		// Określamy, który element jest przeciągany i dostosowujemy jego pozycję
		if (activeElement === 'PM10') {
			newPosition = positionPM10 + deltaX / 5; // Przesunięcie dzielimy przez 5 dla płynniejszego ruchu
			positionPM10 = Math.max(1, Math.min(100, newPosition)); // Ograniczenie wartości PM10
		} else if (activeElement === 'PM25') {
			newPosition = positionPM25 + deltaX / 5; // Przesunięcie dzielimy przez 5 dla płynniejszego ruchu
			positionPM25 = Math.max(1, Math.min(100, newPosition)); // Ograniczenie wartości PM2.5
		}

		startX = event.clientX; // Aktualizujemy pozycję początkową przy każdym ruchu
	};

	// Funkcja obsługująca zdarzenie mouseup
	const handleMouseUp = () => {
		if (activeElement === 'PM10') {
		

			$location.params.page08.positionPM10 = positionPM10; // Początkowa pozycja PM10
		} else if (activeElement === 'PM25') {
			$location.params.page08.positionPM25 = positionPM25;
			
		}

		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
		activeElement = null; // Resetujemy aktywny element po zakończeniu przeciągania
	};

	// Funkcja konwertująca wartość na przedział 1-100
	const convertToPercentage = (value) => {
		return ((value - 1) / (100 - 1)) * 100;
	};

	// Funkcja wywoływana po montażu komponentu
	onMount(() => {
		// Konwersja początkowych wartości na przedział 1-100
		positionPM10 = convertToPercentage(positionPM10);
		positionPM25 = convertToPercentage(positionPM25);
	});
</script>

<div class="line">
	<div
		class="draggable pm10"
		style="left: {convertToPercentage(positionPM10)}%; background-color: {color[1]}"
		on:mousedown={(e) => handleMouseDown(e, 'PM10')}
	/>
	<div
		class="draggable pm25"
		style="left: {convertToPercentage(positionPM25)}%; background-color: {color[0]}"
		on:mousedown={(e) => handleMouseDown(e, 'PM25')}
	/>
</div>

<div class="container">
	{#if $location.params && $location.params.page08}
		<div class="cont_left">
			<div class="angry-grid">
				<div class="item-0">Styczeń</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x1_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x1_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Luty</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x2_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x2_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Marzec</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x3_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x3_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Kwiecień</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x4_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x4_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Maj</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x5_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x5_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Czerwiec</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x6_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x6_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Lipiec</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x7_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x7_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Sierpień</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x8_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x8_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Wrzesień</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x9_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x9_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Październik</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x10_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x10_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Listopad</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x11_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x11_25} color="1" />
				</div>
			</div>
			<div class="angry-grid">
				<div class="item-0">Grudzień</div>
				<div class="item-1">
					<Range08 bind:value={$location.params.page08.PMcurrent.x12_10} color="0" />
				</div>
				<div class="item-2">
					<Range08 bind:value={$location.params.page08.PMcurrent.x12_25} color="1" />
				</div>
			</div>
		</div>
	{/if}

	<div class="content_right">
		<ul class="shadowBox">
			<li>
				<span>
					<svg class="_45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 1.05">
						<defs>
							<style>
								.xls-1 {
									fill: #2181b3;
									stroke-width: 0px;
								}
							</style>
						</defs>
						<rect class="xls-1" width="15.8" height="4" />
					</svg>
				</span>Norma PM10
				<span class="text"
					>mieszanina występujących<br />w powietrzu cząstek<br />o średnicy nie mniejszej niz 10
					mikrometrów</span
				>
			</li>
			<li>
				<span>
					<svg class="_45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 1.05">
						<defs>
							<style>
								.xls-2 {
									fill: #75ffb0;
									stroke-width: 0px;
								}
							</style>
						</defs>
						<rect class="xls-2" width="15.8" height="4" />
					</svg>
				</span>Norma PM2.5
				<span class="text">aerozol atmosferyczny o średnicy niewykraczającej poza 2.5 mikrona</span>
			</li>
			<li>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.35 7.35">
						<defs>
							<style>
								.xls-3 {
									fill: #2181b3;
									stroke-width: 0px;
								}
							</style>
						</defs>
						<rect class="xls-3" x="0" y="0" width="15.03" height="7" rx="4.08" ry="4.08" />
					</svg>
				</span>PM10
			</li>
			<li>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.35 7.35">
						<defs>
							<style>
								.xls-4 {
									fill: #75ffb0;
									stroke-width: 0px;
								}
							</style>
						</defs>

						<rect class="xls-4" x="0" y="0" width="15.03" height="7" rx="4.08" ry="4.08" />
					</svg>
				</span><span>PM2.5</span>
				<span class="text"
					>Im większe stężenie tych dwóch związków<br />w powietrzu, tym jego jakość się zmniejsza,<br
					/>a współczynnik szkodliwości dla zdrowia jednostki rośnie</span
				>
			</li>
		</ul>
	</div>
</div>

<style>
	.pm10 {
	}

	.pm25 {
	}

	.shadowBox {
		display: flex;
		box-shadow: 0px 2px 17px 0px rgba(66, 68, 90, 0.21);
		width: 140px;
		font-size: 10px;
		border-radius: 25px;
		margin-left: 167px;
		padding: 19px;
		flex-direction: column;
		align-content: space-around;
		align-items: flex-start;
	}

	.shadowBox .text {
		font-size: 9px;
		text-align: right;
		margin-top: 10px;
		margin-bottom: 10px;
		line-height: 120%;
		width: 120px;
		padding-right: 10px;
		border-top: 1px solid rgba(0, 0, 0, 0.12);
	}

	.shadowBox li svg._45 {
		transform: rotate(90deg);
		padding-left: 9px;
	}
	.shadowBox li span {
		float: left;
	}
	.shadowBox li svg {
		width: 24px;
		padding: 3px;
		height: 14px;
		margin-right: 6px;
	}

	.line {
		width: 359px;
		overflow: hidden;
		height: 387px;
		margin-top: 20px;
		margin-left: 40px;
		background-color: rgba(0, 0, 0, 0);
		position: absolute;
	}

	.draggable {
		width: 3px;
		height: 335px;

		position: absolute;
		cursor: ew-resize;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99999999999;
	}
</style>
