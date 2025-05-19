<script>
	export let enabled = 'false';
</script>

<svg class="pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.71 6.28">
	<defs>
		<style>
		
			.cls-x.enabled {
			
				fill: #ef4136;
				fill-rule: evenodd;
				stroke-width: 0px;
				
			}
			.cls-x {
				transition:all ease-out 0.3s;
				scale: 0.7;
				fill-rule: evenodd;
				fill: rgba(120, 120, 120, 0.3);
				stroke-width: 0.09px !important;
				stroke: rgba(0, 0, 0, 0.2);
			}
			svg:hover .cls-x{
				scale: 0.7;
				fill-rule: evenodd;
				fill: rgba(120, 120, 120, 0.7);
				stroke-width: 0.09px !important;
				stroke: rgba(0, 0, 0, 0.2);
			}
		</style>
	</defs>
	<path
		class="cls-x {enabled ? 'enabled' : ''}"
		d="m2.51,6.25s-.11.04-.16,0c-.52-.33-.99-.75-1.38-1.23C.47,4.39.15,3.7.04,3.02c-.11-.68,0-1.34.33-1.87.14-.22.31-.41.51-.57C1.37.2,1.92,0,2.46,0c.53,0,1.04.2,1.49.61.16.14.29.31.4.48.37.6.44,1.37.28,2.15-.27,1.25-1.04,2.34-2.13,3.01h0Zm-.15-5.04c.65,0,1.18.52,1.18,1.17s-.52,1.18-1.17,1.18c-.65,0-1.18-.52-1.18-1.17,0,0,0,0,0,0,0-.65.53-1.17,1.17-1.18h0Z"
	/>
</svg>
