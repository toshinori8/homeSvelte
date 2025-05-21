<script>
	import { onMount, afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';
	import { select, arc, pie } from 'd3';
	import * as d3 from 'd3';
	// INPUT VALUES
	export let id = '';
	export let data = [];
	import { draggable } from '@neodrag/svelte';
	
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

	let colorEl = 0;
	function createDonut() {
		donutElement.selectAll('*').remove();
		colorEl += 1;
		let width = 600,
			height = 230,
			transTime = 750, // length of transitions in ms
			cornerRadius = 0, // sets how rounded the corners are on each slice
			padAngle = 0, // effectively dictates the gap between slices
			variable = 'val', // changed to 'val' to match your data format
			category = 'name', // changed to 'name' to match your data format
			margin = { top: 10, right: 0, bottom: 10, left: 0 },
			updateData;

		let color = [
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

		let colour = d3.scaleOrdinal([
			'rgb(4,76,68)',
			'rgb(4,245,148)',
			'rgb(113,198,191)',
			'rgb(89,144,150)',
			'rgb(44,169,156)',
			'rgb(19,155,148)',
			'rgb(4,103,106)',
			'rgb(6,233,173)',
			'rgb(149,251,15)'
		]);

		// generate chart
		// ===========================================================================================
		var radius = Math.min(width, height) / 2;

		// creates a new pie generator
		var pie = d3
			.pie()
			.value(function (d) {
				return d[variable];
			})
			.sort(null);

		var arc = d3
			.arc()
			.outerRadius(radius * 0.65)
			.innerRadius(radius * 0.4)
			.cornerRadius(cornerRadius)
			.padAngle(padAngle);

		var outerArc = d3
			.arc()
			.outerRadius(radius * 0.9)
			.innerRadius(radius * 0.9);
		// ===========================================================================================

		// ===========================================================================================
		// append the svg object to the donutElement
		// var svg = donutElement.append('svg')
		var svg = donutElement
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
		// ===========================================================================================

		// ===========================================================================================
		// g elements to keep elements within svg modular
		svg.append('g').attr('class', 'slices');
		svg.append('g').attr('class', 'labelName');
		svg.append('g').attr('class', 'lines');
		// ===========================================================================================

		// ===========================================================================================
		// add and colour the donut slices
		var path = svg
			.select('.slices')
			.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr('d', arc).each(function (d, i) {
			d3.select(this)
				.attr('fill', color[i % color.length])
				
		});
		// ===========================================================================================

		// ===========================================================================================
		// add text labels
		var label = svg
			.select('.labelName')
			.selectAll('text')
			.data(pie(data))
			.enter()
			.append('text')
			.attr('dy', '.35em')
			.html(updateLabelText)
			.attr('transform', labelTransform)
			.style('text-anchor', function (d) {
				// if slice centre is on the left, anchor text to start, otherwise anchor to end
				return midAngle(d) < Math.PI ? 'start' : 'end';
			});
		// ===========================================================================================

		// ===========================================================================================
		// add lines connecting labels to slice. A polyline creates straight lines connecting several points
		var polyline = svg
			.select('.lines')
			.selectAll('polyline')
			.data(pie(data))
			.enter()
			.append('polyline')
			.attr('stroke-width', 2)
			.attr('fill', 'none')
			.attr('stroke', color[colorEl])
			.attr('points', calculatePoints).each(function (d, i) {
			d3.select(this)
				.attr('stroke', color[i % color.length]) 
				
		});
		// ===========================================================================================

		// ===========================================================================================

		d3.selectAll('.labelName text, .slices path');
		// ===========================================================================================

		// ===========================================================================================
		// FUNCTION TO UPDATE CHART
		updateData = function () {
			var updatePath = d3.select('.slices').selectAll('path');
			var updateLines = d3.select('.lines').selectAll('polyline');
			var updateLabels = d3.select('.labelName').selectAll('text');

			var data0 = path.data(), // store the current data before updating to the new
				data1 = pie(data);

			updatePath = updatePath.data(data1, key);
			updateLines = updateLines.data(data1, key);
			updateLabels = updateLabels.data(data1, key);

			// adds new slices/lines/labels
			updatePath
				.enter()
				.append('path')
				.each(function (d, i) {
					this._current = findNeighborArc(i, data0, data1, key) || d;
				})
				.attr('fill', function (d) {
					return color[colorEl];
				})
				.attr('d', arc);

			updateLines
				.enter()
				.append('polyline')
				.each(function (d, i) {
					this._current = findNeighborArc(i, data0, data1, key) || d;
				})
				.attr('points', calculatePoints);

			updateLabels
				.enter()
				.append('text')
				.each(function (d, i) {
					this._current = findNeighborArc(i, data0, data1, key) || d;
				})
				.html(updateLabelText)
				.attr('transform', labelTransform)
				.style('text-anchor', function (d) {
					return midAngle(d) < Math.PI ? 'start' : 'end';
				});

			// removes slices/labels/lines that are not in the current dataset
			updatePath.exit().transition().duration(transTime).attrTween('d', arcTween).remove();

			updateLines.exit().transition().duration(transTime).attrTween('points', pointTween).remove();

			updateLabels.exit().remove();

			// animates the transition from old angle to new angle for slices/lines/labels
			updatePath.transition().duration(transTime).attrTween('d', arcTween);

			updateLines.transition().duration(transTime).attrTween('points', pointTween);

			updateLabels
				.transition()
				.duration(transTime)
				.attrTween('transform', labelTween)
				.styleTween('text-anchor', labelStyleTween);

			updateLabels.html(updateLabelText); // update the label text

			// add tooltip to mouse events on slices and labels
			// d3.selectAll('.labelName text, .slices path').call(toolTip);
		};
		// ===========================================================================================
		// Functions
		// calculates the angle for the middle of a slice
		function midAngle(d) {
			return d.startAngle + (d.endAngle - d.startAngle) / 2;
		}

		function calculatePoints(d) {
			// see label transform function for explanations of these three lines.
			var pos = outerArc.centroid(d);
			pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
			return [arc.centroid(d), outerArc.centroid(d), pos];
		}

		function labelTransform(d) {
			var pos = outerArc.centroid(d);

			pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
			return 'translate(' + pos + ')';
		}

		function updateLabelText(d) {
			return d.data[category] + ': <tspan>' + d.data[variable] + '%' + '</tspan>';
		}

		function labelStyleTween(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function (t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? 'start' : 'end';
			};
		}

		function labelTween(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function (t) {
				var d2 = interpolate(t),
					pos = outerArc.centroid(d2); // computes the midpoint [x,y] of the centre line that would be
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1); // aligns the labels on the sides
				return 'translate(' + pos + ')';
			};
		}

		function pointTween(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function (t) {
				var d2 = interpolate(t),
					pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};
		}

		// function to calculate the tween for an arc's transition.
		// see http://bl.ocks.org/mbostock/5100636 for a thorough explanation.
		function arcTween(d) {
			var i = d3.interpolate(this._current, d);
			this._current = i(0);
			return function (t) {
				return arc(i(t));
			};
		}

		function findNeighborArc(i, data0, data1, key) {
			var d;
			return (d = findPreceding(i, data0, data1, key))
				? { startAngle: d.endAngle, endAngle: d.endAngle }
				: (d = findFollowing(i, data0, data1, key))
				? { startAngle: d.startAngle, endAngle: d.startAngle }
				: null;
		}
		// Find the element in data0 that joins the highest preceding element in data1.
		function findPreceding(i, data0, data1, key) {
			var m = data0.length;
			while (--i >= 0) {
				var k = key(data1[i]);
				for (var j = 0; j < m; ++j) {
					if (key(data0[j]) === k) return data0[j];
				}
			}
		}

		function key(d) {
			return d.data[category];
		}

		// Find the element in data0 that joins the lowest following element in data1.
		function findFollowing(i, data0, data1, key) {
			var n = data1.length,
				m = data0.length;
			while (++i < n) {
				var k = key(data1[i]);
				for (var j = 0; j < m; ++j) {
					if (key(data0[j]) === k) return data0[j];
				}
			}
		}

		// ===========================================================================================
	}

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
		<div class="donutTarget" {id} />
	</div>

	{#if open}
		<div class="legendWrapper" transition:fade use:draggable>
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

<style>
	:global(svg) {
		/* -webkit-filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3));
		filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25)); */
	}

	/* :global(polyline) {
		opacity: 1;
		stroke: black;
		stroke-width: 4px;
		fill: none !important;
		shape-rendering: geometricPrecision;
	}
	:global(.slices path) {
		opacity: 0.2;
		stroke: black;
		stroke-width: 4px;
		fill: none !important;
		shape-rendering: geometricPrecision;
	} */

	path {
		shape-rendering: geometricPrecision;
	}

	.labelName tspan {
		font-style: normal;
		font-weight: 700;
	}

	.labelName {
		font-size: 0.8em;
		font-style: italic;
	}
</style>
