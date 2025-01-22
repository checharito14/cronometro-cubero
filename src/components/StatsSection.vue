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
					<p >Peor:</p>
					<p>{{ worstTime }}</p>
				</div>
			</div>
			<div class="flex justify-around border-b border-vulcan-400 dark:border-vulcan-800 py-2">
				<p>Promedio:</p>
				<p>{{ promedioTime }}</p>
			</div>

			<table class="min-w-full">
				<thead>
					<tr>
						<th class="py-1"></th>
						<th class="py-1 text-[10px] text-vulcan-800 dark:text-vulcan-400">Actual</th>
						<th class="py-1 text-[10px] text-vulcan-800 dark:text-vulcan-400">Mejor</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, index) in averages" :key="index">
						<td class="py-2 border-b border-vulcan-400 dark:border-vulcan-800  text-center">
							{{ row.label }}
						</td>
						<td class="py-1 border-b border-vulcan-400 dark:border-vulcan-800  text-center">
							{{ row.actual }}
						</td>
						<td class="py-1 border-b border-vulcan-400 dark:border-vulcan-800  text-center">
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
const solves = store.solves;

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

const bestAvg = ref<{[key:number]: number | null}>({
  3: null as number | null,
  5: null as number | null,
  12: null as number | null,
});

const bestTime = computed(() => {
	if (solves.length === 0) return "00.00";

	const best = Math.min(...solves.map((solve) => solve.time));
	// const bestTime = solves.find((solve) => solve.time === best)
	return best.toFixed(2);
});

const worstTime = computed(() => {
	if (solves.length === 0) return "00.00";

	const worst = Math.max(...solves.map((solve) => solve.time));

	return worst.toFixed(2);
});

const promedioTime = computed(() => {
	if (solves.length === 0) return "-";

	const total = solves.reduce((sum, solve) => sum + solve.time, 0);
	const avg = total / solves.length;

	return avg.toFixed(2);
});

const calculateAvg = (count: number): string => {
	if (solves.length < count) return "-";

	const lastThree = solves.slice(0, count).map((solve) => solve.time);
	const total = lastThree.reduce((sum, time) => sum + time, 0);
	const currentAvg = total / count;

	if (bestAvg.value[count] === null || currentAvg < bestAvg.value[count]!) {
		bestAvg.value[count] = currentAvg;
	}
	return currentAvg.toFixed(2);
};
</script>
