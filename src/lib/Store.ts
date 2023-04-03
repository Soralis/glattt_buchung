import { writable } from 'svelte/store';

export const monday = writable(Date.now());
export const sunday = writable(Date.now());
export const free_appointments = writable([]);
export const startTime = writable(Date.now());
export const endTime = writable(Date.now());
export const reserve_modal = writable(false);
export const staffId = writable('');

export const store_info = writable({});
export const customer_info = writable({
	firstname: '',
	lastname: ''
});
