<script>
	import Header from '$lib/components/header.svelte';
	import Loading from '$lib/components/loading.svelte';
	import { location } from '$lib/stores/appStore.jsx';
</script>

<div class="content-block section page_00 noselect">
	<Header />
<!-- {$location.adres} -->
	<!-- {#if !$location.params}
		<div class="center"><Loading /></div>
	{/if} -->

	<div class="page_content">
		{#if $location.params}
			<h3 class="noselect">Notatki</h3>

			{#if $location.params}
				<div class="editable_text_container" contenteditable="true">
					<p>{$location.params.notes}</p>
				</div>
			{/if}
			<div id="pageFooter" >
			</div>
		{/if}
	
</div>
