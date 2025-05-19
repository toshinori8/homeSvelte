<script>
	import Loading from '$lib/components/loading.svelte';
	import { location } from '$lib/stores/appStore.jsx';


	$location = {};
	
</script>

<div class="frontcover noselect page_01">
	<div class="containerFlex noselect">
		<img src="/images/firstPage.png" class="frontImage noselect" alt="logo" />

		{#if !$location.params}
			<div class="center">
				<Loading />
			</div>
		{/if}

		<!-- svelte-ignore a11y-invalid-attribute -->
		<div class="btn btn-primary frontButton noselect"
			>Wycena wartości nieruchomości </div>
	</div>
</div>
