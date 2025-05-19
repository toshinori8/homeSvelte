<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import Loading from '$lib/components/loading.svelte';
	// import {inputAutoSize} from '$lib/components/inputAutoSize.js';
	import Table from '$lib/components/Table.svelte';
	import { location } from '$lib/stores/appStore.jsx';
	import Donut from '$lib/components/DonutD3.svelte';


	function inputAutoSize(node) {
    const autosize = () => {
        const measuringElement = document.createElement('div');
        document.body.appendChild(measuringElement);

        function duplicateAndSet() {
            const styles = window.getComputedStyle(node);
            measuringElement.innerHTML = node.value;
            measuringElement.style.fontSize = styles.fontSize;
            measuringElement.style.fontFamily = styles.fontFamily;
            measuringElement.style.paddingLeft = styles.paddingLeft;
            measuringElement.style.paddingRight = styles.paddingRight;
            measuringElement.style.boxSizing = 'border-box';
            measuringElement.style.border = styles.border;
            measuringElement.style.width = 'max-content';
            measuringElement.style.position = 'absolute';
            measuringElement.style.top = '0';
            measuringElement.style.left = '-9999px';
            measuringElement.style.overflow = 'hidden';
            measuringElement.style.visibility = 'hidden';
            measuringElement.style.whiteSpace = 'pre';
            measuringElement.style.height = '0';
            node.style.width = `${measuringElement.offsetWidth}px`;
        }

        duplicateAndSet();

        const observer = new MutationObserver(duplicateAndSet);
        observer.observe(node, { attributes: true, childList: true, subtree: true });

        return {
            update() {
                duplicateAndSet();
            },
            destroy() {
                observer.disconnect();
            }
        };
    };

    const handlerObject = autosize(node);

    node.addEventListener('input', handlerObject.update);

    return {
        update() {
            handlerObject.update();
        },
        destroy() {
            node.removeEventListener('input', handlerObject.update);
            handlerObject.destroy();
        }
    };
}

	let calc_rentownoscK = () => {
		// <!--  rentowność / gorny inut * 12 => wynik podzielony przez wartosc lokalu => donut   120000/(1000*12)-->
		let val = $location.params.price / ($location.params.page02.rentownoscK * 12);
		$location.params.page02.rentownoscKPercent = val;
		// console.log('calc_rentownoscK', val);
		$location.params.page02.rentownoscK12 = $location.params.page02.rentownoscK * 12;
	};

	let calc_rentownoscD = (e) => {
		// Update procent wyswietlony w donut
		$location.params.page02.rentownoscDPercent = e;
		// Dochód w skali miesiąca
		let monthIncome = $location.params.page02.rentownoscK;
		// Dzienny dochód
		let dailyIncome = monthIncome / 30;
		// obłozenie
		let oblozenie = e;

		// --------------------------
		let profitPerDay = dailyIncome * oblozenie;
		let profitPerYear = profitPerDay * 360;
		let profitPerMonth = profitPerDay * 30;

		// console.log(e, 	Math.floor(profitPerDay),
		// 				Math.floor(profitPerMonth),
		// 				Math.floor(profitPerYear))

		// Display information
		$location.params.page02.rentownoscD1 = profitPerDay.toFixed(0);
		$location.params.page02.rentownoscD12 = profitPerYear.toFixed(0);
	};
	let ready = false;
	onMount(async () => {
		ready = true;
	});
</script>

<div class="content-block section page_02">
	<Header />

	{#if ready === false}
		<div class="center"><Loading /></div>
	{:else if ready === true && $location.params}
		<div class="page_content">
			<div class="grid_content noselect">
				<h2 class="title_medium noselect">
					<span class="number_type noselect">5</span> Przedstawiono wycenę sporządzoną w oparciu o
					szereg licznych transakcji, graficzny wykaz tych przeprowadzonych w najbliższej okolicy
					uwzględniono na mapce za pomocq symbolu (<span class="dot" />). Co widać poniżej:
				</h2>
			</div>

			<div class="grid_content noselect">
				<Table />
			</div>

			<div class="grid_content noselect">
				<h2 class="title_medium noselect">
					<span class="number_type noselect">6</span>Rentowność wynajmu - długoterminowa
				</h2>
			</div>

			<div class="grid_content noselect chart01">
				<div class="rent-dlugo">
					<!--  rentowność / gorny inut * 12 => wynik podzielony przez wartosc lokalu => donut   120000/(1000*12)-->
					<span
						><input
							use:inputAutoSize
							class="rentownoscK"
							bind:value={$location.params.page02.rentownoscK}
							on:change={() => {
								calc_rentownoscK();
							}}
						/></span
					>

					<span>zł/mieś</span>
					<br />

					<span class="zl-mies-opis">Przypuszczalny zysk w skali miesiąca</span>
					<hr class="hr" />

					<span
						><input
							use:inputAutoSize={{ value: $location.params.page02.rentownoscK12 }}
							contenteditable="false"
							class="rentownoscK12"
							bind:value={$location.params.page02.rentownoscK12}
						/>zł/rok</span
					>

					<span class="zl-mies-opis"><br />Przypuszczalny zysk w skali roku</span>
				</div>

				{#if $location.params}
					<Donut value={$location.params.page02.rentownoscKPercent} />
				{/if}

				<div class="opisLewy">Możliwy do uzyskania zysk w ciągu roku względem wartości lokalu</div>
			</div>

			<div class="grid_content noselect">
				<h2 class="title_medium noselect">
					<span class="number_type noselect">7</span>Rentowność wynajmu - krótkoterminowa
				</h2>
			</div>
			<div class="grid_content noselect chart01">
				<div class="rent-dlugo">
					<span
						><input
						use:inputAutoSize={{ value: $location.params.page02.rentownoscD1 }}
							class="rentownoscD1"
							bind:value={$location.params.page02.rentownoscD1}
						/>zł/dzień</span
					>
					<br />

					<span class="zl-mies-opis">Przypuszczalny zysk w przeliczeniu na dzień</span>
					<hr class="hr" />
					<span
						><input
						use:inputAutoSize={{ value: $location.params.page02.rentownoscD12 }}
							class="rentownoscD12"
							bind:value={$location.params.page02.rentownoscD12}
						/>zł/miesiąc</span
					>
					<span class="zl-mies-opis"><br />Przypuszczalny zysk w skali miesiąca</span>
				</div>
				{#if $location && $location.params.page02.rentownoscDPercent}
					<Donut
						value={$location.params.page02.rentownoscDPercent}
						editable={true}
						on:valueChange={(event) => calc_rentownoscD(event.detail)}
					/>
				{/if}
				<div class="opisLewy">Wskaźnik obłożenia<br />w skali roku</div>
			</div>
		</div>
	{/if}
	<div class="pageNumber">2</div>
</div>

<style>
</style>
