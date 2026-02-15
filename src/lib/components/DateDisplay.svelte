<script lang="ts">
	import { TIMEZONE } from '$lib/config';

	let dateStr = $state('');

	function updateDate() {
		const now = new Date();
		dateStr = now.toLocaleDateString('en-US', {
			timeZone: TIMEZONE,
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	$effect(() => {
		updateDate();
		const interval = setInterval(updateDate, 60_000);
		return () => clearInterval(interval);
	});
</script>

<div class="date">
	{dateStr}
</div>

<style>
	.date {
		text-align: center;
		font-size: 1.5rem;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.85);
		letter-spacing: 0.04em;
	}
</style>
