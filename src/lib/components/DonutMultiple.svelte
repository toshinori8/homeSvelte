<script>
	import { onMount, afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';
	import { select, arc, pie } from 'd3';
	export let id = '';
	export let data = [];
	import * as d3 from 'd3';

	let newValues = {
		name: 'newData',
		val: 56
	};

	let donutElement;
	let ready = false;

	onMount(() => {
		donutElement = select('#' + id);
		createDonut();
		ready = true;
	});

	afterUpdate(() => {
		createDonut();
	});

	function updateChartData(index) {
		const newValue = newValues.val;
		const newName = newValues.name;

		data = data.map((item, i) => (i === index ? { ...item, val: newValue } : item));
	}

	function removeData(index) {
		data = data.filter((_, i) => i !== index);
	}

	function addData() {
		const newValue = newValues.val;
		const newName = newValues.name;

		data = [...data, { name: newName, val: newValue }];
	}

	function createDonut() {
		donutElement.selectAll('*').remove();

		const radius = 100;
		const width = 400;
		const height = 200;
		const color = [
			'rgb(4,76,68)',
			'rgb(4,245,148)',
			'rgb(113,198,191)',
			'rgb(89,144,150)',
			'rgb(44,169,156)',
			'rgb(19,155,148)',
			'rgb(4,103,106)',
			'rgb(6,233,173)',
			'rgb(149,251,15)'
		];
		const pieChart = pie().value((d) => d.val);
		const arcChart = arc()
			.innerRadius(radius - 40)
			.outerRadius(radius);

		const centerPie = { x: width / 2, y: height / 2 };

		const arcs = donutElement
			.selectAll('.arc')
			.data(pieChart(data))
			.enter()
			.append('g')
			.attr('class', 'arc')
			.attr('transform', `translate(${width / 2}, ${height / 2})`);

		arcs
			.append('path')
			.attr('d', arcChart)
			.attr('fill', (d, i) => color[i])
			.transition()
			.duration(1000)
			.attrTween('d', function (d) {
				const interpolateFn = d3.interpolate(this._previous, d);
				this._previous = d;
				return function (t) {
					return arcChart(interpolateFn(t));
				};
			});
		let margin = { left: 90, right: -70, top: 2, bottom: 2 };
		const textLabels = arcs
			.append('text')
			.text((d) => d.data.val + ' %')
			.attr('transform', function (d) {
				const pos = arcChart.centroid(d);
				return `translate(${pos})`;
			})
			.style('text-anchor', function (d) {
				const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
				return midangle < Math.PI ? 'end' : 'start';
			})
			.each(function (d) {
				const box = this.getBBox();
				let transform = d3.select(this).attr('transform'); // Pobranie wartości transform
				let translate = transform
					.substring(transform.indexOf('(') + 1, transform.indexOf(')'))
					.split(',');
				let x = parseFloat(translate[0]);
				let y = parseFloat(translate[1]);

				if (x < 0) {
					d3.select(this).attr('y', y - 2);
					d3.select(this).attr('x', margin.right).style('text-anchor', 'end');
				} else {
					d3.select(this).attr('y', y - 0);
					d3.select(this).attr('x', margin.left).style('text-anchor', 'start');
				}
			});

		// lewa prawa align tekstu

		// Dodane kropki
		textLabels
			.append('tspan')
			.text('.')
			.style('font-size', '10px')
			.style('fill', (d, i) => color[i])
			.append('tspan')
			.text((d) => ' ' + d.data.name) // Display the value next to the percentage
			.style('font-size', '17px')
			.style('fill', (d, i) => color[i])
			.attr('dy', '1em')
			.attr('dy', '1em')
			.each(function (d) {
				const self = d3.select(this); // Refers to the 'tspan' this code is dealing with
				const bbox = self.node().getBBox();

				let x = bbox.x;
				let y = bbox.y;

				console.log(x, y, self._groups[0]);

				if (x < 0) {
					self
						// .attr('y', y + 10)
						.attr('x', margin.right-53)
						.style('text-anchor', 'start');
				} else if(x>0) {
					self
						// .attr('y', y - 0)
						.attr('x', margin.left)
						// .style('text-anchor', 'start');
				}
			});

		// Dodane linie

		arcs
			.append('line')
			.attr('stroke-width', lineThickness)
			.attr('stroke', (d, i) => color[i])
			.attr('x1', function (d) {
				const pos = arcChart.centroid(d);
				const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
				return pos[0] + (midangle < Math.PI ? 1 : -1) * 2; // 2 to odległość od końca tekstu
			})
			.attr('y1', function (d) {
				const pos = arcChart.centroid(d);
				return pos[1];
			})
			.attr('x2', function (d) {
				const pos = arcChart.centroid(d);
				const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
				return pos[0] + (midangle < Math.PI ? window.innerWidth : -1) * lineLength1 * 4; // Multiply lineLength1 by 2 to make the line longer
			})
			.attr('y2', function (d) {
				const pos = arcChart.centroid(d);
				return pos[1];
			})
			.each(function (d) {
				const box = this.getBBox();
				const x = d3.select(this).attr('x1');
				const y = d3.select(this).attr('y1');

				console.log(centerPie, x);
				if (x < 0) {
					console.log('lewa linia');

					// d3.select(this).select('text').attr('x', margin.left).style('text-anchor', 'start');
				} else {
					console.log('prawa linia');
				} // if (x - box.width < margin.left) {
				//   d3.select(this).attr('x', margin.left).style('text-anchor', 'start');
				// } else if (x + box.width > width - margin.right) {
				//   d3.select(this).attr('x', width - margin.right).style('text-anchor', 'end');
				// }
			});

		// dodanie pionowej liniii
		donutElement
			.append('line')
			.attr('x1', centerPie.x) // Początek linii w połowie szerokości
			.attr('y1', 0) // Początek linii na górze
			.attr('x2', centerPie.x) // Koniec linii również w połowie szerokości (linia pionowa)
			.attr('y2', centerPie.y) // Koniec linii na dole
			.style('stroke', 'black') // Kolor linii
			.style('stroke-width', 5); // Szerokość linii

		// adjustSVGElementsPosition();
	}

	// function adjustSVGElementsPosition() {
	// 	const svgElements = document.querySelectorAll('svg.donutTarget.donut *');
	// 	let minX = 0;

	// 	svgElements.forEach((element) => {
	// 		const xValue = parseFloat(element.getAttribute('x')) || 0;
	// 		minX = Math.min(minX, xValue);
	// 	});

	// 	if (minX < 0) {
	// 		const shiftValue = 120;
	// 		svgElements.forEach((element) => {
	// 			let xValue = parseFloat(element.getAttribute('x')) || 0;
	// 			xValue += shiftValue;

	// 			element.setAttribute('x', xValue);
	// 		});
	// 	}
	// }

	let labelOffset = 1.49; // Domyślne odsunięcie
	let lineLength1 = 60;
	let lineThickness = 4;

	let open = false;
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/donutMultiple.scss" />
	<script src="http://d3js.org/d3.v6.min.js" charset="utf-8"></script>
</svelte:head>

<div class="bigWrapper">
	<div
		class="donutWrapper"
		aria-hidden
		on:click={() => {
			open = !open;
		}}
	>
		<svg class="donutTarget donut svgDonut" {id} />
	</div>

	{#if open}
		<div class="legendWrapper" transition:fade>
			<button
				class="close"
				on:click={() => {
					open = !open;
				}}>x</button
			>

			<div class="addDataBox">
				<input class="dataName" contenteditable="true" bind:value={newValues.name} />
				<input class="dataValue" contenteditable="true" bind:value={newValues.val} />
				<button class="addButton" on:click={addData}>+</button>
			</div>

			<ul class="donutTarget legend">
				{#each data as { name, val }, i (i)}
					<li>
						<input contenteditable="true" bind:value={data[i].name} />
						<input contenteditable="true" bind:value={data[i].val} />
						<button on:click={() => removeData(i)} class="removeButton">x</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
