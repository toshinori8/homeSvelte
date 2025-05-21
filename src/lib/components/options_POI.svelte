<script>
	import { afterUpdate, onMount } from 'svelte';
	import { options, POIelements } from '$lib/stores/appStore';
	import { fetchOptions, saveOptions } from '$lib/database';
	import Sortable from 'sortablejs';
	import inView from '$lib/components/inView.js';
	let sortable;

	afterUpdate(() => {
		if (!sortable) {
			sortable = new Sortable(document.querySelector('.POIelements'), {
				animation: 150,
				ghostClass: 'blue-background-class',

				onUpdate: function (evt) {
					// console.log(evt);
					evt.target.parentNode.parentNode.classList.toggle('off');
					evt.target.parentNode.parentNode.classList.toggle('on');

					const elem = document.querySelectorAll('.POIelements .on');

					let elements = [];
					elem.forEach(function (node) {
						elements.push(node.getAttribute('id'));
					});
					$options.POIelementsDisplay = elements;
                    saveOptions()
				}
			});
		}
	});

	const handleClick = (el) => {
		el.target.parentNode.parentNode.classList.toggle('off');
		el.target.parentNode.parentNode.classList.toggle('on');

		const elem = document.querySelectorAll('.POIelements .on');

		let elements = [];
		elem.forEach(function (node) {
			elements.push(node.getAttribute('id'));
		});
		$options.POIelementsDisplay = elements;
		// sortElements();
        saveOptions();
	};

	let sortedElements = [];
	let otherElements = [];

	function sortElements() {
		sortedElements = [];
		otherElements = [];
		// sortedElements = POIelements.filter(el => $options.POIelementsDisplay.includes(el.id));

		// console.log('elemens', $options.POIelementsDisplay);

		for (const id of $options.POIelementsDisplay) {
			for (const [key, value] of Object.entries(POIelements)) {
				if (id == value.id) {
					sortedElements.push(POIelements[key]);
				}
			}
		}

		for (const [key, value] of Object.entries(POIelements)) {
			if (!$options.POIelementsDisplay.includes(value.id.toString())) {
				otherElements.push(POIelements[key]);
			}
		}
		// console.log('sortedElements', sortedElements);
	}
	onMount(() => {
		fetchOptions().then((e) => {
			sortElements(e.POIelementsDisplay);
			// console.log(e, $options.POIelementsDisplay);
		});
	});

	// $: {
	// 	fetchOptions();
	// 	sortElements();
	// }
</script>

<ul
	class="POIelements"
	use:inView
	on:enter={() => console.log('enter')}
	on:exit={() => console.log('exit')}
>
	{#if sortedElements.length > 0}
		{#each sortedElements as key}
			<li class="POIelement on" style="" on:click={(e) => handleClick(e)} id={key.id}>
				<span class="el">
					<img class="options_icon" src={`/images/POI/${key.icon}`} />
					<p class="options_text">{key.name}</p>
				</span>
			</li>
		{/each}
		{#each otherElements as key}
			<li class="POIelement off" style="" on:click={(e) => handleClick(e)} id={key.id}>
				<span class="el">
					<img class="options_icon" src={`/images/POI/${key.icon}`} />
					<p class="options_text">{key.name}</p>
				</span>
			</li>
		{/each}
	{/if}
</ul>

<style>
	.POIelements {
		display: flex;
		width: 578px;
		height: auto;
		min-height: 202px;
		flex-wrap: wrap;
		row-gap: 0px;
	}
	.POIelement.off {
		opacity: 0.2;
	}
	.POIelement {
		transition: all ease 0.4s;
		width: 64px;
		height: 100px;
		cursor: col-resize;
	}

	.options_icon {
		width: 40px;
		margin-left: 13px;
	}
	.options_text {
		text-align: center;
		font-size: 9px;
	}

	.blue-background-class {
		/* You can add styles for the ghost element here */
	}

	.POIelement[style='opacity: 1'] {
		background-color: green; /* Highlights the selected items in green */
	}
</style>
