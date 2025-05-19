<script>
	import { location } from '$lib/stores/appStore.js';
	
	import { onMount } from 'svelte';
	import Loading from '$lib/components/loading.svelte';
	import { dayjs } from 'svelte-time';
	import * as d3 from 'd3';
	// import { tick } from 'svelte';

	let margin = { top: 10, right: 90, bottom: 50, left: 60 },
		width = 760 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;
	let mode;
	let ready = false;
	let datax = [];
	let quarterRoman;
	let qartals = [];
	let newQuartals;

	let generateWykres = (datax) => {
		let m2P = $location.params.M2_PRICE;
		function roundV(n, number) {
			return Math.floor(Math.round(n / number) * number);
		}

		var svg = d3.select('#uniqueSvgId');

		if (svg.empty()) {
			return false;
		}

		(margin = { top: 20, right: 20, bottom: 30, left: 50 }),
			(width = +svg.attr('width') - margin.left - margin.right),
			(height = +svg.attr('height') - margin.top - margin.bottom);

		var x = d3.scaleBand().range([0, width]).padding(0.1);
		var y = d3.scaleLinear().rangeRound([height, 0]).nice();

		let m2PriceY = y(m2P);

		var yAxis = d3
			.axisLeft(y)
			.tickFormat((d) => `${d} zł.`)
			.ticks(10);

		var xAxis = d3.axisBottom(x);

		var line = d3
			.line()
			.x(function (d) {
				return x(d.timeLabel) + x.bandwidth() / 2;
			})
			.y(function (d) {
				return y(d.value);
			});

		var labels = datax.map(function (d) {
			return d.timeLabel;
		});

		svg.selectAll('*').remove(); // Usunięcie poprzednich elementów

		var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		x.domain(labels);
		y.domain([
			0,
			d3.max(datax, function (d) {
				return d.value;
			})
		]);

		g.append('g')
			.attr('class', 'axis axis--x')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis);

		g.append('g').attr('class', 'axis axis--y').call(yAxis);

		// LINIA ŁACZACA PUNKTY

		g.append('path')
			.datum(datax)
			.attr('class', 'line')
			.attr('fill', 'none')
			.attr('stroke', 'var(--brand-green)')
			.attr('stroke-width', 3)
			.attr('d', line);

		// PUNKTY NA WYKRESIE

		g.selectAll('.dot')
			.data(datax)
			.enter()
			.append('circle')
			.attr('class', ['dot_wk'])
			.attr('id', (d, i) => 'dot_wk_' + i) // Dodaj unikalne ID do punktów
			.attr('r', 5)
			.attr('cx', function (d) {
				return x(d.timeLabel) + x.bandwidth() / 2;
			})
			.attr('cy', function (d) {
				return y(d.value);
			})
			.style('fill', 'white')
			.style('stroke-width', 2)
			.style('stroke', 'var(--brand-green)')
			.style('cursor', 'pointer')
			.call(d3.drag().on('drag', dragg));

		g.selectAll('.dot')
			.data(datax)
			.enter()
			.append('text')
			.attr('class', 'dot-label')
			.attr('id', (d, i) => 'dot-label_' + i) // Dodaj unikalne ID do opisów
			.attr('x', function (d) {
				return x(d.timeLabel) + x.bandwidth() / 2;
			})
			.attr('y', function (d) {
				return y(d.value); // Ustaw opis powyżej punktu
			})
			.text(function (d) {
				const numericValue = parseFloat(d.value);
				return isNaN(numericValue) ? d.value : numericValue.toFixed(2);
			})
			.style('text-anchor', 'middle')
			.style('font-size', '12px')
			.style('fill', 'var(--brand-green')
			.attr('transform', function (d) {
				// Sprawdź, czy tekst jest blisko osi X
				const isCloseToXAxis = y(d.value) < 60; // Dostosuj tę wartość do swoich potrzeb

				// Obrót tekstu o 90 stopni, jeśli jest blisko osi X
				if (isCloseToXAxis) {
					return (
						'rotate(-90 ' + (x(d.timeLabel) - 32 + x.bandwidth()) + ' ' + (y(d.value) + 18) + ')'
					);
				} else {
					return (
						'rotate(-90 ' + (x(d.timeLabel) - 70 + x.bandwidth()) + ' ' + (y(d.value) - 18) + ')'
					);
				}
			});

		// d3.select('.dot_wk:last-of-type').style('fill', 'var(--brand-green)');

		let lastDotX = parseFloat(d3.select('.dot_wk:last-of-type').attr('cx')) + 19.5;

		svg
			.append('line')
			.classed('dashed-line', true)
			.attr('x1', 70)
			.attr('y1', y(m2P) + 20)
			.attr('y2', y(m2P) + 20)

			.attr('x2', width - 14)
			.style('stroke', '#0399a6')
			.style('stroke-dasharray', '8,5');

		g.append('circle')
			.attr('class', 'dot_wk_current')
			.attr('cx', lastDotX - 20) // Ustaw punkt na końcu osi X
			.attr('cy', y(m2P)) // Ustaw punkt na wysokości linii kropkowanej
			.attr('r', 5)
			.style('fill', '#0399a6')
			.style('stroke-width', 2)
			.style('stroke', '#0399a6');

		g.append('text')
			.attr('x', lastDotX - 10)
			.attr('y', y(m2P)) // Dostosuj pozycję tekstu
			.text('TO MIESZKANIE')
			.style('fill', '#0399a6')
			.style('font-size', '9px'); // Kolor tekstu

		g.append('text')
			.attr('x', lastDotX - 10)
			.attr('y', y(m2P) + 20) // Dostosuj pozycję tekstu
			.text(m2P)
			.style('fill', '#0399a6')
			.style('font-size', '10px'); // Kolor tekstu

		function dragg(event) {
			// console.log(event, y.invert(event.sourceEvent.pageY));

			if (event.dy) {
				let svg = document.getElementById('uniqueSvgId');
				let svgPoint = svg.createSVGPoint();
				svgPoint.x = event.x;
				svgPoint.y = event.y;

				let screenCTM = svg.getScreenCTM();
				let invertedSVGPoint = svgPoint.matrixTransform(screenCTM.inverse());

				let newValue = y.invert(invertedSVGPoint.y);

				if (newValue >= 0) {
					event.subject.value = roundV(newValue, 50);
					updateDataValue(event.subject);
					generateWykres(datax);
				}
			}
		}

		function updateDataValue(point) {
			var index = datax.findIndex(function (d) {
				return d === point;
			});

			// console.log("updateDataValue",index,point );

			if (index !== -1) {
				datax[index].value = point.value;
				// console.log('update data value: ' + point.value);
				$location.params.page03.wykresData = datax;
			}
		}
		return true;
	};

	const getRomanNumeral = (num) => {
		const romanNumerals = ['I', 'II', 'III', 'IV'];
		return romanNumerals[num - 1] || num.toString();
	};

	async function updateWykres() {
		if ($location.params.M2_PRICE > 0 && $location.params.page03.numOfQ) {
			if ($location.params.page03.wykresData[1]) {
				// console.log('Data exist ENTERING EDIT MODE', $location.params.page03.wykresData);

				datax = $location.params.page03.wykresData;
				mode = 'edit';
				ready = true;
			} else {
				// console.log('Data not found ENTERING CREATE MODE');

				// data = [
				// 	{ timeLabel: 'I kw. 2023', value: 6500 },
				// 	{ timeLabel: 'II kw. 2023', value: 10500 },
				// 	{ timeLabel: 'III kw. 2023', value: 6167 },
				// 	{ timeLabel: 'IV kw. 2023', value: 4123 },
				// 	{ timeLabel: 'I kw. 2024', value: 4000 }
				// ];
				mode = 'create';
				ready = true;
				calculateQuart($location.params.page03.numOfQ);
			}
		}
	}
	updateWykres();



	function calculateQuart(nOfQuart) {
		qartals = [];

		for (let i = 0; i < nOfQuart; i++) {
			let date = dayjs().subtract(i * 3, 'month');
			let quarter = Math.floor(date.month() / 3) + 1;
			let year = date.year();
			quarterRoman = getRomanNumeral(quarter);
			let quarterLabel = `${quarterRoman} kw. ${year}`;
			qartals.push({ timeLabel: quarterLabel, value: 5500 });
		}

		qartals = qartals.reverse();

		if (datax) {
			// const lastElement = data[data.length - 1];
			// console.log(lastElement, qartals[qartals.length - 1]);

			// Uzupełnij newQuartals danymi z data, jeśli istnieją
			datax.forEach((d) => {
				const index = qartals.findIndex((element) => element.timeLabel === d.timeLabel);

				if (index !== -1) {
					qartals[index].value = parseFloat(d.value).toFixed(2);
				}
				// qartals.find((element) => element.timeLabel === d.timeLabel)
				// if(d.timeLabel == qartals[data.timeLabel])
				// {console.log(d.value)}
			});
		}
		datax = qartals; // Zwróć tablicę na zewnątrz funkcji
		generateWykres(datax);
	}

	onMount(async () => {



		updateWykres();





	});



	$: {
		if ($location && $location.params && ready == false) {

		
		}
		// console.log($location.params.M2_PRICE);
	
	}





