<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade, slide, fly } from 'svelte/transition';
	import { loading, error, menuVisible, location } from '$lib/stores/appStore';
	import { redirect } from '$lib/functions';
	import { DarkMode, Modal } from 'flowbite-svelte';
	import { saveData } from '$lib/database';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
	let saveDataModal,
		goToDataList,
		createNew = false;

	import { Drawer, Button, CloseButton, A } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	$menuVisible = true;

	let transitionParamsTop = {
		y: -320,
		duration: 200,
		easing: sineIn
	};

	let pageRefs = {};
	let observer = null; // Declare observer globally
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
	import PAGE08 from '$lib/PAGES/page08.svelte';
	import PAGE09 from '$lib/PAGES/page09.svelte';
	import PAGE10 from '$lib/PAGES/page10.svelte';
	// import PAGE09 from '$lib/PAGES/page09.svelte';

	onMount(() => {
		// zalogowany ?
		if (!$page.data?.session) {
			goto('/');
			return;
		}

		observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });

		// Observe each page element if it exists
		Object.values(pageRefs).forEach((pageRef) => {
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
	<div bind:this={pageRefs.PAGE05} class=".show-on-print">
		<PAGE05 />
	</div>
	<div bind:this={pageRefs.PAGE06} class=".show-on-print">
		<PAGE06 />
	</div>
	<div bind:this={pageRefs.PAGE07} class=".show-on-print">
		<PAGE07 />
	</div>
	<div bind:this={pageRefs.PAGE08} class=".show-on-print">
		<PAGE08 />
	</div>
	<div bind:this={pageRefs.PAGE09} class=".show-on-print">
		<PAGE09 />
	</div>
	<div bind:this={pageRefs.PAGE10} class=".show-on-print">
		<PAGE10 />
	</div>

	<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
	<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
	<br /> <br /> <br />
	<!-- <div bind:this={pageRefs.PAGE07} class=".show-on-print">
		<PAGE07 />
	  </div> -->
	<!-- <PAGE08 /> -->
</div>
<div class="A4Marker" transition:slide />

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
			<span class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="800px"
					height="800px"
					viewBox="0 0 24 24"
					fill="none"
					><script xmlns=""></script>
					<path
						d="M13.2686 14.2686L15 16M12.0627 6.06274L11.9373 5.93726C11.5914 5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 12.0627 6.06274ZM14 12.5C14 13.8807 12.8807 15 11.5 15C10.1193 15 9 13.8807 9 12.5C9 11.1193 10.1193 10 11.5 10C12.8807 10 14 11.1193 14 12.5Z"
						stroke="#fbfbfb"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<script xmlns=""></script></svg
				>
			</span>
			Lista
		</Button>
		<!-- <Button href="/protected/data" class="px-4">Wczytaj dane lokalizacji<ArrowRightOutline class="w-3.5 h-3.5 ml-2" /></Button> -->

		<Button on:click={() => (saveDataModal = true)}>
			<span class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="800px"
					height="800px"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M9 11L11 13L15 9M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z"
						stroke="#fbfbfb"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>

			Zapisz
		</Button>
		<Button on:click={() => (createNew = true)}
			><span class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="800px"
					height="800px"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M12 13V7M15 10.0008L9 10M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z"
						stroke="#fbfbfb"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span> Nowy</Button
		>

		<Button on:click={() => print()}>
			<span class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="800px"
					height="800px"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M7 18H6.2C5.0799 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V10.2C3 9.0799 3 8.51984 3.21799 8.09202C3.40973 7.71569 3.71569 7.40973 4.09202 7.21799C4.51984 7 5.0799 7 6.2 7H7M17 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V10.2C21 9.07989 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H17M7 11H7.01M17 7V5.4V4.6C17 4.03995 17 3.75992 16.891 3.54601C16.7951 3.35785 16.6422 3.20487 16.454 3.10899C16.2401 3 15.9601 3 15.4 3H8.6C8.03995 3 7.75992 3 7.54601 3.10899C7.35785 3.20487 7.20487 3.35785 7.10899 3.54601C7 3.75992 7 4.03995 7 4.6V5.4V7M17 7H7M8.6 21H15.4C15.9601 21 16.2401 21 16.454 20.891C16.6422 20.7951 16.7951 20.6422 16.891 20.454C17 20.2401 17 19.9601 17 19.4V16.6C17 16.0399 17 15.7599 16.891 15.546C16.7951 15.3578 16.6422 15.2049 16.454 15.109C16.2401 15 15.9601 15 15.4 15H8.6C8.03995 15 7.75992 15 7.54601 15.109C7.35785 15.2049 7.20487 15.3578 7.10899 15.546C7 15.7599 7 16.0399 7 16.6V19.4C7 19.9601 7 20.2401 7.10899 20.454C7.20487 20.6422 7.35785 20.7951 7.54601 20.891C7.75992 21 8.03995 21 8.6 21Z"
						stroke="#fbfbfb"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>

			Drukuj</Button
		>
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
{#if createNew}
	<div transition:fade={{ delay: 100, duration: 150 }}>
		<Modal
			title="Czy na pewno chcesz wyjść bez zapisania aktualnych danych?"
			bind:open={goToDataList}
			autoclose
		>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{$location.adres}</p>
			<svelte:fragment slot="footer">
				<Button on:click={() => redirect('/protected?create=true')}>Wyjdź</Button>
				<Button on:click={() => (saveDataModal = true)}>Nowy</Button>
				<Button color="alternative">Anuluj</Button>
			</svelte:fragment>
		</Modal>
	</div>
{/if}

<style>
	.icon svg {
		width: 30px;
		height: 30px;
		margin-right: 15px;
	}
</style>
