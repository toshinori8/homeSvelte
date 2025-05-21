<script>
	let files_array = [];
	let file_input;
	let index;
	let images = [];
	let srvurl = 'https://app.homerate.pl/public/uploads';
	let on_load_complete;
	function send_click_to_input() {
		file_input.click();
	}





	
	
	export let fileClicked
  let value = ''
  $: fileClicked(value)


	async function setImage(image) {
		value= image.src
	}

	async function remove_from_files(file_id) {
		try {
			const response = await fetch(srvurl + '/remove.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ fileId: file_id })
			});

			if (response.ok) {
				const responseData = await response.json();
				if (responseData.status === 'success') {
					console.log('Plik został usunięty.');
				} else {
					console.error('Failed to delete file:', responseData.message);
				}
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
		updateDatabase();
	}

	async function send_file() {
		const form_data = new FormData();
		const selectedFiles = file_input.files;

		for (let i = 0; i < selectedFiles.length; i++) {
			const file = selectedFiles[i];
			form_data.append('uploadfile[]', file);
		}

		try {
			const response = await fetch(srvurl + '/data.php', {
				method: 'POST',
				body: form_data
			});

			if (response.ok) {
				const responseData = await response.json();
				if (responseData.status == 'success') {
					updateDatabase();
				}
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}

	// Funkcja aktualizująca bazę danych
	async function updateDatabase() {
		const response = await fetch(srvurl + '/database.php');
		const data = await response.json();

		if (data.status == 'success') {
			files_array = data.data;
			// on_load_complete.innerText = 'Dane zaktualizowane poprawnie.';
		} else {
			// on_load_complete.innerText = 'Błąd podczas aktualizacji danych.';
		}
	}

	// Inicjalizacja tablicy plików po załadowaniu strony
	updateDatabase();
</script>

<input
	style="display: none"
	class="inputInput"
	type="file"
	multiple
	bind:this={file_input}
	on:change={send_file}
/>
<button on:click={send_click_to_input} class="add">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		x="0px"
		y="0px"
		viewBox="0 0 200 250"
		style="enable-background:new 0 0 200 200;"
		xml:space="preserve"
	>
		<g>
			<path
				d="M121.2,43.8c-23.5-9-51.2-1.7-67.3,17.7c-16.1,19.5-18.4,47.1-5.8,68.8c10.9,18.5,31,29.7,52.1,29.7   c3.4,0,6.8-0.3,10.2-0.9c28.1-4.8,49-29.7,49.6-59.1C159.5,74.7,144.3,52.6,121.2,43.8z M148.9,100c-0.4,20.8-12.9,38.8-31.8,45.8   c-19.3,7.2-41.2,1.4-54.6-14.4c-16-18.9-12.7-41.1-4.3-55.6c9.1-15.6,24.9-24.8,41.8-24.8c2.8,0,5.7,0.3,8.6,0.8   C131.5,56.1,148.4,76.3,148.9,100z"
			/>
			<path
				d="M129.7,94h-25V69c0-3.6-2.8-5.4-5.6-5.4c-2.8,0-5.6,1.9-5.6,5.4v25h-25c-3.6,0-5.4,2.8-5.4,5.6c0,2.8,1.9,5.6,5.4,5.6h25   v25c0,3.6,2.8,5.4,5.6,5.4c2.8,0,5.6-1.9,5.6-5.4v-25h25c3.6,0,5.4-2.8,5.4-5.6C135.1,96.8,133.3,94,129.7,94z"
			/>
		</g>
	</svg>
</button>
<!-- <span bind:this={on_load_complete} /> -->
<div class="flexList">
	{#if files_array && files_array[0]}
		{#each files_array as file, i}
			<div class="image_block">
				<img src={file.src} alt="" on:click={() => setImage(file)} />
				<!-- <p>ID: {file.file_id}, Nazwa: {file.file_name}</p> -->
				<button class="remove_cross" on:click={() => remove_from_files(file.file_id)}> X </button>
			</div>
		{/each}
	{/if}
</div>

<style>
	.flexList{
		display:flex; flex-direction: column;

	}
	button.add > svg > g > path {
		fill: antiquewhite;
	}
	button.add {
		transition: all ease 0.5s;
		border-radius: 30px;
		color: white;
		width: 30px;
		height: 30px;
	}
	button:hover {
		background-color: cadetblue;
	}
	.image_block {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		align-content: center;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 4px;
	}
	button {
		display: inline-block;
		position: relative;
		box-sizing: border-box;
		text-decoration: none;
		color: #fff;
		width: 100px;
		height: 50px;
		line-height: 30px;
		border-radius: 7%;
		text-align: center;
		vertical-align: middle;
		font-weight: bold;
		box-shadow: 1px 1px 2px indigo;
		background-color: blueviolet;
		border-color: blueviolet;
		padding: 0px;
	}
	button:hover {
		background-color: var(-brand);
		transition: background-color 150ms linear;
	}
	button:active {
		background-color: mediumpurple;
		transform: translate(1px, 1px);
	}
	.remove {
		width: 107px;
		height: 50px;
		line-height: 10px;

		border-radius: 30px;
	}
	.remove_cross {
		border-radius: 30px;
		width: 18px;
		height: 18px;
		margin-left: -18px;
		font-size: 10px;
		line-height: 0px;
		vertical-align: middle;
		border-radius: 0px;
	}
	span {
		font-size: 18px;
	}
	img {
		width: 80px;
	}
</style>
