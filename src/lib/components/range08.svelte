<script>
	import { onMount, afterUpdate } from 'svelte';
	import { fade, blur, fly, slide } from 'svelte/transition';
	let colors = ['rgba(14, 207, 93, 1.000)', 'rgba(121, 253, 171, 1.000)'];
	export let color;
	export let value = 30;

	let rangePercent = value;
	let h4Style = {
		transform: 'translateX(-50%) scale(1)',
		left: '0%'
	};

	function handleRangeChange(event) {
		rangePercent = event.target.value;
		h4Style = {
			...h4Style,
			transform: `translateX(-50%) scale(${1 + rangePercent / 100})`,
			left: `${rangePercent}%`
		};
	}

	let ballSize = 10; // Rozmiar kulki
	let borderRadius = 50; // Początkowy border radius

	let ready = false;

	onMount(() => {
		ready = true;
	});

	afterUpdate(() => {});
</script>

<div class="range_element color{color}" transition:fade>
	<div class="value">{rangePercent}</div>
	<input type="range" bind:value={rangePercent} on:change={handleRangeChange} style='backgrount-color:"{colors[color]}"!important' />
	<div id="h4-container" transition:slide>
		<h4 style={h4Style} transition:fly>
			<span
			 	style="width: {ballSize}px; height: {ballSize}px; border-radius: {borderRadius}px;}"
			/>
		</h4>

	</div>
	<!-- <div class="value">{rangePercent}</div> -->
</div>

<style type="">
	.range_element {
		overflow: hidden;
		height: 19px;
		margin-top: -6px;
	}
	.range_element h1 {
		color: #333;
		font-weight: 500;
	}
	.range_element h3 {
		color: #aaa;
		font-weight: 500;
	}
	.range_element h4 {
		color: #999;
		font-weight: 500;
	}
	.range_element h4:after {
		content: '%';
		padding-left: 1px;
	}
	.range_element input[type='range'] {
		outline: 0;
		border: 0;
		border-radius: 500px;
		width: 420px;
		max-width: 100%;
		margin: 8px 0 6px;
		transition: box-shadow 1.6s ease-in-out;
	}
	.range_element input[type='range'] {
			border-radius: 20px;
			height: 10px;
			-webkit-appearance: none;
			background-color: #ffffff;
			position: relative;
			overflow: hidden;
		}
	
	
		.range_element input[type='range']::-webkit-slider-runnable-track {
			height: 10px;
			-webkit-appearance: none;
			color: #444;
			-webkit-transition: box-shadow 0.2s ease-in-out;
			transition: box-shadow 0.8s ease-in-out;
			position: relative;
		}
		.range_element.color0 input[type='range']::-webkit-slider-thumb {
			width: 10px;
			-webkit-appearance: none;
			height: 10px;
			cursor: ew-resize;
			background: #fff;
			box-shadow: -340px 0 0 335px rgba(14, 207, 93, 1.000), inset 0 0 0 40px rgba(14, 207, 93, 1.000);
			border-radius: 80%;
			-webkit-transition: box-shadow 0.2s ease-in-out;
			transition: box-shadow 0.8s ease-in-out;
			position: relative;
		}
		.range_element.color0 input[type='range']:active::-webkit-slider-thumb {
			background: #fff;
			box-shadow: -340px 0 0 335px #1597ff, inset 0 0 0 3px #1597ff;
		}
		.range_element.color1 input[type='range']::-webkit-slider-thumb {
			width: 10px;
			-webkit-appearance: none;
			height: 10px;
			cursor: ew-resize;
			background: #fff;
			box-shadow: -340px 0 0 335px rgba(121, 253, 171, 1.000), inset 0 0 0 40px rgba(121, 253, 171, 1.000);
			border-radius: 80%;
			-webkit-transition: box-shadow 0.2s ease-in-out;
			transition: box-shadow 0.8s ease-in-out;
			position: relative;
		}
		.range_element.color1 input[type='range']:active::-webkit-slider-thumb {
			background: #fff;
			box-shadow: -340px 0 0 335px #1597ff, inset 0 0 0 3px #1597ff;
		}
	
	.range_element .value{

		font-size: 10px;
    margin-left: 430px;
    margin-top: 7px;
    position: absolute;
		opacity: 0.7;
	}

	#h4-container {
		width: 400px;
		max-width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
		position: relative;
	}
	input:not(:active) + #h4-container h4 {
		opacity: 0;
		margin-top: -50px;
		pointer-events: none;
	}
</style>