</script>

{#if ready == false}
	<Loading />
{:else if ready == true}
	<svg id="uniqueSvgId" width="700" height="340" />

	<div class="options">
		<input
			id="num"
			type="number"
			min="1"
			max="20"
			step="1"
			bind:value={$location.params.page03.numOfQ}
			on:change={() => calculateQuart($location.params.page03.numOfQ)}
		/>

		<button id="akt" on:click={() => calculateQuart($location.params.page03.numOfQ)}
			>Uaktualnij kwartały</button
		>
		<button id="updateWyk" on:click={() => updateWykres()}
			>Uaktualnij wykres</button
		>
	</div>
{/if}

<style>
	.options button {
		border-radius: 12px;
		transition: all 0.2s ease-out;
		font-size: 12px;
		padding: 10px;
	}
	#num {
		border: 0.1px solid rgba(10, 10, 10, 0.1);
		position: relative;
		border-radius: 0px 0px 0 20px;
	}
	#akt:hover {
		color: white !important;
		background-color: rgba(10, 10, 10, 0.2);
	}
	#uniqueSvgId {
		background-color: rgba(10, 10, 10, 0.02);
		border-radius: 20px 20px 20px 0px;
	}

	.options {
		background-color: rgba(10, 10, 10, 0.02);
		width: 50%;
		text-align: left;
		border-radius: 0px 0px 20px 20px;
	}
	:global(text.dot-label) {
	}
</style>
