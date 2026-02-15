<script lang="ts">
	import Clock from '$lib/components/Clock.svelte';
	import DateDisplay from '$lib/components/DateDisplay.svelte';
	import Weather from '$lib/components/Weather.svelte';
</script>

<svelte:head>
	<title>Mirror Mirror</title>
</svelte:head>

<main>
	<div class="top">
		<Clock />
		<DateDisplay />
	</div>

	<div class="bottom">
		<Weather />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		min-height: 100vh;
		padding: 3rem 2rem;
		box-sizing: border-box;
	}

	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.bottom {
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
