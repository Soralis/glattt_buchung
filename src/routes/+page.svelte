<script lang="ts">
	import Calendar from '$lib/components/calendar.svelte';
	import Success from '$lib/components/success.svelte';
	import Failure from '$lib/components/failure.svelte';
	import { Modal, Spinner, Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import {
		monday,
		sunday,
		free_appointments,
		startTime,
		endTime,
		reserve_modal,
		staffId,
		store_info,
		customer_info
	} from '$lib/Store';
	import { PUBLIC_ADDRESSES } from '$env/static/public';
	import { page } from '$app/stores';

	export let form;

	let with_treatment = false;
	let abfrage_modal = true;
	let day: Date = new Date();
	let time: Date = new Date();
	let monthDisplay: string;
	let pending: boolean = true;
	let error_loading_appointments: boolean = false;
	const storename: string = $page.url.searchParams.get('storename');
	let booking: boolean = false;

	onMount(() => {
		const today = new Date();
		$monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
		$sunday = new Date(today.setDate(today.getDate() - today.getDay() + 7));
		$store_info = JSON.parse(PUBLIC_ADDRESSES)[storename] || { name: 'Laden nicht bekannt' };
		load_free_appointments();
	});

	$: {
		try {
			if ($monday.getMonth() == $sunday.getMonth()) {
				monthDisplay = $monday.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
			} else {
				monthDisplay =
					$monday.toLocaleDateString('de-DE', { month: 'short' }) +
					' - ' +
					$sunday.toLocaleDateString('de-DE', { month: 'short', year: 'numeric' });
			}
		} catch (e) {
			monthDisplay = 'keine Daten';
		}
	}
	$: {
		day = new Date($startTime).toLocaleDateString('de-DE', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		time = new Date($startTime).toLocaleTimeString('de-DE', {
			hour: '2-digit',
			minute: '2-digit'
		});
	}
	$: {
		console.log('form errors: ', form?.err);
		booking = false;
		if (form?.success || form?.success == false) {
			$reserve_modal = false;
		}
	}

	async function load_free_appointments() {
		pending = true;
		const response = await fetch(
			`/?storename=${storename}&monday=${$monday}&sunday=${$sunday}&with_treatment=${with_treatment}`
		);

		$free_appointments = await response.json();
		pending = false;
	}

	function previousweek() {
		$monday = new Date($monday.setDate($monday.getDate() - 7));
		$sunday = new Date($sunday.setDate($sunday.getDate() - 7));
		load_free_appointments();
	}

	function nextweek() {
		$monday = new Date($monday.setDate($monday.getDate() + 7));
		$sunday = new Date($sunday.setDate($sunday.getDate() + 7));
		load_free_appointments();
	}
</script>

{#if form?.success}
	<Success {with_treatment} {day} {time} />
{:else if form?.success == false}
	<Failure />
{:else}
	<div>
		<div class="flex justify-center p-4">
			<h1 class="text-3xl text-yellow-400">
				{$store_info?.name}
			</h1>
		</div>
		<div class="flex justify-center p-4">
			<div class="inline-flex">
				<button
					class="text-gray-600 hover:text-gray-400 font-bold py-2 px-4 rounded-r"
					on:click|preventDefault={previousweek}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</button>
				<h1 class="text-gray-600 font-bold py-2 px-4">
					{monthDisplay}
				</h1>
				<button
					class="text-gray-600 hover:text-gray-400 font-bold py-2 px-4 rounded-r"
					on:click|preventDefault={nextweek}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>
			</div>
		</div>

		<div>
			{#if error_loading_appointments}
				<div>
					<div class="flex justify-center">
						<div
							class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
							role="alert"
						>
							<strong class="font-bold">Fehler beim Laden der Freien Termine!</strong>
						</div>
					</div>
				</div>
			{:else}
				<div>
					{#if pending}
						<div class="flex justify-center">Loading...</div>
					{:else}
						<div class="flex justify-center">
							<Calendar appointments={$free_appointments} weekstart={$monday} />
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<!-- Abfragemodal behandlung beratung -->

<Modal bind:open={abfrage_modal}>
	<div class="relative w-full h-full max-w-md md:h-auto">
		<!-- Modal content -->
		<button
			on:click={() => (with_treatment = true)}
			on:click={load_free_appointments}
			on:click={() => (abfrage_modal = false)}
			class="w-full border border-yellow-300 hover:border-yellow-400 p-2 text-gray-600 hover:bg-gray-50 rounded-lg my-2"
		>
			<span class="text-lg font-semibold">Gratis Beratungsgespräch und erste Behandlung buchen</span
			><br />
			<span class="font-sm">Ich möchte mich direkt nach dem Beratungsgespräch behandeln lassen</span
			>
		</button>
		<button
			on:click={() => (abfrage_modal = false)}
			class="w-full border border-yellow-300 hover:border-yellow-400 p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
		>
			<span class="text-lg font-semibold">Nur Gratis Beratungsgespräch buchen</span><br />
			<span class="font-sm">Ich möchte mich erstmal nur gratis beraten lassen</span>
		</button>
	</div>
</Modal>

<!-- Reservierungsmodal -->
<Modal bind:open={$reserve_modal} size="xs" class="w-full">
	<form class="space-y-6" method="POST" use:enhance>
		{#if with_treatment}
			<h3 class="mb-4 text-xl font-medium text-gray-600 dark:text-white text-center">
				Gratis Beratungsgespräch mit anschließender Behandlung am {day} um {time} Uhr buchen
			</h3>
		{:else}
			<h3 class="mb-4 text-xl font-medium text-gray-600 dark:text-white text-center">
				Gratis Beratungsgespräch am {day} um {time} Uhr buchen
			</h3>
		{/if}
		<!-- Warnungen bei fehlerhafter eingabe oder existentem Kunden -->
		<div>
			{#if form?.err == 'email already exists'}
				<Alert color="yellow">
					<span class="ml-3 text-sm font-semibold text-red-500">
						Diese Emailadresse wurde schon benutzt.<br />Du bist schon Kunde? Dann vereinbare bitte
						Deinen Termin telefonisch unter:
						<a style="color:#E7B53A" href={$store_info.phone.link}
							><u>{$store_info.phone.number}</u></a
						>
					</span>
				</Alert>
			{:else if form?.err == 'NON_UNIQUE_MOBILE'}
				<!-- Warnung Telefonnummer wird schon benutzt -->
				<Alert color="yellow">
					<span class="ml-3 text-sm font-semibold text-red-500">
						Diese Telefonnummer wurde schon benutzt.<br />Du bist schon Kunde? Dann vereinbare bitte
						Deinen Termin telefonisch unter:
						<a style="color:#E7B53A" href={$store_info.phone.link}
							><u>{$store_info.phone.number}</u></a
						>
					</span>
				</Alert>
			{:else if form?.err == 'MOBILE_TOO_SHORT'}
				<Alert color="red">
					<span class="ml-3 text-sm font-semibold text-red-500">
						Diese Telefonnummer ist zu kurz oder enthält unerlaubte Zeichen.
					</span>
				</Alert>
			{:else if form?.err == 'EMAIL_INVALID'}
				<Alert color="red">
					<span class="ml-3 text-sm font-semibold text-red-500">
						Diese E-Mail Adresse ist ungültig.
					</span>
				</Alert>
			{/if}
		</div>
		<!-- warnung zuende -->

		<input type="text" name="startTime" value={$startTime} hidden required />
		<input type="text" name="endTime" value={$endTime} hidden required />
		<input type="text" name="with_treatment" value={with_treatment} hidden required />
		<input type="text" name="storename" value={storename} hidden required />
		<input type="text" name="staffId" value={$staffId} hidden required />

		<input type="text" name="store_info" value={JSON.stringify($store_info)} hidden required />

		<div class="relative z-0 w-full mb-6 group">
			<input
				type="text"
				name="firstname"
				bind:value={$customer_info.firstname}
				class="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-300 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
				placeholder=" "
				required
			/>
			<label
				for="firstname"
				class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>Vorname</label
			>
		</div>
		<div class="relative z-0 w-full mb-6 group">
			<input
				type="text"
				name="lastname"
				bind:value={$customer_info.lastname}
				class="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
				placeholder=" "
				required
			/>
			<label
				for="lastname"
				class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>Nachname</label
			>
		</div>
		<div class="relative z-0 w-full mb-6 group">
			<input
				value={form?.data?.email ?? ''}
				type="email"
				name="email"
				class="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
				placeholder=" "
				required
			/>
			<label
				for="email"
				class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>Email</label
			>
		</div>
		<div class="relative z-0 w-full mb-6 group">
			<input
				value={form?.data?.phone ?? ''}
				type="tel"
				minlength="9"
				maxlength="14"
				name="phone"
				class="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
				placeholder=" "
				required
			/>
			<label
				for="phone"
				class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>Telefonnummer</label
			>
		</div>
		<div class="relative z-0 w-full mb-6 group">
			<input
				value={form?.data?.message ?? ''}
				type="textarea"
				name="message"
				class="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
				placeholder=" "
			/>
			<label
				for="message"
				class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>Welche Körperzone möchtest Du behandeln?</label
			>
		</div>
		<button
			disabled={booking}
			class="w-full text-yellow-400 font-semibold border border-yellow-400 hover:text-white hover:bg-yellow-400 px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
		>
			{#if booking}
				<Spinner color="yellow" />
			{:else}
				Gratis Beratungsgespräch buchen
			{/if}</button
		>
	</form>
</Modal>
