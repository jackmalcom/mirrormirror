<script lang="ts">
	import { LATITUDE, LONGITUDE, TIMEZONE } from '$lib/config';
	import { fetchForecast, type WeatherData } from '$lib/weather';

	let weather: WeatherData | null = $state(null);
	let error: string | null = $state(null);

	async function loadWeather() {
		try {
			weather = await fetchForecast(LATITUDE, LONGITUDE, TIMEZONE);
			error = null;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to fetch weather';
		}
	}

	$effect(() => {
		loadWeather();
		// Refresh every 30 minutes
		const interval = setInterval(loadWeather, 30 * 60 * 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="forecast">
	{#if error}
		<p class="error">{error}</p>
	{:else if weather}
		<div class="days">
			{#each weather.days as day (day.date)}
				<div class="day">
					<span class="weekday">{day.weekday}</span>
					<span class="icon">{day.icon}</span>
					<span class="temps">
						<span class="high">{day.tempMax}°</span>
						<span class="low">{day.tempMin}°</span>
					</span>
					<span class="desc">{day.description}</span>
				</div>
			{/each}
		</div>
	{:else}
		<p class="loading">Loading weather...</p>
	{/if}
</div>

<style>
	.forecast {
		width: 100%;
	}

	.days {
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	.day {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		min-width: 5rem;
	}

	.weekday {
		font-size: 0.95rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.icon {
		font-size: 2rem;
	}

	.temps {
		display: flex;
		gap: 0.5rem;
		font-size: 1rem;
	}

	.high {
		color: white;
		font-weight: 500;
	}

	.low {
		color: rgba(255, 255, 255, 0.5);
		font-weight: 300;
	}

	.desc {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.5);
		text-align: center;
	}

	.error {
		color: #ff6b6b;
		text-align: center;
		font-size: 0.9rem;
	}

	.loading {
		color: rgba(255, 255, 255, 0.4);
		text-align: center;
		font-size: 0.9rem;
	}
</style>
