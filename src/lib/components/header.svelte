<script>

	import { menuVisible } from '$lib/stores/appStore.js';
    import {onDestroy } from 'svelte';
    onDestroy(() => {
        $menuVisible= true;
	});

</script>

<header on:click={() => (  $menuVisible= false)} on:on:keydown={()=>{}} aria-hidden="true">
    <p class="p_header noselect">WYCENA WARTOŚCI nieruchomości</p>
   
    <img class="logotyp_header noselect" src="/images/logotyp_header.svg" alt='logotyp'/>
</header>