<script>
 import { count } from './store.js';
 const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
</script>

<h2> Colored Buttons </h2>
{#each {length: $count} as _, i}
	<button
	style="color: {colors[i]}"
	aria-label="{colors[i]}"
	>{colors[i]}</button>
{/each}
