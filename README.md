# mirrormirror

A smart mirror display built with SvelteKit. Shows the time, date, and a 5-day weather forecast.

*Made with [Opencode](https://opencode.ai) and Opus 4.6*

## Setup

```bash
bun install
cp .env.example .env # set your location and timezone
bun run dev
# or
bun run build
```

## Deployment

Coming soon, but it's most likely going to lean on:

- Raspberry Pi OS Lite
- [Cage](https://github.com/cage-kiosk/cage)
- Chromium
- Lighttpd