<template>
	<base-card>
		<h3 class="text-center text-base md:text-lg">Estadisticas</h3>
		<div class="grid gap-3 p-6 text-xs md:text-sm">
			<div class="grid grid-cols-2 gap-5 justify-between">
				<div
					class="flex justify-around border-b border-vulcan-400 dark:border-vulcan-800 py-2"
				>
					<p>Mejor:</p>
					<p>{{ bestTime }}</p>
				</div>
				<div
					class="flex justify-around border-b border-vulcan-400 dark:border-vulcan-800 py-2"
				>
					<p>Peor:</p>
					<p>{{ worstTime }}</p>
				</div>
			</div>
			<div
				class="flex justify-around border-b border-vulcan-400 dark:border-vulcan-800 py-2"
			>
				<p>Promedio:</p>
				<p>{{ promedioTime }}</p>
			</div>

			<table class="min-w-full">
				<thead>
					<tr>
						<th class="py-1"></th>
						<th
							class="py-1 text-[10px] text-vulcan-800 dark:text-vulcan-400"
						>
							Actual
						</th>
						<th
							class="py-1 text-[10px] text-vulcan-800 dark:text-vulcan-400"
						>
							Mejor
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, index) in averages" :key="index">
						<td
							class="py-2 border-b border-vulcan-400 dark:border-vulcan-800 text-center"
						>
							{{ row.label }}
						</td>
						<td
							class="py-1 border-b border-vulcan-400 dark:border-vulcan-800 text-center"
						>
							{{ row.actual }}
						</td>
						<td
							class="py-1 border-b border-vulcan-400 dark:border-vulcan-800 text-center"
						>
							{{ row.best }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</base-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useTimesStore } from "../store/timesStore";

const store = useTimesStore();
const solves = computed(() => store.getSolves);
console.log(solves)
const averages = computed(() => [
	{
		label: "Avg3",
		actual: calculateAvg(3),
		best: bestAvg.value[3]?.toFixed(2) ?? "-",
	},
	{
		label: "Avg5",
		actual: calculateAvg(5),
		best: bestAvg.value[5]?.toFixed(2) ?? "-",
	},
	{
		label: "Avg12",
		actual: calculateAvg(12),
		best: bestAvg.value[12]?.toFixed(2) ?? "-",
	},
]);

const bestAvg = ref<{ [key: number]: number | null }>({
	3: null as number | null,
	5: null as number | null,
	12: null as number | null,
});

const bestTime = computed(() => {
	if (solves.value.length === 0) return "-";
	const validTimes = solves.value
		.filter((solve) => !solve.isDnf)
		.map((solve) => solve.time);
	if (validTimes.length === 0) return "-";

	const best = Math.min(...validTimes);
	return best.toFixed(2); 
});

const worstTime = computed(() => {
	if (solves.value.length === 0) return "-";
	const validTimes = solves.value
		.filter((solve) => !solve.isDnf)
		.map((solve) => solve.time);
	if (validTimes.length === 0) return "-";

	const worst = Math.max(...validTimes);

	return worst.toFixed(2);
});

const promedioTime = computed(() => {
	if (solves.value.length === 0) return "-";
	const validTimes = solves.value
		.filter((solve) => !solve.isDnf)
		.map((solve) => solve.time);
	if (validTimes.length === 0) return "-";

	const total = validTimes.reduce((sum, time) => sum + time, 0);
	const avg = total / solves.value.length;

	return avg.toFixed(2);
});

const calculateAvg = (count: number): string => {
	if (solves.value.length < count) return "-";

	const invalidTimes = solves.value.slice(0, count).filter((solve) => solve.isDnf);

	if (count === 3) {
		if (invalidTimes.length > 0) return "DNF";
	} else if (count === 5) {
		if (invalidTimes.length > 1) return "DNF";
	} else if (count === 12) {
		if (invalidTimes.length > 2) return "DNF";
	}

	const lastSolves = solves.value.slice(0, count);

	const dnfCount = lastSolves.filter((solve) => solve.isDnf).length;
	if (dnfCount > count - 1) return "DNF";

	const times = lastSolves.map((solve) => (solve.time));

	times.sort((a, b) => a - b);

	const timeToAvg = count > 3 ? times.slice(1, count - 1) : times;

	const total = timeToAvg.reduce((sum, time) => sum + time, 0);
	const currentAvg = total / timeToAvg.length;
	return currentAvg.toFixed(2);
};
</script>
