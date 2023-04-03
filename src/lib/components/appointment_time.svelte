<script lang="ts">
	import { startTime, endTime, reserve_modal, staffId } from '$lib/Store';
	export let appointment: Object;

	const start = appointment.clientSchedules[0].serviceSchedules[0].startTime;
	const end = appointment.clientSchedules[0].serviceSchedules[0].endTime;
	const staff = appointment.clientSchedules[0].serviceSchedules[0].staffId;

	let hours = new Date(start).getHours();
	let minutes = new Date(start).getMinutes();

	if (minutes <= 9) {
		minutes = '0' + minutes.toString();
	}
	if (hours <= 9) {
		hours = '0' + hours.toString();
	}
</script>

<div class="flex justify-center">
	<button
		on:click={() => {
			$startTime = start;
			$endTime = end;
			$reserve_modal = true;
			$staffId = staff;
		}}
		class="modalButton border border-gray-400 overflow-hidden text-gray-600 sm:text-lg px-2 sm:px-3 py-1 sm:m-1 hover:border-gray-600 rounded-2xl"
	>
		{hours}:{minutes}
	</button>
</div>
