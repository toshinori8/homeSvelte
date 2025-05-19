<script>
	import { fade, slide } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = 5.7;
	export let average = 83;
	export let color = 'hsl(125, 50%, 60%)';

	function updateValue(newValue) {
		if (editable) {
			value = newValue;
			dispatch('valueChange', value);
		}
	}

	export let editable = false,
		active = false;

	const pathLength = 100;
	const id = Math.random().toString().slice(-5);

	$: offset = pathLength - value;
	$: angle = (360 * average) / pathLength;

	const tOffset = tweened(pathLength, {
		duration: 400
	});
	const tAngle = tweened(-10, {
		duration: 200
	});

	$: update(offset, angle);

	const update = async (offset, angle) => {
		await tOffset.set(offset);
		tAngle.set(angle);
	};
</script>

<!-- svelte-ignore a11y-positive-tabindex -->
{#if editable == true}
	<div
		role="button"
		tabindex="2"
		on:keydown={() => {}}
		class="svg-option-button"
		on:click={() => {
			active = !active;
		}}
	>
	</div>
{/if}
<div class="svg-item">
	<svg style:color viewBox="-70 -70 140 140">
		<defs>
			<style>
				.cls-1 {
					outline: solid;
					border-radius: 57px;
					fill: none;
					outline-width: 0.5px;
					transform: scale(1.123);
					outline-color: var(--brand-blue);
				}
				.cls-2 {
					outline: solid;
					border-radius: 57px;
					fill: none;
					outline-width: 0.5px;
					transform: scale(0.85);
					outline-color: var(--brand-blue);
				}
			</style>

			<path
				out:fade={{ duration: 200 }}
				{pathLength}
				fill="none"
				stroke-width="14"
				id="donut-path-{id}"
				d="M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100"
			/>

			<!-- <rect id="donut-path-{id}" fill="white" x="-70" y="-70" width="140" height="140" />
		   -->
		</defs>

		<g out:fade={{ duration: 400 }} mask="url(#donut-mask-{id})">
			<use href="#donut-path-{id}" stroke="hsl(0, 0%, 100%)" />
			<use
				href="#donut-path-{id}"
				stroke="currentColor"
				stroke-width="40"
				stroke-dasharray={pathLength}
				stroke-dashoffset={$tOffset}
			/>
		</g>

		<!-- <path
			fill="none"
			stroke-width="3"
			stroke-offset="12"
			d="M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100"
		/> -->
		<g
			text-anchor="middle"
			dominant-baseline="central"
			font-size="25"
			font-weight="700"
			fill="currentColor"
			outline-color="var(--brand-blue)"
			stroke-width="3"
		>
			<text out:slide={{ duration: 200 }}>
				{#if value % 1 !== 0}
					{(pathLength - $tOffset).toFixed(1)}%
				{:else}
					{Math.floor(pathLength - $tOffset)}%
				{/if}
			</text>
		</g>

		<path class="cls-1" d="M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100" />
		<path class="cls-2" d="M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100" />
	</svg>
</div>

<div class="options" class:active>
	<input
		type="number"
		class="option_number"
		bind:value
		min="1"
		max="100"
		on:change={updateValue(value)}
	/>
</div>

<style lang="scss">
	.svg-option-button {
		transition: all ease-out 0.5s;
		background-color: rgba(123, 154, 185, 0);
		width: 150px;
		height: 144px;
		position: absolute;
		border-radius: 225px;
		margin: 5px -75px 14px 2px;
	}
	.svg-option-button:hover {
	
	
		filter: blur(7px) invert(0) hue-rotate(-48deg);
    background-color: rgba(123, 154, 185, 0.5);


	}
	

	.options.active {
		text-align: center;
		display: block !important;
		width: 106px;
		position: absolute;
		box-shadow: 4px 8px 10px 0px rgba(96, 207, 94, 0.4);
		border: solid rgba(100, 100, 100, 0.2) 0.1px;
		height: 46px;
		background: var(--brand-lightgreen);
		border-radius: 14px;
		margin-left: 270px;
		margin-top: 106px;
		border: 2px solid var(--brand-green);
	}

	svg {
		color: hsl(125, 50%, 60%);
		display: block;
		max-width: 20rem;
	}
</style>
