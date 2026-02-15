<script lang="ts">
	import { TIMEZONE } from '$lib/config';

	let time = $state('');

	function updateTime() {
		const now = new Date();
		time = now.toLocaleTimeString('en-US', {
			timeZone: TIMEZONE,
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});
	}

	$effect(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="clock">
	<span class="time">{time}</span>
</div>

<style>
	.clock {
		text-align: center;
	}

	.time {
		font-size: 6rem;
		font-weight: 200;
		letter-spacing: 0.05em;
		color: white;
	}
</style>
