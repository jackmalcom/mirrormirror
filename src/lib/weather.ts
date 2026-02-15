/**
 * WMO Weather interpretation codes mapped to descriptions and emoji icons.
 * https://open-meteo.com/en/docs#weathervariables
 */

export interface DayForecast {
	date: string;
	weekday: string;
	tempMax: number;
	tempMin: number;
	code: number;
	icon: string;
	description: string;
}

export interface WeatherData {
	days: DayForecast[];
	fetchedAt: Date;
}

const WMO_CODES: Record<number, { description: string; icon: string }> = {
	0: { description: 'Clear sky', icon: '☀️' },
	1: { description: 'Mainly clear', icon: '🌤️' },
	2: { description: 'Partly cloudy', icon: '⛅' },
	3: { description: 'Overcast', icon: '☁️' },
	45: { description: 'Fog', icon: '🌫️' },
	48: { description: 'Rime fog', icon: '🌫️' },
	51: { description: 'Light drizzle', icon: '🌦️' },
	53: { description: 'Drizzle', icon: '🌦️' },
	55: { description: 'Dense drizzle', icon: '🌧️' },
	56: { description: 'Light freezing drizzle', icon: '🌧️' },
	57: { description: 'Freezing drizzle', icon: '🌧️' },
	61: { description: 'Slight rain', icon: '🌧️' },
	63: { description: 'Rain', icon: '🌧️' },
	65: { description: 'Heavy rain', icon: '🌧️' },
	66: { description: 'Light freezing rain', icon: '🌧️' },
	67: { description: 'Freezing rain', icon: '🌧️' },
	71: { description: 'Slight snow', icon: '🌨️' },
	73: { description: 'Snow', icon: '🌨️' },
	75: { description: 'Heavy snow', icon: '❄️' },
	77: { description: 'Snow grains', icon: '❄️' },
	80: { description: 'Slight showers', icon: '🌦️' },
	81: { description: 'Showers', icon: '🌧️' },
	82: { description: 'Violent showers', icon: '🌧️' },
	85: { description: 'Slight snow showers', icon: '🌨️' },
	86: { description: 'Snow showers', icon: '❄️' },
	95: { description: 'Thunderstorm', icon: '⛈️' },
	96: { description: 'Thunderstorm w/ hail', icon: '⛈️' },
	99: { description: 'Thunderstorm w/ heavy hail', icon: '⛈️' }
};

export function decodeWMO(code: number): { description: string; icon: string } {
	return WMO_CODES[code] ?? { description: 'Unknown', icon: '❓' };
}

export async function fetchForecast(
	latitude: number,
	longitude: number,
	timezone: string
): Promise<WeatherData> {
	const params = new URLSearchParams({
		latitude: latitude.toString(),
		longitude: longitude.toString(),
		daily: 'temperature_2m_max,temperature_2m_min,weather_code',
		temperature_unit: 'fahrenheit',
		timezone,
		forecast_days: '5'
	});

	const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
	if (!res.ok) {
		throw new Error(`Weather API error: ${res.status}`);
	}

	const data = await res.json();
	const daily = data.daily;

	const days: DayForecast[] = daily.time.map((dateStr: string, i: number) => {
		const date = new Date(dateStr + 'T12:00:00');
		const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
		const code = daily.weather_code[i];
		const { description, icon } = decodeWMO(code);

		return {
			date: dateStr,
			weekday,
			tempMax: Math.round(daily.temperature_2m_max[i]),
			tempMin: Math.round(daily.temperature_2m_min[i]),
			code,
			icon,
			description
		};
	});

	return { days, fetchedAt: new Date() };
}
