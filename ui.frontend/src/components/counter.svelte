<script>
  let props = $props();
	import { count } from './store';

	function increment() {
		count.update(n => n + 1);
	}
</script>

<button onclick={increment}>
	{props.message || 'This Button'} clicked {$count}	time{$count === 1 ? '' : 's'}
</button>