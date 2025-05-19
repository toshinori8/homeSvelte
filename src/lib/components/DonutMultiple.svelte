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

		const textLabels = arcs
			.append('text')
			.text((d) => d.data.val + ' %')
			.attr('transform', function (d) {
				const pos = arcChart.centroid(d);
				const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
				pos[0] = radius * labelOffset * (midangle < Math.PI ? 1 : -1);
				pos[1] = pos[1] - labelOffset + 7;
				return `translate(${pos})`;
			})
			.style('text-anchor', function (d) {
				const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
				return midangle < Math.PI ? 'start' : 'end';
			});
		// TODO opisy name ponad procentami
		// lewa prawa align tekstu

		// Dodane kropki
		textLabels
			.append('tspan')
			.text('.')
			.style('font-size', '10px')
			.style('fill', (d, i) => color[i])
			.append('tspan')
			.text((d) => ' ' + d.data.name) // Display the value next to the percentage
			.style('font-size', '12px')
			.style('fill', (d, i) => color[i])
			.attr('dy', '1em');

		// 			svg
		//   .append("line")
		//   .attr("x1", centerX)
		//   .attr("y1", 0)
		//   .attr("x2", centerX)
		//   .attr("y2", height)
		//   .attr("stroke", "black")
		//   .attr("stroke-width", 1);// Adjust the vertical position
		// TODO dodac opis obok procentu z data.name
		// t/extLabels
		// .classed('tspan', true)
		// 	.append('tspan')
		// 	.text((d) => ' ' + d.data.name) // Display the value next to the percentage
		// 	.style('font-size', '12px')
		// 	.style('fill', (d, i) => color[i])
		// 	.attr('dy', '1em'); // Adjust the vertical position

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
				return pos[0] + (midangle < Math.PI ? 1 : -1) * lineLength1;
			})
			.attr('y2', function (d) {
				const pos = arcChart.centroid(d);
				return pos[1];
			});

		adjustSVGElementsPosition();
	}

	function adjustSVGElementsPosition() {
		const svgElements = document.querySelectorAll('svg.donutTarget.donut *');
		let minX = 0;

		svgElements.forEach((element) => {
			const xValue = parseFloat(element.getAttribute('x')) || 0;
			minX = Math.min(minX, xValue);
		});

		if (minX < 0) {
			const shiftValue = 20;
			svgElements.forEach((element) => {
				let xValue = parseFloat(element.getAttribute('x')) || 0;
				xValue += shiftValue;

				element.setAttribute('x', xValue);
			});
		}
	}

	let labelOffset = 1.49; // Domyślne odsunięcie
	let lineLength1 = 60;
	let lineLength2 = 90;
	let lineThickness = 3;
	let lineTextOffset = 20;
	let polowa = 20;
	let odlegloscNaZewnatrz = 20;

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
