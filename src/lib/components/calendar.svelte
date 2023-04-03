<script lang="ts">
	import Appointment_time from '$lib/components/appointment_time.svelte';
	export let appointments: Object;
	export let weekstart;

	let mon = [];
	let tue = [];
	let wed = [];
	let thu = [];
	let fri = [];
	let sat = [];

	const monDate = new Date(weekstart);
	const tueDate = new Date(new Date(monDate).setDate(new Date(monDate).getDate() + 1));
	const wedDate = new Date(new Date(monDate).setDate(new Date(monDate).getDate() + 2));
	const thuDate = new Date(new Date(monDate).setDate(new Date(monDate).getDate() + 3));
	const friDate = new Date(new Date(monDate).setDate(new Date(monDate).getDate() + 4));
	const satDate = new Date(new Date(monDate).setDate(new Date(monDate).getDate() + 5));

	for (let i = 0; i < appointments.length; i++) {
		let appointment_time = new Date(appointments[i].startTime);
		let weekday = appointment_time.getDay();

		switch (weekday) {
			case 1:
				mon.push(appointments[i]);
				break;
			case 2:
				tue.push(appointments[i]);
				break;
			case 3:
				wed.push(appointments[i]);
				break;
			case 4:
				thu.push(appointments[i]);
				break;
			case 5:
				fri.push(appointments[i]);
				break;
			case 6:
				sat.push(appointments[i]);
				break;
		}
	}
</script>

<div class="grid grid-cols-6 gap-1 sm:gap-4 sm:p-5">
	<div>
		<h2
			class="mb-2 text-lg font-semibold text-gray-600 dark:text-white overflow-hidden flex justify-center"
		>
			Mo
		</h2>
		<h6 class="mb-2 text-m text-gray-600 dark:text-white overflow-hidden flex justify-center">
			{monDate.getDate()}
		</h6>
		<hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
		<div class="max-w-md space-y-1 text-gray-500 dark:text-gray-400">
			{#each mon as appointment}
				<Appointment_time {appointment} />
			{/each}
		</div>
	</div>
	<div>
		<h2
			class="mb-2 text-lg font-semibold text-gray-600 dark:text-white overflow-hidden flex justify-center"
		>
			Di
		</h2>
		<h6 class="mb-2 text-m text-gray-600 dark:text-white overflow-hidden flex justify-center">
			{tueDate.getDate()}
		</h6>
		<hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
		<div class="max-w-md space-y-1 text-gray-500 dark:text-gray-400">
			{#each tue as appointment}
				<Appointment_time {appointment} />
			{/each}
		</div>
	</div>
	<div>
		<h2
			class="mb-2 text-lg font-semibold text-gray-600 dark:text-white overflow-hidden flex justify-center"
		>
			Mi
		</h2>
		<h6 class="mb-2 text-m text-gray-600 dark:text-white overflow-hidden flex justify-center">
			{wedDate.getDate()}
		</h6>
		<hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
		<div class="max-w-md space-y-1 text-gray-500 dark:text-gray-400">
			{#each wed as appointment}
				<Appointment_time {appointment} />
			{/each}
		</div>
	</div>
	<div>
		<h2
			class="mb-2 text-lg font-semibold text-gray-600 dark:text-white overflow-hidden flex justify-center"
		>
			Do
		</h2>
		<h6 class="mb-2 text-m text-gray-600 dark:text-white overflow-hidden flex justify-center">
			{thuDate.getDate()}
		</h6>
		<hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
		<div class="max-w-md space-y-1 text-gray-500 dark:text-gray-400">
			{#each thu as appointment}
				<Appointment_time {appointment} />
			{/each}
		</div>
	</div>
	<div>
		<h2
			class="mb-2 text-lg font-semibold text-gray-600 dark:text-white overflow-hidden flex justify-center"
		>
			Fr
		</h2>
		<h6 class="mb-2 text-m text-gray-600 dark:text-white overflow-hidden flex justify-center">
			{friDate.getDate()}
		</h6>
		<hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
		<div class="max-w-md space-y-1 text-gray-500 dark:text-gray-400">
			{#each fri as appointment}
				<Appointment_time {appointment} />
			{/each}
		</div>
	</div>
	<div>
		<h2
			class="mb-2 text-lg font-semibold text-gray-600 dark:text-white overflow-hidden flex justify-center"
		>
			Sa
		</h2>
		<h6 class="mb-2 text-m text-gray-600 dark:text-white overflow-hidden flex justify-center">
			{satDate.getDate()}
		</h6>
		<hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
		<div class="max-w-md space-y-1 text-gray-500 dark:text-gray-400">
			{#each sat as appointment}
				<Appointment_time {appointment} />
			{/each}
		</div>
	</div>
</div>
