import { PUBLIC_TIMEZONE, PUBLIC_LATITUDE, PUBLIC_LONGITUDE } from '$env/static/public';

export const TIMEZONE = PUBLIC_TIMEZONE || 'America/Chicago';
export const LATITUDE = Number(PUBLIC_LATITUDE) || 36.0822;
export const LONGITUDE = Number(PUBLIC_LONGITUDE) || -94.1719;
