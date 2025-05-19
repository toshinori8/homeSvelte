<script>
	export let percent =29;

	let min = 100 - percent;
	let erPi = 17.1154943;
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/donut.scss" />
</svelte:head>

<div class="svg-item">
	<svg width="98%" height="97%" viewBox="0 0 40 40" class="donut">
		<circle class="donut-hole" cx="20" cy="20" r="{erPi}" fill="white" stroke="black" />
		<circle
			class="donut-ring"
			cx="20"
			cy="20"
			r="{erPi}"
			fill="transparent"
			stroke-width="5" />
		<circle
			class="donut-segment donut-segment-2"
			
			cx="20"
			cy="20"
			r="{erPi}"
			fill="transparent"
			stroke-width="5"
			stroke-dasharray="{percent} {min}"
			stroke-dashoffset="120" />
		<g class="donut-text donut-text-1">
			<text y="53%" transform="translate(0, 2)">
				<tspan x="51%" text-anchor="middle" class="donut-percent"
					>{percent}<tspan class="percent">%</tspan></tspan>
			</text>
			<text y="60%" transform="translate(0, 2)">
				<tspan x="50%" text-anchor="middle" class="donut-data" />
			</text>
		</g>
	</svg>
</div>

<style>
	.donut-segment-2 {
		animation: donut1 0.0s;
	}
	@keyframes donut1 {
		0% {
			stroke-dasharray: 0, 100;
		}
		100% {
			stroke-dasharray:var(--min),  var(--percent);
		}
	}

</style>
