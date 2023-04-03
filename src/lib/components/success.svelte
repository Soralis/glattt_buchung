<script lang="ts">
	export let with_treatment: Boolean;
	export let day: Date;
	export let time: Date;
	import { store_info } from '$lib/Store';
</script>

<div class="flex justify-center h-screen">
	<div
		class="m-auto block p-6 background border border-gray-200 rounded-lg shadow hover:glattt dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
	>
		<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
			Dein Beratungsgespräch bei {$store_info.name} am
		</p>
		<p class="font-bold text-lg text-gray-700 dark:text-gray-400 text-center">
			{day} um {time}
		</p>
		{#if with_treatment}
			<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
				mit anschließender Behandlung
			</p>
		{/if}
		<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
			wurde erfolgreich gebucht!
		</p>
		{#if with_treatment}
			<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
				Bitte plane etwa eine Stunde dafür ein.
			</p>
		{:else}
			<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
				Bitte plane etwa eine halbe Stunde dafür ein.
			</p>
		{/if}
		<br />
		<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
			Bitte lies vorab unsere Behandlungshinweise:
		</p>
		<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
			<a href="https://www.glattt.com/behandlung" target="_blank"
				>https://www.glattt.com/behandlung</a
			>
		</p>
		<br />
		<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
			Ruf uns an, falls Du noch Fragen hast: <a href={$store_info.phone.link}
				><u>{$store_info.phone.number}</u></a
			>
		</p>
		<br />
		<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
			Wir freuen uns auf dich!
		</p>
		<p class="font-semibold text-gray-700 dark:text-gray-400 text-center">Dein Team glattt</p>
	</div>
</div>

<style scoped>
	.background {
		background-color: #f7e8c3;
	}
	.glattt {
		background-color: #e7b53a;
	}
</style>
