<script>
	import { onMount, afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';
	import { select, arc, pie } from 'd3';
	import * as d3 from 'd3';
	import { browser } from '$app/environment';
	// import addImage from '$lib/components/addImage.svg';
	import { draggable } from '@neodrag/svelte';

	import { MoveIcon, SortableItem } from 'svelte-sortable-items';
	import { flip } from 'svelte/animate';

	import Filelist from '$lib/components/Filelist.svelte';
	let showFileList = false;
	// let imageSrc = addImage;
	let currentData;
	// Funkcja obsługująca kliknięcie na obrazek i pokazująca listę plików
	function handleImageClick(e) {
		showFileList = true;
		document.querySelectorAll('img.mini').forEach((img) => {
			img.classList.remove('active');
		});
		e.srcElement.classList.add('active');
	}

	async function handleClickElement(index) {
		let imgElement = document.querySelector('img.mini.active');
		if (imgElement) {
			imgElement.src = index; //podmień na nową ścieżkę
			let dataVal = imgElement.getAttribute('dataVal');

			data[dataVal].image = index;

			// console.log(data);
		}
	}
	let _id = 0;
	// INPUT VALUES
	export let id = '';
	export let data;

	let newValues = {
		id: _id,
		image: 'image',
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
	function sortDataById() {
		data.sort((a, b) => a.id - b.id);
	}
	function updateChartData(index) {
		const newValue = newValues.val;
		const newName = newValues.name;
		const newImage = newValues.image;

		// Aktualizuj dane
		data = data.map((item, i) => (i === index ? { ...item, val: newValue } : item));

		// Sortuj dane po ID
		sortDataById();
	}
	function removeData(index) {
		data = data.filter((_, i) => i !== index);
	}

	function addData() {
		const newValue = newValues.val;
		const newName = newValues.name;
		const newImage = newValues.image;
		const newId = _id + 1 + Math.floor(Math.random() * 100) + 1;
		data = [...data, { name: newName, val: newValue, image: newImage, id: newId }];
	}

	let colorEl = 0;
	function createDonut() {
		donutElement.selectAll('*').remove();
		colorEl += 1;
		let width = 800,
			height = 400,
			transTime = 750,
			cornerRadius = 5,
			padAngle = 0,
			variable = 'val',
			category = 'name',
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
			.innerRadius(radius * 0)
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
			.classed('wykresSVG', true)
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
			.attr('d', arc)
			.each(function (d, i) {
				d3.select(this)
					.attr('fill', color[i % color.length])
					.attr('stroke', 'white')
					.attr('stroke-width', '5')
					.attr('stroke-linejoin', 'round')
					.attr('stroke-linecap', 'round')
					.classed('slice_patch patch_' + i, true);
			});
		// ===========================================================================================

		// add text labels
		var labels = svg.select('.labelName').selectAll('text').data(pie(data)).enter().append('g');

		function getCenter() {
			let _slices = d3.selectAll('.slice_patch');
			var bbox = _slices.node().getBBox();
			var centerX = bbox.x + bbox.width / 2;
			var centerY = bbox.y + bbox.height / 2;

			return centerX;
		}

		labels
			.append('text') // add the text to the group
			.attr('dx', '-2px')
			.attr('dy', function (d, i) {
				let bbox = this.getBoundingClientRect();

				console.log(bbox);

				let center = getCenter();
				console.log(center, i);

				let label = labels.filter(function (_, index) {
					return index === i;
				});
				// let g = label.select('g');
				// let transform = g.node().getAttribute('transform');
				// console.log(transform);

				return -10;
			})

			.classed('mojaKlasa', true)
			.html(updateLabelText)
			.attr('transform', labelTransform)
			.style('text-anchor', function (d) {
				// if slice centre is on the left, anchor text to start, otherwise anchor to end
				return midAngle(d) < Math.PI ? 'start' : 'end';
			})
			.style('font-size', '12px');

		labels.each(function (i) {
			var element = d3.select(this);
			var textElement = d3.select(this).select('text');
			var transformAttr = textElement.attr('transform');
			var dyAttr = textElement.attr('dx');

			let transformString = transformAttr.replace('translate(', '').replace(')', '');

			// Podziel łańcuch na części, oddzielając po przecinku
			var parts = transformString.split(',');

			// Pobierz wartości x i y z części
			var x = parseFloat(parts[0]);
			var y = parseFloat(parts[1]);

			// console.log('x:', x, dyAttr);
			// console.log('y:', y);

			// console.log(transformAttr, dyAttr);
			let center = getCenter();

			var data = element.data()[0].data;
			var image = element // POZYCJA OBRAZKA
				.append('svg:image')
				.attr('href', data.image)
				.attr('width', 35)
				.attr('height', 35)
				.classed('imageFlaf', true);

			if (center < x) {
				image.attr('x', '190px');
				image.attr('y', y - 22, 5);
			} else {
				image.attr('x', '-235px');
				image.attr('y', y - 22.5);
			}
		});

		// add IMAGES

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
			.attr('points', calculatePoints)
			.each(function (d, i) {
				d3.select(this).attr('stroke', color[i % color.length]);
			});

		d3.selectAll('.labelName text, .slices path');

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

			var textElements = svg.selectAll('.labelName text');

			textElements.each(function (d, i) {
				var text = d3.select(this);
				var textX = parseFloat(text.attr('transform').split('(')[1].split(',')[0]);
				var textY = parseFloat(text.attr('transform').split(',')[1].split(')')[0]);

				var imageX = textX - 100; // Ustawienie pozycji X obrazka (np. 100 pikseli na lewo od tekstu)
				var imageY = textY + 20; // Ustawienie pozycji Y obrazka (np. 20 pikseli poniżej tekstu)

				// Ustawienie nowych wartości X i Y dla obrazka
				var image = svg.selectAll('.labelName image').filter(function (d, j) {
					return j === i;
				});
				image.attr('x', imageX).attr('y', imageY);
			});

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
			// POZYCJA LABELS
			var pos = outerArc.centroid(d);

			pos[1] = pos[1];
			//console.log(pos)
			let center = getCenter();

			// console.log(pos, center);
			if (pos[0] > center) {
				// console.log('Lewa');
				pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1) + 40;
			} else {
				pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1) - 45;
				// console.log('Prawa');
			}

			return 'translate(' + pos + ')';
		}

		function updateLabelText(d) {
			// Zwróć sformatowany tekst z obrazkiem i wartością procentową
			// return imageSrc + d.data[category] + ': <tspan>' + d.data[variable] + '%' + '</tspan>';

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

	let numberHoveredItem = 0;
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/donutMultiplePage7.scss" />
	<script src="https://d3js.org/d3.v6.min.js" charset="utf-8"></script>
</svelte:head>

<div class="bigWrapperpage7">
	<div
		class="donutWrapper"
		aria-hidden
		on:click={() => {
			open = !open;
		}}
	>
		<div class="donutTarget" {id} />
	</div>
	<!-- <p>{JSON.stringify(data)}</p> -->
	{#if open}
		<div class="legendWrapper" transition:fade use:draggable={{ handle: '.addDataBoxs' }}>
			<button
				class="close"
				on:click={() => {
					open = !open;
				}}>x</button
			>

			<div class="addDataBoxs">
			
				<svg   on:click={(e) => handleImageClick(e)} xmlns="http://www.w3.org/2000/svg" class="mini"
    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 200 250" style="enable-background:new 0 0 200 200;" xml:space="preserve">
    <g>
        <path fill="rgba(0,0,0,0.2)" d="M121.2,43.8c-23.5-9-51.2-1.7-67.3,17.7c-16.1,19.5-18.4,47.1-5.8,68.8c10.9,18.5,31,29.7,52.1,29.7   c3.4,0,6.8-0.3,10.2-0.9c28.1-4.8,49-29.7,49.6-59.1C159.5,74.7,144.3,52.6,121.2,43.8z M148.9,100c-0.4,20.8-12.9,38.8-31.8,45.8   c-19.3,7.2-41.2,1.4-54.6-14.4c-16-18.9-12.7-41.1-4.3-55.6c9.1-15.6,24.9-24.8,41.8-24.8c2.8,0,5.7,0.3,8.6,0.8   C131.5,56.1,148.4,76.3,148.9,100z"/>
        <path fill="rgba(255,250,250,0.4)" d="M129.7,94h-25V69c0-3.6-2.8-5.4-5.6-5.4c-2.8,0-5.6,1.9-5.6,5.4v25h-25c-3.6,0-5.4,2.8-5.4,5.6c0,2.8,1.9,5.6,5.4,5.6h25   v25c0,3.6,2.8,5.4,5.6,5.4c2.8,0,5.6-1.9,5.6-5.4v-25h25c3.6,0,5.4-2.8,5.4-5.6C135.1,96.8,133.3,94,129.7,94z"/>
    </g>
</svg>



				<input class="dataName" contenteditable="true" bind:value={newValues.name} />
				<input class="dataValue" contenteditable="true" bind:value={newValues.val} />
				<button class="addButton" on:click={addData}>+</button>
			</div>

			{#each data as { name, val, image }, numberCounter}
				<div>
					<SortableItem
						propItemNumber={numberCounter}
						bind:propData={data}
						bind:propHoveredItemNumber={numberHoveredItem}
					>
						<div class:classHovered={numberHoveredItem === numberCounter}>
							<MoveIcon propSize={22} />
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							
							
							<svg on:click={handleImageClick}
							dataVal={numberCounter} xmlns="http://www.w3.org/2000/svg" class="mini"
    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 200 250" style="enable-background:new 0 0 200 200;" xml:space="preserve">
    <g>
        <path fill="rgba(0,0,0,0.2)" d="M121.2,43.8c-23.5-9-51.2-1.7-67.3,17.7c-16.1,19.5-18.4,47.1-5.8,68.8c10.9,18.5,31,29.7,52.1,29.7   c3.4,0,6.8-0.3,10.2-0.9c28.1-4.8,49-29.7,49.6-59.1C159.5,74.7,144.3,52.6,121.2,43.8z M148.9,100c-0.4,20.8-12.9,38.8-31.8,45.8   c-19.3,7.2-41.2,1.4-54.6-14.4c-16-18.9-12.7-41.1-4.3-55.6c9.1-15.6,24.9-24.8,41.8-24.8c2.8,0,5.7,0.3,8.6,0.8   C131.5,56.1,148.4,76.3,148.9,100z"/>
        <path fill="rgba(255,250,250,0.4)" d="M129.7,94h-25V69c0-3.6-2.8-5.4-5.6-5.4c-2.8,0-5.6,1.9-5.6,5.4v25h-25c-3.6,0-5.4,2.8-5.4,5.6c0,2.8,1.9,5.6,5.4,5.6h25   v25c0,3.6,2.8,5.4,5.6,5.4c2.8,0,5.6-1.9,5.6-5.4v-25h25c3.6,0,5.4-2.8,5.4-5.6C135.1,96.8,133.3,94,129.7,94z"/>
    </g>
</svg>

					


							
							<input class="name" contenteditable="true" bind:value={data[numberCounter].name} />
							<input class="val" contenteditable="true" bind:value={data[numberCounter].val} />
							<button class="removeButton" on:click={() => removeData(numberCounter)}>x</button>
						</div>
					</SortableItem>
				</div>
			{/each}

			{#if showFileList}
				<div class="filelist" transition:fade>
					<Filelist
						fileClicked={(val) => {
							handleClickElement(val);
						}}
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style type="postcss">
	.classHovered {
		background-color: lightblue;
		color: white;
	}
	:global(.imagemini) {
		width: 62px !important;
		height: 62px;
		border-radius: 20px;
		margin-top: -20px !important;
	}
	:global(svg) {
		/* -webkit-filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3));
		filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25)); */
	}
	:global(.addDataBoxs) {
		padding-top: 8px;
		background: rgba(20, 20, 20, 0.1);
		width: 100%;
		display: flex;
		flex-direction: row;
		border-radius: 12px 12px 0px 0px;
		-webkit-box-shadow: inset -3px -4px 61px -27px rgba(66, 68, 90, 1);
		-moz-box-shadow: inset -3px -4px 61px -27px rgba(66, 68, 90, 1);
		box-shadow: inset -3px -4px 61px -27px rgba(66, 68, 90, 1);
		justify-content: space-between;
		padding-bottom: 8px;
		align-items: center;
	}

	.addButton {
		-webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
		-moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
		box-shadow: 1px 2px 5px 0px rgba(66, 68, 90, 1);
		position: relative;
		display: block;
		background-color: rgba(200, 200, 200, 0.9);
		width: 42px;
		height: 33px; /* padding: 9px; */
		padding-left: 12px;
		border-radius: 59px;
		padding-right: 11px;
		vertical-align: baseline;
		margin-left: -11px;
	}
	:global(.mini.active) {
		background: var(--brand-lightgreen);
		border-radius: 35px;
	}

	.mini {
		transition: all ease 0.4s;
		width: 30px;
		height: 27px;
		padding-top: 5px;
		margin-right: 10px;
	}
	.filelist {
		position: absolute;
		max-width: 107px;
		padding: 10px !important;
		padding: 4px;
		padding-right: 20px !important;
		width: 200px;
		background-color: #d8d9e0;
		border-radius: 8px;
		box-shadow: 2px 6px 36px -18px rgba(66, 68, 90, 1);
	}

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

	:global(.addDataBoxs .mini) {
		width: 20px;
		margin-left: 20px;
	}
	:global(.donutTarget .name) {
		width: 289px;
	}
	:global(.donutTarget .val) {
	}
	:global(.donutTarget .removeButton) {
	}
</style>
