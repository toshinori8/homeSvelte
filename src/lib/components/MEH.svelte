<script>
	import { v4 as uuidv4 } from 'uuid';
  
	let wallWidthInput = 600;
	let wallHeightInput = 400;
	let tileSizeWidthInput = "";
	let tileSizeHeightInput = "";
	let availableTileSizes = [
	  { width: 20, height: 30 },
	  { width: 30, height: 40 },
	  { width: 40, height: 50 },
	  // Dodaj więcej dostępnych rozmiarów według potrzeb
	];
	let selectedTileSize = availableTileSizes[0];
	let tiles = [
	  { id: 1, width: 120, height: 130, x: 0, y: 0, rotated: false },
	  { id: 2, width: 320, height: 140, x: 0, y: 0, rotated: false },
	  { id: 3, width: 310, height: 240, x: 0, y: 0, rotated: false },
	  { id: 4, width: 130, height: 140, x: 0, y: 0, rotated: false },
	  { id: 5, width: 230, height: 240, x: 0, y: 0, rotated: false },
	  // Dodaj więcej istniejących kafelków według potrzeb
	];
  
	let wallWidth;
	let wallHeight;
  
	$: wallWidth = parseInt(wallWidthInput) || 600;
	$: wallHeight = parseInt(wallHeightInput) || 400;
  
	function addTile() {
	  const { width, height } = selectedTileSize;
  
	  const tile = {
		id: uuidv4(),
		width,
		height,
		x: 0,
		y: 0,
		rotated: false,
	  };
  
	  tiles = [...tiles, tile];
	  optimizeTileLayout();
	}
  
	function rotateTile(tile) {
	  tile.rotated = !tile.rotated;
	  optimizeTileLayout();
	}
  
	function optimizeTileLayout() {
	  tiles = tiles.sort((a, b) => (b.width * b.height) - (a.width * a.height));
  
	  let x = 0;
	  let y = 0;
  
	  tiles = tiles.map((tile) => {
		const updatedTile = { ...tile };
		const canFitHorizontally = x + (tile.rotated ? tile.height : tile.width) <= wallWidth;
		const canFitVertically = y + (tile.rotated ? tile.width : tile.height) <= wallHeight;
  
		if (canFitHorizontally) {
		  updatedTile.x = x;
		  updatedTile.y = y;
		  x += tile.rotated ? tile.height : tile.width;
		} else if (canFitVertically) {
		  updatedTile.x = 0;
		  updatedTile.y = y;
		  x = tile.rotated ? tile.height : tile.width;
		  y += tile.rotated ? tile.width : tile.height;
		} else {
		  wallHeight += tile.rotated ? tile.width : tile.height;
		  updatedTile.x = 0;
		  updatedTile.y = wallHeight;
		  x = tile.rotated ? tile.height : tile.width;
		  y = wallHeight + (tile.rotated ? tile.width : tile.height);
		}
  
		return updatedTile;
	  });
	}
  
	function NEH() {
	  const sequence = [...tiles];
	  const { X, Y } = NEHAlgorithm(sequence);
	  tiles = [...X, ...Y];
	}
  
	function NEHAlgorithm(sequence) {
	  const sortedSequence = [...sequence];
	  sortedSequence.sort((a, b) => (b.width * b.height) - (a.width * a.height));
  
	  let X = [];
	  let Y = [];
  
	  for (let i = 0; i < sortedSequence.length; i++) {
		X.unshift(sortedSequence[i]);
		Y.unshift(sortedSequence[i]);
  
		sortedSequence[i].rotated = !sortedSequence[i].rotated;
  
		for (let j = 0; j <= i; j++) {
		  X.splice(j, 0, sortedSequence[i]);
  
		  for (let k = 0; k <= i; k++) {
			Y.splice(k, 0, sortedSequence[i]);
  
			const fX = calculateObjectiveFunction(X);
			const fY = calculateObjectiveFunction(Y);
  
			if (fX < fY) {
			  Y.splice(k, 1);
			} else {
			  X.splice(j, 1);
			}
		  }
		}
  
		sortedSequence[i].rotated = !sortedSequence[i].rotated;
	  }
  
	  return { X, Y };
	}
  
	function calculateObjectiveFunction(permutation) {
	  return permutation.reduce((sum, element) => sum + element.width * element.height, 0);
	}
  </script>
  
  <style>
	.wall {
	  position: relative;
	  width: var(--wallWidth);
	  height: var(--wallHeight);
	  border: 1px solid #000;
	}
  
	.tile {
	  position: absolute;
	  background-color: #ccc;
	  border: 1px solid #000;
	  transition: transform 0.3s ease;
	}
  
	.rotated {
	  transform: rotate(90deg);
	}
  </style>
  
  <div>
	<div class="wall">
	  {#each tiles as tile, index (tile.id)}
		<div
		  class="tile {tile.rotated ? 'rotated' : ''}"
		  style="width: {tile.rotated ? tile.height : tile.width}px; height: {tile.rotated ? tile.width : tile.height}px; left: {tile.x}px; top: {tile.y}px;"
		  on:click={() => rotateTile(tile)}
		  key={index}
		></div>
	  {/each}
	</div>
  
	<div>
	  <div>
		<label for="wallWidthInput">Wall Width:</label>
		<input bind:value={wallWidthInput} id="wallWidthInput" placeholder="Wall Width" />
	  </div>
	  <div>
		<label for="wallHeightInput">Wall Height:</label>
		<input bind:value={wallHeightInput} id="wallHeightInput" placeholder="Wall Height" />
	  </div>
	  <div>
		<input bind:value={tileSizeWidthInput} placeholder="Tile width" />
		<input bind:value={tileSizeHeightInput} placeholder="Tile height" />
		<select bind:value={selectedTileSize}>
		  {#each availableTileSizes as size}
			<option value={size}>{size.width}x{size.height}</option>
		  {/each}
		</select>
		<button on:click={addTile}>Add Tile</button>
		<button on:click={NEH}>Optimize Layout (NEH)</button>
	  </div>
	</div>
  </div>
  