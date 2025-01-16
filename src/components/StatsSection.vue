<template>
	<base-card>
		<h3 class="text-center text-base md:text-lg">Estadisticas</h3>
		<div class="grid gap-3 p-6 text-xs md:text-sm">
			<div class="grid grid-cols-2 gap-5 justify-between">
				<div
					class="flex justify-around border-b border-vulcan-800 py-2"
				>
					<p>Mejor:</p>
					<p>{{ bestTime }}</p>
				</div>
				<div
					class="flex justify-around border-b border-vulcan-800 py-2"
				>
					<p>Peor:</p>
					<p>{{ worstTime }}</p>
				</div>
			</div>
			<div class="flex justify-around border-b border-vulcan-800 py-2">
				<p>Promedio:</p>
				<p>{{ promedioTime }}</p>
			</div>

			<table class="min-w-full">
				<thead>
					<tr>
						<th class="py-1"></th>
						<th class="py-1 text-[10px] text-vulcan-400">Actual</th>
						<th class="py-1 text-[10px] text-vulcan-400">Mejor</th>
					</tr>
				</thead>
				<tbody>
					<tr class="hover:">
						<td class="py-1 border-b border-vulcan-800 text-cente">
							Avg3
						</td>
						<td class="py-1 border-b border-vulcan-800 text-center">
							{{ avg3 }}
						</td>
						<td class="py-1 border-b border-vulcan-800 text-center">
							<!-- {{ bestAvg3 }} -->
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</base-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTimesStore } from "../store/timesStore";

const store = useTimesStore();
const solves = store.solves;

const bestTime = computed(() => {
	if (solves.length === 0) return "00.00";

	const best = Math.min(...solves.map((solve) => parseFloat(solve.time)));

	return best.toFixed(2);
});

const worstTime = computed(() => {
	if (solves.length === 0) return "00.00";

	const worst = Math.max(...solves.map((solve) => parseFloat(solve.time)));

	return worst.toFixed(2);
});

const promedioTime = computed(() => {
	if (solves.length === 0) return "-";

	const total = solves.reduce(
		(sum, solve) => sum + parseFloat(solve.time),
		0
	);
	const avg = total / solves.length;

	return avg.toFixed(2);
});


const avg3 = computed(() => {
	if (solves.length < 3) return "-";

	const lastThree = solves.slice(3).map((solve) => parseFloat(solve.time));
	const total = lastThree.reduce((sum, time) => sum + time, 0);
	const currentAvg = total / 3;
	return currentAvg.toFixed(2);
});
</script>
