<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { loading, error, menuVisible, location } from '$lib/stores/appStore.jsx';
	import { redirect } from '$lib/functions';
	import { DarkMode, Modal } from 'flowbite-svelte';
	import { saveData } from '$lib/database';

	let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
	let saveDataModal,
		goToDataList = false;

	import { Drawer, Button, CloseButton, A } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	$menuVisible = true;

	let transitionParamsTop = {
		y: -320,
		duration: 200,
		easing: sineIn
	};

	let pageRefs = {};
	let observer = null;  // Declare observer globally
	const handleIntersect = (entries) => {
		entries.forEach((entry) => {
			// if (entry.isIntersecting) {
			// 	// Page is in view
			// 	console.log(entry);
			// 	entry.target.style.visibility = 'visible';
			// } else {
			// 	// Page is out of view
			// 	console.log(entry);
			// 	entry.target.style.visibility = 'hidden';
			// } //NOTE VISIBILITY ON / OFF   
		});
	};
	// PAGES

	import PAGE0F from '$lib/PAGES/pageFront.svelte';
	import PAGE00 from '$lib/PAGES/page00.svelte';
	import PAGE01 from '$lib/PAGES/page01.svelte';
	import PAGE02 from '$lib/PAGES/page02.svelte';
	import PAGE03 from '$lib/PAGES/page03.svelte';
	import PAGE04 from '$lib/PAGES/page04.svelte';
	import PAGE05 from '$lib/PAGES/page05.svelte';
	import PAGE06 from '$lib/PAGES/page06.svelte';
	import PAGE07 from '$lib/PAGES/page07.svelte';

	// import PAGE07 from '$lib/PAGES/page07.svelte';
	// import PAGE08 from '$lib/PAGES/page08.svelte';

	onMount(() => {
  observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });

  // Observe each page element if it exists
  Object.values(pageRefs).forEach(pageRef => {
    if (pageRef instanceof Element) {
      observer.observe(pageRef);
    } else {
      console.warn('Invalid element:', pageRef);
    }
  });

});
	onDestroy(() => {
		if (observer) {
      observer.disconnect();
    }
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/printStyle.scss" />
</svelte:head>



<div class:loading={$loading}>
	<div bind:this={pageRefs.PAGE0F} class=".show-on-print">
		<PAGE0F />
	  </div>
	  <div bind:this={pageRefs.PAGE00} class=".show-on-print">
		<PAGE00 />
	  </div>
	  <div bind:this={pageRefs.PAGE01} class=".show-on-print">
		<PAGE01 />
	  </div>
	  <div bind:this={pageRefs.PAGE02} class=".show-on-print">
		<PAGE02 />
	  </div>
	  <div bind:this={pageRefs.PAGE03} class=".show-on-print">
		<PAGE03 />
	  </div>
	  <div bind:this={pageRefs.PAGE04} class=".show-on-print">
		<PAGE04 />
	  </div>
	  <!-- <div bind:this={pageRefs.PAGE05} class=".show-on-print">
		<PAGE05 />
	  </div> -->
	  <!-- <div bind:this={pageRefs.PAGE06} class=".show-on-print">
		<PAGE06 />
	  </div> -->
	  <!-- <div bind:this={pageRefs.PAGE07} class=".show-on-print">
		<PAGE07 />
	  </div> -->
	<!-- <PAGE08 /> -->
</div>
<div class="A4Marker" >

<Drawer
	placement="top"
	width="w-full"
	transitionType="fly"
	transitionParams={transitionParamsTop}
	bind:hidden={$menuVisible}
	id="sidebar"
>
	<div class="flex items-center">
		<Button on:click={() => (goToDataList = true)}>
			<svg
				class="arrowInvert w-[41px] h-[41px] text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 16"
			>
				<path
					d="m19.822 7.431-4.846-7A1 1 0 0 0 14.153 0H1a1 1 0 0 0-.822 1.569L4.63 8 .178 14.431A1 1 0 0 0 1 16h13.153a1.001 1.001 0 0 0 .823-.431l4.846-7a1 1 0 0 0 0-1.138Z"
				/>
			</svg>
		</Button>
		<!-- <Button href="/protected/data" class="px-4">Wczytaj dane lokalizacji<ArrowRightOutline class="w-3.5 h-3.5 ml-2" /></Button> -->

		<Button on:click={() => (saveDataModal = true)}>Zapisz</Button>
		<Button on:click={() => (print())}>Drukuj</Button>
		<!-- <DarkMode {btnClass} /> -->

		<CloseButton on:click={() => ($menuVisible = true)} class="mb-4 dark:text-white" />
	</div>
</Drawer>
{#if saveDataModal}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal title="Czy na pewno zapisać lokaloizację?" bind:open={saveDataModal} autoclose>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{$location.adres}</p>
			<svelte:fragment slot="footer">
				<Button
					on:click={() => {
						saveData();
					}}>Zapisz dokument</Button
				>
				<Button color="alternative">Anuluj</Button>
			</svelte:fragment>
		</Modal>
	</div>
{/if}
{#if goToDataList}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal
			title="Czy na pewno chcesz wyjść bez zapisania danych?"
			bind:open={goToDataList}
			autoclose
		>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{$location.adres}</p>
			<svelte:fragment slot="footer">
				<Button on:click={() => redirect('/protected/data')}>Wyjdź</Button>
				<Button on:click={() => (saveDataModal = true)}>Zapisz</Button>
				<Button color="alternative">Anuluj</Button>
			</svelte:fragment>
		</Modal>
	</div>
{/if}

</div>

