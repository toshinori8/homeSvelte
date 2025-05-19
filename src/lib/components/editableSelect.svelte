<script>
	import { onMount, onDestroy } from 'svelte';
	
	export let selectedValue = null;
	// for editable option value to remain consistent, use textContent
	export let editValue = false;
	export let customValue = '';
	
	let inputEl, selectEl, editOptionHandler, focusHandler;
	onMount(() => selectChangedHandler());
	onDestroy(() => {
		inputEl.removeEventListener('input', editOptionHandler);
		inputEl.removeEventListener('focus', focusHandler);
	})
	
	function selectChangedHandler() {
		const selected = selectEl.selectedOptions[0];
		selectedValue = selected.value;
		inputEl.value = selected.textContent;
		inputEl.disabled = selected.contentEditable === 'true' ? false : true;
		
		editOptionHandler = () => editOptionEl(selected);
		focusHandler = () => inputEl.select();
		
		if(!inputEl.disabled) {
			inputEl.addEventListener('input', editOptionHandler);
			inputEl.addEventListener('focus', focusHandler);
		} else {
			inputEl.removeEventListener('input', editOptionHandler);
			inputEl.removeEventListener('focus', focusHandler);
		}
	}
	
	function editOptionEl(selected) {
		customValue = inputEl.value;
		selected.textContent = inputEl.value;
		if(editValue) selectedValue = selected.value = customValue;
	}
</script>

<div class='cont__main'>
	<select bind:this={selectEl} on:change={selectChangedHandler}>
		<slot />
	</select> 
	<input type="text" bind:this={inputEl} />
	<!-- svelte-ignore a11y-positive-tabindex -->
	<i on:click={() => inputEl.focus()} on:keypress={()=>{}} role="button" tabindex=1/>
</div>

<style>
	*, *::before, *::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	.cont__main {
		position: relative;
		width: 100%;
		margin: 0 auto;
	}
	
	select {
		position: absolute;
		top: 0; left: 0;
		width: 100%;
		height: 2rem;
	}
	
	select:focus, select:active {
		outline: none;
	}
	
	input {
		position: relative;
		z-index: 2;
		width: calc(100% - 28px);
		height: 2rem;
		background: white;
	}
	
	input:disabled {
		color: black;
	}
	
	i {
		position: absolute;
		top: 0;
		right: 30px;
		z-index: 3;
		height: 100%;
		aspect-ratio: 1;
		display: flex;
		justify-content: center;
		place-items: center;
		transform: rotate(40deg);
		opacity: 0;
		transition: opacity .1s linear;
	}
	
/* 	input:disabled ~ i { opacity: 0; } */
	input:not(:disabled) ~ i { opacity: 1; }
	
	input:not(:disabled) ~ i::before,
	input:not(:disabled) ~ i::after {
		content: '';
		position: absolute;
		width: 0;
		border-style: solid;
	}
	
	input:not(:disabled) ~ i::before {
		height: 60%;
		border-width: 0 3px;
		border-color: rgba(20, 20, 20, .4);
		border-radius: 4px 4px 0 0;
	}
	
	input:not(:disabled) ~ i::after {
		height: 0;
		top: 80%;
		border-width: 6px 3px 0;
		border-color: rgba(20, 20, 20, .4) transparent transparent transparent;
		border-style: solid;
	}
</style>














