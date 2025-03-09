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
import { computed } from "vue";
import { useAvgStore } from "../store/avgStore";

const avgStore = useAvgStore();

const averages = computed(() => [
	{
		label: "Avg3",
		actual: avgStore.calculateAvg(3),
		best: avgStore.calculateBestAvg(3)
	},
	{
		label: "Avg5",
		actual: avgStore.calculateAvg(5),
		best: avgStore.calculateBestAvg(5),
	},
	{
		label: "Avg12",
		actual: avgStore.calculateAvg(12),
		best: avgStore.calculateBestAvg(12),
	},
]);

const bestTime = computed(() => avgStore.getBestTime());

const worstTime = computed(() => avgStore.getWorstTime());

const promedioTime = computed(() => avgStore.getPromedioTime());

</script>
