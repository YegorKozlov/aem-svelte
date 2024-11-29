<script>
  import { count } from './store.js';
  export let message;

	export function increment() {
		count.update(n => n + 1);
	}
</script>

<button on:click={increment}>
	{message} clicked {$count}
	{$count === 1 ? 'time' : 'times'}
</button>