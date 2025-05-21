<script>
	import Header from '$lib/components/header.svelte';
	import Loading from '$lib/components/loading.svelte';
	import Lines from '$lib/components/lines.svelte';
	import { location } from '$lib/stores/appStore';
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
			<div class="bacground-svg">
				<Lines/>
			</div>
				<div class="editable_text_container" contenteditable="true">
					<p>{$location.params.notes}</p>
				</div>
			{/if}
			<div id="pageFooter" />
		{/if}
	</div>
</div>

<style>
.bacground-svg{
    width: 672px;
    position: absolute;
    margin-top: 84px;
    pointer-events: none;

}

</style>
