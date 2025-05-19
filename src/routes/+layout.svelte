<script>
	import '../app.scss';
	import {loading} from '$lib/stores/appStore.jsx'

	$loading=false;
</script>

<div class="loading_indicator {$loading} ">

<slot />
</div>